const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { user: req.user ? req.user[0] : "Anonymous"});
});

module.exports = router;
