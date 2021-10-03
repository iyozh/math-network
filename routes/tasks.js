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

module.exports = router
