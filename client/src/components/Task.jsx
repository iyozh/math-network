import Header from "./Header";
import React, { Component } from "react";
require('dotenv').config()

export default class Task extends Component {
    state = {
        user: {},
        error: null,
        authenticated: false,
        currentTask: {}
    };

    componentDidMount() {
        Promise.all(
            [
                fetch(`${window.env.REACT_APP_SERVER_URL}/auth/login/success`, {
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
                            authenticated: true,
                            user: responseJson.user
                        });
                    })
                    .catch(error => {
                        this.setState({
                            authenticated: false,
                            error: "Failed to authenticate user"
                        });
                    }),
                fetch(`${window.env.REACT_APP_SERVER_URL}/tasks/${this.props.match.params.id}`, {
                    method: "GET",
                    headers: {
                        "Accept": "application/json",
                        "Content-type": "application/json"
                    }
                }).then(tasksResponse => {
                    if (tasksResponse.status === 200) return tasksResponse.json();
                    throw new Error("failed to load task");

                }).then(tasksJson => {
                    console.log(tasksJson)
                    this.setState({
                        currentTask: tasksJson
                    });
                })
            ])
    }

    render() {
        const { authenticated } = this.state;
        return (
            <div>
                <Header
                    authenticated={authenticated}
                    handleNotAuthenticated={this._handleNotAuthenticated}
                />
                <div>
                    { this.state.currentTask.id }
                </div>
            </div>
        );
    }
    _handleNotAuthenticated = () => {
        this.setState({ authenticated: false });
    };
}