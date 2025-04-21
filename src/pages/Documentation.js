import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Pages.css';
import '../styles/Documentation.css';
import logoImage from '../assets/images/logo.png';

const Documentation = () => {
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
        <h1 className="info-page-title">Documentation</h1>
        <p className="info-page-subtitle">Comprehensive guides and resources to help you get the most out of WePay.</p>
      </div>

      <div className="info-page-content">
        {/* Side navigation and content */}
        <div style={{ display: "flex", gap: "2rem" }}>
          {/* Documentation navigation */}
          <div className="doc-navigation" style={{ width: "250px", flexShrink: 0 }}>
            <div style={{ position: "sticky", top: "2rem" }}>
              <h3 style={{ marginTop: 0 }}>Documentation</h3>
              <ul style={{ listStyleType: "none", padding: 0 }}>
                <li style={{ marginBottom: "1rem" }}><a href="#getting-started" style={{ textDecoration: "none", color: "#0a85d1", fontWeight: "bold" }}>Getting Started</a></li>
                <li style={{ marginBottom: "1rem" }}><a href="#account-management" style={{ textDecoration: "none", color: "#0a85d1" }}>Account Management</a></li>
                <li style={{ marginBottom: "1rem" }}><a href="#transactions" style={{ textDecoration: "none", color: "#0a85d1" }}>Transactions</a></li>
                <li style={{ marginBottom: "1rem" }}><a href="#security-features" style={{ textDecoration: "none", color: "#0a85d1" }}>Security Features</a></li>
                <li style={{ marginBottom: "1rem" }}><a href="#smart-contracts" style={{ textDecoration: "none", color: "#0a85d1" }}>Smart Contracts</a></li>
                <li style={{ marginBottom: "1rem" }}><a href="#analytics" style={{ textDecoration: "none", color: "#0a85d1" }}>Analytics & Reporting</a></li>
                <li style={{ marginBottom: "1rem" }}><a href="#troubleshooting" style={{ textDecoration: "none", color: "#0a85d1" }}>Troubleshooting</a></li>
                <li style={{ marginBottom: "1rem" }}><a href="#faqs" style={{ textDecoration: "none", color: "#0a85d1" }}>FAQs</a></li>
              </ul>
              
              <h3>Developer Resources</h3>
              <ul style={{ listStyleType: "none", padding: 0 }}>
                <li style={{ marginBottom: "1rem" }}><Link to="/api" style={{ textDecoration: "none", color: "#0a85d1" }}>API Documentation</Link></li>
                <li style={{ marginBottom: "1rem" }}><a href="#sdk" style={{ textDecoration: "none", color: "#0a85d1" }}>SDK Integration</a></li>
                <li style={{ marginBottom: "1rem" }}><a href="#webhooks" style={{ textDecoration: "none", color: "#0a85d1" }}>Webhooks</a></li>
              </ul>
            </div>
          </div>

          {/* Documentation content */}
          <div className="doc-content" style={{ flex: 1 }}>
            <section id="getting-started" className="info-section">
              <h2 className="info-section-title">Getting Started</h2>
              <p className="info-text">
                Welcome to WePay! This guide will help you quickly set up your account and start making Ethereum transactions. Follow these simple steps to get started with our platform.
              </p>

              <h3>1. Creating Your Account</h3>
              <p>
                To begin using WePay, you'll need to create an account:
              </p>
              <ol style={{ paddingLeft: "1.5rem" }}>
                <li>Click on the "Create Account" button in the top-right corner of the page</li>
                <li>Enter your email address and create a secure password</li>
                <li>Verify your email address by clicking the link sent to your inbox</li>
                <li>Complete your profile by providing the required information</li>
              </ol>
              
              <div className="info-card" style={{ padding: "1.5rem", backgroundColor: "#f8f9fa", borderRadius: "8px", marginTop: "1.5rem" }}>
                <h4 style={{ marginTop: 0 }}>Security Tip</h4>
                <p style={{ marginBottom: 0 }}>
                  Create a strong password with at least 12 characters, including uppercase and lowercase letters, numbers, and special characters. Consider using a password manager for extra security.
                </p>
              </div>

              <h3>2. Setting Up Two-Factor Authentication</h3>
              <p>
                We strongly recommend enabling two-factor authentication (2FA) to protect your account:
              </p>
              <ol style={{ paddingLeft: "1.5rem" }}>
                <li>Go to your "Account Settings" after logging in</li>
                <li>Navigate to the "Security" tab</li>
                <li>Click "Enable Two-Factor Authentication"</li>
                <li>Follow the instructions to set up 2FA using an authenticator app</li>
              </ol>

              <h3>3. Connecting Your Ethereum Wallet</h3>
              <p>
                To make transactions on WePay, you'll need to connect an Ethereum wallet:
              </p>
              <ol style={{ paddingLeft: "1.5rem" }}>
                <li>Go to the "Wallets" section in your dashboard</li>
                <li>Click "Connect Wallet" and choose one of the following options:
                  <ul>
                    <li>Connect an existing wallet (MetaMask, WalletConnect, etc.)</li>
                    <li>Create a new wallet directly on WePay</li>
                    <li>Import wallet using your private key or seed phrase (make sure you're in a secure environment)</li>
                  </ul>
                </li>
                <li>Follow the prompts to complete the wallet connection</li>
              </ol>

              <h3>4. Making Your First Transaction</h3>
              <p>
                Now that your account is set up, you can make your first transaction:
              </p>
              <ol style={{ paddingLeft: "1.5rem" }}>
                <li>Click on the "Send" button on your dashboard</li>
                <li>Enter the recipient's Ethereum address or WePay username</li>
                <li>Enter the amount you want to send</li>
                <li>Review the transaction details, including the gas fee</li>
                <li>Confirm the transaction</li>
              </ol>

              <div style={{ padding: "1.5rem", backgroundColor: "#f8f9fa", borderRadius: "8px", marginTop: "1.5rem" }}>
                <h4 style={{ marginTop: 0 }}>Video Tutorial</h4>
                <div style={{ backgroundColor: "#ddd", height: "200px", display: "flex", alignItems: "center", justifyContent: "center", borderRadius: "4px" }}>
                  <p>Video: Getting Started with WePay</p>
                </div>
                <a href="#watch-tutorial" style={{ display: "inline-block", padding: "0.5rem 1rem", backgroundColor: "#0a85d1", color: "white", borderRadius: "0.25rem", textDecoration: "none", marginTop: "1rem" }}>Watch Full Tutorial</a>
              </div>
            </section>

            <section id="account-management" className="info-section">
              <h2 className="info-section-title">Account Management</h2>
              <p className="info-text">
                Learn how to manage your WePay account, including profile settings, security options, and preferences.
              </p>

              <h3>Profile Settings</h3>
              <p>
                You can customize your profile by navigating to the "Settings" page:
              </p>
              <ul style={{ paddingLeft: "1.5rem" }}>
                <li><strong>Personal Information:</strong> Update your name, contact details, and profile picture</li>
                <li><strong>Notification Preferences:</strong> Configure email and in-app notifications</li>
                <li><strong>Language Settings:</strong> Change the display language of the platform</li>
                <li><strong>Theme Options:</strong> Choose between light and dark mode</li>
              </ul>

              <h3>Security Options</h3>
              <p>
                WePay offers several security features to protect your account:
              </p>
              <ul style={{ paddingLeft: "1.5rem" }}>
                <li><strong>Password Management:</strong> Change your password and set up password reset options</li>
                <li><strong>Two-Factor Authentication:</strong> Enable and manage 2FA methods</li>
                <li><strong>Session Management:</strong> View and terminate active sessions</li>
                <li><strong>Activity Log:</strong> Monitor account activity for suspicious behavior</li>
                <li><strong>Security Notifications:</strong> Configure alerts for login attempts and account changes</li>
              </ul>

              <h3>Wallet Management</h3>
              <p>
                Manage your connected wallets and addresses:
              </p>
              <ul style={{ paddingLeft: "1.5rem" }}>
                <li><strong>Connect Additional Wallets:</strong> Add multiple wallets to your account</li>
                <li><strong>Set Default Wallet:</strong> Choose your primary wallet for transactions</li>
                <li><strong>Wallet Security:</strong> Enable additional security measures for your wallets</li>
                <li><strong>Address Book:</strong> Save and manage recipient addresses for quick access</li>
              </ul>

              <div className="info-card" style={{ padding: "1.5rem", backgroundColor: "#f8f9fa", borderRadius: "8px", marginTop: "1.5rem" }}>
                <h4 style={{ marginTop: 0 }}>Important</h4>
                <p style={{ marginBottom: 0 }}>
                  If you're using a non-custodial wallet, remember that you are responsible for securing your private keys. WePay will never ask for your private keys or seed phrases.
                </p>
              </div>
            </section>

            <section id="transactions" className="info-section">
              <h2 className="info-section-title">Transactions</h2>
              <p className="info-text">
                Everything you need to know about making, monitoring, and managing Ethereum transactions on WePay.
              </p>

              <h3>Sending Ethereum</h3>
              <p>
                To send Ethereum to another address:
              </p>
              <ol style={{ paddingLeft: "1.5rem" }}>
                <li>From your dashboard, click the "Send" button</li>
                <li>Enter the recipient's Ethereum address or WePay username</li>
                <li>Specify the amount to send</li>
                <li>Set the gas fee (you can choose between economy, standard, or fast transactions)</li>
                <li>Review and confirm the transaction</li>
              </ol>

              <h3>Receiving Ethereum</h3>
              <p>
                To receive Ethereum from others:
              </p>
              <ol style={{ paddingLeft: "1.5rem" }}>
                <li>From your dashboard, click the "Receive" button</li>
                <li>Copy your Ethereum address or share your WePay username</li>
                <li>Optionally, generate a QR code that others can scan to send you funds</li>
                <li>Share the address or QR code with the sender</li>
              </ol>

              <h3>Transaction History</h3>
              <p>
                View and manage your transaction history:
              </p>
              <ul style={{ paddingLeft: "1.5rem" }}>
                <li><strong>Transaction List:</strong> View all your past transactions in the "Transactions" tab</li>
                <li><strong>Transaction Details:</strong> Click on any transaction to see detailed information, including:
                  <ul>
                    <li>Transaction hash</li>
                    <li>Date and time</li>
                    <li>Amount and gas fees</li>
                    <li>Status (pending, confirmed, failed)</li>
                    <li>Block confirmation count</li>
                  </ul>
                </li>
                <li><strong>Filtering and Sorting:</strong> Use filters to sort transactions by date, amount, type, or status</li>
                <li><strong>Export:</strong> Export your transaction history for accounting and tax purposes</li>
              </ul>

              <h3>Gas Fees and Optimization</h3>
              <p>
                Understanding and optimizing gas fees:
              </p>
              <ul style={{ paddingLeft: "1.5rem" }}>
                <li><strong>Gas Estimator:</strong> WePay provides real-time gas price estimates based on current network conditions</li>
                <li><strong>Fee Options:</strong> Choose between economy (slower), standard, and fast (higher cost) transaction speeds</li>
                <li><strong>Gas Price Alerts:</strong> Set up notifications for when gas prices drop below a certain threshold</li>
                <li><strong>Batch Transactions:</strong> Combine multiple operations to save on gas fees</li>
              </ul>

              <div style={{ padding: "1.5rem", backgroundColor: "#f8f9fa", borderRadius: "8px", marginTop: "1.5rem" }}>
                <h4 style={{ marginTop: 0 }}>Advanced Tip</h4>
                <p>
                  The best times to make transactions with lower gas fees are typically on weekends and during off-peak hours (late night/early morning in US time zones). You can use our gas price tracker to find the optimal time.
                </p>
              </div>
            </section>

            <div style={{ textAlign: "center", padding: "2rem 0" }}>
              <p>Looking for more detailed information?</p>
              <a href="#full-documentation" className="btn btn-primary" style={{ marginTop: "1rem" }}>Browse the Full Documentation</a>
            </div>
          </div>
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

export default Documentation; 