import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar'; // Import your Navbar component
import HomePage from './components/HomePage'; // Home page component
import About from './components/AboutUs'; // About page component
import ContactUs from './components/ContactUs'; // Contact page component
import "bootstrap/dist/css/bootstrap.min.css";

import Footer from './components/Footer';
import EventDetails from './components/EventDetails';
import AdminDashboard from './components/AdminDashboard';
import Myevents from './components/MyEvents';
import SignIn from './components/SignIn';


import SignUp from './components/SignUp';
import EventCreation from './components/EventCreation';
import ManageEventsPage from './components/ManageEventPage';


const App = () => {
  return (
    <Router>
      <div>
        {/* Navbar displayed on all pages */}
        <Navbar />
        

        {/* Routing */}
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<ContactUs />} /> 
          <Route path="/eventdetails" element={<EventDetails />} />
          <Route path="/admindashboard" element={<AdminDashboard />} />  
          <Route path="/myevents" element={<Myevents />} /> 
          <Route path="/signin" element={<SignIn />} />


          <Route path="/signup" element={<SignUp />} />
          <Route path="/eventcreation" element={<EventCreation />} />
          <Route path="/manageevents" element={<ManageEventsPage />} />

        </Routes>
        <Footer/>
      </div>
    </Router>
  );
};

export default App;
