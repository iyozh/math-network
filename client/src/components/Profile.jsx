import Header from "./Header";
import React, { Component } from "react";
import ProfileInfo from "./ProfileInfo";
import TaskTable from "./TaskTable";
import {Button} from "react-bootstrap";
import {darkTheme, lightTheme} from "./themeUtils/theme";
import {GlobalStyles} from "./themeUtils/global";
import {ThemeProvider} from "styled-components";
import Toggle from "./themeUtils/Toggle";
import withTheme from "./hooksUtils/themeHOC";
import {withTranslation} from "react-i18next";


class Profile extends Component {

    constructor(props) {
        super(props);
        this.state = {
            user: {},
            error: null,
            authenticated: true,
        };

        this.handleDeletingTasks = this.handleDeletingTasks.bind(this);
    }

    handleDeletingTasks(event) {
        if (this.state.user.Tasks.length !== 0)
            fetch(`${process.env.REACT_APP_SERVER_URL}/tasks/deleteAll`, {
                method: "DELETE",
                credentials: "include",
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json",
                    "Access-Control-Allow-Credentials": true
                },
            }).then(response => {
                if (response.status === 200) window.location.reload();
            })
    };

    componentDidMount() {
        fetch(`${process.env.REACT_APP_SERVER_URL}/user`, {
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
                    user: responseJson,
                });
            })
            .catch(error => {
                this.setState({
                    authenticated: false,
                    error: "Failed to authenticate user"
                });
            });

    }

    render() {
        const { authenticated } = this.state;
        const { user } = this.state;
        const [theme, toggleTheme] = this.props.switchTheme;
        const { t } = this.props
        return (
            <ThemeProvider  theme = {theme === 'light' ? lightTheme : darkTheme}>
                <GlobalStyles />
            <Toggle t={t} theme={theme} toggleTheme={toggleTheme} />
            <div>
                <div>
                    <Header
                        authenticated={authenticated}
                        handleNotAuthenticated={this._handleNotAuthenticated}
                    />
                </div>
                {
                    Object.keys(user).length ?
                        [<div>
                            <ProfileInfo
                                authenticated={authenticated}
                                handleNotAuthenticated={this._handleNotAuthenticated}
                                user={user}
                            />
                        </div>,
                        <Button onClick={this.handleDeletingTasks} variant="outline-danger">{t('taskTable.deleteTasks')}</Button>,
                    <div>
                    <TaskTable  data = { user.Tasks }/>
                    </div>] : <div><h2>You need to login to see this page</h2></div>
                }
            </div>
        </ThemeProvider>
        );
    }



    _handleNotAuthenticated = () => {
        this.setState({ authenticated: false });
    };
}

export default withTranslation()(withTheme(Profile));