// App.js
import React, { useState } from 'react';
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
  // Initialize as not authenticated - no longer checking localStorage
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  
  // Authentication functions
  const login = (userData) => {
    // Store user data in memory only (not in localStorage)
    setIsAuthenticated(true);
    return true;
  };
  
  const signup = (userData) => {
    setIsAuthenticated(true);
    return true;
  };
  
  const logout = () => {
    setIsAuthenticated(false);
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