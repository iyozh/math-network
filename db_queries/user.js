const User = require('../models/index')["User"];

exports.getUserInfo = (userID) => {
    return User.findByPk(userID, { include: ["Tasks"] })
        .then((user) => {
            console.log("")
            return user
        })
        .catch((err) => {
            console.log(">> Error while finding user: ", err);
        });
};