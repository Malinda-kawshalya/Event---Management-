import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const Banner = () => {
  return (
    <div className="banner text-center p-5 bg-primary text-white" style={{ fontFamily: 'Suprapower SE' }}>
      <h1 className="display-4">Let's Book Your Ticket</h1>
      <p className="lead">Discover your favorite entertainment right here</p>
      <div className="search-bar input-group mt-4">
        <input type="text" className="form-control" placeholder="Search by Artist, Event, or Venue" />
        <div className="input-group-append">
          <button className="btn btn-warning" aria-label="Search Button">Search</button>
        </div>
      </div>
    </div>
  );
};

export default Banner;
