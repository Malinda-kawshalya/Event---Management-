import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/Navbar.css';
import { UserContext } from './contexts/UserContext';

const Navbar = () => {
  const { user, logout } = useContext(UserContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    try {
      logout();
      navigate('/');
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light sticky-top">
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
              <Link className="nav-link" to="/allevents">
                All Events
              </Link>
            </li>

            {!user ? (
              <>
                <li className="nav-item">
                  <Link className="btn btn-outline-primary me-2 nav-special-btn" to="/signin">
                    Sign In
                  </Link>
                </li>
                <li className="nav-item dropdown">
                  <button
                    className="btn btn-primary dropdown-toggle nav-special-btn"
                    type="button"
                    id="registerDropdown"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    Register
                  </button>
                  <ul className="dropdown-menu" aria-labelledby="registerDropdown">
                    <li>
                      <Link className="dropdown-item" to="/signup">
                        Register as User
                      </Link>
                    </li>
                    <li>
                      <Link className="dropdown-item" to="/orgregister">
                        Register as Organizer
                      </Link>
                    </li>
                  </ul>
                </li>
              </>
            ) : (
              <li className="nav-item dropdown">
                <button
                  className="btn btn-outline-primary dropdown-toggle nav-special-btn"
                  type="button"
                  id="userDropdown"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  {user.name || user.username || "Account"}
                </button>
                <ul className="dropdown-menu" aria-labelledby="userDropdown">
                  <li>
                    {user.role === 'organizer' ? (
                      <Link className="dropdown-item" to="/orgdashboard">
                        Organizer Dashboard
                      </Link>
                    ) : (
                      <Link className="dropdown-item" to="/useraccount">
                        My Profile
                      </Link>
                    )}
                  </li>
                  <li>
                    <button className="dropdown-item" onClick={handleLogout}>
                      Logout
                    </button>
                  </li>
                </ul>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;