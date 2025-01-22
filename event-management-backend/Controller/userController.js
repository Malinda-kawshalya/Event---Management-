// filepath: /C:/Users/PATHAYAA/Desktop/Event Managment/Event---Management-/event-management-backend/controllers/userController.js

const User = require('../Model/userModel');
const Contact = require('../Model/contactModel');


// User display
const getAllUsers = async (req, res, next) => {
    try {
        const users = await User.find().select('-password');
        if (!users || users.length === 0) {
            return res.status(404).json({ message: "No users found" });
        }
        return res.status(200).json({ users });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Server error" });
    }
};

// Data insert
const addUsers = async (req, res, next) => {
    const { name, email, password, confirmPassword, age, gender } = req.body;

    if (password !== confirmPassword) {
        return res.status(400).json({ message: 'Passwords do not match' });
    }

    try {
        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        const user = new User({
            name,
            email,
            password: hashedPassword,
            age,
            gender,
        });

        await user.save();
        res.status(201).json({ message: 'User created successfully', user });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error', error: err.message });
    }
};

// Get by id
const getById = async (req, res, next) => {
    const { id } = req.params;
    try {
        const user = await User.findById(id).select('-password');
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        return res.status(200).json({ user });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Server error", error: err.message });
    }
}

// Update user
const updateUser = async (req, res, next) => {
    const { id } = req.params;
    const { name, email, password, confirmPassword, age, gender } = req.body;

    if (password !== confirmPassword) {
        return res.status(400).json({ message: 'Passwords do not match' });
    }

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.findByIdAndUpdate(id, { name, email, password: hashedPassword, age, gender }, { new: true }).select('-password');
        if (!user) {
            return res.status(404).json({ message: "Unable to update the user" });
        }
        return res.status(200).json({ user });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Server error", error: err.message });
    }
};

// Delete user
const deleteUser = async (req, res, next) => {
    const { id } = req.params;
    try {
        const user = await User.findByIdAndDelete(id).select('-password');
        if (!user) {
            return res.status(404).json({ message: "Unable to delete the user" });
        }
        return res.status(200).json({ user });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Server error", error: err.message });
    }
};

module.exports.getAllUsers = getAllUsers;
module.exports.addUsers = addUsers;
module.exports.getById = getById;
module.exports.updateUser = updateUser;
module.exports.deleteUser = deleteUser;