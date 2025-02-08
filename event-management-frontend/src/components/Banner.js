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
    <div className="banner text-center p-5 bg-primary text-white">
      <h1 className="display-4">Let's Book Your Ticket</h1>
      <p className="lead">Discover your favorite entertainment right here</p>
      
      <div className="search-bar input-group mt-4">
        <span className="input-group-text bg-white text-dark">
          <i className="bi bi-search"></i>
        </span>
        <input
          type="text"
          className="form-control"
          placeholder="Search by Artist, Event or Venue"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyPress={handleKeyPress}
        />
        <button 
          className="btn btn-warning" 
          onClick={handleSearch} 
          disabled={isLoading}
        >
          {isLoading ? (
            <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
          ) : 'Search'}
        </button>
      </div>

      {error && (
        <div className="alert alert-danger mt-3">{error}</div>
      )}

      <div className="mt-4 search-results-container">
        {hasSearched && !isLoading && (
          <>
            {searchResults.length > 0 ? (
              <div className="row">
                {searchResults.map((event) => (
                  <div key={event._id} className="col-md-4 mb-4">
                    <div className="card search-result-card h-100" 
                         onClick={() => navigate(`/event/${event._id}`)}>
                      <div className="card-img-wrapper">
                        <img 
                          src={event.banner ? `http://localhost:5000/${event.banner}` : 'https://via.placeholder.com/300x200'}
                          className="card-img-top" 
                          alt={event.title}
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = "https://via.placeholder.com/300x200?text=No+Image";
                          }}
                        />
                        <div className="card-img-overlay">
                          <span className="badge bg-primary">
                            {new Date(event.date).toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                      <div className="card-body">
                        <h5 className="card-title text-truncate">{event.title}</h5>
                        <p className="card-text description-text text-muted">
                          {event.description}
                        </p>
                        <div className="card-footer bg-transparent border-0">
                          <small className="text-muted">
                            <i className="bi bi-geo-alt-fill"></i> {event.location}
                          </small>
                          <button 
                            className="btn btn-outline-primary btn-sm float-end"
                            onClick={(e) => {
                              e.stopPropagation();
                              navigate(`/event/${event._id}`);
                            }}
                          >
                            View Details
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              searchQuery && (
                <div className="alert alert-info">
                  No results found for "{searchQuery}"
                </div>
              )
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Banner;