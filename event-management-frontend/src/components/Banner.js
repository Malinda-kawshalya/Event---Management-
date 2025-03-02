import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import '../css/Banner.css';



import { useNavigate } from 'react-router-dom';

const Banner = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [hasSearched, setHasSearched] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSearch = async () => {
    if (!searchQuery.trim()) return;

    setIsLoading(true);
    setError(null);
    setHasSearched(true);

    try {
      const response = await fetch(
        `http://localhost:5000/api/events/search?query=${encodeURIComponent(searchQuery.trim())}`
      );

      if (!response.ok) {
        throw new Error('Search failed. Please try again.');
      }

      const data = await response.json();
      setSearchResults(Array.isArray(data.events) ? data.events : []);
    } catch (error) {
      console.error('Search error:', error);
      setError(error.message);
      setSearchResults([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className="hero-section">
      <div className="hero-content text-center text-white">
        <h1 className="hero-title-1">Lights, Music, Action</h1>
        <h1 className="hero-title-2">Your Next Event Awaits!</h1>
        <p className="hero-subtitle">Book tickets for concerts, workshops, and more!</p>
        <div className="search-bar input-group mt-4">
          <span className="input-group-text-1 text-dark">
            <i className="bi bi-search"></i>
          </span>
          <input
            type="text"
            className="form-control"
            placeholder="Search by Artist, Event, or Venue"
            value={searchQuery}  
            onChange={(e) => setSearchQuery(e.target.value)}  
            onKeyPress={handleKeyPress}  
          />
          <button className="btn btn-warning-1" aria-label="Search Button" onClick={handleSearch}>  
            Search  {/*  Calls handleSearch() when clicked */}
          </button>
        </div>

        {/* Display search results */}
        <div className="mt-4">
          {isLoading && <p>Loading...</p>}
          {error && <p className="text-danger">{error}</p>}
          {hasSearched && searchResults.length === 0 && !isLoading && (
            <p>No results found.</p>
          )}
          {searchResults.map((event) => (
            <div key={event.id} className="search-result-item">
              <h5>{event.title}</h5>
              <p>{event.location} - {new Date(event.date).toLocaleDateString()}</p>
              <button className="btn btn-primary" onClick={() => navigate(`/eventdetails/${event._id}`)}>
                View Event
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Banner;
