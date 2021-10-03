import React from "react";
import HomePage from "./components/Homepage";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Profile from "./components/Profile";
import Task from "./components/Task";

export const AppRouter = () => {
    return (
        <Router>
            <div>
                <Route exact path="/" component={HomePage} />
                <Route exact path="/profile" component={Profile} />
                <Route exact path="/tasks/:id" component={Task} />
            </div>
        </Router>
    );
};