import Header from "./Header";
import SolutionForm from "./SolutionForm"
import React, { Component } from "react";
import {darkTheme, lightTheme} from "./themeUtils/theme";
import {GlobalStyles} from "./themeUtils/global";
import Toggle from "./themeUtils/Toggle";
import {ThemeProvider} from "styled-components";
import withTheme from "./hooksUtils/themeHOC";
import {withTranslation} from "react-i18next";
import ReactStars from "react-rating-stars-component";
import {Button} from "react-bootstrap";

class Task extends Component {
    state = {
        user: [],
        error: null,
        authenticated: false,
        currentTask: {},
        solvedBy: [],
        currentUserRating: 0,
    };

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
                fetch(`${process.env.REACT_APP_SERVER_URL}/tasks/solved/${this.props.match.params.id}`, {
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
                        solvedBy: tasksJson
                    });
                }),
            ])
    }

    render() {
        const { authenticated } = this.state;
        const { user } = this.state
        const { solvedBy } = this.state
        const [theme, toggleTheme] = this.props.switchTheme;
        const { t } = this.props
        if (!this.state.currentTask.User)
            return (<div></div>)
        return (
            <ThemeProvider  theme = {theme === 'light' ? lightTheme : darkTheme}>
                <GlobalStyles />
                <Toggle t={t} theme={theme} toggleTheme={toggleTheme} />
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
                                        <h3 className="dark-color">{ this.state.currentTask.title}</h3>
                                            <p> { this.state.currentTask.description }</p>
                                        {
                                            (this.state.user.id === this.state.currentTask.userId) ?
                                                <h2><a href={`updateTask/${this.state.currentTask.id}`}>Edit</a></h2> : ""
                                        }
                                        <div className="row about-list">
                                            <div className="col-md-6">
                                                <div className="media">
                                                    <label>{t('task.created')}</label>
                                                        <p>{ new Date(Date.parse(this.state.currentTask.createdAt)).toLocaleDateString("nl",{year:"numeric",month:"2-digit", day:"2-digit"}) }</p>
                                                </div>
                                                <div className="media">
                                                    <label>{t('task.rating')}</label>
                                                    <ReactStars
                                                        value={this.state.currentTask.TasksRatings.length ? (this.state.currentTask.TasksRatings.length > 1 ?
                                                            (this.state.currentTask.TasksRatings
                                                                    .reduce((sum,nextMark) => sum + nextMark?.rating, 0) /
                                                                this.state.currentTask.TasksRatings.length) : this.state.currentTask.TasksRatings[0].rating) : 0 }
                                                        count={5}
                                                        edit={false}
                                                        size={24}
                                                        activeColor="#ffd700"
                                                    />
                                                </div>
                                                <div className="media">
                                                    <label>{t('task.creator')}</label>
                                                    <p>{ this.state.currentTask.User.name } </p>
                                                </div>
                                                <div className="media">
                                                    <label>{t('task.solutions')}</label>
                                                    <p>{ solvedBy.length}</p>
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="media">
                                                    <label>{t('task.section')}</label>
                                                    <p>{ this.state.currentTask.section }</p>
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
                        ((this.state.currentTask.userId !== user.id) ?
                            (solvedBy.find((item) =>  item.UserId === user.id)) ?
                                <h2>{t('task.solvedMessage')}✔️</h2> :
                        <SolutionForm
                            solution = {this.state.currentTask.solution }
                            taskId = { this.state.currentTask.id }
                            userId = { user.id }
                        /> : "")
                        : <div>
                            <h2>{t('task.signInWarning')}</h2>
                        </div>
                    }
                    { authenticated && (this.state.currentTask.userId !== user.id)  ?
                        (<div>
                            <h2>{t('task.rateTask')}</h2>
                            <ReactStars
                                count={5}
                                edit={true}
                                size={36}
                                onChange={this.ratingChanged}
                                activeColor="#ffd700"
                            />
                        </div>) : "" }
                </div>
            </div>
            </ThemeProvider>
        );
    }


    _handleNotAuthenticated = () => {
        this.setState({ authenticated: false });
    };

    ratingChanged = (newRating) => {
        fetch(`${process.env.REACT_APP_SERVER_URL}/tasks/setupRating`, {
            method: "POST",
            credentials: "include",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "Access-Control-Allow-Credentials": true
            },
            body: JSON.stringify({
                "rating": newRating,
                "taskId": this.state.currentTask.id
            })
        })
    };
}

export default withTranslation()(withTheme(Task));