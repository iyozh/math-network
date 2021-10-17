const passport = require('passport');


exports.authViaGoogle =  passport.authenticate('google', {scope: ['profile', 'email']})

exports.authViaVkontakte =  passport.authenticate("vkontakte", {scope: ['profile', 'email']})

exports.handleGoogleCallback =  passport.authenticate('google', {
    successRedirect: "/",
    failureRedirect: "/",
});

exports.handleVKCallback = passport.authenticate("vkontakte", {
    successRedirect: "/",
    failureRedirect: "/",
})

exports.logout = function(req, res){
    req.logout();
    res.redirect("/");
}

exports.successLogin = function(req, res) {
    if (req.user) {
        res.json({
            success: true,
            message: "user has successfully authenticated",
            user: req.user,
            cookies: req.cookies
        });
    }
}