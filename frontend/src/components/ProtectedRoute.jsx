import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const user = localStorage.getItem('user');
  
  if (!user) {
    // Redirect to sign in if not authenticated
    return <Navigate to="/signin" replace />;
  }
  
  return children;
};

export default ProtectedRoute;
