import React from 'react';
import { Navigate } from 'react-router-dom';
import { authService } from '../components/authService';

const ProtectedRoute = ({ children, roles }) => {
  if (!authService.isAuthenticated()) {
    return <Navigate to="/login" />;
  }

  const user = JSON.parse(localStorage.getItem('user'));
  if (roles && !roles.includes(user.role)) {
    return <Navigate to="/unauthorized" />;
  }

  return children;
};

export default ProtectedRoute;