const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../Model/userModel");
const Organizer = require("../Model/organizerModel");

const signIn = async (req, res) => {
  const { email, password } = req.body;

  // Input validation
  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required." });
  }

  try {
    const normalizedEmail = email.trim().toLowerCase();

    // Check User collection
    let user = await User.findOne({ email: normalizedEmail });
    let isOrganizer = false;

    // If not found in User, check Organizer collection
    if (!user) {
      user = await Organizer.findOne({ email: normalizedEmail });
      isOrganizer = true;
    }

    // If user not found in either collection
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials." });
    }

    // Verify password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials." });
    }

    // Create token payload
    const tokenPayload = {
      userId: user._id,
      email: user.email,
      name: user.name,
      role: isOrganizer ? 'organizer' : 'user',
      modelType: isOrganizer ? 'Organizer' : 'User'
    };

    // Generate JWT
    const tokenExpiry = process.env.JWT_EXPIRY || "24h"; // Configurable expiry
    const token = jwt.sign(
      tokenPayload,
      process.env.JWT_SECRET,
      { expiresIn: tokenExpiry }
    );

    // Prepare user data for response
    const userData = {
      _id: user._id,
      name: user.name,
      email: user.email,
      role: isOrganizer ? 'organizer' : 'user',
      ...(isOrganizer && { companyName: user.companyName })
    };

    // Send response
    return res.status(200).json({
      success: true,
      token,
      user: userData,
      message: "Login successful"
    });

  } catch (error) {
    console.error("SignIn Error:", error);
    return res.status(500).json({
      success: false,
      message: "An error occurred during sign in.",
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

module.exports = { signIn };