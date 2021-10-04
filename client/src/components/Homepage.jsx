import Header from "./Header";
import React, { Component } from "react";
import {Card, Col, Row} from "react-bootstrap";
import {Link} from "react-router-dom";

export default class HomePage extends Component {
    state = {
        user: {},
        error: null,
        authenticated: false,
        tasks: []
    };

    componentDidMount() {
        Promise.all([
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
        fetch(`${window.env.REACT_APP_SERVER_URL}/tasks`, {
            method: "GET",
            headers: {
                "Accept": "application/json",
                "Content-type": "application/json"
            }
        }).then(tasksResponse => {
            if (tasksResponse.status === 200) return tasksResponse.json();
            throw new Error("failed to load tasks");
        }).then(tasksJson => {
            this.setState({
                tasks: tasksJson
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
                    <Row md={3} className="g-4">
                        {Array.from( this.state.tasks ).map((task, idx) => (
                            <Col>
                                <Card>
                                    <Card.Img variant="top" src={process.env.PUBLIC_URL + '/img/img.png'} />
                                    <Card.Body>
                                        <Card.Title><Link to={`/tasks/${task.id}`}>{ task.title }</Link></Card.Title>
                                        <Card.Text>
                                            { task.description }
                                        </Card.Text>
                                    </Card.Body>
                                </Card>
                            </Col>
                        ))}
                    </Row>
                </div>
            </div>
        );
    }

    _handleNotAuthenticated = () => {
        this.setState({ authenticated: false });
    };
}