import React, { Component } from "react";
import {Button, Card, Col, Form, Row} from "react-bootstrap";
import Header from "./Header";

export default class CreateTaskForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            validated: false,
            title: "",
            description: "",
            solution: "",
            authenticated: false
        };

        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleOnChange = (event) => {
        this.setState({[event.target.name]: event.target.value
        })
    }

    handleSubmit(event) {
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        }
        this.setState({ validated: true});
    }

    componentDidMount() {
        fetch(`${process.env.REACT_APP_SERVER_URL}/auth/login/success`, {
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
                    user: responseJson.user[0]
                });
            })
            .catch(error => {
                this.setState({
                    authenticated: false,
                    error: "Failed to authenticate user"
                });
            })
    }

    render() {
        const {authenticated} = this.state
        return (
            <div>
                <Header
                    authenticated={authenticated}
                    handleNotAuthenticated={this._handleNotAuthenticated}
                />,
                <Form method="post" action={`${window.env.REACT_APP_SERVER_URL}/tasks/create`} noValidate validated={this.state.validated} onSubmit={this.handleSubmit} >
                    <Row xs={3}>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Title</Form.Label>
                            <Form.Control maxLength="100" onChange={this.handleOnChange} name='title' value={this.state.title} required type="text" placeholder="Solve the task using pythagoras theorem" />
                        </Form.Group>
                    </Row>
                    <Row xs={2}>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                            <Form.Label>Description of the task</Form.Label>
                            <Form.Control maxLength="750" onChange={this.handleOnChange} name='description' required value={this.state.description} as="textarea" placeholder="Points (-2, -3), (2, 1), (5, -2) are given in a rectangular coordinate system on a plane. Find out if they are the vertices of a right triangle." rows={3} />
                        </Form.Group>
                    </Row>
                    <Row xs={4}>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Solution</Form.Label>
                            <Form.Control maxLength="50" onChange={this.handleOnChange} name='solution' value={this.state.solution} required type="text" placeholder="5" />
                        </Form.Group>
                    </Row>
                    <Button  type="submit">Create task!</Button>
                </Form>
            </div>

        );
    }
}