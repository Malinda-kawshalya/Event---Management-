import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/SpecialShows.css';


const specialShowsData = [
  {
    id: 1,
    title: "The Phantom of the Opera",
    date: "January 20, 2025",
    image: "https://via.placeholder.com/300x200", // Replace with actual image URL
    location: "Broadway Theatre, NYC",
  },
  {
    id: 2,
    title: "Cirque du Soleil - Mystère",
    date: "January 22, 2025",
    image: "https://via.placeholder.com/300x200", // Replace with actual image URL
    location: "Las Vegas, NV",
  },
  {
    id: 3,
    title: "Taylor Swift - The Eras Tour",
    date: "January 25, 2025",
    image: "https://via.placeholder.com/300x200", // Replace with actual image URL
    location: "Wembley Stadium, London",
  },
];

const SpecialShows = () => {
  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">This Month's Special Shows</h2>
      <div className="row">
        {specialShowsData.map((show) => (
          <div className="col-md-4 mb-4" key={show.id}>
            <div className="card h-100">
              <img src={show.image} className="card-img-top" alt={show.title} />
              <div className="card-body">
                <h5 className="card-title">{show.title}</h5>
                <p className="card-text">
                  <strong>Date:</strong> {show.date}
                  <br />
                  <strong>Location:</strong> {show.location}
                </p>
              </div>
              <div className="card-footer text-center">
                <button className="btn btn-primary">Buy Tickets</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SpecialShows;
