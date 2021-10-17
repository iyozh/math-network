const Task = require('../models/index')["Task"];
const TasksRating = require('../models/index')["TasksRating"];
const SolvedTask = require('../models/index')["SolvedTask"];

exports.getAllTasks = function(req, res){
    Task.findAll({ include: ["User", "TasksRatings", "SolvedTasks"], order:[["createdAt","DESC"]]})
        .then((task) => {
            res.status(200).json(task);
        })
        .catch((err) => {
            console.log(">> Error while finding tasks: ", err);
        })
}

exports.getTask = function(req, res){
    Task.findByPk(req.params.id, { include: ["User", "TasksRatings", "SolvedTasks"] })
        .then((task) => {
            res.status(200).json(task);
        })
        .catch((err) => {
            console.log(">> Error while finding current task: ", err);
        })
}

exports.isRatingAffixed = function(req, res) {
    Task.findByPk(req.params.id, {include: ["TasksRatings"], where: {UserId: req?.user.id}})
        .then((task) => {
            res.status(200).json(task);
        })
        .catch((err) => {
            console.log(">> Error while finding rating of the current user: ", err);
        })
}
exports.createTask = function(req,res){
    Task.create( {
        title: req.body.title,
        description: req.body.description,
        solution: req.body.solution,
        section: req.body.section,
        userId: req.user[0].id,
        createdAt: new Date(),
        updatedAt: new Date(),
    }).then(task => {
        res.redirect(`/task/${task.id}`)
    })
}

exports.updateTask = function(req,res){
    Task.update( {
        title: req.body.title,
        description: req.body.description,
        solution: req.body.solution,
        updatedAt: new Date(),
    }, {where:
            { id: req.params.id}
    })
        .then(rowsUpdated => {
            res.redirect(`/task/${req.params.id}`)
        })
}

exports.setupRating = function (req,res){
    TasksRating.create( {
        rating: req.body.rating,
        taskId: req.body.taskId,
        UserId: req.user[0].id,
        createdAt: new Date(),
        updatedAt: new Date(),
    })
}

exports.solveTask = function(req, res){
    SolvedTask.create({
        UserId: req.body.userId,
        TaskId: req.body.taskId
    }).then(solvedTask => {
        res.redirect(`/task/${solvedTask.TaskId}`)
    })
}

exports.getTaskSolutions = function(req, res){
    SolvedTask.findAll({where:{
            TaskId: req.params.id
        }})
        .then(taskArray => {
            res.status(200).json(taskArray);
        })
        .catch((err) => {
            console.log(">> Error while finding tasks: ", err);
        })
}

exports.deleteAllTasks = function(req, res){
    Task.destroy({
        where: {
            userId: req.user[0].id
        }
    }).then(destroyedTasks => {
        res.status(200).json({message: "Tasks were deleted"})
    })
}

exports.deleteSelectedTasks = function(req, res){
    Task.destroy({
        where: {
            userId: req.user[0].id,
            id: req.body.taskIds
        }
    }).then(destroyedTasks => {
        res.status(200).json({message: "Tasks were deleted"})
    })
}

exports.deleteTask = function(req, res){
    Task.destroy({
        where: {
            userId: req.user[0].id,
            id: req.body.taskId
        }
    }).then(destroyedTask => {
        res.status(200).json({message: "Tasks were deleted"})
    })
}