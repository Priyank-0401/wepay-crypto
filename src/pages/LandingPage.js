// LandingPage.js
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../styles/Landing.css';
import logoImage from '../assets/images/logo.png';

const LandingPage = () => {
  // Force dark mode
  useEffect(() => {
    document.body.classList.add('dark-mode');
  }, []);

  return (
    <div className="landing-page dark-mode">
      <header className="header">
        <div className="logo">
          <Link to="/" className="logo-link">
            <img src={logoImage} alt="WePay Logo" className="header-logo-img" />
            <span className="logo-text">WePay</span>
          </Link>
        </div>
        <nav className="nav-links">
          <a href="#features">Features</a>
          <a href="#how-it-works">How It Works</a>
          <a href="#security">Security</a>
          <a href="#advantages">Advantages</a>
        </nav>
        <div className="auth-buttons">
          <Link to="/login" className="login-btn">Login</Link>
          <Link to="/signup" className="create-account-btn">Create Account</Link>
        </div>
      </header>

      <main>
        <section className="hero-section">
          <div className="hero-content">
            <h1>SECURE BLOCKCHAIN TRANSACTIONS FOR THE MODERN WORLD</h1>
            <p>Fast, secure, and tamper-proof transactions on the blockchain with minimal fees. Send and receive digital assets instantly across the globe.</p>
            <div className="cta-buttons">
              <Link to="/signup" className="get-started-btn">Get Started</Link>
              <a href="#learn-more" className="learn-more-btn">Learn More</a>
            </div>
          </div>
          <div className="hero-image">
            <div className="blockchain-graphic">
              <div className="block block-1">
                <div className="transaction-data">
                  <div className="tx-row"><span>Tx Hash:</span><span>0x8fd...</span></div>
                  <div className="tx-row"><span>From:</span><span>0x1a2...</span></div>
                  <div className="tx-row"><span>To:</span><span>0x3b4...</span></div>
                  <div className="tx-row"><span>Amount:</span><span>2.5 ETH</span></div>
                </div>
              </div>
              <div className="block block-2">
                <div className="transaction-data">
                  <div className="tx-row"><span>Tx Hash:</span><span>0x7ec...</span></div>
                  <div className="tx-row"><span>From:</span><span>0x5d6...</span></div>
                  <div className="tx-row"><span>To:</span><span>0x9f0...</span></div>
                  <div className="tx-row"><span>Amount:</span><span>1.8 ETH</span></div>
                </div>
              </div>
              <div className="block block-3">
                <div className="transaction-data">
                  <div className="tx-row"><span>Tx Hash:</span><span>0x2ca...</span></div>
                  <div className="tx-row"><span>From:</span><span>0x7b8...</span></div>
                  <div className="tx-row"><span>To:</span><span>0xd4e...</span></div>
                  <div className="tx-row"><span>Amount:</span><span>0.5 ETH</span></div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="features-nav">
          <div className="feature-tags">
            <span>BLOCKCHAIN</span>
            <span>FAST TRANSACTIONS</span>
            <span>SECURE</span>
            <span>LOW FEES</span>
            <span>TRANSPARENT</span>
            <span>DECENTRALIZED</span>
          </div>
        </section>

        <section className="app-features" id="features">
          <h2>CUTTING-EDGE BLOCKCHAIN TRANSACTION PLATFORM</h2>
          <div className="feature-cards">
            <div className="feature-card">
              <div className="feature-icon">🔒</div>
              <h3>Fraud-Proof Security</h3>
              <p>Smart contracts ensure secure and tamper-proof transactions without third-party interference</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">⚡</div>
              <h3>Lightning-Fast Transfers</h3>
              <p>Optimized transactions with confirmations in seconds for efficient financial operations</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">💰</div>
              <h3>Low Fees</h3>
              <p>Enjoy minimal transaction fees with our optimized blockchain implementation</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🔍</div>
              <h3>Complete Transparency</h3>
              <p>View the entire transaction history on the immutable blockchain ledger</p>
            </div>
          </div>
        </section>

        <section className="how-it-works" id="how-it-works">
          <h2>HOW WePay WORKS</h2>
          <div className="steps-container">
            <div className="step">
              <div className="step-number">1</div>
              <h3>Create an Account</h3>
              <p>Sign up in less than 2 minutes with just your email and a secure password</p>
            </div>
            <div className="step-arrow">→</div>
            <div className="step">
              <div className="step-number">2</div>
              <h3>Connect Wallet</h3>
              <p>Link your existing digital wallet or create a new one through our platform</p>
            </div>
            <div className="step-arrow">→</div>
            <div className="step">
              <div className="step-number">3</div>
              <h3>Send & Receive</h3>
              <p>Instantly transfer funds to any wallet address or username on our platform</p>
            </div>
            <div className="step-arrow">→</div>
            <div className="step">
              <div className="step-number">4</div>
              <h3>Track & Manage</h3>
              <p>Monitor your transactions and manage your portfolio in real-time</p>
            </div>
          </div>
        </section>

        <section className="supported-currencies">
          <h2>POWERED BY BLOCKCHAIN TECHNOLOGY</h2>
          <div className="currency">
            <div className="blockchain-logo"></div>
            <div className="currency-name">Solidity Smart Contracts</div>
            <p className="currency-desc">Built with advanced smart contracts that ensure secure, transparent, and efficient financial transactions.</p>
          </div>
        </section>

        <section className="security-section" id="security">
          <h2>ENTERPRISE-GRADE SECURITY</h2>
          <div className="security-features">
            <div className="security-feature">
              <div className="security-icon">🛡️</div>
              <h3>Smart Contract Security</h3>
              <p>Thoroughly engineered smart contracts ensuring your assets remain secure and transactions tamper-proof</p>
            </div>
            <div className="security-feature">
              <div className="security-icon">🔒</div>
              <h3>Multi-Factor Authentication</h3>
              <p>Additional layer of security for all account actions and transactions</p>
            </div>
            <div className="security-feature">
              <div className="security-icon">👁️</div>
              <h3>Real-time Monitoring</h3>
              <p>Automated systems checking for suspicious activity and ensuring transaction integrity</p>
            </div>
            <div className="security-feature">
              <div className="security-icon">🔄</div>
              <h3>Blockchain Verification</h3>
              <p>All transactions are verified and recorded on the blockchain for complete transparency</p>
            </div>
          </div>
        </section>

        <section className="advantages" id="advantages">
          <h2>WHY CHOOSE WePay</h2>
          <div className="advantages-grid">
            
            <div className="advantage-card">
              <div className="advantage-icon">🚀</div>
              <h3>Scalable Performance</h3>
              <p>Our platform is designed to handle thousands of transactions per month today, with plans to scale to millions of microtransactions in the future.</p>
            </div>
            <div className="advantage-card">
              <div className="advantage-icon">🔐</div>
              <h3>Non-Custodial Solution</h3>
              <p>We never hold your private keys - you maintain full control of your funds at all times, unlike centralized exchanges.</p>
            </div>
            <div className="advantage-card">
              <div className="advantage-icon">🌐</div>
              <h3>Global Accessibility</h3>
              <p>Send money anywhere in the world without the restrictions, delays, and high fees of traditional banking systems.</p>
            </div>
            <div className="advantage-card">
              <div className="advantage-icon">📊</div>
              <h3>Advanced Analytics</h3>
              <p>Track your transaction history with detailed analytics and visualizations to better manage your finances.</p>
            </div>
            <div className="advantage-card">
              <div className="advantage-icon">🤝</div>
              <h3>User-Friendly Experience</h3>
              <p>Simplified interface designed with React.js that makes blockchain transactions accessible to everyone, not just tech experts.</p>
            </div>
          </div>
        </section>

        <section className="testimonials">
          <h2>TRUSTED BY USERS</h2>
          <div className="testimonial-grid">
            <div className="testimonial-card">
              <div className="testimonial-content">
                "WePay has revolutionized how I handle digital transactions. The security and speed are impressive, and I love the user-friendly interface."
              </div>
              <div className="testimonial-author">Alex Chen, Tech Enthusiast</div>
            </div>
            <div className="testimonial-card">
              <div className="testimonial-content">
                "Being able to send transactions with minimal fees is incredible. The platform is intuitive and the blockchain integration provides peace of mind."
              </div>
              <div className="testimonial-author">Maria Rodriguez, Small Business Owner</div>
            </div>
            <div className="testimonial-card">
              <div className="testimonial-content">
                "Their user interface makes blockchain transactions simple even for beginners. The analytics features are extremely helpful for tracking my finances."
              </div>
              <div className="testimonial-author">John Wilson, Freelancer</div>
            </div>
          </div>
        </section>
        
        <section className="cta-section">
          <h2>START TRANSACTING WITH CONFIDENCE</h2>
          <p>Join the growing community of users who trust WePay for their secure blockchain transactions</p>
          <Link to="/signup" className="cta-btn">CREATE YOUR FREE ACCOUNT NOW</Link>
        </section>
      </main>

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

export default LandingPage;