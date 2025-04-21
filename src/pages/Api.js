import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Pages.css';
import '../styles/API.css';
import logoImage from '../assets/images/logo.png';

const Api = () => {
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
          <Link to="/documentation">Documentation</Link>
          <Link to="/api">API</Link>
          <Link to="/blog">Blog</Link>
        </div>
        <div className="auth-buttons">
          <Link to="/login" className="login-btn">Log In</Link>
          <Link to="/signup" className="create-account-btn">Create Account</Link>
        </div>
      </header>

      {/* Main page content */}
      <div className="info-page-header">
        <h1 className="info-page-title">API Reference</h1>
        <p className="info-page-subtitle">Integrate WePay functionality into your applications with our comprehensive API.</p>
      </div>

      <div className="info-page-content">
        <div style={{ maxWidth: "800px", margin: "0 auto" }}>
          <section className="info-section">
            <h2 className="info-section-title">API Overview</h2>
            <p className="info-text">
              The WePay API allows developers to integrate Ethereum transaction capabilities into their own applications, websites, and services. Our RESTful API provides secure access to wallet management, transaction processing, and account services.
            </p>
            <div className="alert" style={{ backgroundColor: "#f8f9fa", padding: "1rem", borderRadius: "8px", marginBottom: "2rem" }}>
              <p style={{ marginBottom: 0 }}><strong>Note:</strong> To use the WePay API, you need to register for API access through your WePay account.</p>
            </div>
          </section>

          <section className="info-section">
            <h2 className="info-section-title">Getting Started</h2>
            <p className="info-text">
              Follow these steps to start using the WePay API:
            </p>
            <ol style={{ paddingLeft: "1.5rem" }}>
              <li>Create a WePay account if you don't already have one</li>
              <li>Go to your Developer Settings and register a new API application</li>
              <li>Generate API keys for your application</li>
              <li>Read the authentication documentation to understand how to secure your API requests</li>
              <li>Start making API calls using our comprehensive endpoints</li>
            </ol>
            <div style={{ marginTop: "2rem" }}>
              <a href="#api-registration" className="btn btn-primary">Register for API Access</a>
            </div>
          </section>

          <section className="info-section">
            <h2 className="info-section-title">API Reference</h2>
            <p className="info-text">
              Explore our API endpoints and their capabilities:
            </p>
            <div className="api-endpoints" style={{ marginTop: "1.5rem" }}>
              <div className="endpoint-card" style={{ border: "1px solid #eaeaea", borderRadius: "8px", marginBottom: "1rem", overflow: "hidden" }}>
                <div style={{ padding: "1rem", borderBottom: "1px solid #eaeaea", backgroundColor: "#f8f9fa" }}>
                  <span style={{ backgroundColor: "#28a745", color: "white", padding: "0.25rem 0.5rem", borderRadius: "4px", marginRight: "0.5rem", fontSize: "0.875rem" }}>GET</span>
                  <span style={{ fontFamily: "monospace" }}>/api/v1/account</span>
                </div>
                <div style={{ padding: "1rem" }}>
                  <p style={{ margin: "0 0 0.5rem" }}><strong>Get Account Information</strong></p>
                  <p style={{ margin: "0", fontSize: "0.875rem" }}>Retrieve details about the authenticated user's account.</p>
                </div>
              </div>

              <div className="endpoint-card" style={{ border: "1px solid #eaeaea", borderRadius: "8px", marginBottom: "1rem", overflow: "hidden" }}>
                <div style={{ padding: "1rem", borderBottom: "1px solid #eaeaea", backgroundColor: "#f8f9fa" }}>
                  <span style={{ backgroundColor: "#007bff", color: "white", padding: "0.25rem 0.5rem", borderRadius: "4px", marginRight: "0.5rem", fontSize: "0.875rem" }}>POST</span>
                  <span style={{ fontFamily: "monospace" }}>/api/v1/transactions</span>
                </div>
                <div style={{ padding: "1rem" }}>
                  <p style={{ margin: "0 0 0.5rem" }}><strong>Create Transaction</strong></p>
                  <p style={{ margin: "0", fontSize: "0.875rem" }}>Initiate a new Ethereum transaction from the authenticated user's wallet.</p>
                </div>
              </div>

              <div className="endpoint-card" style={{ border: "1px solid #eaeaea", borderRadius: "8px", marginBottom: "1rem", overflow: "hidden" }}>
                <div style={{ padding: "1rem", borderBottom: "1px solid #eaeaea", backgroundColor: "#f8f9fa" }}>
                  <span style={{ backgroundColor: "#28a745", color: "white", padding: "0.25rem 0.5rem", borderRadius: "4px", marginRight: "0.5rem", fontSize: "0.875rem" }}>GET</span>
                  <span style={{ fontFamily: "monospace" }}>/api/v1/transactions</span>
                </div>
                <div style={{ padding: "1rem" }}>
                  <p style={{ margin: "0 0 0.5rem" }}><strong>List Transactions</strong></p>
                  <p style={{ margin: "0", fontSize: "0.875rem" }}>Retrieve a paginated list of transactions for the authenticated user.</p>
                </div>
              </div>

              <div className="endpoint-card" style={{ border: "1px solid #eaeaea", borderRadius: "8px", marginBottom: "1rem", overflow: "hidden" }}>
                <div style={{ padding: "1rem", borderBottom: "1px solid #eaeaea", backgroundColor: "#f8f9fa" }}>
                  <span style={{ backgroundColor: "#28a745", color: "white", padding: "0.25rem 0.5rem", borderRadius: "4px", marginRight: "0.5rem", fontSize: "0.875rem" }}>GET</span>
                  <span style={{ fontFamily: "monospace" }}>/api/v1/gas-price</span>
                </div>
                <div style={{ padding: "1rem" }}>
                  <p style={{ margin: "0 0 0.5rem" }}><strong>Get Gas Price</strong></p>
                  <p style={{ margin: "0", fontSize: "0.875rem" }}>Retrieve current gas price estimates for slow, average, and fast transaction speeds.</p>
                </div>
              </div>
            </div>

            <div style={{ textAlign: "center", marginTop: "2rem" }}>
              <a href="#full-api-reference" className="btn btn-primary">View Full API Reference</a>
            </div>
          </section>

          <section className="info-section">
            <h2 className="info-section-title">SDKs & Libraries</h2>
            <p className="info-text">
              We provide official client libraries to help you integrate with the WePay API more easily:
            </p>
            <div className="sdk-cards" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: "1rem", marginTop: "1.5rem" }}>
              <div className="sdk-card" style={{ padding: "1.5rem", backgroundColor: "#f8f9fa", borderRadius: "8px", textAlign: "center" }}>
                <div style={{ marginBottom: "1rem", fontSize: "2rem" }}>JavaScript</div>
                <a href="#js-sdk" style={{ display: "inline-block", padding: "0.5rem 1rem", backgroundColor: "#0a85d1", color: "white", borderRadius: "0.25rem", textDecoration: "none" }}>View Docs</a>
              </div>
              <div className="sdk-card" style={{ padding: "1.5rem", backgroundColor: "#f8f9fa", borderRadius: "8px", textAlign: "center" }}>
                <div style={{ marginBottom: "1rem", fontSize: "2rem" }}>Python</div>
                <a href="#python-sdk" style={{ display: "inline-block", padding: "0.5rem 1rem", backgroundColor: "#0a85d1", color: "white", borderRadius: "0.25rem", textDecoration: "none" }}>View Docs</a>
              </div>
              <div className="sdk-card" style={{ padding: "1.5rem", backgroundColor: "#f8f9fa", borderRadius: "8px", textAlign: "center" }}>
                <div style={{ marginBottom: "1rem", fontSize: "2rem" }}>PHP</div>
                <a href="#php-sdk" style={{ display: "inline-block", padding: "0.5rem 1rem", backgroundColor: "#0a85d1", color: "white", borderRadius: "0.25rem", textDecoration: "none" }}>View Docs</a>
              </div>
              <div className="sdk-card" style={{ padding: "1.5rem", backgroundColor: "#f8f9fa", borderRadius: "8px", textAlign: "center" }}>
                <div style={{ marginBottom: "1rem", fontSize: "2rem" }}>Java</div>
                <a href="#java-sdk" style={{ display: "inline-block", padding: "0.5rem 1rem", backgroundColor: "#0a85d1", color: "white", borderRadius: "0.25rem", textDecoration: "none" }}>View Docs</a>
              </div>
            </div>
          </section>
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

export default Api; 