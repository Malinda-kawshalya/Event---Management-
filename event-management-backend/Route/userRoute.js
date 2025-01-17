const express = require("express");
const router = express.Router();

// Insert the controller
const userControl = require("../Controller/userController");


router.get("/", userControl.getAllUsers);
router.post("/", userControl.addUsers);

module.exports = router;

