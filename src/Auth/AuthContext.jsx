import React, { createContext, useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const token = sessionStorage.getItem('token');
    if (token) {
      try {
        const decodedUser = jwtDecode(token);
        const currentTime = Date.now() / 1000;
        if (decodedUser.exp < currentTime) {
          sessionStorage.removeItem('token');
          return null;
        } else {
          return decodedUser;
        }
      } catch (e) {
        sessionStorage.removeItem('token');
        return null;
      }
    }
    return null;
  });

  useEffect(() => {
    const token = sessionStorage.getItem('token');
    console.log('AuthProvider useEffect - Token from sessionStorage:', token);
    if (token) {
      try {
        const decodedUser = jwtDecode(token);
        console.log('AuthProvider useEffect - Decoded User:', decodedUser);
        const currentTime = Date.now() / 1000;

        if (decodedUser.exp < currentTime) {
          sessionStorage.removeItem('token');
          setUser(null);
          console.log('AuthProvider useEffect - Token expired. User set to null.');
        } else {
          setUser(decodedUser);
          console.log('AuthProvider useEffect - User set:', decodedUser);
        }
      } catch (e) {
        console.error('AuthProvider useEffect - Error decoding token:', e);
        sessionStorage.removeItem('token');
        setUser(null);
      }
    }
  }, []);

  const login = (token) => {
    sessionStorage.setItem('token', token);
    try {
      const decodedUser = jwtDecode(token);
      setUser(decodedUser);
      console.log('AuthProvider login - User logged in:', decodedUser);
    } catch (e) {
      console.error('AuthProvider login - Error decoding token on login:', e);
    }
  };

  const logout = () => {
    sessionStorage.removeItem('token');
    setUser(null);
    console.log('AuthProvider logout - User logged out');
  };

  const hasRole = (role) => {
    return user && user.roles && user.roles === role;
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, hasRole }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
