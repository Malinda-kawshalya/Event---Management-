import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const AllEvents = () => {
    const [events, setEvents] = useState([]);

    useEffect(() => {
        // Fetch events from an API or database
        // This is just a placeholder, replace with your actual data fetching logic
        const fetchEvents = async () => {
            const response = await fetch('/api/events');
            const data = await response.json();
            setEvents(data);
        };

        fetchEvents();
    }, []);

    return (
        <div className="container mt-5">
            <h1 className="text-center mb-4">Upcoming Events</h1>
            <div className="row">
                {events.map(event => (
                    <div className="col-md-4 mb-4" key={event.id}>
                        <div className="card">
                            <img src={event.image} className="card-img-top" alt={event.name} />
                            <div className="card-body">
                                <h5 className="card-title">{event.name}</h5>
                                <p className="card-text">{event.description}</p>
                                <p className="card-text"><small className="text-muted">{new Date(event.date).toLocaleDateString()}</small></p>
                                <a href={`/events/${event.id}`} className="btn btn-primary">View Details</a>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AllEvents;