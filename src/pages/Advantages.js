import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Pages.css';
import '../styles/Advantages.css';
import logoImage from '../assets/images/logo.png';

const Advantages = () => {
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
        <h1 className="info-page-title">Why Choose WePay</h1>
        <p className="info-page-subtitle">Discover the unique advantages that make WePay the superior choice for Ethereum transactions.</p>
      </div>

      <div className="info-page-content">
        <section className="info-section">
          <h2 className="info-section-title">Unique Benefits</h2>
          <p className="info-text">
            WePay offers distinct advantages over traditional financial services and other cryptocurrency platforms, providing a seamless and secure experience for all users.
          </p>
          
          <div className="info-grid">
            <div className="info-card">
              <div className="info-card-icon">🚀</div>
              <h3 className="info-card-title">Superior Performance</h3>
              <p className="info-card-text">
                Our optimized blockchain integration enables transaction speeds up to 5x faster than conventional platforms, with confirmations in seconds rather than minutes.
              </p>
            </div>
            
            <div className="info-card">
              <div className="info-card-icon">💰</div>
              <h3 className="info-card-title">Low Transaction Fees</h3>
              <p className="info-card-text">
                WePay charges minimal platform fees, allowing you to complete transactions at a fraction of the cost compared to traditional banking services.
              </p>
            </div>
            
            <div className="info-card">
              <div className="info-card-icon">🔐</div>
              <h3 className="info-card-title">Non-Custodial Solution</h3>
              <p className="info-card-text">
                Unlike many competitors, we never hold your private keys, ensuring you maintain complete control of your funds at all times.
              </p>
            </div>
            
            <div className="info-card">
              <div className="info-card-icon">🌐</div>
              <h3 className="info-card-title">Borderless Transactions</h3>
              <p className="info-card-text">
                Send and receive payments globally without the limitations, delays, and high fees associated with international banking transfers.
              </p>
            </div>
          </div>
        </section>
        
        <section className="info-section">
          <h2 className="info-section-title">Technology Advantages</h2>
          <p className="info-text">
            Our cutting-edge technology provides significant benefits that enhance your experience with cryptocurrency transactions.
          </p>
          
          <div className="info-grid">
            <div className="info-card">
              <div className="info-card-icon">⚙️</div>
              <h3 className="info-card-title">Advanced Smart Contract Integration</h3>
              <p className="info-card-text">
                Leverage the power of Ethereum's programmable blockchain with our intuitive interface for interacting with smart contracts.
              </p>
            </div>
            
            <div className="info-card">
              <div className="info-card-icon">📊</div>
              <h3 className="info-card-title">Real-time Analytics</h3>
              <p className="info-card-text">
                Gain valuable insights with comprehensive transaction analytics and portfolio tracking not available on standard Ethereum wallets.
              </p>
            </div>
            
            <div className="info-card">
              <div className="info-card-icon">🔄</div>
              <h3 className="info-card-title">Optimized Gas Management</h3>
              <p className="info-card-text">
                Our intelligent gas fee estimator saves you money by recommending the optimal gas price based on network conditions and transaction urgency.
              </p>
            </div>
            
            <div className="info-card">
              <div className="info-card-icon">🧠</div>
              <h3 className="info-card-title">AI-Powered Security</h3>
              <p className="info-card-text">
                Advanced machine learning algorithms detect suspicious activity patterns and protect your account from potential threats.
              </p>
            </div>
          </div>
        </section>
        
        <section className="info-section">
          <h2 className="info-section-title">User Experience</h2>
          <p className="info-text">
            We've designed WePay with a focus on accessibility and ease of use, making cryptocurrency transactions simple for everyone.
          </p>
          
          <div className="info-grid">
            <div className="info-card">
              <div className="info-card-icon">🤝</div>
              <h3 className="info-card-title">Intuitive Interface</h3>
              <p className="info-card-text">
                Our user-friendly design makes complex blockchain interactions accessible to both beginners and experienced users.
              </p>
            </div>
            
            <div className="info-card">
              <div className="info-card-icon">📱</div>
              <h3 className="info-card-title">Multi-Platform Support</h3>
              <p className="info-card-text">
                Access your account seamlessly across all devices with our responsive web platform and native mobile apps.
              </p>
            </div>
            
            <div className="info-card">
              <div className="info-card-icon">🔍</div>
              <h3 className="info-card-title">Simplified Addresses</h3>
              <p className="info-card-text">
                Send funds to user-friendly names instead of complicated blockchain addresses, eliminating errors and improving usability.
              </p>
            </div>
            
            <div className="info-card">
              <div className="info-card-icon">📚</div>
              <h3 className="info-card-title">Comprehensive Resources</h3>
              <p className="info-card-text">
                Access educational materials, tutorials, and support to help you maximize the benefits of blockchain technology.
              </p>
            </div>
          </div>
        </section>
        
        <section className="info-section">
          <h2 className="info-section-title">WePay vs. Traditional Banking</h2>
          
          <div className="comparison-table" style={{ overflowX: "auto" }}>
            <table className="table" style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr>
                  <th style={{ textAlign: "left", padding: "1rem", borderBottom: "2px solid #ddd" }}>Feature</th>
                  <th style={{ textAlign: "center", padding: "1rem", borderBottom: "2px solid #ddd" }}>WePay</th>
                  <th style={{ textAlign: "center", padding: "1rem", borderBottom: "2px solid #ddd" }}>Traditional Banking</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td style={{ padding: "1rem", borderBottom: "1px solid #ddd" }}>Transaction Speed</td>
                  <td style={{ textAlign: "center", padding: "1rem", borderBottom: "1px solid #ddd" }}>Seconds to minutes</td>
                  <td style={{ textAlign: "center", padding: "1rem", borderBottom: "1px solid #ddd" }}>Hours to days</td>
                </tr>
                <tr>
                  <td style={{ padding: "1rem", borderBottom: "1px solid #ddd" }}>International Transfers</td>
                  <td style={{ textAlign: "center", padding: "1rem", borderBottom: "1px solid #ddd" }}>Same speed, globally</td>
                  <td style={{ textAlign: "center", padding: "1rem", borderBottom: "1px solid #ddd" }}>3-5 business days</td>
                </tr>
                <tr>
                  <td style={{ padding: "1rem", borderBottom: "1px solid #ddd" }}>Transaction Fees</td>
                  <td style={{ textAlign: "center", padding: "1rem", borderBottom: "1px solid #ddd" }}>Minimal gas fees</td>
                  <td style={{ textAlign: "center", padding: "1rem", borderBottom: "1px solid #ddd" }}>High, especially international</td>
                </tr>
                <tr>
                  <td style={{ padding: "1rem", borderBottom: "1px solid #ddd" }}>Available Hours</td>
                  <td style={{ textAlign: "center", padding: "1rem", borderBottom: "1px solid #ddd" }}>24/7/365</td>
                  <td style={{ textAlign: "center", padding: "1rem", borderBottom: "1px solid #ddd" }}>Limited business hours</td>
                </tr>
                <tr>
                  <td style={{ padding: "1rem", borderBottom: "1px solid #ddd" }}>Transaction Transparency</td>
                  <td style={{ textAlign: "center", padding: "1rem", borderBottom: "1px solid #ddd" }}>Complete blockchain verification</td>
                  <td style={{ textAlign: "center", padding: "1rem", borderBottom: "1px solid #ddd" }}>Limited visibility</td>
                </tr>
                <tr>
                  <td style={{ padding: "1rem", borderBottom: "1px solid #ddd" }}>Asset Control</td>
                  <td style={{ textAlign: "center", padding: "1rem", borderBottom: "1px solid #ddd" }}>Full user control (non-custodial)</td>
                  <td style={{ textAlign: "center", padding: "1rem", borderBottom: "1px solid #ddd" }}>Bank controlled (custodial)</td>
                </tr>
                <tr>
                  <td style={{ padding: "1rem", borderBottom: "1px solid #ddd" }}>Programmability</td>
                  <td style={{ textAlign: "center", padding: "1rem", borderBottom: "1px solid #ddd" }}>Smart contract enabled</td>
                  <td style={{ textAlign: "center", padding: "1rem", borderBottom: "1px solid #ddd" }}>Not available</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>
        
        <section className="info-section">
          <h2 className="info-section-title">What Our Users Say</h2>
          
          <div className="testimonials-grid" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "2rem" }}>
            <div className="testimonial-card" style={{ padding: "2rem", backgroundColor: "#f8f9fa", borderRadius: "8px" }}>
              <div className="testimonial-content" style={{ marginBottom: "1rem", fontStyle: "italic" }}>
                "The speed and security of WePay are unmatched. I've been using it for my business transactions, and it has saved me thousands in international transfer fees."
              </div>
              <div className="testimonial-author" style={{ fontWeight: "bold" }}>
                — Michael T., E-commerce Business Owner
              </div>
            </div>
            
            <div className="testimonial-card" style={{ padding: "2rem", backgroundColor: "#f8f9fa", borderRadius: "8px" }}>
              <div className="testimonial-content" style={{ marginBottom: "1rem", fontStyle: "italic" }}>
                "As someone new to cryptocurrency, WePay made everything so simple. The interface is intuitive, and I never have to worry about complicated wallet addresses."
              </div>
              <div className="testimonial-author" style={{ fontWeight: "bold" }}>
                — Sarah L., First-time Crypto User
              </div>
            </div>
            
            <div className="testimonial-card" style={{ padding: "2rem", backgroundColor: "#f8f9fa", borderRadius: "8px" }}>
              <div className="testimonial-content" style={{ marginBottom: "1rem", fontStyle: "italic" }}>
                "The analytics tools in WePay give me insights I couldn't get anywhere else. It's completely changed how I manage my digital assets."
              </div>
              <div className="testimonial-author" style={{ fontWeight: "bold" }}>
                — David R., Cryptocurrency Investor
              </div>
            </div>
          </div>
        </section>
        
        <div className="cta-section" style={{ padding: "3rem", textAlign: "center", marginTop: "3rem" }}>
          <h2>Experience the WePay Advantage</h2>
          <p>Join thousands of satisfied users who trust WePay for fast, secure, and cost-effective Ethereum transactions.</p>
          <Link to="/signup" className="btn btn-primary" style={{ marginTop: "1.5rem" }}>Create Your Free Account</Link>
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

export default Advantages; 