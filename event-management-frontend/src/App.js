import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // Import useLocation
import Navbar from './components/Navbar';
import Banner from './components/Banner';
import EventCard from './components/EventCard';

import Footer from './components/Footer';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import EventDetails from './components/EventDetails';
import MyEvents from './components/MyEvents';
import Home from './components/HomePage';
import './App.css';


function App() {
  return(
    <Router>
      <div className="App">
        <Navbar/>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/eventdetails" element={<EventDetails />} />
          <Route path="/myevents" element={<MyEvents />} />
        </Routes>
        
        <EventCard/>
        <Banner/>
        
        <Footer/>


      
      
      </div>
    </Router>
  );
  
}

export default App;