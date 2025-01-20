import React from 'react';
import SpecialShows from './SpecialShows';
import Banner from './Banner';
import Navbar from './Navbar';

const HomePage = () => {
  return (
    <>
    <Navbar/>
    <Banner />
      <SpecialShows /> {/* Include the special shows section */}
    </>
  );
};

export default HomePage;
