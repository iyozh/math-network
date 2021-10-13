import React, { Component } from "react";
import {Button, Card, Col, Form, Row} from "react-bootstrap";
import Header from "./Header";
import {darkTheme, lightTheme} from "./themeUtils/theme";
import {GlobalStyles} from "./themeUtils/global";
import Toggle from "./themeUtils/Toggle";
import {ThemeProvider} from "styled-components";
import withTheme from "./hooksUtils/themeHOC";
import {withTranslation} from "react-i18next";

class CreateTaskForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            validated: false,
            title: "",
            description: "",
            solution: "",
            authenticated: false,
            user: {}
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
        const [theme, toggleTheme] = this.props.switchTheme;
        const {t} = this.props
        const {user} = this.state
        return (
            <ThemeProvider  theme = {theme === 'light' ? lightTheme : darkTheme}>
                <GlobalStyles />
                <Toggle t={t} theme={theme} toggleTheme={toggleTheme} />

                        <div>
                            <Header
                                authenticated={authenticated}
                                handleNotAuthenticated={this._handleNotAuthenticated}
                            />
                            {(!Object.keys(user).length) ? <h2>{t('createTask.warningSignIn')}</h2>  :
                            <Form method="post" action={`${window.env.REACT_APP_SERVER_URL}/tasks/create`} noValidate validated={this.state.validated} onSubmit={this.handleSubmit} >
                                <Row xs={3}>
                                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                        <Form.Label>{t('createTask.title')}</Form.Label>
                                        <Form.Control maxLength="100" onChange={this.handleOnChange} name='title' value={this.state.title} required type="text" placeholder={t('createTask.titlePlaceHolder')} />
                                    </Form.Group>
                                </Row>
                                <Row xs={2}>
                                    <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                                        <Form.Label>{t('createTask.description')}</Form.Label>
                                        <Form.Control maxLength="750" onChange={this.handleOnChange} name='description' required value={this.state.description} as="textarea" placeholder={t('createTask.descriptionPlaceHolder')} rows={3} />
                                    </Form.Group>
                                </Row>
                                <Row xs={4}>
                                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                        <Form.Label>{t('createTask.solution')}</Form.Label>
                                        <Form.Control maxLength="50" onChange={this.handleOnChange} name='solution' value={this.state.solution} required type="text" placeholder="5" />
                                    </Form.Group>
                                </Row>
                                <Button  type="submit">{t('createTask.createButton')}</Button>
                            </Form>
                            }
                        </div>

            </ThemeProvider>
        );
    }
}

export default withTranslation()(withTheme(CreateTaskForm));