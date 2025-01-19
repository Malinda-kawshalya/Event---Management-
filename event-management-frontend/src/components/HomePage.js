import React from 'react';

import '../css/HomePage.css';

import { Link } from 'react-router-dom';
import '../css/HomePage.css'; // Ensure this file contains the necessary styles
import Banner from './Banner'; // Importing the Banner component


const HomePage = () => {
  return (
    <div className="homepage">

      {/* <header className="header">
        <div className="container">
          <h1 className="brand">Eventify</h1>
          <nav className="navbar">
            <ul className="nav-links">
              <li><a href="#features">Features</a></li>
              <li><a href="#events">Upcoming Events</a></li>
              <li><a href="#contact">Contact Us</a></li>
              <li><a href="/login" className="btn-primary">Login</a></li>
            </ul>
          </nav>
        </div>
      </header> */}

      {/* Banner Section */}
      

      {/* Hero Section */}
      
          



          
        

      {/* Featured Events Section */}
      <div className="container py-5">
        <h2 className="text-center mb-4">Featured Events</h2>
        <div className="row">
          {sampleEvents.map((event, index) => (
            <div className="col-md-4 mb-4" key={index}>
              <div className="card h-100 shadow-sm">
                <img
                  src={event.image}
                  className="card-img-top"
                  alt={event.title}
                  style={{ height: '200px', objectFit: 'cover' }}
                />
                <div className="card-body d-flex flex-column">
                  <h5 className="card-title">{event.title}</h5>
                  <p className="card-text mb-3">
                    <strong>Date:</strong> {event.date}
                    <br />
                    <strong>Location:</strong> {event.location}
                    <br />
                    <strong>Price:</strong> ${event.price}
                  </p>
                  <Link to="/event-details" className="btn btn-primary mt-auto">
                    View Details
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer Section */}
      {/* <footer className="bg-dark text-white text-center py-3">
        <p className="mb-0">
          &copy; {new Date().getFullYear()} <strong>Eventify</strong>. All rights reserved.
        </p>
      </footer> */}

    </div>
  );
};

// Sample events data
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
    date: 'Dec 22, 2024',
    location: 'Kelaniya University',
    price: 3000,
    image: '/images/event2.jpg',
  },
  {
    title: 'Music Fiesta 2024',
    date: 'Jan 5, 2025',
    location: 'Colombo Grounds',
    price: 1500,
    image: '/images/event3.jpg',
  },
];

export default HomePage;
