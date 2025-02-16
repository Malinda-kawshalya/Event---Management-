const express = require("express");
const { authenticateUser, authorizeAdmin } = require("../Controller/adminController");
const { signIn } = require("../Controller/authController");

const router = express.Router();

// 🔹 Admin sign-in using the same auth controller
router.post("/signin", signIn);

// 🔹 Admin dashboard (protected)
router.get("/admindashboard", authenticateUser, authorizeAdmin, (req, res) => {
  res.status(200).json({ message: "Welcome to the Admin Dashboard" });
});

module.exports = router;
