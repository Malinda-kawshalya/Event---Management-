import React from 'react';
import { Navigate } from 'react-router-dom';
import { authService } from '../components/authService'; // Adjust the import path as needed

const ProtectedRoute = ({ children, roles }) => {
  // Check if the user is authenticated
  if (!authService.isAuthenticated()) {
    // Redirect to the sign-in page if not authenticated
    return <Navigate to="/signin" />;
  }

  // Get the user's role from local storage or auth service
  const user = JSON.parse(localStorage.getItem('user'));

  // Check if the user's role is allowed to access the route
  if (roles && !roles.includes(user.role)) {
    // Redirect to the unauthorized page or home page if the role is not allowed
    return <Navigate to="/unauthorized" />;
  }

  // Redirect users to their respective dashboards based on their role
  if (user.role === 'organizer') {
    return <Navigate to="/orgdashboard" />;
  } else if (user.role === 'admin') {
    return <Navigate to="/admindashboard" />;
  } else if (user.role === 'user') {
    return <Navigate to="/home" />;
  }

  // If the user's role doesn't require a redirect, allow access to the requested page
  return children;
};

export default ProtectedRoute;