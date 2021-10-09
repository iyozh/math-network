import PropTypes from "prop-types";
import React, { Component } from "react";

export default class Header extends Component {
    static propTypes = {
        authenticated: PropTypes.bool.isRequired
    };

    render() {
        const { authenticated } = this.props;
        return (
            <div className="container">
                <header className="d-flex flex-wrap justify-content-center py-3 mb-4 border-bottom">
                    <a href="/"
                       className="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-dark text-decoration-none">
                        <svg className="bi me-2" width="40" height="32">
                        </svg>
                        <span className="fs-4">Math Network</span>
                    </a>

                    <ul className="nav nav-pills">
                        <li key="home" className="nav-item"><a href="/" className="nav-link" aria-current="page">Home</a></li>
                        { authenticated ? [
                            <li key="profile"  className="nav-item"><a href="/profile" className="nav-link" aria-current="page">Profile</a></li>,
                            <li key="createNewTask"  className="nav-item"><a href="/createTask" className="nav-link" aria-current="page">Create Task</a></li>,
                            <li key="logout"  onClick={this._handleLogoutClick} className="nav-item"><a className="nav-link" id="4">Logout</a></li>,
                            ] :
                            [<li key="google"  onClick={this._handleSignInClick} className="nav-item"><a className="nav-link" id="2">Google</a></li>,
                            <li key="vk"  onClick={this._handleSignInVKClick} className="nav-item"><a className="nav-link" id="5">VK</a></li>]}
                        <li onClick={this.toggleTheme} key="theme" className="nav-item"><a className="nav-link" aria-current="page">Toggle Theme</a></li>
                    </ul>
                </header>
            </div>)
    }


    _handleSignInVKClick = () => {
        window.open(`${window.env.REACT_APP_SERVER_URL}/auth/vkontakte`, "_self")
    }
    _handleSignInClick = () => {
        window.open(`${window.env.REACT_APP_SERVER_URL}/auth/google`, "_self");
    };

    _handleLogoutClick = () => {
        window.open(`${window.env.REACT_APP_SERVER_URL}/auth/logout`, "_self");
        this.props.handleNotAuthenticated();
    };
}