// App.js
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './styles/App.css';

// Pages
import LandingPage from './pages/LandingPage';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import Transactions from './pages/Transactions';
import Accounts from './pages/Accounts';
import Budgets from './pages/Budgets';
import Reports from './pages/Reports';
import Profile from './pages/Profile';
import Settings from './pages/Settings';
import Help from './pages/Help';
import QuickTransfer from './pages/QuickTransfer';

// Components
import Layout from './components/Layout';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  // Check for user on component mount
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  
  // Check authentication status on load
  useEffect(() => {
    const user = localStorage.getItem('user');
    if (user) {
      setIsAuthenticated(true);
    }
  }, []);
  
  // Authentication functions
  const login = (userData) => {
    if (userData) {
      // Store user data in localStorage, checking it's valid first
      localStorage.setItem('user', JSON.stringify(userData));
      localStorage.setItem('token', 'auth-token-' + Date.now()); // Simple token
      setIsAuthenticated(true);
      return true;
    } else {
      console.error("Invalid user data in login function");
      return false;
    }
  };
  
  const signup = (userData) => {
    localStorage.setItem('user', JSON.stringify(userData));
    localStorage.setItem('token', 'auth-token-' + Date.now()); // Simple token
    setIsAuthenticated(true);
    return true;
  };
  
  const logout = () => {
    // Clear user data
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    setIsAuthenticated(false);
    
    // Force redirect to login page
    window.location.href = '/login';
  };

  return (
    <Router>
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={
          isAuthenticated ? <Navigate to="/dashboard" /> : <Login onLogin={login} />
        } />
        <Route path="/signup" element={
          isAuthenticated ? <Navigate to="/dashboard" /> : <Signup onSignup={signup} />
        } />
        
        {/* Protected routes - wrapped in Layout component for authenticated users */}
        <Route element={<ProtectedRoute isAuthenticated={isAuthenticated} />}>
          <Route element={<Layout onLogout={logout} />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/transactions" element={<Transactions />} />
            <Route path="/accounts" element={<Accounts />} />
            <Route path="/budgets" element={<Budgets />} />
            <Route path="/reports" element={<Reports />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/help" element={<Help />} />
            <Route path="/quick-transfer" element={<QuickTransfer />} />
          </Route>
        </Route>
        
        {/* Redirect to landing page if not authenticated */}
        <Route 
          path="*" 
          element={isAuthenticated ? <Navigate to="/dashboard" /> : <Navigate to="/" />} 
        />
      </Routes>
    </Router>
  );
}

export default App;