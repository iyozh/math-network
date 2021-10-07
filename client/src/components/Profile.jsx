import Header from "./Header";
import React, { Component } from "react";
import ProfileInfo from "./ProfileInfo";
import TaskTable from "./TaskTable";
import {Button} from "react-bootstrap";
import {withRouter} from "react-router-dom";


export default class Profile extends Component {

    constructor(props) {
        super(props);
        this. state = {
            user: {},
            error: null,
            authenticated: true
        };

        this.handleDeletingTasks = this.handleDeletingTasks.bind(this);
    }

    handleDeletingTasks(event) {
        fetch(`${process.env.REACT_APP_SERVER_URL}/tasks/deleteAll`, {
            method: "DELETE",
            credentials: "include",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "Access-Control-Allow-Credentials": true
            },
        })
    };

    componentDidMount() {
        fetch(`${process.env.REACT_APP_SERVER_URL}/user`, {
            method: "GET",
            credentials: "include",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "Access-Control-Allow-Credentials": true
            }
        })
            .then(response => {
                if (response.status === 200) return response.json();
                throw new Error("failed to authenticate user");
            })
            .then(responseJson => {
                this.setState({
                    user: responseJson,
                });
            })
            .catch(error => {
                this.setState({
                    authenticated: false,
                    error: "Failed to authenticate user"
                });
            });

    }

    render() {
        const { authenticated } = this.state;
        const { user } = this.state;
        return (
            <div>
                <div>
                    <Header
                        authenticated={authenticated}
                        handleNotAuthenticated={this._handleNotAuthenticated}
                    />,
                </div>
                <div>
                    <ProfileInfo
                        authenticated={authenticated}
                        handleNotAuthenticated={this._handleNotAuthenticated}
                        user={user}
                    />
                </div>
                <Button onClick={this.handleDeletingTasks} variant="outline-danger">Delete All Tasks</Button>
                <div>
                    <TaskTable
                       data = { user.Tasks }
                    />
                </div>
            </div>

        );
    }



    _handleNotAuthenticated = () => {
        this.setState({ authenticated: false });
    };
}