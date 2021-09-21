const express = require('express');
const router = express.Router();
const passport = require('passport');
require('../config/strategies')

router.get('/google',
    passport.authenticate('google', {scope: ['profile', 'email']}));

router.get('/google/callback',
    passport.authenticate('google', {failureRedirect: '/login'}),
    function (req, res) {
        res.redirect('/');
    });

router.get('/twitter', passport.authenticate('twitter'));

router.get('/twitter/callback',
    passport.authenticate('twitter', {
        successRedirect: '/',
        failureRedirect: '/login' }));

router.get("/vkontakte",
    passport.authenticate("vkontakte", {scope: ['profile', 'email']}));

router.get(
    "/vkontakte/callback",
    passport.authenticate("vkontakte", {
        successRedirect: "/",
        failureRedirect: "/login",
    })
);

module.exports = router;