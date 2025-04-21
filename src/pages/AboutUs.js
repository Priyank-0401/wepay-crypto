import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Pages.css';
import '../styles/AboutUs.css';
import logoImage from '../assets/images/logo.png';

const AboutUs = () => {
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
          <Link to="/about-us">About Us</Link>
          <Link to="/team">Team</Link>
        </div>
        <div className="auth-buttons">
          <Link to="/login" className="login-btn">Log In</Link>
          <Link to="/signup" className="create-account-btn">Create Account</Link>
        </div>
      </header>

      {/* Main page content */}
      <div className="info-page-header">
        <h1 className="info-page-title">About WePay</h1>
        <p className="info-page-subtitle">A blockchain-powered payment platform designed for secure and tamper-proof financial transactions.</p>
      </div>

      <div className="info-page-content">
        <section className="info-section">
          <h2 className="info-section-title">Our Mission</h2>
          <div className="mission-content">
            <div className="mission-text">
              <p className="info-text">
                At WePay, our mission is to revolutionize digital payments through blockchain technology, creating a secure, transparent, and efficient financial ecosystem for everyone. We believe in the power of decentralized systems to eliminate fraud and third-party interference in financial transactions.
              </p>
              <p className="info-text">
                We're building a scalable platform that can handle thousands of concurrent users today, with a vision to process millions of microtransactions annually in the future, all while maintaining the highest levels of security and user privacy.
              </p>
            </div>
            <div className="mission-image" style={{ backgroundColor: "#f2f2f2", height: "300px", width: "450px", borderRadius: "8px" }}></div>
          </div>
        </section>

        <section className="info-section">
          <h2 className="info-section-title">Our Story</h2>
          <div className="story-timeline">
            <div className="timeline-item">
              <div className="timeline-year">2024</div>
              <div className="timeline-content">
                <h3>The Beginning</h3>
                <p>
                  WePay was conceived by Priyank Pahwa, a blockchain developer with a vision to create a secure and efficient financial transaction platform leveraging blockchain technology.
                </p>
              </div>
            </div>
            
            <div className="timeline-item">
              <div className="timeline-year">Jan 2025</div>
              <div className="timeline-content">
                <h3>Development Started</h3>
                <p>
                  Development of WePay began, focusing on creating smart contracts in Solidity that could ensure fraud-proof transactions without third-party interference.
                </p>
              </div>
            </div>
            
            <div className="timeline-item">
              <div className="timeline-year">Feb 2025</div>
              <div className="timeline-content">
                <h3>Frontend Development</h3>
                <p>
                  We designed a user-friendly frontend with React.js to enhance accessibility and ease of use for all users, regardless of their technical background.
                </p>
              </div>
            </div>
            
            <div className="timeline-item">
              <div className="timeline-year">Mar 2025</div>
              <div className="timeline-content">
                <h3>Backend Architecture</h3>
                <p>
                  Our team architected a scalable backend capable of handling thousands of transactions per month, with plans to scale to millions of microtransactions annually.
                </p>
              </div>
            </div>
            
            <div className="timeline-item">
              <div className="timeline-year">Apr 2025</div>
              <div className="timeline-content">
                <h3>Wallet Integration</h3>
                <p>
                  We integrated wallet management features, laying the groundwork for future multi-currency transaction support and cross-border capabilities.
                </p>
              </div>
            </div>
            
            <div className="timeline-item">
              <div className="timeline-year">2025+</div>
              <div className="timeline-content">
                <h3>The Future</h3>
                <p>
                  We're working on scaling the platform to support 1,000+ concurrent users and businesses globally, with a focus on facilitating seamless cross-border transactions with minimal fees.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="info-section">
          <h2 className="info-section-title">Our Values</h2>
          <div className="values-grid">
            <div className="value-card">
              <h3 className="value-title">Security</h3>
              <p className="value-description">
                We prioritize the security of financial transactions through blockchain technology, ensuring tamper-proof and fraud-resistant operations.
              </p>
            </div>
            
            <div className="value-card">
              <h3 className="value-title">Transparency</h3>
              <p className="value-description">
                We believe in complete transparency in financial transactions, leveraging blockchain's immutable ledger to provide verifiable records.
              </p>
            </div>
            
            <div className="value-card">
              <h3 className="value-title">Efficiency</h3>
              <p className="value-description">
                Our platform is designed to process transactions efficiently, reducing costs and time compared to traditional financial systems.
              </p>
            </div>
            
            <div className="value-card">
              <h3 className="value-title">Accessibility</h3>
              <p className="value-description">
                We strive to make blockchain technology accessible to everyone through intuitive interfaces and user-friendly experiences.
              </p>
            </div>
            
            <div className="value-card">
              <h3 className="value-title">Innovation</h3>
              <p className="value-description">
                We continuously innovate to improve our platform and stay at the forefront of blockchain and financial technology.
              </p>
            </div>
            
            <div className="value-card">
              <h3 className="value-title">Scalability</h3>
              <p className="value-description">
                We're building systems that can scale from thousands to millions of users and transactions without compromising performance.
              </p>
            </div>
          </div>
        </section>

        <section className="info-section">
          <h2 className="info-section-title">Our Technology</h2>
          <div className="tech-content">
            <div className="tech-text">
              <p className="info-text">
                WePay is built on robust blockchain infrastructure using Solidity smart contracts that ensure security, speed, and reliability for all transactions. Our technology combines decentralized finance principles with user-friendly interfaces to create a seamless payment experience.
              </p>
              <p className="info-text">
                We've engineered smart contracts to ensure fraud-proof transactions and eliminate third-party interference, while our React.js frontend enhances accessibility and ease of use for all users.
              </p>
              <p className="info-text">
                Our platform is designed to be scalable, capable of handling thousands of transactions today with a clear path to processing millions of microtransactions in the future.
              </p>
            </div>
            <div className="tech-features">
              <div className="tech-feature">
                <h3>Smart Contracts</h3>
                <p>Secure, fraud-resistant contracts written in Solidity to automate and protect transactions.</p>
              </div>
              <div className="tech-feature">
                <h3>React.js Frontend</h3>
                <p>User-friendly interface designed for accessibility and ease of use for all users.</p>
              </div>
              <div className="tech-feature">
                <h3>Scalable Backend</h3>
                <p>Architecture capable of handling growing transaction volumes efficiently and securely.</p>
              </div>
              <div className="tech-feature">
                <h3>Wallet Management</h3>
                <p>Integrated wallet features with plans for multi-currency and cross-border support.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="info-section">
          <h2 className="info-section-title">Future Vision</h2>
          <div className="vision-content">
            <p className="info-text">
              Our vision for WePay extends beyond its current capabilities. We're working towards:
            </p>
            <div className="vision-points">
              <div className="vision-point">
                <h3>Global Reach</h3>
                <p>Scaling the platform to support 1,000+ concurrent users and businesses globally.</p>
              </div>
              <div className="vision-point">
                <h3>Cross-Border Transactions</h3>
                <p>Facilitating seamless international payments with minimal fees using blockchain technology.</p>
              </div>
              <div className="vision-point">
                <h3>Multi-Currency Support</h3>
                <p>Expanding our wallet management features to support transactions in multiple cryptocurrencies.</p>
              </div>
              <div className="vision-point">
                <h3>Enterprise Integration</h3>
                <p>Creating APIs and tools for businesses to easily integrate WePay into their financial systems.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="info-section">
          <h2 className="info-section-title">Join Our Journey</h2>
          <p className="info-text">
            We're building the future of digital payments, and we invite you to be part of this revolutionary journey. Whether you're an individual looking for secure transactions or a business seeking efficient payment solutions, WePay is designed with you in mind.
          </p>
          <div className="cta-container">
            <Link to="/signup" className="cta-button">Create Your Account</Link>
            <Link to="/team" className="secondary-button">Meet Our Team</Link>
          </div>
        </section>
      </div>

      <footer className="footer">
        <div className="footer-container">
          <div className="footer-logo">
            <Link to="/" className="logo-link">
              <img src={logoImage} alt="WePay Logo" className="footer-logo-img" />
              <span className="logo-text">WePay</span>
            </Link>
            <p>Secure blockchain transactions for everyone</p>
          </div>
          <div className="footer-links">
            <div className="footer-column">
              <h4>Company</h4>
              <ul>
                <li><Link to="/about-us">About Us</Link></li>
                <li><Link to="/team">Our Team</Link></li>
              </ul>
            </div>
            <div className="footer-column">
              <h4>Resources</h4>
              <ul>
                <li><Link to="/features">Features</Link></li>
                <li><Link to="/security">Security</Link></li>
              </ul>
            </div>
            <div className="footer-column">
              <h4>Legal</h4>
              <ul>
                <li><Link to="/terms-of-service">Terms of Service</Link></li>
                <li><Link to="/privacy-policy">Privacy Policy</Link></li>
              </ul>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; 2025 WePay. All rights reserved.</p>
          <p>Created by Priyank Pahwa</p>
        </div>
      </footer>
    </div>
  );
};

export default AboutUs; 