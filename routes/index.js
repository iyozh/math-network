const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { username: req.user ? req.user[0].name : "Anonymous"});
});

module.exports = router;
