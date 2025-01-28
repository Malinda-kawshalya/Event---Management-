import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "../css/SignIn.css";

const SignIn = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (error) setError("");
  };

  const storeToken = (token) => {
    localStorage.setItem("jwt", token);
    localStorage.setItem("tokenTimestamp", Date.now().toString());
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || "http://localhost:5000";
      const response = await axios.post(`${API_BASE_URL}/api/signin`, formData);

      if (response.status === 200) {
        const { token, user } = response.data;

        // Store token and user data
        storeToken(token);
        localStorage.setItem("user", JSON.stringify(user));

        setFormData({ email: "", password: "" });

        // Redirect based on role
        if (user.role === "organizer") {
          navigate("/orgdashboard");
        } else {
          navigate("/");
        }
      }
    } catch (err) {
      if (!err.response) {
        setError("Network error. Please try again later.");
      } else {
        setError(err.response?.data?.message || "Invalid credentials. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="signin-container d-flex justify-content-center align-items-center vh-100">
      <div className="card signin-card shadow-lg">
        <h1 className="card-title text-center mb-4">Welcome Back</h1>
        {error && (
          <div className="alert alert-danger" role="alert" aria-live="polite">
            {error}
          </div>
        )}
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email Address</label>
            <input
              type="email"
              className="form-control"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">Password</label>
            <input
              type="password"
              className="form-control"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              required
            />
          </div>
          <button
            type="submit"
            className="btn btn-primary w-100 rounded-pill"
            disabled={loading}
          >
            {loading ? <span className="spinner-border spinner-border-sm" role="status" /> : "Sign In"}
          </button>
          <p className="text-center mt-3">
            New here? <a href="/signup" className="text-primary">Create an account</a>
          </p>
          <p className="text-center mt-2">
            <a href="/forgot-password" className="text-secondary">Forgot Password?</a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default SignIn;