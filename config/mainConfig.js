require('dotenv').config()

const env = process.env.NODE_ENV;

const development = {
    app: {
        port: 3000,
        host: 'localhost'
    },
    auth: {
        googleClientID: process.env.GOOGLE_CLIENT_ID,
        googleSecretKey: process.env.GOOGLE_SECRET_KEY
    },
    db: {
        databaseUrl: process.env.DATABASE_URL,
    }
};

const production = {
    app: {
        port: process.env.PORT,
        host: "authwebapplication.herokuapp.com"
    },
    auth: {
        googleClientID: process.env.GOOGLE_CLIENT_ID,
        googleSecretKey: process.env.GOOGLE_SECRET_KEY
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