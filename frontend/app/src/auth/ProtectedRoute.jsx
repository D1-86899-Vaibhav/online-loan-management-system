// ProtectedRoute.js
import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children, requiredRole }) => {
  const token = sessionStorage.getItem('authToken');
  const role = sessionStorage.getItem('userRole'); // Assuming the role is stored in sessionStorage

  if (!token) {
    // If not authenticated, redirect to login page
    return <Navigate to="/login" />;
  }

  if (requiredRole && role !== requiredRole) {
    // If user does not have the required role, redirect to a forbidden page or login
    return <Navigate to="/login" />;
  }

  // If authenticated and has the required role, render the component
  return children;
};

export default ProtectedRoute;
