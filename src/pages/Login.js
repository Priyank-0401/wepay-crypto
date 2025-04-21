import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/Auth.css';
import logoImage from '../assets/images/logo.png';

const LoginPage = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const navigate = useNavigate();

  // Check if user is already logged in
  useEffect(() => {
    const checkAuth = () => {
      const userString = localStorage.getItem('user');
      const token = localStorage.getItem('token');
      
      if (userString && token) {
        try {
          // Verify user data is valid
          const userData = JSON.parse(userString);
          if (userData && (userData.id || userData.email)) {
            // User is already logged in
            console.log("User already logged in, redirecting to dashboard");
            onLogin(userData); // Update app authentication state
            navigate('/dashboard');
          } else {
            // Invalid user data
            localStorage.removeItem('user');
            localStorage.removeItem('token');
          }
        } catch (e) {
          console.error("Invalid user data in localStorage:", e);
          localStorage.removeItem('user');
          localStorage.removeItem('token');
        }
      }
    };
    
    checkAuth();
  }, [navigate, onLogin]);

  // Handle successful login redirection
  useEffect(() => {
    if (isLoggedIn) {
      console.log("Login successful, redirecting to dashboard");
      navigate('/dashboard', { replace: true });
    }
  }, [isLoggedIn, navigate]);

  useEffect(() => {
    // Check if user has a dark mode preference in localStorage
    const savedMode = localStorage.getItem('darkMode');
    if (savedMode) {
      setDarkMode(savedMode === 'true');
    } else {
      // Check if user's system prefers dark mode
      const prefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
      setDarkMode(prefersDarkMode);
    }

    // Listen for changes to darkMode in localStorage
    const handleStorageChange = () => {
      const currentMode = localStorage.getItem('darkMode');
      if (currentMode) {
        setDarkMode(currentMode === 'true');
      }
    };
    
    window.addEventListener('storage', handleStorageChange);
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  useEffect(() => {
    // Apply dark mode class if needed
    if (darkMode) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
  }, [darkMode]);

  const toggleDarkMode = () => {
    const newDarkMode = !darkMode;
    setDarkMode(newDarkMode);
    localStorage.setItem('darkMode', newDarkMode);
    
    if (newDarkMode) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (isLoading) return; // Prevent multiple submissions
    
    setIsLoading(true);
    setError('');
    
    try {
      console.log("Attempting login...");
      // Call to your PHP backend
      const response = await fetch('http://localhost/wepay-crypto/server/api/auth/login.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
      
      const data = await response.json();
      
      if (data.success) {
        console.log("Login successful, storing user data:", data.user);
        
        // Ensure data.user is not undefined before storing it
        if (data.user) {
          // Store user info
          localStorage.setItem('user', JSON.stringify(data.user));
          localStorage.setItem('token', data.token || 'dummy-token');
          
          // Update app authentication state
          onLogin(data.user); // Pass the user data to the onLogin function
          
          // Set logged in state to trigger redirection
          setIsLoggedIn(true);
        } else {
          setError('Invalid user data received from server');
          setIsLoading(false);
        }
      } else {
        console.log("Login failed:", data.message);
        setError(data.message || 'Invalid credentials');
        setIsLoading(false);
      }
    } catch (error) {
      console.error("Login error:", error);
      setError('Server error. Please try again.');
      setIsLoading(false);
    }
  };

  // Rest of your component remains the same
  return (
    <div className={`auth-page ${darkMode ? 'dark-mode' : ''}`}>
      <header className="header">
        <Link to="/" className="logo-link">
          <img src={logoImage} alt="WePay Logo" className="auth-logo-img" />
          <span className="logo-text">WePay</span>
        </Link>
        <div className="auth-buttons">
          <button className="dark-mode-toggle" onClick={toggleDarkMode}>
            <span className="icon">{darkMode ? '☀️' : '🌙'}</span>
          </button>
          <div className="auth-switch">
            <span>Don't have an account?</span>
            <Link to="/signup" className="auth-switch-btn">Sign Up</Link>
          </div>
        </div>
      </header>

      <main className="auth-main">
        <div className="auth-container">
          <div className="auth-form-container">
            <div className="auth-form-header">
              <h1>Log In to Your Account</h1>
              <p>Welcome back to WePay</p>
            </div>

            {error && <div className="error-message" style={{color: 'red', marginBottom: '15px'}}>{error}</div>}

            <form className="auth-form" onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="email">Email Address</label>
                <input
                  type="email"
                  id="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  required
                  disabled={isLoading}
                />
              </div>

              <div className="form-group">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  required
                  disabled={isLoading}
                />
                {/* <div className="forgot-password">
                  <Link to="/forgot-password">Forgot Password?</Link>
                </div> */}
              </div>

              <button type="submit" className="auth-submit-btn" disabled={isLoading}>
                {isLoading ? 'Logging in...' : 'Log In'}
              </button>
            </form>

          </div>

          <div className="auth-graphic">
            <div className="blockchain-graphic">
              <div className="block block-1">
                <div className="transaction-data">
                  <div className="tx-row"><span>Tx Hash:</span><span>0x8fd...</span></div>
                  <div className="tx-row"><span>From:</span><span>0x1a2...</span></div>
                  <div className="tx-row"><span>To:</span><span>0x3b4...</span></div>
                </div>
              </div>
              <div className="block block-2">
                <div className="transaction-data">
                  <div className="tx-row"><span>Tx Hash:</span><span>0x7ec...</span></div>
                  <div className="tx-row"><span>From:</span><span>0x5d6...</span></div>
                  <div className="tx-row"><span>To:</span><span>0x9f0...</span></div>
                </div>
              </div>
              <div className="block block-3">
                <div className="transaction-data">
                  <div className="tx-row"><span>Status:</span><span>Success</span></div>
                  <div className="tx-row"><span>Gas:</span><span>0.005 ETH</span></div>
                  <div className="tx-row"><span>Time:</span><span>12s ago</span></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <footer className="auth-footer">
        <div className="footer-links">
          <Link to="/terms">Terms of Service</Link>
          <Link to="/privacy">Privacy Policy</Link>
          <Link to="/contact">Contact Support</Link>
        </div>
        <p className="copyright">© 2025 WePay. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default LoginPage;