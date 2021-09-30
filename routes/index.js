const express = require('express');
const {getUserInfo} = require("../db_queries/user");
const User = require('../models/index')["User"];
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
  User.findByPk(req.user[0].id, { include: ["Tasks"] })
      .then((user) => {
        res.status(200).json(user);
      })
      .catch((err) => {
        console.log(">> Error while finding user: ", err);
      })
});

router.get('/express_backend', (req, res) => { //Line 9
  res.send({ express: 'YOUR EXPRESS BACKEND IS CONNECTED TO REACT' }); //Line 10
}); //Line 11



module.exports = router;
