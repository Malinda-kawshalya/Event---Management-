const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../Model/userModel");
const Organizer = require("../Model/organizerModel");

const signIn = async (req, res) => {
  // Log the request body for debugging
  console.log(req.body);
  console.log("JWT_SECRET:", process.env.JWT_SECRET);


  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required." });
  }

  try {
    // Normalize email
    const normalizedEmail = email.trim().toLowerCase();

    // Find user in both collections
    let user = await User.findOne({ email: normalizedEmail });
    let role = "user";

    if (!user) {
      user = await Organizer.findOne({ email: normalizedEmail });
      role = "organizer";
    }

    if (!user) {
      return res.status(400).json({ message: "User or Organizer not found." });
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials." });
    }

    // Generate JWT
    const token = jwt.sign(
      { userId: user._id, role },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.status(200).json({ token, role });
  } catch (error) {
    console.error("SignIn Error:", error);
    res.status(500).json({ message: "Server error." });
  }
};

module.exports = { signIn };
