import Header from "./Header";
import SolutionForm from "./SolutionForm"
import React, { Component } from "react";
import {Form, Button, Row, Col, InputGroup, FormControl} from "react-bootstrap";

export default class Task extends Component {
    state = {
        user: [],
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
                            user: responseJson.user[0]
                        });
                    })
                    .catch(error => {
                        this.setState({
                            authenticated: false,
                            error: "Failed to authenticate user"
                        });
                    }),
                fetch(`${window.env.REACT_APP_SERVER_URL}/task/${this.props.match.params.id}`, {
                    method: "GET",
                    headers: {
                        "Accept": "application/json",
                        "Content-type": "application/json"
                    }
                }).then(tasksResponse => {
                    if (tasksResponse.status === 200) return tasksResponse.json();
                    throw new Error("failed to load task");

                }).then(tasksJson => {
                    this.setState({
                        currentTask: tasksJson
                    });
                })
            ])
    }

    render() {
        const { authenticated } = this.state;
        const { user } = this.state
        if (!this.state.currentTask.User)
            return (<div></div>)
        return (
            <div>
                <Header
                    authenticated={authenticated}
                    handleNotAuthenticated={this._handleNotAuthenticated}
                />
                <div>
                    <section className="section about-section gray-bg" id="about">
                        <div className="container">
                            <div className="row align-items-center flex-row-reverse">
                                <div className="col-lg-6">
                                    <div className="about-text go-to">
                                        <h3 className="dark-color">{ this.state.currentTask.title }</h3>
                                        <p> { this.state.currentTask.description }</p>
                                        <div className="row about-list">
                                            <div className="col-md-6">
                                                <div className="media">
                                                    <label>Created</label>
                                                    <p>{ this.state.currentTask.createdAt }</p>
                                                </div>
                                                <div className="media">
                                                    <label>Rating</label>
                                                    <p>22</p>
                                                </div>
                                                <div className="media">
                                                    <label>Creator</label>
                                                    <p>{ this.state.currentTask.User.name } </p>
                                                </div>
                                                <div className="media">
                                                    <label>Solutions</label>
                                                    <p>5</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-6">
                                    <div className="about-avatar">
                                        <img src={process.env.PUBLIC_URL + "/img/img.png"} title="" alt=""></img>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </section>
                    { authenticated ?
                        <SolutionForm
                            solution = {this.state.currentTask.solution }
                        /> : <div>
                            <h2>You need to sign in to solve tasks!</h2>
                        </div>
                    }


                </div>
            </div>
        );
    }

    checkSolution = () => {

    }

    _handleNotAuthenticated = () => {
        this.setState({ authenticated: false });
    };
}