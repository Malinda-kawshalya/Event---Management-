import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'; // Import useLocation
import Navbar from './components/Navbar';
import Banner from './components/Banner';
import EventCard from './components/EventCard';
import SectionTitle from './components/SectionTitle';
import Footer from './components/Footer';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import EventDetails from './components/EventDetails';
import MyEvents from './components/MyEvents';
import HomePage from './components/HomePage';



import './App.css';

// Component to handle conditional Navbar rendering
const AppWrapper = () => {
  const location = useLocation();

  return (
    <div className="App">
      {/* Render Navbar only on the home page */}
      {location.pathname !== '/signin' && <Navbar />}

      <Routes>
        {/* Route for the Home page */}
        <Route path="/" element={<HomePage />} />

        
        <Route path="/signin" element={<SignIn />} />
        <Route path="/event-details" element={<EventDetails />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/MyEvents" element={< MyEvents />} />
      </Routes>
    </div>
  );
};

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

const App = () => {
  return (
    <Router>
      <AppWrapper />
    </Router>
  );
};

export default App;
