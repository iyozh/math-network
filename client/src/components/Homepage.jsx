import Header from "./Header";
import React, { Component } from "react";
import {Card, Col, Row} from "react-bootstrap";
import {Link} from "react-router-dom";
import {ThemeProvider} from "styled-components";
import {GlobalStyles} from "./themeUtils/global";
import {darkTheme, lightTheme} from "./themeUtils/theme";
import withTheme from "./hooksUtils/themeHOC"
import Toggle from "./themeUtils/Toggle";
import {withTranslation} from "react-i18next";
import ReactStars from "react-rating-stars-component/dist/react-stars";

class HomePage extends Component {
    state = {
        user: {},
        error: null,
        authenticated: false,
        tasks: [],
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
        const [theme, toggleTheme] = this.props.switchTheme;
        const { t } = this.props
        return (
            <ThemeProvider theme = {theme === 'light' ? lightTheme : darkTheme}>
            <GlobalStyles />
            <Toggle t = { t } theme={theme} toggleTheme={toggleTheme} />
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
                                        <Card.Title><Link to={`/task/${task.id}`}>{ task.title.length > 40 ?
                                            `${task.title.slice(0, 35)}...` : task.title}</Link></Card.Title>
                                        <Card.Text>
                                            {task.description.length > 155 ?
                                                `${task.description.slice(0, 150)}...` : task.description}
                                        </Card.Text>
                                        <Card.Text><i>{task.section}</i></Card.Text>
                                        <Card.Subtitle>{t('card.createdBy')}<b>{task.User.name}</b></Card.Subtitle>
                                            <ReactStars
                                                edit={false}
                                                value={ task.TasksRatings.length ? (task.TasksRatings.length > 1 ?
                                                    (task.TasksRatings
                                                            .reduce((sum,nextMark) => sum + nextMark?.rating, 0) /
                                                    task.TasksRatings.length) : task.TasksRatings[0].rating) : 0 }
                                                count={5}
                                                size={24}
                                                activeColor="#ffd700"
                                            />
                                    </Card.Body>
                                </Card>
                            </Col>
                        ))}
                    </Row>
                </div>
            </div>
            </ThemeProvider>
        );
    }

    _handleNotAuthenticated = () => {
        this.setState({ authenticated: false });
    };
}

export default withTranslation()(withTheme(HomePage));