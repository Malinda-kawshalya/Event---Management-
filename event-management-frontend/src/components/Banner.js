import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css'; // Import Bootstrap Icons

const Banner = () => {
  return (
    <div className="banner text-center p-5 bg-primary text-white">
      <h1 className="display-4" >Let's Book Your Ticket</h1>
      <p className="lead" style={{ color: 'white' }}>Discover your favorite entertainment right here</p>
      <div className="search-bar input-group mt-4">

      <span className="input-group-text bg-white text-dark">
          <i className="bi bi-search"></i> {/* Bootstrap Search Icon */}
        </span>
        
        <input type="text" className="form-control" placeholder="Search by Artist, Event or Venue" />
        
          <button className="btn btn-warning" aria-label="Search Button">Search</button>
        
      </div>
    </div>
  );
};

export default Banner;
