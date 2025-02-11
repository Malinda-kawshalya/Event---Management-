import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/Footer.css';

const Footer = () => {
  return (
    <footer className="footer-section">
      <div className="container py-5">
        <div className="row">
          {/* About Section */}
          <div className="col-lg-4 col-md-6 mb-4">
            <h5 className="footer-title">About Us</h5>
            <p className="footer-text">
              MyTickets is your go-to platform for booking tickets to concerts, shows, sports, and more. 
              Experience hassle-free ticketing with us.
            </p>
          </div>

          {/* Quick Links */}
          <div className="col-lg-4 col-md-6 mb-4">
            <h5 className="footer-title">Helpful Links</h5>
            <ul className="list-unstyled">
              <li><a href="/" className="footer-link">Home</a></li>
              <li><a href="/about" className="footer-link">About Us</a></li>
              <li><a href="/contact" className="footer-link">Contact Us</a></li>
              <li><a href="/faq" className="footer-link">FAQ</a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="col-lg-4 col-md-12 mb-4">
            <h5 className="footer-title">Contact Us</h5>
            <p className="footer-text">
              <strong>Email:</strong> support@mytickets.com <br />
              <strong>Phone:</strong> +1 234 567 890 <br />
              <strong>Address:</strong> 123 Main Street, New York, NY 10001
            </p>
          </div>
        </div>

        {/* Social Media & Legal Info */}
        <div className="footer-bottom d-flex justify-content-between align-items-center">
          {/* Social Icons */}
          <div className="social-icons">
            <a href="https://www.facebook.com" className="social-link"><i className="fab fa-facebook-f"></i></a>
            <a href="https://www.twitter.com" className="social-link"><i className="fab fa-twitter"></i></a>
            <a href="https://www.instagram.com" className="social-link"><i className="fab fa-instagram"></i></a>
            <a href="https://www.linkedin.com" className="social-link"><i className="fab fa-linkedin"></i></a>
          </div>

          {/* Legal Info */}
          <div className="legal-text">
            <p className="mb-0">Privacy Policy | Cookie Policy | Terms and Conditions</p>
          </div>

          {/* Copyright */}
          <div className="copyright-text">
            <p className="mb-0">Copyright © 2025 MyTickets. All Rights Reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
