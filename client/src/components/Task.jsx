import Header from "./Header";
import React, { Component } from "react";

export default class Task extends Component {
    state = {
        error: null,
        authenticated: false,
        tasks: []
    };

    render() {
        const { authenticated } = this.state;
        return (
            <div>
                <Header
                    authenticated={authenticated}
                    handleNotAuthenticated={this._handleNotAuthenticated}
                />
                <div>
                    { this.props.match.params.id }
                </div>
            </div>
        );
    }

    _handleNotAuthenticated = () => {
        this.setState({ authenticated: false });
    };
}