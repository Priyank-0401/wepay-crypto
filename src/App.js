// App.js
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import './styles/App.css';
import TransactionService from './services/transactionService';

// Pages
import LandingPage from './pages/LandingPage';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import Transactions from './pages/Transactions';
import Accounts from './pages/Accounts';
import Budgets from './pages/Budgets';
import Profile from './pages/Profile';
import Settings from './pages/Settings';
import Help from './pages/Help';
import QuickTransfer from './pages/QuickTransfer';

// Components
import Layout from './components/Layout';
import ProtectedRoute from './components/ProtectedRoute';

// Create a "last path" utility to handle refresh redirects
const getLastVisitedPath = () => {
  const lastPath = localStorage.getItem('lastPath');
  return lastPath || '/dashboard'; // Default to dashboard if no last path
};

const saveLastVisitedPath = (path) => {
  // Only save paths that aren't login or signup
  if (path !== '/login' && path !== '/signup' && path !== '/') {
    localStorage.setItem('lastPath', path);
  }
};

// Path tracker component to save the current path
const PathTracker = ({ children }) => {
  const location = useLocation();
  
  useEffect(() => {
    // Save the current path whenever it changes
    saveLastVisitedPath(location.pathname);
  }, [location.pathname]);
  
  return children;
};

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  
  // Initialize TransactionService
  useEffect(() => {
    const initializeServices = async () => {
      try {
        console.log('Initializing services from App component...');
        
        // Initialize the transaction service as early as possible
        const serviceInitialized = await TransactionService.init();
        
        if (serviceInitialized) {
          console.log('TransactionService initialized successfully');
          
          // Get default account to verify user setup
          const defaultAccount = await TransactionService.getDefaultAccount();
          if (defaultAccount) {
            console.log(`Default account available: ${defaultAccount.substring(0, 10)}...`);
          } else {
            console.warn('No default account found');
          }
        } else {
          console.error('Failed to initialize TransactionService');
        }
      } catch (error) {
        console.error('Error initializing services:', error);
      }
    };
    
    initializeServices();
  }, []);
  
  // Check authentication status
  useEffect(() => {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');
    
    if (token && user) {
      setIsAuthenticated(true);
    }
    
    // Force dark mode
    document.body.classList.add('dark-mode');
    
    // Set loading to false after initial auth check
    setIsLoading(false);
  }, []);
  
  // Authentication functions
  const login = (userData) => {
    if (userData && (userData.id || userData.email)) {
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
    if (userData && (userData.id || userData.email)) {
      localStorage.setItem('user', JSON.stringify(userData));
      localStorage.setItem('token', 'auth-token-' + Date.now()); // Simple token
      setIsAuthenticated(true);
      return true;
    } else {
      console.error("Invalid user data in signup function");
      return false;
    }
  };
  
  const logout = () => {
    // Clear user data
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    setIsAuthenticated(false);
    
    // Force redirect to login page
    window.location.href = '/login';
  };

  // Show loading state until auth check is complete
  if (isLoading) {
    return <div className="loading-auth">Loading application...</div>;
  }

  return (
    <Router>
      <PathTracker>
        <div className="app dark-mode">
          <Routes>
            {/* Public routes */}
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={
              isAuthenticated ? <Navigate to={getLastVisitedPath()} /> : <Login onLogin={login} />
            } />
            <Route path="/signup" element={
              isAuthenticated ? <Navigate to={getLastVisitedPath()} /> : <Signup onSignup={signup} />
            } />
            
            {/* Protected routes - wrapped in Layout component for authenticated users */}
            <Route element={<ProtectedRoute isAuthenticated={isAuthenticated} />}>
              <Route element={<Layout onLogout={logout} />}>
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/transactions" element={<Transactions />} />
                <Route path="/accounts" element={<Accounts />} />
                <Route path="/budgets" element={<Budgets />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/settings" element={<Settings />} />
                <Route path="/help" element={<Help />} />
                <Route path="/quick-transfer" element={<QuickTransfer />} />
              </Route>
            </Route>
            
            {/* Redirect to last visited path if authenticated, or landing page if not */}
            <Route 
              path="*" 
              element={isAuthenticated ? <Navigate to={getLastVisitedPath()} /> : <Navigate to="/" />} 
            />
          </Routes>
        </div>
      </PathTracker>
    </Router>
  );
}

export default App;