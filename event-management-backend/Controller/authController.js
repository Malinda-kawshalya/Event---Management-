const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../Model/userModel"); // User model
const Organizer = require("../Model/organizerModel"); // Organizer model

// SignIn Controller
const signIn = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if the email exists in the User model first
    let user = await User.findOne({ email });
    let role = "user"; // Default role

    // If the email doesn't exist in User, check in the Organizer model
    if (!user) {
      user = await Organizer.findOne({ email });
      role = "organizer"; // Set role as organizer if found in the Organizer collection
    }

    // If the email is not found in either model
    if (!user) {
      return res.status(400).json({ message: "User or Organizer not found" });
    }

    // Compare entered password with stored password (for both User and Organizer)
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Create JWT token
    const token = jwt.sign(
      { userId: user._id, role }, // Add role to the token payload
      process.env.JWT_SECRET, // Secret key for JWT, should be stored in .env
      { expiresIn: "1h" } // Token expiration time
    );

    // Send the response with token and user role
    res.status(200).json({ token, role });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { signIn };
