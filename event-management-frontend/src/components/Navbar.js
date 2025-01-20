import React from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/Navbar.css';

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container">
        <Link className="navbar-brand" to="/">
          Event Guru
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/about">
                About
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/contact">
                Contact
              </Link>
            </li>
            <li className="nav-item">
              <Link className="btn btn-outline-primary me-2 nav-special-btn" to="/signin">
                Sign In
              </Link>
            </li>
            {/* Dropdown Menu for Register */}
            <li className="nav-item dropdown">
              <button
                className="btn btn-primary dropdown-toggle nav-special-btn"
                id="registerDropdown"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Register
              </button>
              <ul className="dropdown-menu" aria-labelledby="registerDropdown">
                <li>
                  <Link className="dropdown-item" to="/signup">
                    Register as Attendee
                  </Link>
                </li>
                <li>
                  <Link className="dropdown-item" to="/signup">
                    Register as Organizer
                  </Link>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
