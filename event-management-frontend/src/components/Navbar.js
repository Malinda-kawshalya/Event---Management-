import React from 'react';
import '../css/Navbar.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="logo">MyTickets</div>
      <ul className="nav-links">
        <li><a href="/">Events</a></li>
        <li><a href="/">Sports</a></li>
        <li><a href="/">Deals</a></li>
      </ul>
      <div className="auth">
        <button className="register-btn">Register</button>
        <button className="signin-btn">Sign In</button>
      </div>
    </nav>
  );
};

export default Navbar;
