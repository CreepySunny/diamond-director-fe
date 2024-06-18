import React, { useContext, useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import AuthContext from './AuthContext';

const PrivateRoute = ({ children, requiredRole }) => {
  const { user, logout, hasRole } = useContext(AuthContext);
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    setIsInitialized(true);
  }, [user]);

  if (!isInitialized) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <Navigate to="/login" />;
  }

  const currentTime = Date.now() / 1000;
  if (user.exp < currentTime) {
    logout();
    return <Navigate to="/login" />;
  }

  if (requiredRole && !hasRole(requiredRole)) {
    return <Navigate to="/unauthorized" />;
  }

  return children;
};

export default PrivateRoute;
