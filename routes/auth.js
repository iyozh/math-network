const express = require('express');
const router = express.Router();
const passport = require('passport');
const config = require('../config/mainConfig');
require('../config/strategies')

router.get('/google',
    passport.authenticate('google', {scope: ['profile', 'email']}));

router.get('/google/callback',
    passport.authenticate('google', {failureRedirect: '/login'}),
    function (req, res) {
        res.redirect(config.app.host);
    });

router.get("/vkontakte",
    passport.authenticate("vkontakte", {scope: ['profile', 'email']}));

router.get(
    "/vkontakte/callback",
    passport.authenticate("vkontakte", {
        successRedirect: "/",
        failureRedirect: "/login",
    })
);

router.get('/logout', (req, res) =>{
    req.logout();
    res.redirect(config.app.host);
});


router.get("/login/success", (req, res) => {
    if (req.user) {
        res.json({
            success: true,
            message: "user has successfully authenticated",
            user: req.user,
            cookies: req.cookies
        });
    }
});


module.exports = router;