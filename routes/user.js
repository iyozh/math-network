const express = require('express');
const userController = require("../controllers/userController");
const {authCheck} = require("../controllers/authController");
const router = express.Router();


router.get("/", authCheck, userController.getAuthenticatedUser);

router.get("/user", authCheck, userController.getCurrentUser);



module.exports = router;
