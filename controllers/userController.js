const Task = require('../models/index')["Task"];
const TasksRating = require('../models/index')["TasksRating"];
const SolvedTask = require('../models/index')["SolvedTask"];
const User = require('../models/index')["User"];

exports.getAuthenticatedUser = function(req, res){
    res.status(200).json({
        authenticated: true,
        message: "user successfully authenticated",
        user: req.user,
        cookies: req.cookies
    });
}

exports.getCurrentUser = function(req, res){
    User.findByPk(req.user[0].id, { include: [
            {
                model: SolvedTask,
            }, {
                model: Task,
                include: [
                    {
                        model: TasksRating
                    }
                ]
            }]
    })
        .then((user) => {
            res.status(200).json(user);
        })
        .catch((err) => {
            console.log(">> Error while finding user: ", err);
        })
}
