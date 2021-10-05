import React, { Component } from "react";
import {Button, Card, Col, Form, Row} from "react-bootstrap";

export default class CreateTaskForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            validated: false,
            title: "",
            description: "",
            solution: ""
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

    render() {
        return (
            <Form method="post" action={`${window.env.REACT_APP_SERVER_URL}/task/create`} noValidate validated={this.state.validated} onSubmit={this.handleSubmit} >
                <Row xs={3}>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                    <Form.Label>Title</Form.Label>
                    <Form.Control onChange={this.handleOnChange} name='title' value={this.state.title} required type="text" placeholder="Solve the task using pythagoras theorem" />
                </Form.Group>
                </Row>
                <Row xs={2}>
                <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                    <Form.Label>Description of the task</Form.Label>
                    <Form.Control onChange={this.handleOnChange} name='description' required value={this.state.description} as="textarea" placeholder="Points (-2, -3), (2, 1), (5, -2) are given in a rectangular coordinate system on a plane. Find out if they are the vertices of a right triangle." rows={3} />
                </Form.Group>
                </Row>
                <Row xs={4}>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                    <Form.Label>Solution</Form.Label>
                    <Form.Control onChange={this.handleOnChange} name='solution' value={this.state.solution} required type="text" placeholder="5" />
                </Form.Group>
                </Row>
                <Button type="submit">Create task!</Button>
            </Form>
        );
    }
}