import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Pages.css';
import '../styles/Roadmap.css';
import logoImage from '../assets/images/logo.png';

const Roadmap = () => {
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
          <Link to="/roadmap">Roadmap</Link>
        </div>
        <div className="auth-buttons">
          <Link to="/login" className="login-btn">Log In</Link>
          <Link to="/signup" className="create-account-btn">Create Account</Link>
        </div>
      </header>

      {/* Main page content */}
      <div className="info-page-header">
        <h1 className="info-page-title">Our Development Roadmap</h1>
        <p className="info-page-subtitle">Discover what we've accomplished and our vision for the future of WePay.</p>
      </div>

      <div className="info-page-content">
        <section className="info-section">
          <h2 className="info-section-title">Our Journey So Far</h2>
          <p className="info-text">
            Since our inception, we've been working diligently to build a robust, secure, and user-friendly platform for Ethereum transactions. Here's a look at the key milestones we've achieved to date.
          </p>
          
          <div className="timeline" style={{ position: "relative", margin: "2rem 0 4rem", paddingLeft: "2rem", borderLeft: "2px solid #0a85d1" }}>
            <div className="timeline-item" style={{ marginBottom: "3rem", position: "relative" }}>
              <div className="timeline-marker" style={{ position: "absolute", left: "-2.4rem", width: "1rem", height: "1rem", borderRadius: "50%", backgroundColor: "#0a85d1" }}></div>
              <div className="timeline-date" style={{ fontWeight: "bold", color: "#0a85d1", marginBottom: "0.5rem" }}>Q1 2023</div>
              <h3 className="timeline-title" style={{ marginTop: "0" }}>Platform Inception & Core Development</h3>
              <p className="timeline-content">
                <ul style={{ paddingLeft: "1.5rem" }}>
                  <li>Initial concept development and market research</li>
                  <li>Core team formation with blockchain development experts</li>
                  <li>Basic transaction functionality implementation</li>
                  <li>User authentication system development</li>
                </ul>
              </p>
            </div>
            
            <div className="timeline-item" style={{ marginBottom: "3rem", position: "relative" }}>
              <div className="timeline-marker" style={{ position: "absolute", left: "-2.4rem", width: "1rem", height: "1rem", borderRadius: "50%", backgroundColor: "#0a85d1" }}></div>
              <div className="timeline-date" style={{ fontWeight: "bold", color: "#0a85d1", marginBottom: "0.5rem" }}>Q2 2023</div>
              <h3 className="timeline-title" style={{ marginTop: "0" }}>Security Infrastructure & Alpha Testing</h3>
              <p className="timeline-content">
                <ul style={{ paddingLeft: "1.5rem" }}>
                  <li>Implementation of end-to-end encryption</li>
                  <li>Development of multi-factor authentication</li>
                  <li>First round of security audits</li>
                  <li>Alpha testing with internal team</li>
                </ul>
              </p>
            </div>
            
            <div className="timeline-item" style={{ marginBottom: "3rem", position: "relative" }}>
              <div className="timeline-marker" style={{ position: "absolute", left: "-2.4rem", width: "1rem", height: "1rem", borderRadius: "50%", backgroundColor: "#0a85d1" }}></div>
              <div className="timeline-date" style={{ fontWeight: "bold", color: "#0a85d1", marginBottom: "0.5rem" }}>Q3 2023</div>
              <h3 className="timeline-title" style={{ marginTop: "0" }}>UI/UX Enhancement & Beta Launch</h3>
              <p className="timeline-content">
                <ul style={{ paddingLeft: "1.5rem" }}>
                  <li>Complete interface redesign for improved user experience</li>
                  <li>Mobile responsiveness implementation</li>
                  <li>Transaction history and analytics dashboard</li>
                  <li>Beta launch with limited user group</li>
                </ul>
              </p>
            </div>
            
            <div className="timeline-item" style={{ marginBottom: "3rem", position: "relative" }}>
              <div className="timeline-marker" style={{ position: "absolute", left: "-2.4rem", width: "1rem", height: "1rem", borderRadius: "50%", backgroundColor: "#0a85d1" }}></div>
              <div className="timeline-date" style={{ fontWeight: "bold", color: "#0a85d1", marginBottom: "0.5rem" }}>Q4 2023</div>
              <h3 className="timeline-title" style={{ marginTop: "0" }}>Feature Expansion & Public Launch</h3>
              <p className="timeline-content">
                <ul style={{ paddingLeft: "1.5rem" }}>
                  <li>Smart contract integration features</li>
                  <li>Advanced analytics implementation</li>
                  <li>Final security audit and penetration testing</li>
                  <li>Official public launch of WePay platform</li>
                </ul>
              </p>
            </div>
            
            <div className="timeline-item" style={{ marginBottom: "3rem", position: "relative" }}>
              <div className="timeline-marker" style={{ position: "absolute", left: "-2.4rem", width: "1rem", height: "1rem", borderRadius: "50%", backgroundColor: "#0a85d1" }}></div>
              <div className="timeline-date" style={{ fontWeight: "bold", color: "#0a85d1", marginBottom: "0.5rem" }}>Q1 2024</div>
              <h3 className="timeline-title" style={{ marginTop: "0" }}>Post-Launch Optimization & Growth</h3>
              <p className="timeline-content">
                <ul style={{ paddingLeft: "1.5rem" }}>
                  <li>Performance optimizations based on user feedback</li>
                  <li>Implementation of gas fee optimization algorithm</li>
                  <li>Partnership integrations with key blockchain services</li>
                  <li>User growth initiatives and marketing campaigns</li>
                </ul>
              </p>
            </div>
            
            <div className="timeline-item" style={{ marginBottom: "3rem", position: "relative" }}>
              <div className="timeline-marker" style={{ position: "absolute", left: "-2.4rem", width: "1rem", height: "1rem", borderRadius: "50%", backgroundColor: "#0a85d1" }}></div>
              <div className="timeline-date" style={{ fontWeight: "bold", color: "#0a85d1", marginBottom: "0.5rem" }}>Q2 2024</div>
              <h3 className="timeline-title" style={{ marginTop: "0" }}>Enterprise Features & Mobile App</h3>
              <p className="timeline-content">
                <ul style={{ paddingLeft: "1.5rem" }}>
                  <li>Enterprise account management tools</li>
                  <li>Multi-user access controls and permissions</li>
                  <li>Native mobile application development</li>
                  <li>Advanced reporting features for businesses</li>
                </ul>
              </p>
            </div>
          </div>
        </section>
        
        <section className="info-section">
          <h2 className="info-section-title">Current Development Focus: Q3 2024</h2>
          <p className="info-text">
            We are currently focused on enhancing the platform's capabilities and expanding our service offerings.
          </p>
          
          <div className="current-focus" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "2rem", margin: "2rem 0" }}>
            <div className="focus-card" style={{ padding: "2rem", backgroundColor: "#f8f9fa", borderRadius: "8px", border: "1px solid #eaeaea" }}>
              <h3 style={{ marginTop: 0 }}>DeFi Integration</h3>
              <div className="progress-bar" style={{ width: "100%", height: "0.5rem", backgroundColor: "#e2e2e2", borderRadius: "0.25rem", marginBottom: "1rem" }}>
                <div style={{ width: "70%", height: "100%", backgroundColor: "#0a85d1", borderRadius: "0.25rem" }}></div>
              </div>
              <p>
                Integrating popular DeFi protocols to allow users to participate in yield farming, liquidity provision, and staking directly through our platform.
              </p>
              <div style={{ color: "#555", fontSize: "0.875rem" }}>70% Complete • Expected: Aug 2024</div>
            </div>
            
            <div className="focus-card" style={{ padding: "2rem", backgroundColor: "#f8f9fa", borderRadius: "8px", border: "1px solid #eaeaea" }}>
              <h3 style={{ marginTop: 0 }}>Layer 2 Support</h3>
              <div className="progress-bar" style={{ width: "100%", height: "0.5rem", backgroundColor: "#e2e2e2", borderRadius: "0.25rem", marginBottom: "1rem" }}>
                <div style={{ width: "85%", height: "100%", backgroundColor: "#0a85d1", borderRadius: "0.25rem" }}></div>
              </div>
              <p>
                Adding support for Ethereum Layer 2 scaling solutions to provide faster transactions and reduced gas fees for our users.
              </p>
              <div style={{ color: "#555", fontSize: "0.875rem" }}>85% Complete • Expected: Jul 2024</div>
            </div>
            
            <div className="focus-card" style={{ padding: "2rem", backgroundColor: "#f8f9fa", borderRadius: "8px", border: "1px solid #eaeaea" }}>
              <h3 style={{ marginTop: 0 }}>Advanced Analytics</h3>
              <div className="progress-bar" style={{ width: "100%", height: "0.5rem", backgroundColor: "#e2e2e2", borderRadius: "0.25rem", marginBottom: "1rem" }}>
                <div style={{ width: "50%", height: "100%", backgroundColor: "#0a85d1", borderRadius: "0.25rem" }}></div>
              </div>
              <p>
                Enhancing our analytics dashboard with advanced portfolio tracking, tax reporting features, and predictive insights.
              </p>
              <div style={{ color: "#555", fontSize: "0.875rem" }}>50% Complete • Expected: Sep 2024</div>
            </div>
          </div>
        </section>
        
        <section className="info-section">
          <h2 className="info-section-title">Future Roadmap</h2>
          <p className="info-text">
            Our vision extends well beyond our current offerings. Here's what you can look forward to in the coming quarters as we continue to innovate and expand the WePay platform.
          </p>
          
          <div className="future-roadmap" style={{ margin: "2rem 0" }}>
            <div className="roadmap-quarter" style={{ marginBottom: "3rem" }}>
              <div className="quarter-header" style={{ display: "flex", alignItems: "center", marginBottom: "1.5rem" }}>
                <div className="quarter-badge" style={{ padding: "0.5rem 1rem", backgroundColor: "#0a85d1", color: "white", borderRadius: "2rem", marginRight: "1rem" }}>Q4 2024</div>
                <h3 style={{ margin: 0 }}>Multi-Chain Expansion</h3>
              </div>
              <div className="quarter-content" style={{ paddingLeft: "2rem", borderLeft: "2px solid #eaeaea" }}>
                <ul style={{ paddingLeft: "1.5rem" }}>
                  <li><strong>Cross-Chain Transactions:</strong> Support for seamless transfers between different blockchain networks</li>
                  <li><strong>Additional Blockchains:</strong> Expanding beyond Ethereum to include other major blockchain networks</li>
                  <li><strong>Unified Dashboard:</strong> Single interface to manage assets across multiple chains</li>
                  <li><strong>Security Enhancements:</strong> Updated security protocols for multi-chain operations</li>
                </ul>
              </div>
            </div>
            
            <div className="roadmap-quarter" style={{ marginBottom: "3rem" }}>
              <div className="quarter-header" style={{ display: "flex", alignItems: "center", marginBottom: "1.5rem" }}>
                <div className="quarter-badge" style={{ padding: "0.5rem 1rem", backgroundColor: "#0a85d1", color: "white", borderRadius: "2rem", marginRight: "1rem" }}>Q1 2025</div>
                <h3 style={{ margin: 0 }}>Developer API & Integrations</h3>
              </div>
              <div className="quarter-content" style={{ paddingLeft: "2rem", borderLeft: "2px solid #eaeaea" }}>
                <ul style={{ paddingLeft: "1.5rem" }}>
                  <li><strong>Public API:</strong> Comprehensive API for developers to integrate WePay services</li>
                  <li><strong>Developer Documentation:</strong> Extensive resources and guides for third-party developers</li>
                  <li><strong>Partner Integrations:</strong> Strategic partnerships with e-commerce and service platforms</li>
                  <li><strong>Webhooks & Notifications:</strong> Real-time event notifications for developers</li>
                </ul>
              </div>
            </div>
            
            <div className="roadmap-quarter" style={{ marginBottom: "3rem" }}>
              <div className="quarter-header" style={{ display: "flex", alignItems: "center", marginBottom: "1.5rem" }}>
                <div className="quarter-badge" style={{ padding: "0.5rem 1rem", backgroundColor: "#0a85d1", color: "white", borderRadius: "2rem", marginRight: "1rem" }}>Q2 2025</div>
                <h3 style={{ margin: 0 }}>DAO Governance & Token Launch</h3>
              </div>
              <div className="quarter-content" style={{ paddingLeft: "2rem", borderLeft: "2px solid #eaeaea" }}>
                <ul style={{ paddingLeft: "1.5rem" }}>
                  <li><strong>WePay Token:</strong> Launch of native utility token for the ecosystem</li>
                  <li><strong>DAO Structure:</strong> Decentralized autonomous organization for platform governance</li>
                  <li><strong>Voting Mechanisms:</strong> Systems for token holders to participate in platform decisions</li>
                  <li><strong>Staking Rewards:</strong> Incentives for long-term platform supporters</li>
                </ul>
              </div>
            </div>
            
            <div className="roadmap-quarter" style={{ marginBottom: "3rem" }}>
              <div className="quarter-header" style={{ display: "flex", alignItems: "center", marginBottom: "1.5rem" }}>
                <div className="quarter-badge" style={{ padding: "0.5rem 1rem", backgroundColor: "#0a85d1", color: "white", borderRadius: "2rem", marginRight: "1rem" }}>Q3-Q4 2025</div>
                <h3 style={{ margin: 0 }}>Global Expansion & Institutional Services</h3>
              </div>
              <div className="quarter-content" style={{ paddingLeft: "2rem", borderLeft: "2px solid #eaeaea" }}>
                <ul style={{ paddingLeft: "1.5rem" }}>
                  <li><strong>Localization:</strong> Support for additional languages and region-specific features</li>
                  <li><strong>Regulatory Compliance:</strong> Enhanced frameworks for international operations</li>
                  <li><strong>Institutional Accounts:</strong> Specialized services for businesses and financial institutions</li>
                  <li><strong>Advanced Security:</strong> Hardware security modules and institutional-grade protection</li>
                </ul>
              </div>
            </div>
            
            <div className="roadmap-quarter">
              <div className="quarter-header" style={{ display: "flex", alignItems: "center", marginBottom: "1.5rem" }}>
                <div className="quarter-badge" style={{ padding: "0.5rem 1rem", backgroundColor: "#0a85d1", color: "white", borderRadius: "2rem", marginRight: "1rem" }}>2026 & Beyond</div>
                <h3 style={{ margin: 0 }}>Next Generation Innovation</h3>
              </div>
              <div className="quarter-content" style={{ paddingLeft: "2rem", borderLeft: "2px solid #eaeaea" }}>
                <ul style={{ paddingLeft: "1.5rem" }}>
                  <li><strong>AI-Powered Features:</strong> Advanced predictive analytics and automated optimization</li>
                  <li><strong>Decentralized Identity:</strong> Self-sovereign identity solutions for enhanced privacy</li>
                  <li><strong>Zero-Knowledge Proofs:</strong> Implementation of privacy-preserving transaction technologies</li>
                  <li><strong>Next-Gen User Interfaces:</strong> Virtual and augmented reality interfaces for blockchain interaction</li>
                </ul>
              </div>
            </div>
          </div>
        </section>
        
        <section className="info-section">
          <h2 className="info-section-title">Community Involvement</h2>
          <p className="info-text">
            Our roadmap is not set in stone—we actively engage with our community to shape the future of WePay. Here's how you can contribute to our development direction:
          </p>
          
          <div className="community-involvement" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "2rem", margin: "2rem 0" }}>
            <div className="involvement-card" style={{ padding: "2rem", backgroundColor: "#f8f9fa", borderRadius: "8px", border: "1px solid #eaeaea" }}>
              <h3 style={{ marginTop: 0 }}>Feature Requests</h3>
              <p>
                Submit your ideas for new features or improvements to existing ones through our community portal. Popular requests are regularly reviewed by our product team.
              </p>
              <a href="#feature-requests" style={{ display: "inline-block", padding: "0.5rem 1rem", backgroundColor: "#0a85d1", color: "white", borderRadius: "0.25rem", textDecoration: "none", marginTop: "1rem" }}>Submit a Request</a>
            </div>
            
            <div className="involvement-card" style={{ padding: "2rem", backgroundColor: "#f8f9fa", borderRadius: "8px", border: "1px solid #eaeaea" }}>
              <h3 style={{ marginTop: 0 }}>Beta Testing</h3>
              <p>
                Join our beta testing program to get early access to upcoming features and provide valuable feedback before public releases.
              </p>
              <a href="#beta-program" style={{ display: "inline-block", padding: "0.5rem 1rem", backgroundColor: "#0a85d1", color: "white", borderRadius: "0.25rem", textDecoration: "none", marginTop: "1rem" }}>Join Beta Program</a>
            </div>
            
            <div className="involvement-card" style={{ padding: "2rem", backgroundColor: "#f8f9fa", borderRadius: "8px", border: "1px solid #eaeaea" }}>
              <h3 style={{ marginTop: 0 }}>Community Forums</h3>
              <p>
                Participate in discussions about our roadmap and development priorities on our community forums. Connect with other users and our development team.
              </p>
              <a href="#forums" style={{ display: "inline-block", padding: "0.5rem 1rem", backgroundColor: "#0a85d1", color: "white", borderRadius: "0.25rem", textDecoration: "none", marginTop: "1rem" }}>Visit Forums</a>
            </div>
          </div>
        </section>
        
        <div className="cta-section" style={{ padding: "3rem", textAlign: "center", marginTop: "3rem" }}>
          <h2>Be Part of Our Journey</h2>
          <p>Create an account today to experience our current features and stay updated on our progress and upcoming releases.</p>
          <Link to="/signup" className="btn btn-primary" style={{ marginTop: "1.5rem" }}>Join WePay Today</Link>
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

export default Roadmap; 