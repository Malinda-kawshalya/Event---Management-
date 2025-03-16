import React, { useContext, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "../css/Navbar.css";
import { UserContext } from "./contexts/UserContext";
import logo from "../images/logo.png";

const Navbar = () => {
  const { user, logout } = useContext(UserContext);
  const navigate = useNavigate();
  const [navbarOpen, setNavbarOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Handle logout
  const handleLogout = () => {
    try {
      logout();
      navigate("/");
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  // Handle scrolling effect
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <nav
      className={`navbar navbar-expand-lg ${
        scrolled ? "scrolled" : ""
      } navbar-light sticky-top`}
    >
      <div className="container">
        <Link className="navbar-brand" to="/">
          <img src={logo} alt="EventGuru" className="navbar-logo"/>
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          onClick={() => setNavbarOpen(!navbarOpen)}
          aria-controls="navbarNav"
          aria-expanded={navbarOpen}
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div
          className={`collapse navbar-collapse ${navbarOpen ? "show" : ""}`}
          id="navbarNav"
        >
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link
                className="nav-link"
                to="/"
                onClick={() => setNavbarOpen(false)}
              >
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className="nav-link"
                to="/about"
                onClick={() => setNavbarOpen(false)}
              >
                About
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className="nav-link"
                to="/contact"
                onClick={() => setNavbarOpen(false)}
              >
                Contact
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className="nav-link"
                to="/allevents"
                onClick={() => setNavbarOpen(false)}
              >
                All Events
              </Link>
            </li>

            {!user ? (
              <>
                <li className="nav-item">
                  <Link
                    className="btn btn-outline-primary me-2 nav-special-btn"
                    to="/signin"
                    onClick={() => setNavbarOpen(false)}
                  >
                    Sign In
                  </Link>
                </li>
                <li className="nav-item dropdown" onMouseEnter={() => setNavbarOpen(true)} onMouseLeave={() => setNavbarOpen(false)}>
                  <button
                    className="btn btn-primary dropdown-toggle nav-special-btn"
                    type="button"
                    id="registerDropdown"
                    aria-expanded={navbarOpen}
                  >
                    Register
                  </button>
                  <ul
                    className={`dropdown-menu ${navbarOpen ? "show" : ""}`}
                    aria-labelledby="registerDropdown"
                  >
                    <li>
                      <Link
                        className="dropdown-item"
                        to="/signup"
                        onClick={() => setNavbarOpen(false)}
                      >
                        Register as User
                      </Link>
                    </li>
                    <li>
                      <Link
                        className="dropdown-item"
                        to="/orgregister"
                        onClick={() => setNavbarOpen(false)}
                      >
                        Register as Organizer
                      </Link>
                    </li>
                  </ul>
                </li>
              </>
            ) : (
              <li className="nav-item dropdown" onMouseEnter={() => setNavbarOpen(true)} onMouseLeave={() => setNavbarOpen(false)}>
                <button
                  className="btn btn-outline-primary dropdown-toggle nav-special-btn"
                  type="button"
                  id="userDropdown"
                  aria-expanded={navbarOpen}
                >
                  {user.name || user.username || "Account"}
                </button>
                <ul className={`dropdown-menu ${navbarOpen ? "show" : ""}`} aria-labelledby="userDropdown">
                  <li>
                    {user.role === "organizer" ? (
                      <Link
                        className="dropdown-item"
                        to={`/orgdashboard/${user._id}`}
                        onClick={() => setNavbarOpen(false)}
                      >
                        Organizer Dashboard
                      </Link>
                    ) : (
                      <Link
                        className="dropdown-item"
                        to={`/useraccount/${user._id}`} // Navigates to user profile
                        onClick={() => setNavbarOpen(false)}
                      >
                        My Profile
                      </Link>
                    )}
                  </li>
                  <li>
                    <button
                      className="dropdown-item"
                      onClick={() => {
                        handleLogout();
                        setNavbarOpen(false);
                      }}
                    >
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
