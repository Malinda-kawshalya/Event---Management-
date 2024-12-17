import React from 'react';
import Navbar from './components/Navbar';
import Banner from './components/Banner';
import EventCard from './components/EventCard';
import SectionTitle from './components/SectionTitle';
import Footer from './components/Footer';

import './App.css';

const App = () => {
  const sampleEvents = [
    {
      title: '2019 July Mase Dawsak',
      date: 'Dec 20, 2024',
      location: 'ITUM Diyagama',
      price: 500,
      image: '/images/event1.jpg',
    },
    {
      title: 'Soduru Shinyakadi Raa',
      date: 'Dec 20, 2024',
      location: 'Kelaniya University',
      price: 3000,
      image: '/images/event2.jpg',
    },
    {
      title: '2019 July Mase Dawsak',
      date: 'Dec 20, 2024',
      location: 'ITUM Diyagama',
      price: 500,
      image: '/images/event1.jpg',
    },
    {
      title: '2019 July Mase Dawsak',
      date: 'Dec 20, 2024',
      location: 'ITUM Diyagama',
      price: 500,
      image: '/images/event1.jpg',
    },
  ];

  return (
    <div className="App">
      <Navbar />
      <Banner />
      <SectionTitle title="What's happening this month" />
      <div className="events-grid">
        {sampleEvents.map((event, index) => (
          <EventCard key={index} {...event} />
        ))}
      </div>
      <Footer />
    </div>
  );
};

export default App;
