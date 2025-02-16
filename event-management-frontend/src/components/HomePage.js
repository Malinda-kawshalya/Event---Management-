import React from 'react';
import SpecialShows from './SpecialShows';
import Banner from './Banner';
// import FAQSection from './FaqSection';
import CategoryEvents from './CategoryEvents';
import { Carousel } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';
import newsimage from '../images/Newsn.jpg';
import midlaneimage from '../images/midlanem.jpg';
import Chat from './ChatBot';

import '../css/HomePage.css';

const HomePage = () => {
  return (
    <div className="homepage-container">
      <>
        <Banner />
        <div className="container my-5">
          <h2 className="text-center mb-4">Featured Events</h2>
          <Carousel>
            <Carousel.Item>
              <img className="d-block w-100" src={newsimage} alt="First slide" />
              <Carousel.Caption>
                <h3>NEWS</h3>
                <p>Description for Event 1.</p>
              </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
              <img className="d-block w-100" src={midlaneimage} alt="Second slide" />
              <Carousel.Caption>
                <h3>MIDLANE</h3>
                <p>Description for Event 2.</p>
              </Carousel.Caption>
            </Carousel.Item>
          </Carousel>
        </div>
        <SpecialShows />
        <CategoryEvents />
        <Chat />
        {/* <FAQSection /> */}
       
        <div className="cta-section text-center py-5 bg-light">
          <h2>Ready to Explore?</h2>
          <p className="cta-sec">Sign up now to book your tickets and never miss an event!</p>
          <Link to="/signup" className="btn btn-primary btn-lg">
            Sign Up Now
          </Link>
        </div>
        
      </>
    </div>
  );
};

export default HomePage;
