import React, { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { authService } from "../components/authService";

const ProtectedRoute = ({ children, roles }) => {
  const [loading, setLoading] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const isLoggedIn = authService.isAuthenticated();
        if (isLoggedIn) {
          const currentUser = authService.getUser();
          setUser(currentUser);
          setAuthenticated(true);
        }
      } catch (error) {
        console.error("Error checking authentication:", error);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  if (loading) {
    return <div>Loading...</div>; // Show loading spinner or message
  }

  if (!authenticated) {
    return <Navigate to="/signin" />;
  }

  if (roles && (!user || !roles.includes(user.role))) {
    return <Navigate to="/unauthorized" />;
  }

  return children;
};

export default ProtectedRoute;
