import React, { createContext, useState, useEffect } from 'react';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // Initialize user state from localStorage
  useEffect(() => {
    const userString = localStorage.getItem('user');
    const token = localStorage.getItem('jwt');

    if (userString && token) {
      try {
        const userData = JSON.parse(userString);
        setUser(userData);
      } catch (error) {
        console.error('Error parsing user data:', error);
        logout(); // Clear invalid data
      }
    }
  }, []);

  // Login function
  const login = (userData, token) => {
    localStorage.setItem('user', JSON.stringify(userData));
    localStorage.setItem('jwt', token); // Store the token
    setUser(userData);
  };

  // Logout function
  const logout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('jwt');
    localStorage.removeItem('tokenTimestamp'); // Clear additional data
    setUser(null);
  };

  return (
    <UserContext.Provider value={{ user, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};