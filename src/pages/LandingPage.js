// LandingPage.js
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../styles/Landing.css';

const LandingPage = () => {
  // Force dark mode
  useEffect(() => {
    document.body.classList.add('dark-mode');
  }, []);

  return (
    <div className="landing-page dark-mode">
      <header className="header">
        <div className="logo">
          <a href="src\pages\LandingPage.js"> WePay</a>
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
            <h1>SECURE ETHEREUM TRANSACTIONS FOR THE MODERN WORLD</h1>
            <p>Fast, secure, and transparent transactions on the Ethereum blockchain with minimal fees. Send and receive digital assets instantly across the globe.</p>
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
            <span>ETHEREUM</span>
            <span>FAST TRANSACTIONS</span>
            <span>SECURE</span>
            <span>LOW FEES</span>
            <span>TRANSPARENT</span>
            <span>DECENTRALIZED</span>
          </div>
        </section>

        <section className="app-features" id="features">
          <h2>CUTTING-EDGE ETHEREUM TRANSACTION PLATFORM</h2>
          <div className="feature-cards">
            <div className="feature-card">
              <div className="feature-icon">🔒</div>
              <h3>Military-Grade Security</h3>
              <p>End-to-end encryption and multi-signature authentication for your assets</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">⚡</div>
              <h3>Lightning-Fast Transfers</h3>
              <p>Optimized transactions with confirmations in seconds, not minutes</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">💰</div>
              <h3>Low Fees</h3>
              <p>Enjoy low platform fees - you only pay standard Ethereum gas fees</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🔍</div>
              <h3>Complete Transparency</h3>
              <p>View the entire transaction history on the Ethereum blockchain</p>
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
              <p>Link your existing Ethereum wallet or create a new one through our platform</p>
            </div>
            <div className="step-arrow">→</div>
            <div className="step">
              <div className="step-number">3</div>
              <h3>Send & Receive</h3>
              <p>Instantly transfer ETH to any wallet address or username on our platform</p>
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
          <h2>POWERED BY ETHEREUM</h2>
          <div className="currency">
            <div className="ethereum-logo"></div>
            <div className="currency-name">Ethereum</div>
            <p className="currency-desc">The world's programmable blockchain that powers our secure and transparent transaction platform.</p>
          </div>
        </section>

        <section className="security-section" id="security">
          <h2>ENTERPRISE-GRADE SECURITY</h2>
          <div className="security-features">
            <div className="security-feature">
              <div className="security-icon">🛡️</div>
              <h3>Smart Contract Audits</h3>
              <p>Thoroughly audited smart contracts ensuring your assets remain secure</p>
            </div>
            <div className="security-feature">
              <div className="security-icon">🔒</div>
              <h3>Two-Factor Authentication</h3>
              <p>Additional layer of security for all account actions and transactions</p>
            </div>
            <div className="security-feature">
              <div className="security-icon">👁️</div>
              <h3>Real-time Monitoring</h3>
              <p>24/7 automated systems checking for suspicious activity</p>
            </div>
            <div className="security-feature">
              <div className="security-icon">🔄</div>
              <h3>Regular Security Audits</h3>
              <p>Quarterly security assessments by leading cybersecurity firms</p>
            </div>
          </div>
        </section>

        <section className="advantages" id="advantages">
          <h2>WHY CHOOSE WePay</h2>
          <div className="advantages-grid">
            
            <div className="advantage-card">
              <div className="advantage-icon">🚀</div>
              <h3>Superior Performance</h3>
              <p>Our optimized integration with the Ethereum blockchain ensures faster transaction processing than conventional platforms.</p>
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
              <p>Track your transaction history with detailed analytics and visualizations not available on standard Ethereum wallets.</p>
            </div>
            <div className="advantage-card">
              <div className="advantage-icon">🤝</div>
              <h3>User-Friendly Experience</h3>
              <p>Simplified interface that makes Ethereum transactions accessible to everyone, not just crypto experts.</p>
            </div>
          </div>
        </section>

        <section className="testimonials">
          <h2>TRUSTED BY ETHEREUM USERS</h2>
          <div className="testimonial-grid">
            <div className="testimonial-card">
              <div className="testimonial-content">
                "WePay has revolutionized how I transfer ETH. The speed and security are unmatched, and I love that it's completely free."
              </div>
              <div className="testimonial-author">Alex Chen, DeFi Developer</div>
            </div>
            <div className="testimonial-card">
              <div className="testimonial-content">
                "Being able to send ETH without any platform fees is incredible. I've saved significantly on transaction costs."
              </div>
              <div className="testimonial-author">Maria Rodriguez, Blockchain Enthusiast</div>
            </div>
            <div className="testimonial-card">
              <div className="testimonial-content">
                "Their user interface makes Ethereum transactions simple even for beginners. The analytics features are a game-changer."
              </div>
              <div className="testimonial-author">John Wilson, ETH Investor</div>
            </div>
          </div>
        </section>
        
        <section className="cta-section">
          <h2>START TRANSACTING WITH CONFIDENCE</h2>
          <p>Join thousands of users who trust WePay for their Ethereum transactions</p>
          <Link to="/signup" className="cta-btn">CREATE YOUR FREE ACCOUNT NOW</Link>
        </section>
      </main>

      <footer className="footer">
        <div className="footer-container">
          <div className="footer-logo">WePay</div>
          <div className="footer-links">
            <div className="footer-column">
              <h4>Product</h4>
              <ul>
                <li><a href="#features">Features</a></li>
                <li><a href="#security">Security</a></li>
                <li><a href="#advantages">Advantages</a></li>
                <li><a href="#roadmap">Roadmap</a></li>
              </ul>
            </div>
            <div className="footer-column">
              <h4>Company</h4>
              <ul>
                <li><a href="#about">About Us</a></li>
                <li><a href="#team">Team</a></li>
                <li><a href="#careers">Careers</a></li>
                <li><a href="#press">Press</a></li>
              </ul>
            </div>
            <div className="footer-column">
              <h4>Resources</h4>
              <ul>
                <li><a href="#documentation">Documentation</a></li>
                <li><a href="#api">API</a></li>
                <li><a href="#blog">Blog</a></li>
                <li><a href="#community">Community</a></li>
              </ul>
            </div>
            <div className="footer-column">
              <h4>Legal</h4>
              <ul>
                <li><a href="#terms">Terms of Service</a></li>
                <li><a href="#privacy">Privacy Policy</a></li>
                <li><a href="#compliance">Compliance</a></li>
                <li><a href="#cookies">Cookie Policy</a></li>
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

export default LandingPage;