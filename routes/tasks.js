const express = require('express');
const Task = require('../models/index')["Task"];
const router = express.Router();

router.get("/", (req, res) => {
    Task.findAll()
        .then((task) => {
            res.status(200).json(task);
        })
        .catch((err) => {
            console.log(">> Error while finding tasks: ", err);
        })
});

router.get("/:id", (req, res) => {
    Task.findByPk(req.params.id, { include: ["User"] })
        .then((task) => {
            res.status(200).json(task);
        })
        .catch((err) => {
            console.log(">> Error while finding current task: ", err);
        })
});

module.exports = router
