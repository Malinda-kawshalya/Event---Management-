const User = require("../Model/userModel");

// User display
const getAllUsers = async (req, res, next) => {
    let users;

    try {
        users = await User.find();
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Server error" });
    }

    if (!users || users.length === 0) {
        return res.status(404).json({ message: "No users found" });
    }

    return res.status(200).json({ users });
};

// Data insert
const addUsers = async (req, res, next) => {
    const { gmail, password, name, age, gender } = req.body;

    let users;
    try {
        users = new User({ gmail, password, name, age, gender }); // Use `User`, not `user`
        await users.save();
    } catch (err) { // Pass `err` as the catch parameter
        console.error(err); // Log the error for debugging
        return res.status(500).json({ message: "Server error", error: err.message });
    }

    // If user is not inserted
    if (!users) {
        return res.status(404).json({ message: "Unable to add the user" });
    }
    return res.status(200).json({ users });
};

module.exports.getAllUsers = getAllUsers;
module.exports.addUsers = addUsers;
