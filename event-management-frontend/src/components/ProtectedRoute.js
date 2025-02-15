import React from 'react';
import { Navigate } from 'react-router-dom';
import { authService } from '../components/authService';

const ProtectedRoute = ({ children, roles }) => {
  if (!authService.isAuthenticated()) {
    return <Navigate to="/signin" />;
  }

  const user = authService.getUser();
  if (roles && !roles.includes(user.role)) {
    return <Navigate to="/unauthorized" />;
  }

  return children;
};

export default ProtectedRoute;