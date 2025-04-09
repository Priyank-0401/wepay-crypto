// components/ProtectedRoute.js
import React, { useEffect } from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';

const ProtectedRoute = ({ isAuthenticated }) => {
  const location = useLocation();

  useEffect(() => {
    // Save the current path when the protected route is accessed
    // but only if the user is not authenticated (to remember where they were trying to go)
    if (!isAuthenticated && location.pathname !== '/login' && location.pathname !== '/signup') {
      localStorage.setItem('lastPath', location.pathname);
    }
  }, [isAuthenticated, location.pathname]);

  if (!isAuthenticated) {
    // Redirect to login if not authenticated
    return <Navigate to="/login" replace />;
  }

  // Render child routes if authenticated
  return <Outlet />;
};

export default ProtectedRoute;