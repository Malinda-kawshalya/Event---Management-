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
<<<<<<< HEAD
import Home from './components/HomePage';
=======
import HomePage from './components/HomePage';
import AdminDashboard from './components/AdminDashboard';


>>>>>>> b93091168a58b1eb236e0b230e74aecd76567a82
import './App.css';


<<<<<<< HEAD
function App() {
  return(
=======
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
        <Route path="/AdminDashboard" element={< AdminDashboard />} />
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
>>>>>>> b93091168a58b1eb236e0b230e74aecd76567a82
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