import React from 'react';
import SpecialShows from './SpecialShows';
import TestimonialsSection from './Testimonials';
import Banner from './Banner';
import Carousel from './Carousel';
// import FAQSection from './FaqSection';
import CategoryEvents from './CategoryEvents';

import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';

import Chat from './ChatBot';

import '../css/HomePage.css';

const HomePage = () => {
  return (
    <div className="homepage-container">
      <>
        <Banner />
        <div className="container my-5">
          <h2 className="text-center mb-4">Featured Events</h2>
          <Carousel/>
        </div>
        <SpecialShows />
        <CategoryEvents />
        <TestimonialsSection/>
        <Chat />
        {/* <FAQSection /> */}
       
        <div className="explore-banner text-center py-5 bg-gradient-custom">
  <div className="content-wrapper-2 mx-auto">
    <h2 className="banner-headline mb-3">Ready to Explore?</h2>
    <p className="banner-tagline mb-4">Sign up now to book your tickets and never miss an event!</p>
    <Link to="/signup" className="action-button px-4 py-2">
      Sign Up Now
    </Link>
  </div>
</div>
        
      </>
    </div>
  );
};

export default HomePage;
