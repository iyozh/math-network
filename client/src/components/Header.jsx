import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import React, { Component } from "react";

export default class Header extends Component {
    static propTypes = {
        authenticated: PropTypes.bool.isRequired
    };

    render() {
        const { authenticated } = this.props;
        return (
            <ul className="menu">
                <li>
                    <Link to="/">Home</Link>
                </li>
                {authenticated ? (
                    <li onClick={this._handleLogoutClick}>Logout</li>
                ) : (
                    <li onClick={this._handleSignInClick}>Login</li>
                )}
            </ul>
        );
    }

    _handleSignInClick = () => {
        // Authenticate using via passport api in the backend
        // Open Twitter login page
        window.open(`${window.env.REACT_APP_SERVER_URL}/auth/google`, "_self");
    };

    _handleLogoutClick = () => {
        // Logout using Twitter passport api
        // Set authenticated state to false in the HomePage component
        window.open(`${window.env.REACT_APP_SERVER_URL}/auth/logout`, "_self");
        this.props.handleNotAuthenticated();
    };
}

console.log(window.env.REACT_APP_SERVER_URL)