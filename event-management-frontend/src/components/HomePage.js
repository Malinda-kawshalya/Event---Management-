// React Component: HomePage.jsx
import React from 'react';
import './HomePage.css';

const HomePage = () => {
  return (
    <div className="homepage">
      <header className="header">
        <div className="container">
          <h1 className="brand">Eventify</h1>
          <nav className="navbar">
            <ul className="nav-links">
              <li><a href="#features">Features</a></li>
              <li><a href="#events">Upcoming Events</a></li>
              <li><a href="#contact">Contact Us</a></li>
              <li><a href="/login" className="btn-primary">Login</a></li>
            </ul>
          </nav>
        </div>
      </header>

      <section className="hero">
        <div className="container">
          <h2>Discover Amazing Events Near You</h2>
          <p>Plan, host, and enjoy events with ease.</p>
          <a href="/events" className="btn-secondary">Explore Events</a>
        </div>
      </section>

      <section id="features" className="features">
        <div className="container">
          <h3>Why Choose Eventify?</h3>
          <div className="feature-list">
            <div className="feature-item">
              <h4>Easy Event Management</h4>
              <p>Organize events effortlessly with our intuitive platform.</p>
            </div>
            <div className="feature-item">
              <h4>Wide Range of Events</h4>
              <p>Find events that match your interests and preferences.</p>
            </div>
            <div className="feature-item">
              <h4>Real-Time Updates</h4>
              <p>Stay informed about event changes and updates instantly.</p>
            </div>
          </div>
        </div>
      </section>

      <section id="events" className="events">
        <div className="container">
          <h3>Upcoming Events</h3>
          <div className="event-cards">
            <div className="event-card">
              <h4>Music Festival</h4>
              <p>Join us for a night of live music and fun!</p>
            </div>
            <div className="event-card">
              <h4>Tech Conference</h4>
              <p>Explore the latest in technology and innovation.</p>
            </div>
            <div className="event-card">
              <h4>Art Exhibition</h4>
              <p>Discover stunning art from local and global artists.</p>
            </div>
          </div>
        </div>
      </section>

      <footer id="contact" className="footer">
        <div className="container">
          <p>&copy; 2025 Eventify. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
