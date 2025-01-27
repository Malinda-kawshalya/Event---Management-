import React from 'react';
import SpecialShows from './SpecialShows';
import Banner from './Banner';
import Navbar from './Navbar';
import FAQSection from '../components/FaqSection';
import CategoryEvents from './CategoryEvents';

const HomePage = () => {
  return (
    <>
    
    <Banner />
    <SpecialShows /> 
    <CategoryEvents />
    <FAQSection />
      
    </>
    
  
  );
  
};

export default HomePage;
