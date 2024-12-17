import React from 'react';
import '../css/EventCard.css';

const EventCard = () => {
  // Dummy events data inside the EventCard component
  const events = [
    {
      title: 'Music Concert',
      date: '2024-12-25',
      location: 'Colombo',
      price: 1500,
      image: 'https://via.placeholder.com/200x150?text=Music+Concert'
    },
    {
      title: 'Art Exhibition',
      date: '2024-12-26',
      location: 'Kandy',
      price: 1000,
      image: 'https://via.placeholder.com/200x150?text=Art+Exhibition'
    },
    {
      title: 'Comedy Show',
      date: '2024-12-27',
      location: 'Galle',
      price: 1200,
      image: 'https://via.placeholder.com/200x150?text=Comedy+Show'
    },
    {
      title: 'Tech Conference',
      date: '2024-12-28',
      location: 'Negombo',
      price: 2000,
      image: 'https://via.placeholder.com/200x150?text=Tech+Conference'
    },
    {
      title: 'Dance Performance',
      date: '2024-12-29',
      location: 'Colombo',
      price: 1800,
      image: 'https://via.placeholder.com/200x150?text=Dance+Performance'
    },
    {
      title: 'Food Festival',
      date: '2024-12-30',
      location: 'Kandy',
      price: 800,
      image: 'https://via.placeholder.com/200x150?text=Food+Festival'
    },
    {
      title: 'Film Screening',
      date: '2024-12-31',
      location: 'Galle',
      price: 1000,
      image: 'https://via.placeholder.com/200x150?text=Film+Screening'
    },
    {
      title: 'Theater Play',
      date: '2025-01-02',
      location: 'Negombo',
      price: 1600,
      image: 'https://via.placeholder.com/200x150?text=Theater+Play'
    }
  ];

  return (
    <div className="container">
      <div className="row">
        {events.map((event, index) => (
          <div className="col-md-3" key={index}>
            <div className="event-card">
              <img src={event.image} alt={event.title} />
              <h3>{event.title}</h3>
              <p>{event.date}</p>
              <p>{event.location}</p>
              <p>{event.price} LKR upwards</p>
              <button className="buy-btn">Buy Tickets</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EventCard;
