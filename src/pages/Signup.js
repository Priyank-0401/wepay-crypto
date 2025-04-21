import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/Auth.css';
import logoImage from '../assets/images/logo.png';

const SignupPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user has a preference stored
    const isDarkMode = localStorage.getItem('darkMode') === 'true';
    setDarkMode(isDarkMode);
    
    // Apply dark mode class if needed
    if (isDarkMode) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
  }, []);
  
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
    
    // Basic validation
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    
    setIsLoading(true);
    
    try {
      // Call to PHP backend
      const response = await fetch('http://localhost/wepay-crypto/server/api/auth/signup.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, password }),
      });
      
      const data = await response.json();
      
      if (data.success) {
        // Redirect to login
        navigate('/login');
      } else {
        setError(data.message || 'Registration failed');
      }
    } catch (err) {
      setError('Server error. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

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
            <span>Already have an account?</span>
            <Link to="/login" className="auth-switch-btn">Log In</Link>
          </div>
        </div>
      </header>

      <main className="auth-main">
        <div className="auth-container">
          <div className="auth-form-container">
            <div className="auth-form-header">
              <h1>Create Your Account</h1>
              <p>Join WePay for secure and fast Ethereum transactions</p>
            </div>

            {error && <div className="error-message" style={{color: 'red', marginBottom: '15px'}}>{error}</div>}

            <form className="auth-form" onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="name">Full Name</label>
                <input
                  type="text"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter your full name"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="email">Email Address</label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Create a strong password"
                  required
                />
                <div className="password-strength">
                  <div className="strength-meter">
                    <div className="strength-bar" style={{ width: password.length > 8 ? '100%' : `${password.length * 10}%` }}></div>
                  </div>
                  <span>Use 8+ characters with a mix of letters, numbers & symbols</span>
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="confirm-password">Confirm Password</label>
                <input
                  type="password"
                  id="confirm-password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Confirm your password"
                  required
                />
              </div>

              <div className="terms-checkbox">
                <input
                  type="checkbox"
                  id="terms"
                  checked={agreeTerms}
                  onChange={(e) => setAgreeTerms(e.target.checked)}
                  required
                />
                <label htmlFor="terms">
                  I agree to the <Link to="/terms">Terms of Service</Link> and <Link to="/privacy">Privacy Policy</Link>
                </label>
              </div>

              <button type="submit" className="auth-submit-btn" disabled={isLoading}>
                {isLoading ? 'Creating Account...' : 'Create Account'}
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

export default SignupPage;