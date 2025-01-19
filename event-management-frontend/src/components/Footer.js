import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const Footer = () => {
  return (
    <footer className="bg-dark text-white text-center text-lg-start mt-5">
      <div className="container p-4">
        <div className="row">
          {/* About Section */}
          <div className="col-lg-4 col-md-6 mb-4 mb-md-0">
            <h5 className="text-uppercase">About Us</h5>
            <p>
              MyTickets is your go-to platform for booking tickets to concerts, shows, sports, and more. Experience hassle-free ticketing with us.
            </p>
          </div>

          {/* Quick Links */}
          <div className="col-lg-4 col-md-6 mb-4 mb-md-0">
            <h5 className="text-uppercase">Quick Links</h5>
            <ul className="list-unstyled mb-0">
              <li>
                <a href="/" className="text-white">Home</a>
              </li>
              <li>
                <a href="/about" className="text-white">About Us</a>
              </li>
              <li>
                <a href="/contact" className="text-white">Contact Us</a>
              </li>
              <li>
                <a href="/faq" className="text-white">FAQ</a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="col-lg-4 col-md-12 mb-4 mb-md-0">
            <h5 className="text-uppercase">Contact Us</h5>
            <p>
              <strong>Email:</strong> support@mytickets.com <br />
              <strong>Phone:</strong> +1 234 567 890 <br />
              <strong>Address:</strong> 123 Main Street, New York, NY 10001
            </p>
          </div>
        </div>
      </div>

      <div className="text-center p-3" style={{ backgroundColor: "rgba(0, 0, 0, 0.2)" }}>
        <a href="https://www.facebook.com" className="text-white me-4">
          <i className="fab fa-facebook-f"></i>
        </a>
        <a href="https://www.twitter.com" className="text-white me-4">
          <i className="fab fa-twitter"></i>
        </a>
        <a href="https://www.instagram.com" className="text-white me-4">
          <i className="fab fa-instagram"></i>
        </a>
        <a href="https://www.linkedin.com" className="text-white me-4">
          <i className="fab fa-linkedin"></i>
        </a>
        <p className="d-inline-block mb-0">© 2025 MyTickets. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
