const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../Model/userModel");
const Organizer = require("../Model/organizerModel");

const signIn = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required." });
  }

  try {
    const normalizedEmail = email.trim().toLowerCase();

    // Check if the user exists in either User or Organizer model
    let user = await User.findOne({ email: normalizedEmail });
    let role = "user";

    if (!user) {
      user = await Organizer.findOne({ email: normalizedEmail });
      role = "organizer";
    }

    if (!user) {
      return res.status(400).json({ message: "User or Organizer not found." });
    }

    // Verify password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials." });
    }

    // Generate JWT
    const token = jwt.sign(
      { userId: user._id, role, email: user.email, name: user.name },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    // Send token and user details to the client
    return res.status(200).json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role,
      },
    });
  } catch (error) {
    console.error("SignIn Error:", error);
    return res.status(500).json({ message: "Server error." });
  }
};

module.exports = { signIn };
