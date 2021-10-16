const express = require('express');
const User = require('../models/index')["User"];
const Task = require('../models/index')["Task"];
const SolvedTask = require('../models/index')["SolvedTask"];
const TasksRating = require('../models/index')["TasksRating"];
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


/* GET home page. */
router.get("/", authCheck, (req, res) => {
  res.status(200).json({
    authenticated: true,
    message: "user successfully authenticated",
    user: req.user,
    cookies: req.cookies
  });
});

router.get("/user", authCheck, (req, res) =>{
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
});



module.exports = router;
