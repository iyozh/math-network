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

class NoMatch extends Component {
    state = {
        user: {},
        error: null,
        authenticated: false,
        tasks: [],
    };

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
                        user: responseJson.user
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
                </div>
                <h2>We are sorry, but request URL doesn't exist</h2>
            </ThemeProvider>
        );
    }

    _handleNotAuthenticated = () => {
        this.setState({ authenticated: false });
    };
}

export default withTranslation()(withTheme(NoMatch));