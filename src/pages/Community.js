import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Pages.css';
import logoImage from '../assets/images/logo.png';

const Community = () => {
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
          <Link to="/community">Community</Link>
        </div>
        <div className="auth-buttons">
          <Link to="/login" className="login-btn">Log In</Link>
          <Link to="/signup" className="create-account-btn">Create Account</Link>
        </div>
      </header>

      {/* Main page content */}
      <div className="info-page-header">
        <h1 className="info-page-title">WePay Community</h1>
        <p className="info-page-subtitle">Join our thriving community of blockchain enthusiasts, developers, and users.</p>
      </div>

      <div className="info-page-content">
        <section className="info-section">
          <h2 className="info-section-title">Connect With Us</h2>
          <p className="info-text">
            Become part of the growing WePay community and engage with fellow users and our team. Share ideas, ask questions, and stay updated on the latest developments.
          </p>
          
          <div className="info-grid" style={{ marginTop: "2rem" }}>
            <div className="info-card">
              <div className="info-card-icon">🗣️</div>
              <h3 className="info-card-title">Discussion Forum</h3>
              <p className="info-card-text">
                Join conversations on blockchain technology, Ethereum transactions, and WePay features with other community members.
              </p>
              <a href="#forum" style={{ display: "inline-block", padding: "0.5rem 1rem", backgroundColor: "#0a85d1", color: "white", borderRadius: "0.25rem", textDecoration: "none", marginTop: "1rem" }}>Visit Forum</a>
            </div>
            
            <div className="info-card">
              <div className="info-card-icon">🎮</div>
              <h3 className="info-card-title">Discord Server</h3>
              <p className="info-card-text">
                Chat in real-time with our community and team members on our official Discord server with dedicated channels for various topics.
              </p>
              <a href="#discord" style={{ display: "inline-block", padding: "0.5rem 1rem", backgroundColor: "#0a85d1", color: "white", borderRadius: "0.25rem", textDecoration: "none", marginTop: "1rem" }}>Join Discord</a>
            </div>
            
            <div className="info-card">
              <div className="info-card-icon">🐦</div>
              <h3 className="info-card-title">Twitter</h3>
              <p className="info-card-text">
                Follow us on Twitter for the latest announcements, tips, and industry insights. Join the conversation using #WePay.
              </p>
              <a href="#twitter" style={{ display: "inline-block", padding: "0.5rem 1rem", backgroundColor: "#0a85d1", color: "white", borderRadius: "0.25rem", textDecoration: "none", marginTop: "1rem" }}>Follow Us</a>
            </div>
            
            <div className="info-card">
              <div className="info-card-icon">📱</div>
              <h3 className="info-card-title">Telegram Group</h3>
              <p className="info-card-text">
                Join our Telegram group for quick updates and discussions with community members from around the world.
              </p>
              <a href="#telegram" style={{ display: "inline-block", padding: "0.5rem 1rem", backgroundColor: "#0a85d1", color: "white", borderRadius: "0.25rem", textDecoration: "none", marginTop: "1rem" }}>Join Telegram</a>
            </div>
          </div>
        </section>
        
        <section className="info-section">
          <h2 className="info-section-title">Community Resources</h2>
          <p className="info-text">
            Access valuable resources created by and for our community members to enhance your WePay experience.
          </p>
          
          <div className="resources-grid" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "2rem", marginTop: "2rem" }}>
            <div className="resource-card" style={{ padding: "2rem", backgroundColor: "#f8f9fa", borderRadius: "8px" }}>
              <h3 style={{ marginTop: 0 }}>User Tutorials</h3>
              <p>
                Step-by-step guides created by our community to help you navigate WePay and make the most of its features.
              </p>
              <a href="#tutorials" style={{ fontWeight: "bold", color: "#0a85d1", textDecoration: "none" }}>Browse Tutorials →</a>
            </div>
            
            <div className="resource-card" style={{ padding: "2rem", backgroundColor: "#f8f9fa", borderRadius: "8px" }}>
              <h3 style={{ marginTop: 0 }}>Developer Resources</h3>
              <p>
                Code samples, integration examples, and open-source tools contributed by our developer community.
              </p>
              <a href="#dev-resources" style={{ fontWeight: "bold", color: "#0a85d1", textDecoration: "none" }}>Explore Resources →</a>
            </div>
            
            <div className="resource-card" style={{ padding: "2rem", backgroundColor: "#f8f9fa", borderRadius: "8px" }}>
              <h3 style={{ marginTop: 0 }}>Community Wiki</h3>
              <p>
                Collaborative knowledge base covering everything from basic concepts to advanced techniques.
              </p>
              <a href="#wiki" style={{ fontWeight: "bold", color: "#0a85d1", textDecoration: "none" }}>Visit Wiki →</a>
            </div>
            
            <div className="resource-card" style={{ padding: "2rem", backgroundColor: "#f8f9fa", borderRadius: "8px" }}>
              <h3 style={{ marginTop: 0 }}>Educational Videos</h3>
              <p>
                Video tutorials and explainers created by community members to help you understand blockchain concepts.
              </p>
              <a href="#videos" style={{ fontWeight: "bold", color: "#0a85d1", textDecoration: "none" }}>Watch Videos →</a>
            </div>
          </div>
        </section>
        
        <section className="info-section">
          <h2 className="info-section-title">Community Spotlight</h2>
          <p className="info-text">
            Meet the outstanding members of our community who are making significant contributions.
          </p>
          
          <div className="community-members" style={{ display: "flex", flexWrap: "wrap", gap: "2rem", marginTop: "2rem" }}>
            <div className="member-card" style={{ width: "calc(33.333% - 1.5rem)", minWidth: "250px", flexGrow: 1 }}>
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center" }}>
                <div style={{ width: "120px", height: "120px", borderRadius: "50%", backgroundColor: "#ddd", marginBottom: "1rem" }}></div>
                <h3 style={{ margin: "0 0 0.5rem" }}>Alex Chen</h3>
                <div style={{ color: "#0a85d1", marginBottom: "1rem" }}>Developer Advocate</div>
                <p style={{ color: "#666" }}>
                  Created numerous tutorials and open-source tools that have helped thousands of WePay users.
                </p>
                <div style={{ display: "flex", gap: "0.5rem", marginTop: "1rem" }}>
                  <a href="#twitter" style={{ color: "#0a85d1", textDecoration: "none" }}>Twitter</a>
                  <a href="#github" style={{ color: "#0a85d1", textDecoration: "none" }}>GitHub</a>
                </div>
              </div>
            </div>
            
            <div className="member-card" style={{ width: "calc(33.333% - 1.5rem)", minWidth: "250px", flexGrow: 1 }}>
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center" }}>
                <div style={{ width: "120px", height: "120px", borderRadius: "50%", backgroundColor: "#ddd", marginBottom: "1rem" }}></div>
                <h3 style={{ margin: "0 0 0.5rem" }}>Maria Rodriguez</h3>
                <div style={{ color: "#0a85d1", marginBottom: "1rem" }}>Forum Moderator</div>
                <p style={{ color: "#666" }}>
                  Tirelessly helps new users navigate the platform and troubleshoot issues on our community forum.
                </p>
                <div style={{ display: "flex", gap: "0.5rem", marginTop: "1rem" }}>
                  <a href="#twitter" style={{ color: "#0a85d1", textDecoration: "none" }}>Twitter</a>
                  <a href="#linkedin" style={{ color: "#0a85d1", textDecoration: "none" }}>LinkedIn</a>
                </div>
              </div>
            </div>
            
            <div className="member-card" style={{ width: "calc(33.333% - 1.5rem)", minWidth: "250px", flexGrow: 1 }}>
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center" }}>
                <div style={{ width: "120px", height: "120px", borderRadius: "50%", backgroundColor: "#ddd", marginBottom: "1rem" }}></div>
                <h3 style={{ margin: "0 0 0.5rem" }}>David Kim</h3>
                <div style={{ color: "#0a85d1", marginBottom: "1rem" }}>Content Creator</div>
                <p style={{ color: "#666" }}>
                  Produces educational videos and articles explaining complex blockchain concepts in simple terms.
                </p>
                <div style={{ display: "flex", gap: "0.5rem", marginTop: "1rem" }}>
                  <a href="#youtube" style={{ color: "#0a85d1", textDecoration: "none" }}>YouTube</a>
                  <a href="#twitter" style={{ color: "#0a85d1", textDecoration: "none" }}>Twitter</a>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        <section className="info-section">
          <h2 className="info-section-title">Upcoming Events</h2>
          <p className="info-text">
            Join us for virtual and in-person events to learn, network, and grow with the WePay community.
          </p>
          
          <div className="events-list" style={{ marginTop: "2rem" }}>
            <div className="event-card" style={{ padding: "2rem", backgroundColor: "#f8f9fa", borderRadius: "8px", marginBottom: "1.5rem" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: "1rem" }}>
                <div>
                  <h3 style={{ marginTop: 0, marginBottom: "0.5rem" }}>WePay Community Meetup - New York</h3>
                  <p style={{ color: "#666", marginBottom: "1rem" }}>
                    <span style={{ marginRight: "1rem" }}><strong>Date:</strong> August 15, 2025</span>
                    <span><strong>Time:</strong> 6:00 PM - 9:00 PM EST</span>
                  </p>
                  <p style={{ maxWidth: "600px", marginBottom: "1rem" }}>
                    Join us for an evening of networking, lightning talks, and discussions about the future of Ethereum and WePay. Food and drinks will be provided.
                  </p>
                  <a href="#register" style={{ fontWeight: "bold", color: "#0a85d1", textDecoration: "none" }}>Register Now →</a>
                </div>
                <div style={{ backgroundColor: "#ddd", width: "150px", height: "100px", borderRadius: "4px", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <span>Event Image</span>
                </div>
              </div>
            </div>
            
            <div className="event-card" style={{ padding: "2rem", backgroundColor: "#f8f9fa", borderRadius: "8px", marginBottom: "1.5rem" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: "1rem" }}>
                <div>
                  <h3 style={{ marginTop: 0, marginBottom: "0.5rem" }}>Virtual Workshop: Building on WePay API</h3>
                  <p style={{ color: "#666", marginBottom: "1rem" }}>
                    <span style={{ marginRight: "1rem" }}><strong>Date:</strong> August 22, 2025</span>
                    <span><strong>Time:</strong> 1:00 PM - 3:00 PM UTC</span>
                  </p>
                  <p style={{ maxWidth: "600px", marginBottom: "1rem" }}>
                    Learn how to integrate WePay functionality into your applications with our comprehensive API. This hands-on workshop will cover authentication, transactions, and best practices.
                  </p>
                  <a href="#register" style={{ fontWeight: "bold", color: "#0a85d1", textDecoration: "none" }}>Register Now →</a>
                </div>
                <div style={{ backgroundColor: "#ddd", width: "150px", height: "100px", borderRadius: "4px", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <span>Event Image</span>
                </div>
              </div>
            </div>
            
            <div className="event-card" style={{ padding: "2rem", backgroundColor: "#f8f9fa", borderRadius: "8px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: "1rem" }}>
                <div>
                  <h3 style={{ marginTop: 0, marginBottom: "0.5rem" }}>AMA Session with WePay Founders</h3>
                  <p style={{ color: "#666", marginBottom: "1rem" }}>
                    <span style={{ marginRight: "1rem" }}><strong>Date:</strong> September 5, 2025</span>
                    <span><strong>Time:</strong> 11:00 AM - 12:00 PM UTC</span>
                  </p>
                  <p style={{ maxWidth: "600px", marginBottom: "1rem" }}>
                    Join our Discord server for a live Ask Me Anything session with the founders of WePay. Get insights into our roadmap, ask questions, and provide feedback.
                  </p>
                  <a href="#add-calendar" style={{ fontWeight: "bold", color: "#0a85d1", textDecoration: "none" }}>Add to Calendar →</a>
                </div>
                <div style={{ backgroundColor: "#ddd", width: "150px", height: "100px", borderRadius: "4px", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <span>Event Image</span>
                </div>
              </div>
            </div>
          </div>
          
          <div style={{ textAlign: "center", marginTop: "2rem" }}>
            <a href="#all-events" className="btn btn-primary">View All Events</a>
          </div>
        </section>
        
        <section className="info-section" style={{ backgroundColor: "#f8f9fa", padding: "3rem", borderRadius: "8px", marginTop: "4rem", textAlign: "center" }}>
          <h2 style={{ marginTop: 0 }}>Join Our Community Today</h2>
          <p style={{ maxWidth: "600px", margin: "1rem auto 2rem" }}>
            Become part of our vibrant community of Ethereum enthusiasts, developers, and users. Connect, learn, and grow with us!
          </p>
          <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
            <a href="#discord" style={{ padding: "0.75rem 1.5rem", backgroundColor: "#0a85d1", color: "white", borderRadius: "4px", textDecoration: "none" }}>Join Discord</a>
            <a href="#forum" style={{ padding: "0.75rem 1.5rem", backgroundColor: "#0a85d1", color: "white", borderRadius: "4px", textDecoration: "none" }}>Visit Forum</a>
            <a href="#telegram" style={{ padding: "0.75rem 1.5rem", backgroundColor: "#0a85d1", color: "white", borderRadius: "4px", textDecoration: "none" }}>Join Telegram</a>
          </div>
        </section>
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

export default Community; 