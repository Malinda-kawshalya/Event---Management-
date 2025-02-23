import React, { useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "../css/RegOrganizer.css"; // Import the CSS file

const OrganizerRegister = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    companyName: "",
    companyAddress: "",
  });

  const [isButtonClicked, setIsButtonClicked] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate passwords
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    try {
      // Button click animation
      setIsButtonClicked(true);
      setTimeout(() => setIsButtonClicked(false), 300);

      // Send data to backend
      const response = await axios.post(
        "http://localhost:5000/api/organizers",
        formData
      );
      alert("Registration successful!");
      console.log("Response:", response.data);
      setFormData({
        name: "",
        email: "",
        phone: "",
        password: "",
        confirmPassword: "",
        companyName: "",
        companyAddress: "",
      });
    } catch (error) {
      console.error("Error:", error);
      alert("Failed to register. Please try again later.");
    }
  };

  return (
    <div className="org-container">
      <h2 className="text-center org-title">Register as Organizer</h2>
      <form onSubmit={handleSubmit} className="org-form">
        <div className="org-form-group">
          <label htmlFor="name" className="org-form-label">
            Full Name
          </label>
          <input
            type="text"
            className="org-form-control"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter your full name"
            required
          />
        </div>

        <div className="org-form-group">
          <label htmlFor="email" className="org-form-label">
            Email Address
          </label>
          <input
            type="email"
            className="org-form-control"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your email address"
            required
          />
        </div>

        <div className="org-form-group">
          <label htmlFor="phone" className="org-form-label">
            Phone Number
          </label>
          <input
            type="tel"
            className="org-form-control"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="Enter your phone number"
            required
          />
        </div>

        <div className="org-form-group">
          <label htmlFor="companyName" className="org-form-label">
            Company Name
          </label>
          <input
            type="text"
            className="org-form-control"
            id="companyName"
            name="companyName"
            value={formData.companyName}
            onChange={handleChange}
            placeholder="Enter your company name"
            required
          />
        </div>

        <div className="org-form-group">
          <label htmlFor="companyAddress" className="org-form-label">
            Company Address
          </label>
          <textarea
            className="org-form-control"
            id="companyAddress"
            name="companyAddress"
            value={formData.companyAddress}
            onChange={handleChange}
            placeholder="Enter your company address"
            rows="3"
            required
          ></textarea>
        </div>

        <div className="org-form-group">
          <label htmlFor="password" className="org-form-label">
            Password
          </label>
          <input
            type="password"
            className="org-form-control"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Enter your password"
            required
          />
        </div>

        <div className="org-form-group">
          <label htmlFor="confirmPassword" className="org-form-label">
            Confirm Password
          </label>
          <input
            type="password"
            className="org-form-control"
            id="confirmPassword"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            placeholder="Re-enter your password"
            required
          />
        </div>

        <button
          type="submit"
          className={`org-btn ${isButtonClicked ? "org-btn-clicked" : ""}`}
        >
          Register
        </button>
      </form>
    </div>
  );
};

export default OrganizerRegister;
