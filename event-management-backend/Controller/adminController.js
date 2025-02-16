const jwt = require("jsonwebtoken");
const adminModel = require("../Model/adminModel");

const authenticateUser = (req, res, next) => {
  const token = req.header("Authorization");
  if (!token) {
    return res.status(401).json({ message: "Access Denied. No token provided." });
  }

  try {
    const verified = jwt.verify(token.replace("Bearer ", ""), process.env.JWT_SECRET);
    req.user = verified;
    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid Token" });
  }
};

// 🔹 Admin-only access middleware
const authorizeAdmin = (req, res, next) => {
  if (!req.user || req.user.role !== "admin") {
    return res.status(403).json({ message: "Access restricted to admins only" });
  }
  next();
};

module.exports = { authenticateUser, authorizeAdmin };
