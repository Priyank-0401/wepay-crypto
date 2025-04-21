import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Pages.css';
import '../styles/Features.css';
import logoImage from '../assets/images/logo.png';

const Features = () => {
  return (
    <div className="info-page">
      {/* Header section with navigation */}
      <header className="header">
        <div className="logo">
          <Link to="/" className="logo-link">
            <img src={logoImage} alt="WePay Logo" className="header-logo-img" />
            <span className="logo-text">WePay</span>
          </Link>
        </div>
        <div className="nav-links">
          <Link to="/features">Features</Link>
          <Link to="/security">Security</Link>
          <Link to="/advantages">Advantages</Link>
        </div>
        <div className="auth-buttons">
          <Link to="/login" className="login-btn">Log In</Link>
          <Link to="/signup" className="create-account-btn">Create Account</Link>
        </div>
      </header>

      {/* Main page content */}
      <div className="info-page-header">
        <h1 className="info-page-title">Powerful Ethereum Transaction Features</h1>
        <p className="info-page-subtitle">Discover the innovative features that make WePay the leading platform for Ethereum transactions.</p>
      </div>

      <div className="info-page-content">
        <section className="info-section">
          <h2 className="info-section-title">Key Features</h2>
          <p className="info-text">
            WePay provides a comprehensive suite of features designed to make Ethereum transactions simple, secure, and efficient for both beginners and experienced users.
          </p>
          
          <div className="info-grid">
            <div className="info-card">
              <div className="info-card-icon">🔄</div>
              <h3 className="info-card-title">Seamless Transactions</h3>
              <p className="info-card-text">
                Send and receive Ethereum with just a few clicks. Our intuitive interface makes transactions faster and simpler than ever before.
              </p>
            </div>
            
            <div className="info-card">
              <div className="info-card-icon">📊</div>
              <h3 className="info-card-title">Real-time Analytics</h3>
              <p className="info-card-text">
                Track your transaction history, monitor gas fees, and analyze your portfolio with our powerful analytics dashboard.
              </p>
            </div>
            
            <div className="info-card">
              <div className="info-card-icon">🔐</div>
              <h3 className="info-card-title">Enhanced Security</h3>
              <p className="info-card-text">
                Rest easy knowing your transactions are protected by military-grade encryption and multi-factor authentication.
              </p>
            </div>
            
            <div className="info-card">
              <div className="info-card-icon">⚡</div>
              <h3 className="info-card-title">Lightning Fast</h3>
              <p className="info-card-text">
                Experience the fastest transaction speeds with our optimized gas fee estimator and network prioritization.
              </p>
            </div>
            
            <div className="info-card">
              <div className="info-card-icon">📱</div>
              <h3 className="info-card-title">Mobile Ready</h3>
              <p className="info-card-text">
                Access your wallet and make transactions on the go with our responsive mobile interface.
              </p>
            </div>
            
            <div className="info-card">
              <div className="info-card-icon">🔄</div>
              <h3 className="info-card-title">Automatic Backups</h3>
              <p className="info-card-text">
                Never worry about losing access to your funds with our secure automatic backup system.
              </p>
            </div>
          </div>
        </section>
        
        <section className="info-section">
          <h2 className="info-section-title">Advanced Capabilities</h2>
          <p className="info-text">
            Beyond basic transactions, WePay offers advanced features for power users and businesses who need more control over their Ethereum operations.
          </p>
          
          <div className="info-grid">
            <div className="info-card">
              <div className="info-card-icon">📃</div>
              <h3 className="info-card-title">Smart Contract Integration</h3>
              <p className="info-card-text">
                Deploy and interact with smart contracts directly through our intuitive interface, without writing a single line of code.
              </p>
            </div>
            
            <div className="info-card">
              <div className="info-card-icon">⚙️</div>
              <h3 className="info-card-title">Gas Optimization</h3>
              <p className="info-card-text">
                Our advanced gas optimization algorithms analyze network conditions in real-time to ensure your transactions are processed efficiently with minimal fees, saving you up to 30% on transaction costs.
              </p>
            </div>
            
            <div className="info-card">
              <div className="info-card-icon">⏱️</div>
              <h3 className="info-card-title">Scheduled Transactions</h3>
              <p className="info-card-text">
                Plan ahead by scheduling transactions for future dates and times, perfect for recurring payments.
              </p>
            </div>
            
            <div className="info-card">
              <div className="info-card-icon">📈</div>
              <h3 className="info-card-title">Market Insights</h3>
              <p className="info-card-text">
                Make informed decisions with real-time market data, price alerts, and trend analysis integrated directly into your dashboard.
              </p>
            </div>
            
            <div className="info-card">
              <div className="info-card-icon">🔗</div>
              <h3 className="info-card-title">Multi-chain Support</h3>
              <p className="info-card-text">
                Expand beyond Ethereum with support for multiple blockchain networks and cross-chain transactions.
              </p>
            </div>
          </div>
        </section>
        
        <section className="info-section">
          <h2 className="info-section-title">Enterprise Solutions</h2>
          <p className="info-text">
            WePay offers specialized features for businesses and enterprise clients who require robust solutions for their blockchain operations.
          </p>
          
          <div className="info-grid">
            <div className="info-card">
              <div className="info-card-icon">👥</div>
              <h3 className="info-card-title">Team Management</h3>
              <p className="info-card-text">
                Set up multiple user accounts with customizable permissions and approval workflows for your organization.
              </p>
            </div>
            
            <div className="info-card">
              <div className="info-card-icon">📊</div>
              <h3 className="info-card-title">Advanced Reporting</h3>
              <p className="info-card-text">
                Generate comprehensive reports for accounting, taxation, and compliance purposes with just a few clicks.
              </p>
            </div>
            
            <div className="info-card">
              <div className="info-card-icon">🔌</div>
              <h3 className="info-card-title">API Integration</h3>
              <p className="info-card-text">
                Integrate WePay's powerful features directly into your existing software and systems with our robust API.
              </p>
            </div>
            
            <div className="info-card">
              <div className="info-card-icon">🛡️</div>
              <h3 className="info-card-title">Custom Security Policies</h3>
              <p className="info-card-text">
                Implement custom security policies tailored to your organization's specific requirements and risk profile.
              </p>
            </div>
          </div>
        </section>
        
        <div className="cta-section" style={{ padding: "3rem", textAlign: "center", marginTop: "3rem" }}>
          <h2>Ready to experience these features?</h2>
          <p>Create your free account today and start making secure Ethereum transactions in minutes.</p>
          <Link to="/signup" className="btn btn-primary" style={{ marginTop: "1.5rem" }}>Get Started Now</Link>
        </div>
      </div>
      
      {/* Footer */}
      <footer className="footer">
        <div className="footer-container">
          <div className="footer-logo">
            <Link to="/" className="logo-link">
              <img src={logoImage} alt="WePay Logo" className="footer-logo-img" />
              <span className="logo-text">WePay</span>
            </Link>
          </div>
          <div className="footer-links">
            <div className="footer-column">
              <h4>Product</h4>
              <ul>
                <li><Link to="/features">Features</Link></li>
                <li><Link to="/security">Security</Link></li>
                <li><Link to="/advantages">Advantages</Link></li>
                <li><Link to="/roadmap">Roadmap</Link></li>
              </ul>
            </div>
            <div className="footer-column">
              <h4>Company</h4>
              <ul>
                <li><Link to="/about-us">About Us</Link></li>
                <li><Link to="/team">Team</Link></li>
                <li><Link to="/careers">Careers</Link></li>
                <li><Link to="/press">Press</Link></li>
              </ul>
            </div>
            <div className="footer-column">
              <h4>Resources</h4>
              <ul>
                <li><Link to="/documentation">Documentation</Link></li>
                <li><Link to="/api">API</Link></li>
                <li><Link to="/blog">Blog</Link></li>
                <li><Link to="/community">Community</Link></li>
              </ul>
            </div>
            <div className="footer-column">
              <h4>Legal</h4>
              <ul>
                <li><Link to="/terms-of-service">Terms of Service</Link></li>
                <li><Link to="/privacy-policy">Privacy Policy</Link></li>
                <li><Link to="/compliance">Compliance</Link></li>
                <li><Link to="/cookie-policy">Cookie Policy</Link></li>
              </ul>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <div className="social-icons">
            <a href="#twitter" className="social-icon">Twitter</a>
            <a href="#telegram" className="social-icon">Telegram</a>
            <a href="#discord" className="social-icon">Discord</a>
            <a href="#github" className="social-icon">GitHub</a>
          </div>
          <p className="copyright">© 2025 WePay. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Features; 