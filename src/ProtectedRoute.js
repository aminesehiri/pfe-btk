import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from './AuthContext'; // Make sure the path is correct based on your project structure

const ProtectedRoute = ({ children }) => {
  const { currentUser } = useAuth();

  if (!currentUser) {
    // User not logged in, redirect to Login page
    return <Navigate to="/Login" />;
  }

  return children;
};

export default ProtectedRoute; // Make sure to export ProtectedRoute as default
