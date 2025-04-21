import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Pages.css';
import '../styles/Team.css';
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
        <p className="info-page-subtitle">Meet the passionate experts building the future of digital payments.</p>
      </div>

      <div className="info-page-content">
        <section className="info-section">
          <h2 className="info-section-title">Leadership</h2>
          <div className="team-grid">
            <div className="team-member">
              <div className="member-photo" style={{ backgroundColor: "#f2f2f2", height: "200px", width: "200px", borderRadius: "50%" }}></div>
              <h3 className="member-name">Sarah Johnson</h3>
              <p className="member-title">Chief Executive Officer</p>
              <p className="member-bio">
                Former FinTech executive with 15+ years of experience in digital payments and blockchain technology. Led multiple successful startups before founding WePay.
              </p>
              <div className="member-social">
                <a href="#linkedin" className="social-link">LinkedIn</a>
                <a href="#twitter" className="social-link">Twitter</a>
              </div>
            </div>
            
            <div className="team-member">
              <div className="member-photo" style={{ backgroundColor: "#f2f2f2", height: "200px", width: "200px", borderRadius: "50%" }}></div>
              <h3 className="member-name">Michael Chen</h3>
              <p className="member-title">Chief Technology Officer</p>
              <p className="member-bio">
                Blockchain pioneer with extensive experience in designing decentralized systems. Previously led engineering at a major cryptocurrency exchange.
              </p>
              <div className="member-social">
                <a href="#linkedin" className="social-link">LinkedIn</a>
                <a href="#github" className="social-link">GitHub</a>
              </div>
            </div>
            
            <div className="team-member">
              <div className="member-photo" style={{ backgroundColor: "#f2f2f2", height: "200px", width: "200px", borderRadius: "50%" }}></div>
              <h3 className="member-name">Alex Rodriguez</h3>
              <p className="member-title">Chief Product Officer</p>
              <p className="member-bio">
                User experience expert with a passion for making complex technologies accessible. Led product teams at several successful tech companies.
              </p>
              <div className="member-social">
                <a href="#linkedin" className="social-link">LinkedIn</a>
                <a href="#dribbble" className="social-link">Dribbble</a>
              </div>
            </div>
            
            <div className="team-member">
              <div className="member-photo" style={{ backgroundColor: "#f2f2f2", height: "200px", width: "200px", borderRadius: "50%" }}></div>
              <h3 className="member-name">Priya Patel</h3>
              <p className="member-title">Chief Financial Officer</p>
              <p className="member-bio">
                Financial strategist with expertise in both traditional finance and cryptocurrency markets. Former investment banker with a focus on fintech.
              </p>
              <div className="member-social">
                <a href="#linkedin" className="social-link">LinkedIn</a>
              </div>
            </div>
            
            <div className="team-member">
              <div className="member-photo" style={{ backgroundColor: "#f2f2f2", height: "200px", width: "200px", borderRadius: "50%" }}></div>
              <h3 className="member-name">David Kim</h3>
              <p className="member-title">Chief Security Officer</p>
              <p className="member-bio">
                Cybersecurity expert specializing in blockchain security and cryptography. Previously led security teams at major tech companies.
              </p>
              <div className="member-social">
                <a href="#linkedin" className="social-link">LinkedIn</a>
                <a href="#github" className="social-link">GitHub</a>
              </div>
            </div>
            
            <div className="team-member">
              <div className="member-photo" style={{ backgroundColor: "#f2f2f2", height: "200px", width: "200px", borderRadius: "50%" }}></div>
              <h3 className="member-name">Emma Wilson</h3>
              <p className="member-title">Chief Marketing Officer</p>
              <p className="member-bio">
                Marketing innovator with experience in scaling fintech and blockchain startups. Expertise in global brand development and growth strategies.
              </p>
              <div className="member-social">
                <a href="#linkedin" className="social-link">LinkedIn</a>
                <a href="#twitter" className="social-link">Twitter</a>
              </div>
            </div>
          </div>
        </section>

        <section className="info-section">
          <h2 className="info-section-title">Engineering Team</h2>
          <div className="team-grid">
            <div className="team-member">
              <div className="member-photo" style={{ backgroundColor: "#f2f2f2", height: "180px", width: "180px", borderRadius: "50%" }}></div>
              <h3 className="member-name">James Park</h3>
              <p className="member-title">Lead Blockchain Engineer</p>
              <p className="member-bio">
                Smart contract expert and Ethereum developer with contributions to multiple open-source blockchain projects.
              </p>
            </div>
            
            <div className="team-member">
              <div className="member-photo" style={{ backgroundColor: "#f2f2f2", height: "180px", width: "180px", borderRadius: "50%" }}></div>
              <h3 className="member-name">Sophia Martinez</h3>
              <p className="member-title">Frontend Lead</p>
              <p className="member-bio">
                React specialist focused on creating intuitive, accessible user interfaces for complex financial applications.
              </p>
            </div>
            
            <div className="team-member">
              <div className="member-photo" style={{ backgroundColor: "#f2f2f2", height: "180px", width: "180px", borderRadius: "50%" }}></div>
              <h3 className="member-name">Omar Hassan</h3>
              <p className="member-title">Backend Lead</p>
              <p className="member-bio">
                Systems architect with expertise in building scalable, secure infrastructure for financial services.
              </p>
            </div>
            
            <div className="team-member">
              <div className="member-photo" style={{ backgroundColor: "#f2f2f2", height: "180px", width: "180px", borderRadius: "50%" }}></div>
              <h3 className="member-name">Lily Zhang</h3>
              <p className="member-title">Data Science Lead</p>
              <p className="member-bio">
                Machine learning expert specializing in fraud detection and risk assessment for blockchain transactions.
              </p>
            </div>
            
            <div className="team-member">
              <div className="member-photo" style={{ backgroundColor: "#f2f2f2", height: "180px", width: "180px", borderRadius: "50%" }}></div>
              <h3 className="member-name">Marcus Johnson</h3>
              <p className="member-title">DevOps Engineer</p>
              <p className="member-bio">
                Infrastructure specialist focused on maintaining reliable, secure, and scalable cloud systems.
              </p>
            </div>
            
            <div className="team-member">
              <div className="member-photo" style={{ backgroundColor: "#f2f2f2", height: "180px", width: "180px", borderRadius: "50%" }}></div>
              <h3 className="member-name">Isabella Garcia</h3>
              <p className="member-title">QA Lead</p>
              <p className="member-bio">
                Quality assurance expert ensuring the reliability and security of our platform through comprehensive testing.
              </p>
            </div>
          </div>
        </section>

        <section className="info-section">
          <h2 className="info-section-title">Product & Design</h2>
          <div className="team-grid">
            <div className="team-member">
              <div className="member-photo" style={{ backgroundColor: "#f2f2f2", height: "180px", width: "180px", borderRadius: "50%" }}></div>
              <h3 className="member-name">Nina Williams</h3>
              <p className="member-title">Product Manager</p>
              <p className="member-bio">
                Strategic product leader with experience creating user-centric financial and blockchain products.
              </p>
            </div>
            
            <div className="team-member">
              <div className="member-photo" style={{ backgroundColor: "#f2f2f2", height: "180px", width: "180px", borderRadius: "50%" }}></div>
              <h3 className="member-name">Thomas Lee</h3>
              <p className="member-title">UX/UI Design Lead</p>
              <p className="member-bio">
                Award-winning designer specializing in simplifying complex financial interfaces for diverse user groups.
              </p>
            </div>
            
            <div className="team-member">
              <div className="member-photo" style={{ backgroundColor: "#f2f2f2", height: "180px", width: "180px", borderRadius: "50%" }}></div>
              <h3 className="member-name">Rachel Cohen</h3>
              <p className="member-title">User Researcher</p>
              <p className="member-bio">
                Human-centered design specialist with a background in psychology and financial technology adoption.
              </p>
            </div>
            
            <div className="team-member">
              <div className="member-photo" style={{ backgroundColor: "#f2f2f2", height: "180px", width: "180px", borderRadius: "50%" }}></div>
              <h3 className="member-name">Daniel Nguyen</h3>
              <p className="member-title">Product Designer</p>
              <p className="member-bio">
                Creative designer focused on building engaging, accessible experiences for cryptocurrency users.
              </p>
            </div>
          </div>
        </section>

        <section className="info-section">
          <h2 className="info-section-title">Marketing & Growth</h2>
          <div className="team-grid">
            <div className="team-member">
              <div className="member-photo" style={{ backgroundColor: "#f2f2f2", height: "180px", width: "180px", borderRadius: "50%" }}></div>
              <h3 className="member-name">Sarah Thompson</h3>
              <p className="member-title">Growth Marketing Lead</p>
              <p className="member-bio">
                Digital marketing strategist with a track record of scaling fintech platforms in competitive markets.
              </p>
            </div>
            
            <div className="team-member">
              <div className="member-photo" style={{ backgroundColor: "#f2f2f2", height: "180px", width: "180px", borderRadius: "50%" }}></div>
              <h3 className="member-name">Carlos Mendez</h3>
              <p className="member-title">Content Strategy Lead</p>
              <p className="member-bio">
                Financial content expert specializing in making blockchain technology accessible to mainstream audiences.
              </p>
            </div>
            
            <div className="team-member">
              <div className="member-photo" style={{ backgroundColor: "#f2f2f2", height: "180px", width: "180px", borderRadius: "50%" }}></div>
              <h3 className="member-name">Zoe Parker</h3>
              <p className="member-title">Community Manager</p>
              <p className="member-bio">
                Community builder with extensive experience in managing and growing crypto and fintech communities.
              </p>
            </div>
          </div>
        </section>

        <section className="info-section">
          <h2 className="info-section-title">Operations & Support</h2>
          <div className="team-grid">
            <div className="team-member">
              <div className="member-photo" style={{ backgroundColor: "#f2f2f2", height: "180px", width: "180px", borderRadius: "50%" }}></div>
              <h3 className="member-name">Ryan Mitchell</h3>
              <p className="member-title">Operations Lead</p>
              <p className="member-bio">
                Operations expert with experience scaling startups from early stage to mature businesses.
              </p>
            </div>
            
            <div className="team-member">
              <div className="member-photo" style={{ backgroundColor: "#f2f2f2", height: "180px", width: "180px", borderRadius: "50%" }}></div>
              <h3 className="member-name">Maya Jackson</h3>
              <p className="member-title">Customer Support Lead</p>
              <p className="member-bio">
                Customer experience specialist focused on providing exceptional support for financial products.
              </p>
            </div>
            
            <div className="team-member">
              <div className="member-photo" style={{ backgroundColor: "#f2f2f2", height: "180px", width: "180px", borderRadius: "50%" }}></div>
              <h3 className="member-name">Samuel Kim</h3>
              <p className="member-title">Compliance Manager</p>
              <p className="member-bio">
                Regulatory specialist with expertise in global cryptocurrency compliance and financial regulations.
              </p>
            </div>
          </div>
        </section>

        <section className="info-section">
          <h2 className="info-section-title">Advisors</h2>
          <div className="team-grid">
            <div className="team-member">
              <div className="member-photo" style={{ backgroundColor: "#f2f2f2", height: "180px", width: "180px", borderRadius: "50%" }}></div>
              <h3 className="member-name">Dr. Elizabeth Chen</h3>
              <p className="member-title">Blockchain Technology Advisor</p>
              <p className="member-bio">
                Renowned blockchain researcher and professor with multiple publications on cryptocurrency security and scalability.
              </p>
            </div>
            
            <div className="team-member">
              <div className="member-photo" style={{ backgroundColor: "#f2f2f2", height: "180px", width: "180px", borderRadius: "50%" }}></div>
              <h3 className="member-name">Jonathan Roberts</h3>
              <p className="member-title">Financial Markets Advisor</p>
              <p className="member-bio">
                Former investment bank executive with expertise in integrating blockchain technology with traditional financial systems.
              </p>
            </div>
            
            <div className="team-member">
              <div className="member-photo" style={{ backgroundColor: "#f2f2f2", height: "180px", width: "180px", borderRadius: "50%" }}></div>
              <h3 className="member-name">Maria Gonzalez</h3>
              <p className="member-title">Regulatory Advisor</p>
              <p className="member-bio">
                Expert in global financial regulations with experience advising cryptocurrency companies on compliance matters.
              </p>
            </div>
            
            <div className="team-member">
              <div className="member-photo" style={{ backgroundColor: "#f2f2f2", height: "180px", width: "180px", borderRadius: "50%" }}></div>
              <h3 className="member-name">Dr. Kevin Williams</h3>
              <p className="member-title">Security Advisor</p>
              <p className="member-bio">
                Cybersecurity expert specializing in advanced security architectures for financial technology systems.
              </p>
            </div>
          </div>
        </section>
        
        <div className="cta-section" style={{ padding: "3rem", textAlign: "center", marginTop: "3rem", backgroundColor: "#f8f9fa", borderRadius: "12px" }}>
          <h2>Join Our Team</h2>
          <p>Interested in working with us? Check out our open positions and become part of our mission.</p>
          <Link to="/careers" className="btn btn-primary" style={{ marginTop: "1.5rem" }}>View Career Opportunities</Link>
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