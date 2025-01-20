import React from "react";

import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/SignIn.css'; // Import the additional CSS file





const SignIn = () => {
  return (
    <div className="signin-container d-flex justify-content-center align-items-center vh-100">
      <div className="card signin-card shadow-lg">
        <h1 className="card-title text-center mb-4">Welcome Back</h1>
        <form>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email Address</label>
            <input type="email" className="form-control" id="email" placeholder="Enter your email" required />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">Password</label>
            <input type="password" className="form-control" id="password" placeholder="Enter your password" required />
          </div>
          <div className="d-flex justify-content-between align-items-center mb-3">
            <div className="form-check">
              <input type="checkbox" className="form-check-input" id="rememberMe" />
              <label className="form-check-label" htmlFor="rememberMe">Remember Me</label>
            </div>
            <a href="/forgot-password" className="text-primary small">Forgot Password?</a>
          </div>
          <button type="submit" className="btn btn-primary w-100 rounded-pill">Sign In</button>
          <p className="text-center mt-3">
            New here? <a href="/signup" className="text-primary">Create an account</a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default SignIn;
