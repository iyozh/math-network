import React, { Component } from "react";
import {Button, Col, Form, Row} from "react-bootstrap";

export default class SolutionForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: '',
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({value: event.target.value});
    }

    handleSubmit(event) {
        let result = "";
        this.state.value === this.props.solution ? result = "Right!" : result = "Wrong!";
        alert(result)
        if (result === "Right!") {
            fetch(`${process.env.REACT_APP_SERVER_URL}/tasks/solve`, {
                method: "POST",
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json",
                    "Access-Control-Allow-Credentials": true
                },
                body: JSON.stringify({
                    "taskId": this.props.taskId,
                    "userId": this.props.userId
                })
            })
        }

        event.preventDefault();
    }

    render() {
        return (
            <Form onSubmit={this.handleSubmit}>
                <Row className="align-items-center">
                    <Col xs="auto">
                        <Form.Label htmlFor="inlineFormInput" visuallyHidden>
                            Solution
                        </Form.Label>
                        <Form.Control value={this.state.value} onChange={this.handleChange}
                            className="mb-2"
                            id="inlineFormInput"
                            placeholder="Input your answer"
                        />
                    </Col>
                    <Col xs="auto">
                        <Button type="submit" className="mb-2">
                            Check the solution!
                        </Button>
                    </Col>
                </Row>
            </Form>
        );
    }
}