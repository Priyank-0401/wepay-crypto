import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../styles/Landing.css';

const Landing = () => {
  const [darkMode, setDarkMode] = useState(false);

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

  const toggleDarkMode = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    localStorage.setItem('darkMode', newMode.toString());
  };

  return (
    <div className={`landing-page ${darkMode ? 'dark-mode' : ''}`}>
      <header className="landing-header">
        <div className="landing-logo">WePay Crypto</div>
        <nav className="landing-nav">
          <a href="#features">Features</a>
          <a href="#how-it-works">How it Works</a>
          <a href="#pricing">Pricing</a>
          <a href="#support">Support</a>
        </nav>
        <div className="landing-actions">
          <button 
            className="theme-toggle" 
            onClick={toggleDarkMode}
            aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
          >
            {darkMode ? '☀️' : '🌙'}
          </button>
          <Link to="/login" className="landing-login-btn">Log In</Link>
          <Link to="/signup" className="landing-signup-btn">Sign Up</Link>
        </div>
      </header>

      <main>
        <section className="hero-section">
          <div className="hero-content">
            <h1>The Future of Crypto Payments</h1>
            <p>Send, receive, and manage your cryptocurrency with ease. A simple, secure, and modern platform for all your crypto needs.</p>
            <div className="hero-cta">
              <Link to="/signup" className="hero-btn">Get Started</Link>
              <a href="#demo" className="demo-link">See Demo</a>
            </div>
          </div>
          <div className="hero-image">
            {/* Hero image or animation */}
          </div>
        </section>

        <section id="features" className="features-section">
          <div className="section-header">
            <h2>Why Choose WePay Crypto</h2>
            <p>Experience the next generation of cryptocurrency management</p>
          </div>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">🔒</div>
              <h3>Secure Transactions</h3>
              <p>End-to-end encryption and secure wallet storage to keep your assets safe.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">⚡</div>
              <h3>Lightning Fast</h3>
              <p>Complete transactions in seconds with our optimized blockchain integration.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">📊</div>
              <h3>Advanced Analytics</h3>
              <p>Track, analyze and optimize your cryptocurrency portfolio with real-time insights.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">💸</div>
              <h3>Low Fees</h3>
              <p>Competitive transaction fees to maximize your cryptocurrency value.</p>
            </div>
          </div>
        </section>

        <section id="how-it-works" className="how-it-works-section">
          <div className="section-header">
            <h2>How It Works</h2>
            <p>Simple steps to manage your cryptocurrency</p>
          </div>
          <div className="steps-container">
            <div className="step">
              <div className="step-number">1</div>
              <h3>Create an Account</h3>
              <p>Sign up in minutes with just your email address and secure password.</p>
            </div>
            <div className="step">
              <div className="step-number">2</div>
              <h3>Connect Your Wallet</h3>
              <p>Link your existing crypto wallet or create a new one with us.</p>
            </div>
            <div className="step">
              <div className="step-number">3</div>
              <h3>Send & Receive</h3>
              <p>Start transacting with cryptocurrencies across the globe instantly.</p>
            </div>
            <div className="step">
              <div className="step-number">4</div>
              <h3>Track & Grow</h3>
              <p>Monitor your assets and transactions with our powerful dashboard.</p>
            </div>
          </div>
        </section>

        <section id="pricing" className="pricing-section">
          <div className="section-header">
            <h2>Pricing Plans</h2>
            <p>Choose the perfect plan for your needs</p>
          </div>
          <div className="pricing-container">
            <div className="pricing-card">
              <div className="pricing-header">
                <h3>Basic</h3>
                <div className="price">Free</div>
                <p>Perfect for beginners</p>
              </div>
              <ul className="pricing-features">
                <li>Up to 5 transactions per day</li>
                <li>Basic analytics</li>
                <li>Single wallet connection</li>
                <li>Email support</li>
              </ul>
              <Link to="/signup" className="pricing-btn">Get Started</Link>
            </div>
            <div className="pricing-card featured">
              <div className="pricing-badge">Popular</div>
              <div className="pricing-header">
                <h3>Pro</h3>
                <div className="price">$9.99<span>/month</span></div>
                <p>For active crypto users</p>
              </div>
              <ul className="pricing-features">
                <li>Unlimited transactions</li>
                <li>Advanced analytics</li>
                <li>Multiple wallet connections</li>
                <li>Priority support</li>
                <li>Automated reports</li>
              </ul>
              <Link to="/signup" className="pricing-btn">Get Started</Link>
            </div>
            <div className="pricing-card">
              <div className="pricing-header">
                <h3>Enterprise</h3>
                <div className="price">$29.99<span>/month</span></div>
                <p>For businesses & teams</p>
              </div>
              <ul className="pricing-features">
                <li>Everything in Pro</li>
                <li>Team management</li>
                <li>API access</li>
                <li>Dedicated account manager</li>
                <li>Custom integrations</li>
              </ul>
              <Link to="/signup" className="pricing-btn">Get Started</Link>
            </div>
          </div>
        </section>

        <section id="support" className="cta-section">
          <div className="cta-content">
            <h2>Ready to Get Started?</h2>
            <p>Join thousands of users who trust WePay Crypto for their cryptocurrency transactions.</p>
            <Link to="/signup" className="cta-btn">Create Free Account</Link>
          </div>
        </section>
      </main>

      <footer className="landing-footer">
        <div className="footer-grid">
          <div className="footer-col">
            <div className="footer-logo">WePay Crypto</div>
            <p>The next generation of cryptocurrency payments and management.</p>
            <div className="social-links">
              {/* Social media icons */}
            </div>
          </div>
          <div className="footer-col">
            <h4>Product</h4>
            <ul>
              <li><a href="#features">Features</a></li>
              <li><a href="#pricing">Pricing</a></li>
              <li><a href="#support">Support</a></li>
              <li><a href="#roadmap">Roadmap</a></li>
            </ul>
          </div>
          <div className="footer-col">
            <h4>Resources</h4>
            <ul>
              <li><a href="#blog">Blog</a></li>
              <li><a href="#guides">Guides</a></li>
              <li><a href="#docs">Documentation</a></li>
              <li><a href="#help">Help Center</a></li>
            </ul>
          </div>
          <div className="footer-col">
            <h4>Company</h4>
            <ul>
              <li><a href="#about">About Us</a></li>
              <li><a href="#careers">Careers</a></li>
              <li><a href="#contact">Contact</a></li>
              <li><a href="#privacy">Privacy Policy</a></li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <div className="copyright">&copy; {new Date().getFullYear()} WePay Crypto. All rights reserved.</div>
          <div className="footer-links">
            <a href="#terms">Terms</a>
            <a href="#privacy">Privacy</a>
            <a href="#cookies">Cookies</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing; 