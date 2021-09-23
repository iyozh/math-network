const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/', isLoggedIn, function(req, res, next) {
    res.render('profile', { user: req.user ? req.user[0] : "Anonymous"});
});


function isLoggedIn(req, res, next) {
    req.user ? next() : res.sendStatus(401);
}



module.exports = router;
