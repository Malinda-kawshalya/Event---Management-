import React from 'react';
import SpecialShows from './SpecialShows';
import Banner from './Banner';

const HomePage = () => {
  return (
    <>
    <Banner />
      <SpecialShows /> {/* Include the special shows section */}
    </>
  );
};

export default HomePage;
