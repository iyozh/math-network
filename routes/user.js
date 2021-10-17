const express = require('express');
const userController = require("../controllers/userController");
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


router.get("/", authCheck, userController.getAuthenticatedUser);

router.get("/user", authCheck, userController.getCurrentUser);



module.exports = router;
