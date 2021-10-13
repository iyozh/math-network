import React, { Component } from "react";
import {Button, Card, Col, Form, Row} from "react-bootstrap";
import Header from "./Header";
import {darkTheme, lightTheme} from "./themeUtils/theme";
import {GlobalStyles} from "./themeUtils/global";
import Toggle from "./themeUtils/Toggle";
import {ThemeProvider} from "styled-components";
import withTheme from "./hooksUtils/themeHOC";
import {withTranslation} from "react-i18next";

class UpdateTaskForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            validated: false,
            title: "",
            description: "",
            solution: "",
            authenticated: false,
            user: {},
            currentTask: {}
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
        Promise.all(
            [
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
                    }),
                fetch(`${process.env.REACT_APP_SERVER_URL}/tasks/${this.props.match.params.id}`, {
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
                }),
            ]
        )

    }

    render() {
        const {authenticated} = this.state
        const [theme, toggleTheme] = this.props.switchTheme;
        const {t} = this.props
        const {user} = this.state
        const { currentTask } = this.state
        return (
            <ThemeProvider  theme = {theme === 'light' ? lightTheme : darkTheme}>
                <GlobalStyles />
                <Toggle t={t} theme={theme} toggleTheme={toggleTheme} />

                <div>
                    <Header
                        authenticated={authenticated}
                        handleNotAuthenticated={this._handleNotAuthenticated}
                    />
                    {(!Object.keys(user).length) ? <h2>{t('updateTask.warningSignIn')}</h2> :
                        ( user.id === currentTask?.userId) ?
                            (<Form method="post" action={`${process.env.REACT_APP_SERVER_URL}/tasks/update/${this.state.currentTask.id}`} noValidate validated={this.state.validated} onSubmit={this.handleSubmit} >
                            <Row xs={3}>
                                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                    <Form.Label>{t('updateTask.title')}</Form.Label>
                                    <Form.Control maxLength="100" onChange={this.handleOnChange} name='title' value={this.state.currentTask.title} required type="text" placeholder={t('createTask.titlePlaceHolder')} />
                                </Form.Group>
                            </Row>
                            <Row xs={2}>
                                <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                                    <Form.Label>{t('updateTask.description')}</Form.Label>
                                    <Form.Control maxLength="750" onChange={this.handleOnChange} name='description' required value={this.state.currentTask.description} as="textarea" placeholder={t('createTask.descriptionPlaceHolder')} rows={3} />
                                </Form.Group>
                            </Row>
                            <Row xs={4}>
                                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                    <Form.Label>{t('updateTask.solution')}</Form.Label>
                                    <Form.Control maxLength="50" onChange={this.handleOnChange} name='solution' value={this.state.currentTask.solution} required type="text" placeholder="5" />
                                </Form.Group>
                            </Row>
                            <Button  type="submit">{t('updateTask.updateButton')}</Button>
                        </Form>) : <h2>{t('updateTask.warning')}</h2>
                    }
                </div>

            </ThemeProvider>
        );
    }
}

export default withTranslation()(withTheme(UpdateTaskForm));