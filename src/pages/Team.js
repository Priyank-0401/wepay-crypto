import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Pages.css';
import logoImage from '../assets/images/logo.png';

const Team = () => {
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
          <Link to="/careers">Careers</Link>
        </div>
        <div className="auth-buttons">
          <Link to="/login" className="login-btn">Log In</Link>
          <Link to="/signup" className="create-account-btn">Create Account</Link>
        </div>
      </header>

      {/* Main page content */}
      <div className="info-page-header">
        <h1 className="info-page-title">Our Team</h1>
        <p className="info-page-subtitle">Meet the talented individuals behind WePay's innovation and success.</p>
      </div>

      <div className="info-page-content">
        <section className="info-section">
          <h2 className="info-section-title">Leadership</h2>
          <p className="info-text">
            Our leadership team brings decades of combined experience in blockchain technology, fintech, and product development.
          </p>
          
          <div className="team-grid">
            <div className="team-member">
              <div className="team-member-photo" style={{ backgroundColor: '#f2f2f2', borderRadius: '50%', width: '150px', height: '150px' }}></div>
              <h3 className="team-member-name">Sarah Johnson</h3>
              <p className="team-member-title">Chief Executive Officer</p>
              <p className="team-member-bio">
                Former Head of Blockchain at TechGiant, Sarah brings 15 years of experience in fintech and blockchain development.
              </p>
              <div className="team-member-social">
                <a href="#linkedin">LinkedIn</a>
                <a href="#twitter">Twitter</a>
              </div>
            </div>
            
            <div className="team-member">
              <div className="team-member-photo" style={{ backgroundColor: '#f2f2f2', borderRadius: '50%', width: '150px', height: '150px' }}></div>
              <h3 className="team-member-name">Michael Chen</h3>
              <p className="team-member-title">Chief Technology Officer</p>
              <p className="team-member-bio">
                Ethereum Foundation contributor and blockchain architect with multiple successful DeFi projects.
              </p>
              <div className="team-member-social">
                <a href="#linkedin">LinkedIn</a>
                <a href="#github">GitHub</a>
              </div>
            </div>
            
            <div className="team-member">
              <div className="team-member-photo" style={{ backgroundColor: '#f2f2f2', borderRadius: '50%', width: '150px', height: '150px' }}></div>
              <h3 className="team-member-name">Aisha Patel</h3>
              <p className="team-member-title">Chief Product Officer</p>
              <p className="team-member-bio">
                UX expert with a passion for making complex technology accessible to everyday users.
              </p>
              <div className="team-member-social">
                <a href="#linkedin">LinkedIn</a>
                <a href="#medium">Medium</a>
              </div>
            </div>
            
            <div className="team-member">
              <div className="team-member-photo" style={{ backgroundColor: '#f2f2f2', borderRadius: '50%', width: '150px', height: '150px' }}></div>
              <h3 className="team-member-name">David Rodriguez</h3>
              <p className="team-member-title">Chief Financial Officer</p>
              <p className="team-member-bio">
                Former investment banker with extensive experience in crypto markets and venture capital.
              </p>
              <div className="team-member-social">
                <a href="#linkedin">LinkedIn</a>
                <a href="#twitter">Twitter</a>
              </div>
            </div>
          </div>
        </section>
        
        <section className="info-section">
          <h2 className="info-section-title">Engineering Team</h2>
          <p className="info-text">
            Our engineering team consists of blockchain experts, security specialists, and full-stack developers dedicated to building a robust and user-friendly platform.
          </p>
          
          <div className="team-grid">
            <div className="team-member">
              <div className="team-member-photo" style={{ backgroundColor: '#f2f2f2', borderRadius: '50%', width: '150px', height: '150px' }}></div>
              <h3 className="team-member-name">Alex Kowalski</h3>
              <p className="team-member-title">Lead Blockchain Engineer</p>
              <p className="team-member-bio">
                Solidity expert with a background in distributed systems and smart contract security.
              </p>
            </div>
            
            <div className="team-member">
              <div className="team-member-photo" style={{ backgroundColor: '#f2f2f2', borderRadius: '50%', width: '150px', height: '150px' }}></div>
              <h3 className="team-member-name">Elena Santos</h3>
              <p className="team-member-title">Frontend Lead</p>
              <p className="team-member-bio">
                React specialist with a focus on creating accessible and intuitive user interfaces.
              </p>
            </div>
            
            <div className="team-member">
              <div className="team-member-photo" style={{ backgroundColor: '#f2f2f2', borderRadius: '50%', width: '150px', height: '150px' }}></div>
              <h3 className="team-member-name">Thomas Wong</h3>
              <p className="team-member-title">Security Lead</p>
              <p className="team-member-bio">
                Cybersecurity expert with a background in financial services and cryptography.
              </p>
            </div>
            
            <div className="team-member">
              <div className="team-member-photo" style={{ backgroundColor: '#f2f2f2', borderRadius: '50%', width: '150px', height: '150px' }}></div>
              <h3 className="team-member-name">Olivia Kim</h3>
              <p className="team-member-title">Backend Lead</p>
              <p className="team-member-bio">
                Systems architect specializing in high-performance, scalable API development.
              </p>
            </div>
          </div>
        </section>
        
        <section className="info-section">
          <h2 className="info-section-title">Product & Design</h2>
          <p className="info-text">
            Our product and design team is focused on creating a seamless and delightful user experience for all WePay users.
          </p>
          
          <div className="team-grid">
            <div className="team-member">
              <div className="team-member-photo" style={{ backgroundColor: '#f2f2f2', borderRadius: '50%', width: '150px', height: '150px' }}></div>
              <h3 className="team-member-name">James Wilson</h3>
              <p className="team-member-title">Product Manager</p>
              <p className="team-member-bio">
                Fintech product specialist with a background in user research and market analysis.
              </p>
            </div>
            
            <div className="team-member">
              <div className="team-member-photo" style={{ backgroundColor: '#f2f2f2', borderRadius: '50%', width: '150px', height: '150px' }}></div>
              <h3 className="team-member-name">Sophia Lee</h3>
              <p className="team-member-title">UI/UX Lead</p>
              <p className="team-member-bio">
                Digital product designer with expertise in creating accessible financial interfaces.
              </p>
            </div>
            
            <div className="team-member">
              <div className="team-member-photo" style={{ backgroundColor: '#f2f2f2', borderRadius: '50%', width: '150px', height: '150px' }}></div>
              <h3 className="team-member-name">Marcus Johnson</h3>
              <p className="team-member-title">User Researcher</p>
              <p className="team-member-bio">
                Behavioral scientist specializing in financial decision-making and user psychology.
              </p>
            </div>
            
            <div className="team-member">
              <div className="team-member-photo" style={{ backgroundColor: '#f2f2f2', borderRadius: '50%', width: '150px', height: '150px' }}></div>
              <h3 className="team-member-name">Emma Garcia</h3>
              <p className="team-member-title">Content Strategist</p>
              <p className="team-member-bio">
                Technical writer with a talent for explaining complex concepts in simple terms.
              </p>
            </div>
          </div>
        </section>
        
        <section className="info-section">
          <h2 className="info-section-title">Advisors</h2>
          <p className="info-text">
            Our advisory team brings insights from various industries to help guide our strategic direction.
          </p>
          
          <div className="team-grid">
            <div className="team-member">
              <div className="team-member-photo" style={{ backgroundColor: '#f2f2f2', borderRadius: '50%', width: '150px', height: '150px' }}></div>
              <h3 className="team-member-name">Dr. Wei Zhang</h3>
              <p className="team-member-title">Blockchain Research Advisor</p>
              <p className="team-member-bio">
                Leading academic researcher in distributed ledger technologies and consensus mechanisms.
              </p>
            </div>
            
            <div className="team-member">
              <div className="team-member-photo" style={{ backgroundColor: '#f2f2f2', borderRadius: '50%', width: '150px', height: '150px' }}></div>
              <h3 className="team-member-name">Robert Kiyoshi</h3>
              <p className="team-member-title">Financial Markets Advisor</p>
              <p className="team-member-bio">
                Former central banker with expertise in financial regulation and digital currencies.
              </p>
            </div>
            
            <div className="team-member">
              <div className="team-member-photo" style={{ backgroundColor: '#f2f2f2', borderRadius: '50%', width: '150px', height: '150px' }}></div>
              <h3 className="team-member-name">Lisa McConnell</h3>
              <p className="team-member-title">Legal & Compliance Advisor</p>
              <p className="team-member-bio">
                Fintech regulatory expert specializing in cryptocurrency compliance frameworks.
              </p>
            </div>
            
            <div className="team-member">
              <div className="team-member-photo" style={{ backgroundColor: '#f2f2f2', borderRadius: '50%', width: '150px', height: '150px' }}></div>
              <h3 className="team-member-name">Carlos Mendez</h3>
              <p className="team-member-title">Growth Strategy Advisor</p>
              <p className="team-member-bio">
                Serial entrepreneur with multiple successful fintech startups and exits.
              </p>
            </div>
          </div>
        </section>
        
        <div className="cta-section" style={{ padding: "3rem", textAlign: "center", marginTop: "3rem" }}>
          <h2>Join Our Team</h2>
          <p>We're always looking for talented individuals who are passionate about blockchain and fintech.</p>
          <Link to="/careers" className="btn btn-primary" style={{ marginTop: "1.5rem" }}>View Open Positions</Link>
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

export default Team; 