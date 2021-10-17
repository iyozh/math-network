const express = require('express');
const router = express.Router();
const upload = require('../config/multerConfig')
const taskController = require("../controllers/taskController");

const authCheck = (req, res, next) => {
    if (!req.user) {
        res.status(401).json({
            authenticated: false,
            message: "user has not been authenticated"
        });
    } else {
        next();
    }
};

router.get("/", taskController.getAllTasks);

router.get("/:id", taskController.getTask);

router.post("/create", authCheck,upload.single('uploaded_file'), taskController.createTask);

router.post("/update/:id", authCheck,  taskController.updateTask);

router.post("/setupRating", authCheck, taskController.setupRating);

router.post("/solve", authCheck, taskController.solveTask);

router.get("/solved/:id", taskController.getTaskSolutions);

router.delete("/deleteAll", authCheck, taskController.deleteAllTasks);

router.delete("/deleteSelectedTasks", authCheck, taskController.deleteSelectedTasks);

router.post("/deleteTask", authCheck, taskController.deleteTask);


module.exports = router
