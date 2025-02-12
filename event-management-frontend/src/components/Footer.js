import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/Footer.css'; // Import the Footer CSS file
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <div className="footer-container">
      <footer className="footer text-center text-white">
        <div className="container">
          <section className="footer-section mt-5">
            <div className="row text-center d-flex justify-content-center pt-5">
              <div className="col-md-2">
                <h6 className="text-uppercase font-weight-bold">
                  <Link className="text-white" to="/">Home</Link>
                </h6>
              </div>
              <div className="col-md-2">
                <h6 className="text-uppercase font-weight-bold">
                <Link className="text-white" to="/about">About</Link>
                </h6>
              </div>
              <div className="col-md-2">
                <h6 className="text-uppercase font-weight-bold">
                <Link className="text-white" to="/contact">Contact US</Link>
                </h6>
              </div>
              <div className="col-md-2">
                <h6 className="text-uppercase font-weight-bold">
                <Link className="text-white" to="/allevents">All Events</Link>
                </h6>
              </div>
              <div className="col-md-2">
                <h6 className="text-uppercase font-weight-bold">
                <Link className="text-white" to="#">Special Events</Link>
                </h6>
              </div>
            </div>
          </section>

          <hr className="footer-divider my-5" />

          <section className="footer-text mb-5">
            <div className="row d-flex justify-content-center">
              <div className="col-lg-8">
                <p className="p1">
                Eventguru is your trusted online event ticketing platform,
                offering a seamless way to discover and book tickets for concerts,
                sports, theater, and more. Secure payments, instant confirmations, and 
                hassle-free access—experience the best events with ease!
                </p>
              </div>
            </div>
          </section>

          <section className="footer-social text-center mb-5">
            <a href="#" className="text-white me-4">
              <i className="fab fa-facebook-f"></i>
            </a>
            <a href="#" className="text-white me-4">
              <i className="fab fa-twitter"></i>
            </a>
            <a href="#" className="text-white me-4">
              <i className="fab fa-google"></i>
            </a>
            <a href="#" className="text-white me-4">
              <i className="fab fa-instagram"></i>
            </a>
            <a href="#" className="text-white me-4">
              <i className="fab fa-linkedin"></i>
            </a>
            <a href="#" className="text-white me-4">
              <i className="fab fa-github"></i>
            </a>
          </section>
        </div>

        <div className="footer-copyright text-center p-3">
          © 2020 Copyright: eventguru.com
          
        </div>
      </footer>
    </div>
  );
};

export default Footer;