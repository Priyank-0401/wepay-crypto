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
        <p className="info-page-subtitle">Our mission is to make Ethereum transactions accessible, secure, and simple for everyone.</p>
      </div>

      <div className="info-page-content">
        <section className="info-section">
          <h2 className="info-section-title">Our Story</h2>
          <p className="info-text">
            WePay was founded in 2021 by a team of blockchain enthusiasts and fintech experts who recognized the need for a more user-friendly way to interact with Ethereum and other cryptocurrencies.
          </p>
          <p className="info-text">
            Our founders were early adopters of blockchain technology who experienced firsthand the challenges that newcomers faced. They set out to create a platform that would eliminate these barriers and make cryptocurrency transactions as simple as traditional banking.
          </p>
          <p className="info-text">
            From our humble beginnings as a small startup, we've grown into a leading platform trusted by thousands of users worldwide for their daily Ethereum transactions.
          </p>
        </section>
        
        <section className="info-section">
          <h2 className="info-section-title">Our Mission</h2>
          <p className="info-text">
            At WePay, we're on a mission to democratize access to blockchain technology by creating intuitive tools that anyone can use, regardless of their technical background.
          </p>
          
          <div className="info-grid">
            <div className="info-card">
              <div className="info-card-icon">🌎</div>
              <h3 className="info-card-title">Accessibility</h3>
              <p className="info-card-text">
                We believe that blockchain technology should be accessible to everyone, not just technical experts and early adopters.
              </p>
            </div>
            
            <div className="info-card">
              <div className="info-card-icon">🔒</div>
              <h3 className="info-card-title">Security</h3>
              <p className="info-card-text">
                We're committed to implementing the highest security standards to protect our users' assets and information.
              </p>
            </div>
            
            <div className="info-card">
              <div className="info-card-icon">💡</div>
              <h3 className="info-card-title">Innovation</h3>
              <p className="info-card-text">
                We continuously push the boundaries of what's possible in blockchain user experience and functionality.
              </p>
            </div>
            
            <div className="info-card">
              <div className="info-card-icon">👥</div>
              <h3 className="info-card-title">Community</h3>
              <p className="info-card-text">
                We foster a strong community of users and developers who share our vision for the future of finance.
              </p>
            </div>
          </div>
        </section>
        
        <section className="info-section">
          <h2 className="info-section-title">Our Values</h2>
          <p className="info-text">
            These core values guide everything we do at WePay, from product development to customer support.
          </p>
          
          <div className="info-grid">
            <div className="info-card">
              <div className="info-card-icon">⚖️</div>
              <h3 className="info-card-title">Transparency</h3>
              <p className="info-card-text">
                We operate with complete transparency, ensuring that our users always know what's happening with their transactions and data.
              </p>
            </div>
            
            <div className="info-card">
              <div className="info-card-icon">🤝</div>
              <h3 className="info-card-title">Trust</h3>
              <p className="info-card-text">
                We build trust through reliable service, clear communication, and always putting our users' interests first.
              </p>
            </div>
            
            <div className="info-card">
              <div className="info-card-icon">🚀</div>
              <h3 className="info-card-title">Excellence</h3>
              <p className="info-card-text">
                We strive for excellence in everything we do, from the code we write to the customer service we provide.
              </p>
            </div>
            
            <div className="info-card">
              <div className="info-card-icon">🌱</div>
              <h3 className="info-card-title">Sustainability</h3>
              <p className="info-card-text">
                We're committed to making blockchain technology more sustainable and reducing our environmental impact.
              </p>
            </div>
          </div>
        </section>
        
        <section className="info-section">
          <h2 className="info-section-title">Our Achievements</h2>
          <p className="info-text">
            Since our founding, we've reached several significant milestones that showcase our growth and impact.
          </p>
          
          <div className="info-grid" style={{ gridTemplateColumns: "repeat(2, 1fr)" }}>
            <div className="info-card">
              <h3 className="info-card-title">100,000+ Users</h3>
              <p className="info-card-text">
                We've grown our user base to over 100,000 active users across 75+ countries.
              </p>
            </div>
            
            <div className="info-card">
              <h3 className="info-card-title">$500M+ Processed</h3>
              <p className="info-card-text">
                We've securely processed over half a billion dollars in Ethereum transactions.
              </p>
            </div>
            
            <div className="info-card">
              <h3 className="info-card-title">Series B Funding</h3>
              <p className="info-card-text">
                We've secured $45M in Series B funding to accelerate our product development and global expansion.
              </p>
            </div>
            
            <div className="info-card">
              <h3 className="info-card-title">Industry Recognition</h3>
              <p className="info-card-text">
                We've received multiple awards for innovation and user experience in the blockchain industry.
              </p>
            </div>
          </div>
        </section>
        
        <div className="cta-section" style={{ padding: "3rem", textAlign: "center", marginTop: "3rem" }}>
          <h2>Join us on our journey</h2>
          <p>Create an account today and experience the future of Ethereum transactions.</p>
          <Link to="/signup" className="btn btn-primary" style={{ marginTop: "1.5rem" }}>Get Started Now</Link>
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