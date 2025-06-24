import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [allUsers, setAllUsers] = useState([]);
   const fetchAllUsers = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:5001/api/users/all', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      setAllUsers(response.data.data);
    } catch (err) {
      console.error('Error fetching users:', err);
    }
  };

  // Check authentication status on initial load
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const token = localStorage.getItem('token');
        if (token) {
          const response = await axios.get('http://localhost:5001/api/auth/profile', {
            headers: {
              'Authorization': `Bearer ${token}`
            },
            withCredentials: true
          });
          setCurrentUser(response.data);
          return;
        }

        const sessionResponse = await axios.get('http://localhost:5001/api/auth/profile', {
          withCredentials: true
        });
        if (sessionResponse.data) {
          setCurrentUser(sessionResponse.data);
          localStorage.setItem('user', JSON.stringify(sessionResponse.data));
        }
      } catch (err) {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setCurrentUser(null);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  const login = async (token, userData) => {
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(userData));
    setCurrentUser(userData);
  };

  const logout = async () => {
    try {
      await axios.post('http://localhost:5001/api/auth/logout', {}, {
        withCredentials: true
      });
    } catch (err) {
      console.error('Logout error:', err);
    } finally {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      setCurrentUser(null);
    }
  };

  const value = {
    currentUser,
    loading,
    isAuthenticated: !!currentUser,
    login,
    logout,
    fetchAllUsers 
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};