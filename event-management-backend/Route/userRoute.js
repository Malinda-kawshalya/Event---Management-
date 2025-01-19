const express = require("express");
const router = express.Router();

// Insert the controller
const userControl = require("../Controller/userController");


router.get("/", userControl.getAllUsers);
router.post("/", userControl.addUsers);
router.get("/:id", userControl.getById);
router.put("/:id", userControl.updateUser);
router.delete("/:id", userControl.deleteUser);
module.exports = router;

