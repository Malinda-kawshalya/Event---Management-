import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/Footer.css'; // Import the Footer CSS file

const Footer = () => {
  return (
    <div className="footer-container">
      <footer className="footer text-center text-white">
        <div className="container">
          <section className="footer-section mt-5">
            <div className="row text-center d-flex justify-content-center pt-5">
              <div className="col-md-2">
                <h6 className="text-uppercase font-weight-bold">
                  <a href="#!" className="text-white">About us</a>
                </h6>
              </div>
              <div className="col-md-2">
                <h6 className="text-uppercase font-weight-bold">
                  <a href="#!" className="text-white">Products</a>
                </h6>
              </div>
              <div className="col-md-2">
                <h6 className="text-uppercase font-weight-bold">
                  <a href="#!" className="text-white">Awards</a>
                </h6>
              </div>
              <div className="col-md-2">
                <h6 className="text-uppercase font-weight-bold">
                  <a href="#!" className="text-white">Help</a>
                </h6>
              </div>
              <div className="col-md-2">
                <h6 className="text-uppercase font-weight-bold">
                  <a href="#!" className="text-white">Contact</a>
                </h6>
              </div>
            </div>
          </section>

          <hr className="footer-divider my-5" />

          <section className="footer-text mb-5">
            <div className="row d-flex justify-content-center">
              <div className="col-lg-8">
                <p className="p1">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt
                  distinctio earum repellat quaerat voluptatibus placeat nam,
                  commodi optio pariatur est quia magnam eum harum corrupti
                  dicta, aliquam sequi voluptate quas.
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
          © 2020 Copyright: EVENTGURU.COM
          
        </div>
      </footer>
    </div>
  );
};

export default Footer;