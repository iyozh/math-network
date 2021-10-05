const express = require('express');
const Task = require('../models/index')["Task"];
const router = express.Router();

const authCheck = (req, res, next) => {
    if (!req.user) {
        res.status(401).json({
            authenticated: false,
            message: "user has not been authenticated"
        });
    } else {
        next();
    }
};

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

router.post("/create", authCheck,  (req,res) => {
    Task.create( {
        title: req.body.title,
        description: req.body.description,
        solution: req.body.solution,
        userId: req.user[0].id,
        createdAt: new Date(),
        updatedAt: new Date(),
    }).then(task => {
        res.status(200).json(task)
    })
})

module.exports = router
