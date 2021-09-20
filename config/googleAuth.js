const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
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
        async function (accessToken, refreshToken, profile, done) {
            const [user, status] = await User.findOrCreate({
                where: {
                    social_user_id: profile.id,
                    name: profile.displayName,
                    registration_type: "google",
                },
            });
            done(null, user);
        }
));

module.exports = passport