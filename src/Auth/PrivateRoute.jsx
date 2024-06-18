import React, { useContext, useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import AuthContext from './AuthContext';

const PrivateRoute = ({ children, requiredRole }) => {
  const { user, logout, hasRole } = useContext(AuthContext);
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    console.log('PrivateRoute - User context:', user);
    setIsInitialized(true);
  }, [user]);

  if (!isInitialized) {
    return <div>Loading...</div>;
  }

  if (!user) {
    console.log('PrivateRoute - User is null. Redirecting to login.');
    return <Navigate to="/login" />;
  }

  const currentTime = Date.now() / 1000;
  if (user.exp < currentTime) {
    console.log('PrivateRoute - Token expired. Logging out and redirecting to login.');
    logout();
    return <Navigate to="/login" />;
  }

  if (requiredRole && !hasRole(requiredRole)) {
    console.log('PrivateRoute - User does not have required role. Redirecting to unauthorized.');
    return <Navigate to="/unauthorized" />;
  }

  return children;
};

export default PrivateRoute;
