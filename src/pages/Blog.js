import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Pages.css';
import logoImage from '../assets/images/logo.png';

const Blog = () => {
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
        </div>
        <div className="auth-buttons">
          <Link to="/login" className="login-btn">Log In</Link>
          <Link to="/signup" className="create-account-btn">Create Account</Link>
        </div>
      </header>

      {/* Main page content */}
      <div className="info-page-header">
        <h1 className="info-page-title">WePay Blog</h1>
        <p className="info-page-subtitle">Insights, updates, and news from the world of cryptocurrency and blockchain technology.</p>
      </div>

      <div className="info-page-content">
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          
          {/* Featured post */}
          <div className="featured-post" style={{ marginBottom: "4rem" }}>
            <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
              <div style={{ backgroundColor: "#f2f2f2", height: "400px", borderRadius: "8px" }}></div>
              <div>
                <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "1rem" }}>
                  <span style={{ backgroundColor: "#e6f7ff", color: "#0a85d1", padding: "0.25rem 0.75rem", borderRadius: "4px", fontSize: "0.875rem" }}>Technology</span>
                  <span style={{ color: "#666", fontSize: "0.875rem" }}>July 15, 2025</span>
                </div>
                <h2 style={{ fontSize: "2rem", marginTop: "0", marginBottom: "1rem" }}>Layer 2 Solutions: The Future of Ethereum Scalability</h2>
                <p style={{ fontSize: "1.125rem", color: "#444", marginBottom: "1.5rem" }}>
                  An in-depth look at how Layer 2 scaling solutions are transforming the Ethereum ecosystem, reducing gas fees, and enabling faster transactions for all users.
                </p>
                <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                  <div style={{ width: "40px", height: "40px", borderRadius: "50%", backgroundColor: "#ddd" }}></div>
                  <div>
                    <div style={{ fontWeight: "bold" }}>Michael Chen</div>
                    <div style={{ fontSize: "0.875rem", color: "#666" }}>Chief Technology Officer</div>
                  </div>
                </div>
                <a href="#read-more" style={{ display: "inline-block", marginTop: "1.5rem", fontWeight: "bold", color: "#0a85d1", textDecoration: "none" }}>Read More →</a>
              </div>
            </div>
          </div>
          
          {/* Recent Posts */}
          <section className="info-section">
            <h2 className="info-section-title">Recent Posts</h2>
            
            <div className="blog-grid" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "2rem", marginTop: "2rem" }}>
              
              {/* Blog Post 1 */}
              <div className="blog-card">
                <div style={{ backgroundColor: "#f2f2f2", height: "200px", borderRadius: "8px 8px 0 0" }}></div>
                <div style={{ padding: "1.5rem" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
                    <span style={{ backgroundColor: "#e6f7ff", color: "#0a85d1", padding: "0.25rem 0.75rem", borderRadius: "4px", fontSize: "0.75rem" }}>Security</span>
                    <span style={{ color: "#666", fontSize: "0.75rem" }}>July 10, 2025</span>
                  </div>
                  <h3 style={{ marginTop: "0", marginBottom: "1rem" }}>Protecting Your Crypto: Essential Security Practices</h3>
                  <p style={{ color: "#444", fontSize: "0.875rem", marginBottom: "1.5rem" }}>
                    Learn the most effective strategies for securing your cryptocurrency assets and protecting yourself from common security threats.
                  </p>
                  <a href="#read-post-1" style={{ fontWeight: "bold", color: "#0a85d1", textDecoration: "none" }}>Read More →</a>
                </div>
              </div>
              
              {/* Blog Post 2 */}
              <div className="blog-card">
                <div style={{ backgroundColor: "#f2f2f2", height: "200px", borderRadius: "8px 8px 0 0" }}></div>
                <div style={{ padding: "1.5rem" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
                    <span style={{ backgroundColor: "#e6f7ff", color: "#0a85d1", padding: "0.25rem 0.75rem", borderRadius: "4px", fontSize: "0.75rem" }}>Guide</span>
                    <span style={{ color: "#666", fontSize: "0.75rem" }}>July 5, 2025</span>
                  </div>
                  <h3 style={{ marginTop: "0", marginBottom: "1rem" }}>DeFi Explained: A Beginner's Guide to Decentralized Finance</h3>
                  <p style={{ color: "#444", fontSize: "0.875rem", marginBottom: "1.5rem" }}>
                    Unlock the potential of decentralized finance with our comprehensive guide for newcomers to the blockchain space.
                  </p>
                  <a href="#read-post-2" style={{ fontWeight: "bold", color: "#0a85d1", textDecoration: "none" }}>Read More →</a>
                </div>
              </div>
              
              {/* Blog Post 3 */}
              <div className="blog-card">
                <div style={{ backgroundColor: "#f2f2f2", height: "200px", borderRadius: "8px 8px 0 0" }}></div>
                <div style={{ padding: "1.5rem" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
                    <span style={{ backgroundColor: "#e6f7ff", color: "#0a85d1", padding: "0.25rem 0.75rem", borderRadius: "4px", fontSize: "0.75rem" }}>News</span>
                    <span style={{ color: "#666", fontSize: "0.75rem" }}>June 28, 2025</span>
                  </div>
                  <h3 style={{ marginTop: "0", marginBottom: "1rem" }}>WePay Introduces Cross-Chain Transaction Support</h3>
                  <p style={{ color: "#444", fontSize: "0.875rem", marginBottom: "1.5rem" }}>
                    We're excited to announce our new cross-chain functionality, enabling transfers between Ethereum and other popular blockchain networks.
                  </p>
                  <a href="#read-post-3" style={{ fontWeight: "bold", color: "#0a85d1", textDecoration: "none" }}>Read More →</a>
                </div>
              </div>
              
              {/* Blog Post 4 */}
              <div className="blog-card">
                <div style={{ backgroundColor: "#f2f2f2", height: "200px", borderRadius: "8px 8px 0 0" }}></div>
                <div style={{ padding: "1.5rem" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
                    <span style={{ backgroundColor: "#e6f7ff", color: "#0a85d1", padding: "0.25rem 0.75rem", borderRadius: "4px", fontSize: "0.75rem" }}>Tutorial</span>
                    <span style={{ color: "#666", fontSize: "0.75rem" }}>June 20, 2025</span>
                  </div>
                  <h3 style={{ marginTop: "0", marginBottom: "1rem" }}>Optimizing Gas Fees: Tips and Tricks for Ethereum Users</h3>
                  <p style={{ color: "#444", fontSize: "0.875rem", marginBottom: "1.5rem" }}>
                    Discover practical strategies to minimize transaction costs when using the Ethereum network, even during periods of high congestion.
                  </p>
                  <a href="#read-post-4" style={{ fontWeight: "bold", color: "#0a85d1", textDecoration: "none" }}>Read More →</a>
                </div>
              </div>
              
              {/* Blog Post 5 */}
              <div className="blog-card">
                <div style={{ backgroundColor: "#f2f2f2", height: "200px", borderRadius: "8px 8px 0 0" }}></div>
                <div style={{ padding: "1.5rem" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
                    <span style={{ backgroundColor: "#e6f7ff", color: "#0a85d1", padding: "0.25rem 0.75rem", borderRadius: "4px", fontSize: "0.75rem" }}>Industry</span>
                    <span style={{ color: "#666", fontSize: "0.75rem" }}>June 15, 2025</span>
                  </div>
                  <h3 style={{ marginTop: "0", marginBottom: "1rem" }}>Blockchain and Sustainability: Addressing Environmental Concerns</h3>
                  <p style={{ color: "#444", fontSize: "0.875rem", marginBottom: "1.5rem" }}>
                    An exploration of how the blockchain industry is working to reduce its environmental impact and create more sustainable solutions.
                  </p>
                  <a href="#read-post-5" style={{ fontWeight: "bold", color: "#0a85d1", textDecoration: "none" }}>Read More →</a>
                </div>
              </div>
              
              {/* Blog Post 6 */}
              <div className="blog-card">
                <div style={{ backgroundColor: "#f2f2f2", height: "200px", borderRadius: "8px 8px 0 0" }}></div>
                <div style={{ padding: "1.5rem" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
                    <span style={{ backgroundColor: "#e6f7ff", color: "#0a85d1", padding: "0.25rem 0.75rem", borderRadius: "4px", fontSize: "0.75rem" }}>Analysis</span>
                    <span style={{ color: "#666", fontSize: "0.75rem" }}>June 8, 2025</span>
                  </div>
                  <h3 style={{ marginTop: "0", marginBottom: "1rem" }}>The Evolution of Smart Contracts: Past, Present, and Future</h3>
                  <p style={{ color: "#444", fontSize: "0.875rem", marginBottom: "1.5rem" }}>
                    From their inception to current innovations, explore how smart contracts have transformed blockchain applications and what's next.
                  </p>
                  <a href="#read-post-6" style={{ fontWeight: "bold", color: "#0a85d1", textDecoration: "none" }}>Read More →</a>
                </div>
              </div>
            </div>
            
            <div style={{ textAlign: "center", marginTop: "3rem" }}>
              <a href="#view-all-posts" className="btn btn-primary">View All Posts</a>
            </div>
          </section>
          
          {/* Categories */}
          <section className="info-section">
            <h2 className="info-section-title">Categories</h2>
            
            <div className="categories" style={{ display: "flex", flexWrap: "wrap", gap: "1rem", marginTop: "1.5rem" }}>
              <a href="#technology" style={{ padding: "0.75rem 1.5rem", backgroundColor: "#f8f9fa", borderRadius: "4px", textDecoration: "none", color: "#333", fontWeight: "bold" }}>Technology</a>
              <a href="#security" style={{ padding: "0.75rem 1.5rem", backgroundColor: "#f8f9fa", borderRadius: "4px", textDecoration: "none", color: "#333", fontWeight: "bold" }}>Security</a>
              <a href="#guides" style={{ padding: "0.75rem 1.5rem", backgroundColor: "#f8f9fa", borderRadius: "4px", textDecoration: "none", color: "#333", fontWeight: "bold" }}>Guides</a>
              <a href="#tutorials" style={{ padding: "0.75rem 1.5rem", backgroundColor: "#f8f9fa", borderRadius: "4px", textDecoration: "none", color: "#333", fontWeight: "bold" }}>Tutorials</a>
              <a href="#news" style={{ padding: "0.75rem 1.5rem", backgroundColor: "#f8f9fa", borderRadius: "4px", textDecoration: "none", color: "#333", fontWeight: "bold" }}>News</a>
              <a href="#industry" style={{ padding: "0.75rem 1.5rem", backgroundColor: "#f8f9fa", borderRadius: "4px", textDecoration: "none", color: "#333", fontWeight: "bold" }}>Industry</a>
              <a href="#analysis" style={{ padding: "0.75rem 1.5rem", backgroundColor: "#f8f9fa", borderRadius: "4px", textDecoration: "none", color: "#333", fontWeight: "bold" }}>Analysis</a>
              <a href="#opinion" style={{ padding: "0.75rem 1.5rem", backgroundColor: "#f8f9fa", borderRadius: "4px", textDecoration: "none", color: "#333", fontWeight: "bold" }}>Opinion</a>
            </div>
          </section>
          
          {/* Newsletter */}
          <section className="info-section" style={{ backgroundColor: "#f8f9fa", padding: "3rem", borderRadius: "8px", marginTop: "4rem" }}>
            <div style={{ textAlign: "center", maxWidth: "600px", margin: "0 auto" }}>
              <h2 style={{ marginTop: 0 }}>Subscribe to Our Newsletter</h2>
              <p style={{ marginBottom: "2rem" }}>Stay updated with the latest news, tutorials, and insights from the world of blockchain and cryptocurrency.</p>
              <div style={{ display: "flex", gap: "1rem" }}>
                <input type="email" placeholder="Your email address" style={{ flex: 1, padding: "0.75rem 1rem", borderRadius: "4px", border: "1px solid #ddd" }} />
                <button style={{ padding: "0.75rem 1.5rem", backgroundColor: "#0a85d1", color: "white", border: "none", borderRadius: "4px", cursor: "pointer" }}>Subscribe</button>
              </div>
              <p style={{ fontSize: "0.875rem", color: "#666", marginTop: "1rem" }}>We respect your privacy. Unsubscribe at any time.</p>
            </div>
          </section>
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

export default Blog; 