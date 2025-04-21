import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Pages.css';
import '../styles/Security.css';
import logoImage from '../assets/images/logo.png';

const Security = () => {
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
        <h1 className="info-page-title">Security Infrastructure</h1>
        <p className="info-page-subtitle">Our commitment to protecting your transactions and data with industry-leading security measures.</p>
      </div>

      <div className="info-page-content">
        <section className="info-section">
          <h2 className="info-section-title">Enterprise-Grade Security</h2>
          <p className="info-text">
            At WePay, security is our top priority. We employ multiple layers of protection to ensure your assets and personal information remain safe at all times.
          </p>
          
          <div className="info-grid">
            <div className="info-card">
              <div className="info-card-icon">🔒</div>
              <h3 className="info-card-title">End-to-End Encryption</h3>
              <p className="info-card-text">
                All data transmitted through our platform is protected with military-grade encryption, ensuring your information can't be intercepted or read by unauthorized parties.
              </p>
            </div>
            
            <div className="info-card">
              <div className="info-card-icon">🛡️</div>
              <h3 className="info-card-title">Multi-Factor Authentication</h3>
              <p className="info-card-text">
                Add an extra layer of protection to your account with our MFA options, including SMS verification, authenticator apps, and hardware security keys.
              </p>
            </div>
            
            <div className="info-card">
              <div className="info-card-icon">👁️</div>
              <h3 className="info-card-title">24/7 Monitoring</h3>
              <p className="info-card-text">
                Our security team monitors our systems around the clock for suspicious activities, preventing potential threats before they affect your account.
              </p>
            </div>
            
            <div className="info-card">
              <div className="info-card-icon">🔍</div>
              <h3 className="info-card-title">Regular Security Audits</h3>
              <p className="info-card-text">
                We conduct frequent internal and third-party security audits to identify and address potential vulnerabilities in our systems.
              </p>
            </div>
          </div>
        </section>
        
        <section className="info-section">
          <h2 className="info-section-title">Smart Contract Security</h2>
          <p className="info-text">
            As a blockchain-based platform, we take extraordinary measures to ensure our smart contracts are secure and reliable.
          </p>
          
          <div className="info-grid">
            <div className="info-card">
              <div className="info-card-icon">📃</div>
              <h3 className="info-card-title">Rigorous Code Reviews</h3>
              <p className="info-card-text">
                All smart contracts undergo extensive peer reviews by our security engineers before deployment to ensure they function exactly as intended.
              </p>
            </div>
            
            <div className="info-card">
              <div className="info-card-icon">🔬</div>
              <h3 className="info-card-title">Third-Party Audits</h3>
              <p className="info-card-text">
                Our smart contracts are audited by leading blockchain security firms to verify their integrity and identify potential vulnerabilities.
              </p>
            </div>
            
            <div className="info-card">
              <div className="info-card-icon">🧪</div>
              <h3 className="info-card-title">Comprehensive Testing</h3>
              <p className="info-card-text">
                We employ extensive testing protocols, including unit tests, integration tests, and simulation testing to ensure our smart contracts perform correctly under all conditions.
              </p>
            </div>
            
            <div className="info-card">
              <div className="info-card-icon">🔐</div>
              <h3 className="info-card-title">Multi-Signature Controls</h3>
              <p className="info-card-text">
                Critical operations require multiple approvals through our multi-signature system, preventing unauthorized changes to smart contracts.
              </p>
            </div>
          </div>
        </section>
        
        <section className="info-section">
          <h2 className="info-section-title">Data Protection</h2>
          <p className="info-text">
            We implement strict data protection measures to safeguard your personal information and transaction history.
          </p>
          
          <div className="info-grid">
            <div className="info-card">
              <div className="info-card-icon">🔒</div>
              <h3 className="info-card-title">Secure Data Storage</h3>
              <p className="info-card-text">
                All sensitive data is stored using industry-standard encryption protocols, with multiple layers of access controls.
              </p>
            </div>
            
            <div className="info-card">
              <div className="info-card-icon">🗄️</div>
              <h3 className="info-card-title">Regular Backups</h3>
              <p className="info-card-text">
                We maintain regular, encrypted backups of all data to ensure continuity and prevent loss in case of system failures.
              </p>
            </div>
            
            <div className="info-card">
              <div className="info-card-icon">🚫</div>
              <h3 className="info-card-title">Minimal Data Collection</h3>
              <p className="info-card-text">
                We adhere to the principle of data minimization, collecting only the information necessary to provide our services.
              </p>
            </div>
            
            <div className="info-card">
              <div className="info-card-icon">📊</div>
              <h3 className="info-card-title">Anonymized Analytics</h3>
              <p className="info-card-text">
                Any data used for platform improvement is anonymized and aggregated to protect your privacy.
              </p>
            </div>
          </div>
        </section>
        
        <section className="info-section">
          <h2 className="info-section-title">User Security Features</h2>
          <p className="info-text">
            We provide you with powerful tools to maintain control over your account security.
          </p>
          
          <div className="info-grid">
            <div className="info-card">
              <div className="info-card-icon">🔑</div>
              <h3 className="info-card-title">Advanced Password Requirements</h3>
              <p className="info-card-text">
                We enforce strong password policies and regularly prompt for password updates to maintain account security.
              </p>
            </div>
            
            <div className="info-card">
              <div className="info-card-icon">📱</div>
              <h3 className="info-card-title">Device Management</h3>
              <p className="info-card-text">
                View and manage all devices that have accessed your account, with the ability to revoke access from any device instantly.
              </p>
            </div>
            
            <div className="info-card">
              <div className="info-card-icon">🔔</div>
              <h3 className="info-card-title">Activity Notifications</h3>
              <p className="info-card-text">
                Receive real-time alerts for account logins, transactions, and security-relevant changes to your account.
              </p>
            </div>
            
            <div className="info-card">
              <div className="info-card-icon">⏱️</div>
              <h3 className="info-card-title">Session Timeouts</h3>
              <p className="info-card-text">
                Automatic session timeouts after periods of inactivity protect your account when you're away from your device.
              </p>
            </div>
          </div>
        </section>
        
        <div className="cta-section" style={{ padding: "3rem", textAlign: "center", marginTop: "3rem" }}>
          <h2>Ready to experience secure blockchain transactions?</h2>
          <p>Create your free account today and enjoy peace of mind with our comprehensive security infrastructure.</p>
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

export default Security; 