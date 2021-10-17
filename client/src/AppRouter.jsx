import React from "react";
import HomePage from "./components/Homepage";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Profile from "./components/Profile";
import Task from "./components/Task";
import CreateTaskForm from "./components/CreateTaskForm";
import UpdateTaskForm from "./components/UpdateTaskForm";
import NoMatch from "./components/NoMatch";

export const AppRouter = () => {
    return (
        <Router>
            <div>
                <Route exact path="/" component={HomePage} />
                <Route exact path="/profile" component={Profile} />
                <Route exact path="/task/:id" component={Task} />
                <Route exact path="/createTask" component={CreateTaskForm} />
                <Route exact path="/task/updateTask/:id" component={UpdateTaskForm} />
                <Route exact path="*" component={NoMatch} />
            </div>
        </Router>
    );
};