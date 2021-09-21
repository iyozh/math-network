const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const TwitterStrategy = require('passport-twitter').Strategy;
const VKontakteStrategy = require('passport-vkontakte').Strategy;
const User = require('../models/index')["User"];
const config = require('./mainConfig');

const HOSTNAME = config.app.host
const PORT = config.app.port

passport.serializeUser(function (user, done) {
    done(null, user);
});

passport.deserializeUser(function (user, done) {
    done(null, user);
});

passport.use(new GoogleStrategy({
        clientID: config.auth.googleClientID,
        clientSecret: config.auth.googleSecretKey,
        callbackURL: process.env.NODE_ENV === 'production' ? `https://${HOSTNAME}/auth/google/callback` :
            `http://${HOSTNAME}:${PORT}/auth/google/callback`
    },
    function (accessToken, refreshToken, profile, done) {
        User.findOrCreate({
            where: {
                social_user_id: profile.id.toString(),
                name: profile.displayName,
                registration_type: "google",
            },
        }).then( function (user) {
            done(null, user);
        })
            .catch(done)

    }
));


passport.use(new VKontakteStrategy({
        clientID: config.auth.vkontakteAppId,
        clientSecret: config.auth.vkontakteAppSecret,
        callbackURL: process.env.NODE_ENV === 'production' ? `https://${HOSTNAME}/auth/vkontakte/callback` :
            `http://${HOSTNAME}:${PORT}/auth/vkontakte/callback`,
        },

    function (accessToken, refreshToken, profile, done) {
        User.findOrCreate({
            where: {
                social_user_id: profile.id.toString(),
                name: profile.displayName,
                registration_type: "vk",
            },
        }).then( function (user) {
            done(null, user);
        })
            .catch(done)

    }
));

module.exports = passport