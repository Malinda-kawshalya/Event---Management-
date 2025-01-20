import React, { useEffect, useState } from 'react';
import { Bar, Pie, Line } from 'react-chartjs-2';
import 'chart.js/auto';
import 'bootstrap/dist/css/bootstrap.min.css';
//import '../css/AnalyticsPage.css';

const Analytics = () => {
  const [analyticsData, setAnalyticsData] = useState({
    revenue: [],
    attendees: [],
    trends: [],
    topEvents: [],
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch analytics data from backend
    const fetchAnalyticsData = async () => {
      try {
        const response = await fetch('/api/analytics'); // Replace with your backend endpoint
        const data = await response.json();
        setAnalyticsData(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching analytics data:', error);
        setLoading(false);
      }
    };

    fetchAnalyticsData();
  }, []);

  if (loading) {
    return <div className="text-center py-5">Loading analytics...</div>;
  }

  // Charts Data
  const revenueData = {
    labels: analyticsData.revenue.labels,
    datasets: [
      {
        label: 'Monthly Revenue ($)',
        data: analyticsData.revenue.values,
        backgroundColor: '#3F72AF',
      },
    ],
  };

  const attendeeData = {
    labels: analyticsData.attendees.labels,
    datasets: [
      {
        label: 'Attendees by Age Group',
        data: analyticsData.attendees.values,
        backgroundColor: ['#3F72AF', '#112D4E', '#DBE2EF', '#F9F7F7'],
      },
    ],
  };

  const attendanceTrendData = {
    labels: analyticsData.trends.labels,
    datasets: [
      {
        label: 'Attendance Trend',
        data: analyticsData.trends.values,
        borderColor: '#112D4E',
        fill: false,
      },
    ],
  };

  return (
    <div className="analytics-page container py-4">
      <h1 className="text-center mb-4">Analytics Dashboard</h1>

      {/* Overview Section */}
      <div className="row mb-4">
        {analyticsData.overview.map((item, index) => (
          <div className="col-md-3" key={index}>
            <div className="card text-center">
              <div className="card-body">
                <h5 className="card-title">{item.title}</h5>
                <p className="card-text fs-4">{item.value}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Charts Section */}
      <div className="row">
        <div className="col-md-6 mb-4">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Revenue Trends</h5>
              <Bar data={revenueData} />
            </div>
          </div>
        </div>
        <div className="col-md-6 mb-4">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Attendee Demographics</h5>
              <Pie data={attendeeData} />
            </div>
          </div>
        </div>
        <div className="col-md-12 mb-4">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Attendance Trends</h5>
              <Line data={attendanceTrendData} />
            </div>
          </div>
        </div>
      </div>

      {/* Top-Performing Events Section */}
      <div className="row">
        <div className="col-12">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Top-Performing Events</h5>
              <table className="table">
                <thead>
                  <tr>
                    <th>Event</th>
                    <th>Attendees</th>
                    <th>Revenue</th>
                    <th>Rating</th>
                  </tr>
                </thead>
                <tbody>
                  {analyticsData.topEvents.map((event, index) => (
                    <tr key={index}>
                      <td>{event.name}</td>
                      <td>{event.attendees}</td>
                      <td>${event.revenue}</td>
                      <td>{event.rating}/5</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
