export const authService = {
    setToken: (token) => {
      localStorage.setItem('token', token);
      localStorage.setItem('tokenTimestamp', Date.now().toString());
    },
  
    getToken: () => {
      const token = localStorage.getItem('token');
      const timestamp = localStorage.getItem('tokenTimestamp');
  
      if (!token || !timestamp) return null;
  
      if (Date.now() - parseInt(timestamp) > 3600000) {
        authService.clearToken();
        return null;
      }
  
      return token;
    },
  
    clearToken: () => {
      localStorage.removeItem('token');
      localStorage.removeItem('tokenTimestamp');
    },
  
    isAuthenticated: () => {
      return !!authService.getToken();
    }
  };
  