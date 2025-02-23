import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/SignUp.css';
import axios from 'axios';

const SignUp = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        age: '',
        gender: '',
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/api/users', formData);
            console.log('User registered:', response.data);
        } catch (error) {
            console.error('Error registering user:', error);
        }
    };

    return (
        <div className="signup-page">
            <div className="signup-container">
                <h2 className="signup-title">Create Your Account</h2>
                <form onSubmit={handleSubmit}>
                    <div className="row g-3">
                        <div className="col-md-6">
                            <label htmlFor="name" className="signup-label">Full Name</label>
                            <input
                                type="text"
                                name="name"
                                className="signup-input form-control"
                                placeholder="Enter your full name"
                                value={formData.name}
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                        <div className="col-md-6">
                            <label htmlFor="email" className="signup-label">Email</label>
                            <input
                                type="email"
                                name="email"
                                className="signup-input form-control"
                                placeholder="Enter your email"
                                value={formData.email}
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                        <div className="col-md-6">
                            <label htmlFor="password" className="signup-label">Password</label>
                            <input
                                type="password"
                                name="password"
                                className="signup-input form-control"
                                placeholder="Enter your password"
                                value={formData.password}
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                        <div className="col-md-6">
                            <label htmlFor="confirmPassword" className="signup-label">Confirm Password</label>
                            <input
                                type="password"
                                name="confirmPassword"
                                className="signup-input form-control"
                                placeholder="Re-enter your password"
                                value={formData.confirmPassword}
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                        <div className="col-md-6">
                            <label htmlFor="age" className="signup-label">Age</label>
                            <input
                                type="number"
                                name="age"
                                className="signup-input form-control"
                                placeholder="Enter your age"
                                value={formData.age}
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                        <div className="col-md-6">
                            <label htmlFor="gender" className="signup-label">Gender</label>
                            <select
                                name="gender"
                                className="signup-select form-select"
                                value={formData.gender}
                                onChange={handleInputChange}
                                required
                            >
                                <option value="" disabled>Select Gender</option>
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                                <option value="other">Other</option>
                            </select>
                        </div>
                    </div>
                    <button type="submit" className="signup-btn mt-4">Sign Up</button>
                </form>
                <p className="signup-text mt-3">
                    Already have an account? <a href="/signin">Sign In</a>
                </p>
            </div>
        </div>
    );
};

export default SignUp;
