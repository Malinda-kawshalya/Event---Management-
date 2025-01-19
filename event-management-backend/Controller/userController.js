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
    const { name, email, password, confirmPassword, age, gender } = req.body;

    let user;
    try {
        user = new User({ name, email, password, confirmPassword, age, gender });
        await user.save();
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Server error", error: err.message });
    }

    if (!user) {
        return res.status(404).json({ message: "Unable to add the user" });
    }
    return res.status(200).json({ user });
};

// Get by id
const getById = async (req, res, next) => {
    const { id } = req.params;
    let user;
    try {
        user = await User.findById(id);
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Server error", error: err.message });
    }

    if (!user) {
        return res.status(404).json({ message: "User not found" });
    }
    return res.status(200).json({ user });
}

// Update user
const updateUser = async (req, res, next) => {
    const { id } = req.params;
    const { name, email, password, confirmPassword, age, gender } = req.body;

    let user;
    try {
        user = await User.findByIdAndUpdate(id, { name, email, password, confirmPassword, age, gender }, { new: true });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Server error", error: err.message });
    }

    if (!user) {
        return res.status(404).json({ message: "Unable to update the user" });
    }
    return res.status(200).json({ user });
};

// Delete user
const deleteUser = async (req, res, next) => {
    const { id } = req.params;
    let user;
    
    try { 
        user = await User.findByIdAndDelete(id);
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Server error", error: err.message });
    }

    if (!user) {
        return res.status(404).json({ message: "Unable to delete the user" });
    }
    return res.status(200).json({ user });
};

module.exports.getAllUsers = getAllUsers;
module.exports.addUsers = addUsers;
module.exports.getById = getById;
module.exports.updateUser = updateUser;
module.exports.deleteUser = deleteUser;