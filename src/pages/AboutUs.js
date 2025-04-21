import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Pages.css';
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
          <Link to="/careers">Careers</Link>
        </div>
        <div className="auth-buttons">
          <Link to="/login" className="login-btn">Log In</Link>
          <Link to="/signup" className="create-account-btn">Create Account</Link>
        </div>
      </header>

      {/* Main page content */}
      <div className="info-page-header">
        <h1 className="info-page-title">About WePay</h1>
        <p className="info-page-subtitle">Revolutionizing digital payments through blockchain technology.</p>
      </div>

      <div className="info-page-content">
        <section className="info-section">
          <h2 className="info-section-title">Our Mission</h2>
          <div className="mission-content">
            <div className="mission-text">
              <p className="info-text">
                At WePay, our mission is to create a more accessible, secure, and efficient financial ecosystem by leveraging the power of blockchain technology. We believe that everyone deserves access to modern financial services, regardless of their location or background.
              </p>
              <p className="info-text">
                We're building a platform that simplifies cryptocurrency transactions, making them as easy and familiar as traditional payment methods while maintaining the security and transparency that blockchain technology offers.
              </p>
            </div>
            <div className="mission-image" style={{ backgroundColor: "#f2f2f2", height: "300px", width: "450px", borderRadius: "8px" }}></div>
          </div>
        </section>

        <section className="info-section">
          <h2 className="info-section-title">Our Story</h2>
          <div className="story-timeline">
            <div className="timeline-item">
              <div className="timeline-year">2019</div>
              <div className="timeline-content">
                <h3>The Beginning</h3>
                <p>
                  WePay was founded by a group of fintech and blockchain enthusiasts who recognized the potential of cryptocurrency to transform the global payment landscape but were frustrated by its complexity for everyday users.
                </p>
              </div>
            </div>
            
            <div className="timeline-item">
              <div className="timeline-year">2020</div>
              <div className="timeline-content">
                <h3>First Prototype</h3>
                <p>
                  After months of development, we launched our first prototype, allowing users to send and receive cryptocurrency payments with a simple, intuitive interface.
                </p>
              </div>
            </div>
            
            <div className="timeline-item">
              <div className="timeline-year">2021</div>
              <div className="timeline-content">
                <h3>Seed Funding</h3>
                <p>
                  We secured $5 million in seed funding from leading venture capital firms specializing in blockchain technology and fintech innovations.
                </p>
              </div>
            </div>
            
            <div className="timeline-item">
              <div className="timeline-year">2022</div>
              <div className="timeline-content">
                <h3>Beta Launch</h3>
                <p>
                  Our beta platform was launched to 10,000 early adopters, who provided valuable feedback that helped shape the current version of WePay.
                </p>
              </div>
            </div>
            
            <div className="timeline-item">
              <div className="timeline-year">2023</div>
              <div className="timeline-content">
                <h3>Official Launch</h3>
                <p>
                  WePay officially launched to the public, offering seamless cryptocurrency payments, wallet services, and integration with traditional banking systems.
                </p>
              </div>
            </div>
            
            <div className="timeline-item">
              <div className="timeline-year">2024</div>
              <div className="timeline-content">
                <h3>Global Expansion</h3>
                <p>
                  We expanded our services to over 30 countries, making WePay accessible to millions of users worldwide.
                </p>
              </div>
            </div>
            
            <div className="timeline-item">
              <div className="timeline-year">2025</div>
              <div className="timeline-content">
                <h3>The Future</h3>
                <p>
                  We're continuing to innovate and expand, with plans to introduce new features and partnerships that will further bridge the gap between traditional finance and the world of cryptocurrency.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="info-section">
          <h2 className="info-section-title">Our Values</h2>
          <div className="values-grid">
            <div className="value-card">
              <h3 className="value-title">Accessibility</h3>
              <p className="value-description">
                We believe financial services should be accessible to everyone, regardless of their background or location.
              </p>
            </div>
            
            <div className="value-card">
              <h3 className="value-title">Security</h3>
              <p className="value-description">
                We prioritize the security of our users' assets and data, implementing the highest standards of protection.
              </p>
            </div>
            
            <div className="value-card">
              <h3 className="value-title">Transparency</h3>
              <p className="value-description">
                We operate with complete transparency, ensuring our users understand how our platform works and how their assets are managed.
              </p>
            </div>
            
            <div className="value-card">
              <h3 className="value-title">Innovation</h3>
              <p className="value-description">
                We continuously innovate to improve our platform and stay at the forefront of blockchain technology.
              </p>
            </div>
            
            <div className="value-card">
              <h3 className="value-title">Community</h3>
              <p className="value-description">
                We value our community of users and actively seek their input to shape the future of WePay.
              </p>
            </div>
            
            <div className="value-card">
              <h3 className="value-title">Integrity</h3>
              <p className="value-description">
                We act with integrity in all our dealings, ensuring trust and reliability for our users.
              </p>
            </div>
          </div>
        </section>

        <section className="info-section">
          <h2 className="info-section-title">Our Technology</h2>
          <div className="tech-content">
            <div className="tech-text">
              <p className="info-text">
                WePay is built on a robust blockchain infrastructure that ensures security, speed, and reliability for all transactions. Our technology combines the best aspects of decentralized finance with user-friendly interfaces to create a seamless payment experience.
              </p>
              <p className="info-text">
                We utilize smart contracts for secure and transparent transactions, advanced encryption for data protection, and innovative consensus mechanisms for efficient validation of transactions.
              </p>
              <p className="info-text">
                Our platform is designed to be scalable, capable of handling millions of transactions per second without compromising on security or user experience.
              </p>
            </div>
            <div className="tech-features">
              <div className="tech-feature">
                <h3>Smart Contracts</h3>
                <p>Self-executing contracts with the terms directly written into code.</p>
              </div>
              <div className="tech-feature">
                <h3>Multi-chain Support</h3>
                <p>Support for multiple blockchain networks to provide flexibility and interoperability.</p>
              </div>
              <div className="tech-feature">
                <h3>Advanced Encryption</h3>
                <p>State-of-the-art encryption to protect user data and transactions.</p>
              </div>
              <div className="tech-feature">
                <h3>Decentralized Identity</h3>
                <p>Self-sovereign identity solutions for secure and private authentication.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="info-section">
          <h2 className="info-section-title">Impact</h2>
          <div className="impact-stats">
            <div className="stat-card">
              <div className="stat-number">3M+</div>
              <div className="stat-label">Users Worldwide</div>
            </div>
            <div className="stat-card">
              <div className="stat-number">$500M+</div>
              <div className="stat-label">Transactions Processed</div>
            </div>
            <div className="stat-card">
              <div className="stat-number">30+</div>
              <div className="stat-label">Countries Served</div>
            </div>
            <div className="stat-card">
              <div className="stat-number">100+</div>
              <div className="stat-label">Business Partners</div>
            </div>
          </div>
          <div className="impact-stories">
            <h3>Success Stories</h3>
            <div className="story-cards">
              <div className="story-card">
                <h4>"WePay transformed how I manage my international business."</h4>
                <p>- Sarah T., Small Business Owner</p>
              </div>
              <div className="story-card">
                <h4>"The security and ease of use make WePay my go-to payment platform."</h4>
                <p>- Michael R., Freelancer</p>
              </div>
              <div className="story-card">
                <h4>"WePay has made cryptocurrency accessible to our entire community."</h4>
                <p>- Community Bank of Westfield</p>
              </div>
            </div>
          </div>
        </section>

        <section className="info-section">
          <h2 className="info-section-title">Investors & Partners</h2>
          <p className="info-text">
            We're proud to be backed by leading investors in the blockchain and fintech space and to partner with organizations that share our vision for the future of digital payments.
          </p>
          <div className="partners-grid">
            <div className="partner-logo" style={{ backgroundColor: "#f2f2f2", height: "100px", width: "200px", borderRadius: "8px" }}></div>
            <div className="partner-logo" style={{ backgroundColor: "#f2f2f2", height: "100px", width: "200px", borderRadius: "8px" }}></div>
            <div className="partner-logo" style={{ backgroundColor: "#f2f2f2", height: "100px", width: "200px", borderRadius: "8px" }}></div>
            <div className="partner-logo" style={{ backgroundColor: "#f2f2f2", height: "100px", width: "200px", borderRadius: "8px" }}></div>
            <div className="partner-logo" style={{ backgroundColor: "#f2f2f2", height: "100px", width: "200px", borderRadius: "8px" }}></div>
            <div className="partner-logo" style={{ backgroundColor: "#f2f2f2", height: "100px", width: "200px", borderRadius: "8px" }}></div>
            <div className="partner-logo" style={{ backgroundColor: "#f2f2f2", height: "100px", width: "200px", borderRadius: "8px" }}></div>
            <div className="partner-logo" style={{ backgroundColor: "#f2f2f2", height: "100px", width: "200px", borderRadius: "8px" }}></div>
          </div>
        </section>
        
        <div className="cta-section" style={{ padding: "3rem", textAlign: "center", marginTop: "3rem", backgroundColor: "#f8f9fa", borderRadius: "12px" }}>
          <h2>Join Our Journey</h2>
          <p>Be part of the future of digital payments and help us make financial services more accessible to everyone.</p>
          <div className="cta-buttons" style={{ marginTop: "1.5rem" }}>
            <Link to="/signup" className="btn btn-primary" style={{ marginRight: "1rem" }}>Create Account</Link>
            <Link to="/careers" className="btn btn-secondary">Join Our Team</Link>
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

export default AboutUs; 