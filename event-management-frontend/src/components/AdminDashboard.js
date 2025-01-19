import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../css/AdminDashboard.css';

const AdminDashboard = () => {
    const [users, setUsers] = useState([]); // Initialize as an array
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        age: '',
        gender: ''
    });
    const [editUserId, setEditUserId] = useState(null);
    const [error, setError] = useState(null); // To handle and display errors
    const [loading, setLoading] = useState(true); // To manage loading state

    // Fetch users from the database
    const fetchUsers = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await axios.get('http://localhost:5000/api/users'); // Update with your backend API URL
            console.log('Fetched users:', response.data); // Debugging log
            if (Array.isArray(response.data)) {
                setUsers(response.data);
            } else {
                setUsers([]);
                console.error('Invalid data format from API:', response.data);
            }
        } catch (error) {
            setError('Failed to fetch users.');
            console.error('Error fetching users:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    // Handle form input changes
    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // Handle form submission for add or edit user
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (editUserId) {
                // Update user
                await axios.put(`http://localhost:5000/api/users/${editUserId}`, formData);
            } else {
                // Add new user
                await axios.post('http://localhost:5000/api/users', formData);
            }
            setFormData({ name: '', email: '', password: '', confirmPassword: '', age: '', gender: '' });
            setEditUserId(null);
            fetchUsers(); // Refresh user list
        } catch (error) {
            setError('Error saving user.');
            console.error('Error saving user:', error);
        }
    };

    // Handle edit action
    const handleEdit = (user) => {
        setFormData({
            name: user.name,
            email: user.email,
            password: '',
            confirmPassword: '',
            age: user.age,
            gender: user.gender
        });
        setEditUserId(user._id);
    };

    // Handle delete action
    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:5000/api/users/${id}`);
            fetchUsers(); // Refresh user list
        } catch (error) {
            setError('Error deleting user.');
            console.error('Error deleting user:', error);
        }
    };

    return (
        <div className="admin-dashboard">
            <h1>Admin Dashboard</h1>

            {/* Display error messages */}
            {error && <p className="error-message">{error}</p>}

            {/* User Form */}
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="name"
                    placeholder="Name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                />
                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                />
                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleInputChange}
                    required={!editUserId} // Only required when adding a new user
                />
                <input
                    type="password"
                    name="confirmPassword"
                    placeholder="Confirm Password"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    required={!editUserId} // Only required when adding a new user
                />
                <input
                    type="number"
                    name="age"
                    placeholder="Age"
                    value={formData.age}
                    onChange={handleInputChange}
                    required
                />
                <select
                    name="gender"
                    value={formData.gender}
                    onChange={handleInputChange}
                    required
                >
                    <option value="">Select Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                </select>
                <button type="submit">{editUserId ? 'Update User' : 'Add User'}</button>
            </form>

            {/* User Table */}
            {loading ? (
                <p>Loading users...</p>
            ) : (
                <table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Age</th>
                            <th>Gender</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.length > 0 ? (
                            users.map((user) => (
                                <tr key={user._id}>
                                    <td>{user.name}</td>
                                    <td>{user.email}</td>
                                    <td>{user.age}</td>
                                    <td>{user.gender}</td>
                                    <td>
                                        <button onClick={() => handleEdit(user)}>Edit</button>
                                        <button onClick={() => handleDelete(user._id)}>Delete</button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="5">No users found.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default AdminDashboard;