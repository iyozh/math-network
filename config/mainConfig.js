require('dotenv').config()

const env = process.env.NODE_ENV;

const development = {
    app: {
        port: 5000,
        host: 'localhost'
    },
    auth: {
        googleClientID: process.env.GOOGLE_CLIENT_ID,
        googleSecretKey: process.env.GOOGLE_SECRET_KEY,
        vkontakteAppId: process.env.VKONTAKTE_APP_ID,
        vkontakteAppSecret: process.env.VKONTAKTE_APP_SECRET

    },
    db: {
        databaseUrl: process.env.DATABASE_URL,
    }
};

const production = {
    app: {
        port: process.env.PORT,
        host: "math-network.herokuapp.com"
    },
    auth: {
        googleClientID: process.env.GOOGLE_CLIENT_ID,
        googleSecretKey: process.env.GOOGLE_SECRET_KEY,
        vkontakteAppId: process.env.VKONTAKTE_APP_ID,
        vkontakteAppSecret: process.env.VKONTAKTE_APP_SECRET
    },
    db: {
        databaseUrl: process.env.DATABASE_URL,
    }
};

const config = {
    development,
    production
};

module.exports = config[env];