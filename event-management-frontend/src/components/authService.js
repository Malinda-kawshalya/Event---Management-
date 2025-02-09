export const authService = {
  // Set token and user data in localStorage
  setToken: (token, user) => {
    try {
      localStorage.setItem('token', token);
      localStorage.setItem('tokenTimestamp', Date.now().toString());
      if (user) {
        localStorage.setItem('user', JSON.stringify(user)); // Store user data (e.g., role)
      }
    } catch (error) {
      console.error('Failed to save token or user data:', error);
    }
  },

  // Get token from localStorage (with expiry check)
  getToken: () => {
    try {
      const token = localStorage.getItem('token');
      const timestamp = localStorage.getItem('tokenTimestamp');

      if (!token || !timestamp) return null;

      const tokenAge = Date.now() - parseInt(timestamp);
      const tokenExpiryTime = 3600000; // 1 hour

      if (tokenAge > tokenExpiryTime) {
        authService.clearToken();
        return null;
      }

      return token;
    } catch (error) {
      console.error('Failed to retrieve token:', error);
      return null;
    }
  },

  // Clear token and user data from localStorage
  clearToken: () => {
    try {
      localStorage.removeItem('token');
      localStorage.removeItem('tokenTimestamp');
      localStorage.removeItem('user');
    } catch (error) {
      console.error('Failed to clear token or user data:', error);
    }
  },

  // Check if the user is authenticated
  isAuthenticated: () => {
    return !!authService.getToken();
  },

  // Get user data (e.g., role) from localStorage
  getUser: () => {
    try {
      const user = localStorage.getItem('user');
      return user ? JSON.parse(user) : null;
    } catch (error) {
      console.error('Failed to retrieve user data:', error);
      return null;
    }
  },

  // Get user role from localStorage
  getUserRole: () => {
    const user = authService.getUser();
    return user ? user.role : null;
  },

  // Refresh token (example implementation)
  refreshToken: async () => {
    try {
      const response = await fetch('/api/refresh-token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token: authService.getToken() }),
      });

      if (response.ok) {
        const data = await response.json();
        authService.setToken(data.token, data.user); // Update token and user data
        return data.token;
      } else {
        authService.clearToken(); // Clear token if refresh fails
        return null;
      }
    } catch (error) {
      console.error('Failed to refresh token:', error);
      authService.clearToken(); // Clear token on error
      return null;
    }
  },
};