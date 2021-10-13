const express = require('express');
const Task = require('../models/index')["Task"];
const SolvedTask = require('../models/index')["SolvedTask"];
const TasksRating = require('../models/index')["TasksRating"];
const router = express.Router();

const authCheck = (req, res, next) => {
    console.log("sdasads")
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
    Task.findAll({ include: ["User", "TasksRatings"], order:[["createdAt","DESC"]]})
        .then((task) => {
            res.status(200).json(task);
        })
        .catch((err) => {
            console.log(">> Error while finding tasks: ", err);
        })
});

router.get("/:id", (req, res) => {
    Task.findByPk(req.params.id, { include: ["User", "TasksRatings"] })
        .then((task) => {
            res.status(200).json(task);
        })
        .catch((err) => {
            console.log(">> Error while finding current task: ", err);
        })
});

router.get("/ratingAffixed/:id" , (req, res) => {
    Task.findByPk(req.params.id, { include:  ["TasksRatings"], where: {UserId: req?.user.id} })
        .then((task) => {
            res.status(200).json(task);
        })
        .catch((err) => {
            console.log(">> Error while finding rating of the current user: ", err);
        })
});

router.post("/create", authCheck,  (req,res) => {
    console.log("sadad")
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
})

router.post("/update/:id", authCheck,  (req,res) => {
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
})

router.post("/setupRating", authCheck,  (req,res) => {
    TasksRating.create( {
        rating: req.body.rating,
        taskId: req.body.taskId,
        UserId: req.user[0].id,
        createdAt: new Date(),
        updatedAt: new Date(),
    })
})

router.post("/solve",authCheck, (req, res) => {
    console.log("sdasda")
    SolvedTask.create({
        UserId: req.body.userId,
        TaskId: req.body.taskId
    }).then(solvedTask => {
        res.redirect(`/task/${solvedTask.TaskId}`)
    })
});

router.get("/solved/:id", (req, res) => {
    SolvedTask.findAll({where:{
        TaskId: req.params.id
    }})
        .then(taskArray => {
            res.status(200).json(taskArray);
        })
        .catch((err) => {
            console.log(">> Error while finding tasks: ", err);
        })
});

router.get("/solved/user/:id", (req, res) => {
    SolvedTask.findAll({where:{
            UserId: req.params.id
        }})
        .then(taskArray => {
            res.status(200).json(taskArray);
        })
        .catch((err) => {
            console.log(">> Error while finding tasks: ", err);
        })
});


router.delete("/deleteAll", authCheck, (req, res) =>{
    Task.destroy({
        where: {
            userId: req.user[0].id
        }
    }).then(destroyedTasks => {
        res.status(200).json({message: "Tasks were deleted"})
    })
});

module.exports = router
