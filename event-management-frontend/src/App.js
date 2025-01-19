import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar'; // Import your Navbar component
import HomePage from './components/HomePage'; // Home page component
import About from './components/About'; // About page component
import ContactUs from './components/ContactUs'; // Contact page component
import Banner from './components/Banner';
import Footer from './components/Footer';
import EventDetails from './components/EventDetails';
import AdminDashboard from './components/AdminDashboard';
import Myevents from './components/MyEvents';

const App = () => {
  return (
    <Router>
      <div>
        {/* Navbar displayed on all pages */}
        <Navbar />
        <Banner />

        {/* Routing */}
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<ContactUs />} /> 
          <Route path="/eventdetails" element={<EventDetails />} />
          <Route path="/admindashboard" element={<AdminDashboard />} />  
          <Route path="/myevents" element={<Myevents />} /> 
        </Routes>
        <Footer/>
      </div>
    </Router>
  );
};

export default App;
