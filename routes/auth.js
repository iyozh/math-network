const express = require('express');
const router = express.Router();
require('../config/strategies')
const authController = require("../controllers/authController");

router.get('/google', authController.authViaGoogle);

router.get('/google/callback',authController.handleGoogleCallback);

router.get("/vkontakte", authController.authViaVkontakte)

router.get("/vkontakte/callback", authController.handleVKCallback);

router.get('/logout', authController.logout);


router.get("/login/success", authController.successLogin);


module.exports = router;