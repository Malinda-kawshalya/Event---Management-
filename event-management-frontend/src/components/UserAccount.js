import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/UserAccount.css'; // Import the additional CSS file

const UserAccount = () => {
    // Example user data
    const user = {
        name: "John Doe",
        email: "johndoe@example.com",
        phone: "+1 234 567 890",
        tickets: [
            { id: 1, event: "Concert A", date: "2025-02-10", time: "7:00 PM", price: "$50" },
            { id: 2, event: "Theater B", date: "2025-03-15", time: "6:30 PM", price: "$40" },
            { id: 3, event: "Sports Event C", date: "2025-04-20", time: "8:00 PM", price: "$70" },
        ],
    };

    return (
        <div className="container mt-5">
            <div className="row">
                {/* User Profile Section */}
                <div className="col-md-4">
                    <div className="card shadow p-4 mb-4">
                        <h3 className="text-center">User Profile</h3>
                        <hr />
                        <p><strong>Name:</strong> {user.name}</p>
                        <p><strong>Email:</strong> {user.email}</p>
                        <p><strong>Phone:</strong> {user.phone}</p>
                    </div>
                </div>

                {/* Tickets Section */}
                <div className="col-md-8">
                    <div className="card shadow p-4">
                        <h3 className="text-center">My Tickets</h3>
                        <hr />
                        <table className="table table-bordered">
                            <thead className="table-dark">
                                <tr>
                                    <th>#</th>
                                    <th>Event</th>
                                    <th>Date</th>
                                    <th>Time</th>
                                    <th>Price</th>
                                </tr>
                            </thead>
                            <tbody>
                                {user.tickets.map((ticket) => (
                                    <tr key={ticket.id}>
                                        <td>{ticket.id}</td>
                                        <td>{ticket.event}</td>
                                        <td>{ticket.date}</td>
                                        <td>{ticket.time}</td>
                                        <td>{ticket.price}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserAccount;
