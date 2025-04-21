import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Pages.css';
import '../styles/Press.css';
import logoImage from '../assets/images/logo.png';

const Press = () => {
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
          <Link to="/press">Press</Link>
        </div>
        <div className="auth-buttons">
          <Link to="/login" className="login-btn">Log In</Link>
          <Link to="/signup" className="create-account-btn">Create Account</Link>
        </div>
      </header>

      {/* Main page content */}
      <div className="info-page-header">
        <h1 className="info-page-title">Press Center</h1>
        <p className="info-page-subtitle">Latest news, announcements, and media resources from WePay.</p>
      </div>

      <div className="info-page-content">
        <section className="info-section" style={{ marginBottom: "3rem" }}>
          <h2 className="info-section-title">Press Contact</h2>
          <div className="contact-box" style={{ backgroundColor: "#f8f9fa", padding: "2rem", borderRadius: "8px", marginTop: "1.5rem" }}>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "2rem" }}>
              <div style={{ flex: "1 1 300px" }}>
                <h3>Media Inquiries</h3>
                <p>For press inquiries, interview requests, or additional information, please contact our PR team:</p>
                <p><strong>Email:</strong> press@wepay-crypto.com</p>
                <p><strong>Phone:</strong> +1 (555) 123-4567</p>
              </div>
              <div style={{ flex: "1 1 300px" }}>
                <h3>Response Time</h3>
                <p>We strive to respond to all media inquiries within 24 hours during business days. For urgent matters, please indicate "URGENT" in your email subject line.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="info-section">
          <h2 className="info-section-title">Recent Press Releases</h2>
          <div className="press-releases">
            <div className="press-release" style={{ padding: "2rem", borderRadius: "8px", border: "1px solid #eee", marginBottom: "2rem" }}>
              <span className="date-badge" style={{ backgroundColor: "#e9f7fe", color: "#0a85d1", padding: "0.25rem 0.75rem", borderRadius: "20px", fontSize: "0.8rem", display: "inline-block", marginBottom: "1rem" }}>June 15, 2023</span>
              <h3 style={{ margin: "0 0 1rem 0" }}>WePay Secures $45 Million Series C Funding to Accelerate Global Expansion</h3>
              <p style={{ marginBottom: "1.5rem" }}>
                WePay, the leading cryptocurrency payment platform, today announced it has raised $45 million in Series C funding led by Blockchain Capital with participation from existing investors including Andreessen Horowitz and Sequoia Capital.
              </p>
              <p style={{ marginBottom: "1.5rem" }}>
                This new round of funding will fuel the company's international expansion plans, enhance platform security, and accelerate the development of new features designed to make cryptocurrency payments more accessible to businesses of all sizes.
              </p>
              <a href="/press/funding-announcement" className="btn btn-outline">Read Full Release</a>
            </div>

            <div className="press-release" style={{ padding: "2rem", borderRadius: "8px", border: "1px solid #eee", marginBottom: "2rem" }}>
              <span className="date-badge" style={{ backgroundColor: "#e9f7fe", color: "#0a85d1", padding: "0.25rem 0.75rem", borderRadius: "20px", fontSize: "0.8rem", display: "inline-block", marginBottom: "1rem" }}>April 3, 2023</span>
              <h3 style={{ margin: "0 0 1rem 0" }}>WePay Launches Industry-First Multi-Chain Payment Processing System</h3>
              <p style={{ marginBottom: "1.5rem" }}>
                WePay today unveiled its groundbreaking multi-chain payment processing system, enabling merchants to accept payments across five major blockchain networks through a single integration.
              </p>
              <p style={{ marginBottom: "1.5rem" }}>
                This industry-first technology eliminates the complexity of managing multiple blockchain connections, allowing businesses to seamlessly process crypto payments with reduced fees and enhanced transaction speeds.
              </p>
              <a href="/press/multi-chain-launch" className="btn btn-outline">Read Full Release</a>
            </div>

            <div className="press-release" style={{ padding: "2rem", borderRadius: "8px", border: "1px solid #eee", marginBottom: "2rem" }}>
              <span className="date-badge" style={{ backgroundColor: "#e9f7fe", color: "#0a85d1", padding: "0.25rem 0.75rem", borderRadius: "20px", fontSize: "0.8rem", display: "inline-block", marginBottom: "1rem" }}>February 8, 2023</span>
              <h3 style={{ margin: "0 0 1rem 0" }}>WePay Partners with Global E-commerce Platform to Bring Crypto Payments to 100,000+ Merchants</h3>
              <p style={{ marginBottom: "1.5rem" }}>
                WePay has announced a strategic partnership with ShopNow, one of the world's largest e-commerce platforms, to integrate cryptocurrency payment options for more than 100,000 online merchants.
              </p>
              <p style={{ marginBottom: "1.5rem" }}>
                The partnership will enable ShopNow merchants to easily accept Bitcoin, Ethereum, and other cryptocurrencies through WePay's secure and user-friendly payment gateway, opening new markets and reducing transaction costs.
              </p>
              <a href="/press/shopnow-partnership" className="btn btn-outline">Read Full Release</a>
            </div>

            <div className="press-release" style={{ padding: "2rem", borderRadius: "8px", border: "1px solid #eee", marginBottom: "2rem" }}>
              <span className="date-badge" style={{ backgroundColor: "#e9f7fe", color: "#0a85d1", padding: "0.25rem 0.75rem", borderRadius: "20px", fontSize: "0.8rem", display: "inline-block", marginBottom: "1rem" }}>November 15, 2022</span>
              <h3 style={{ margin: "0 0 1rem 0" }}>WePay Achieves SOC 2 Type II Certification, Setting New Security Standard in Crypto Payments</h3>
              <p style={{ marginBottom: "1.5rem" }}>
                WePay today announced it has successfully completed the SOC 2 Type II audit, demonstrating the company's ongoing commitment to the highest standards of security, availability, and confidentiality.
              </p>
              <p style={{ marginBottom: "1.5rem" }}>
                This certification, validated by an independent third-party auditor, confirms that WePay's infrastructure, policies, and procedures meet rigorous industry standards for protecting customer data and ensuring system reliability.
              </p>
              <a href="/press/soc2-certification" className="btn btn-outline">Read Full Release</a>
            </div>

            <div className="press-release-archive" style={{ textAlign: "center", marginTop: "2rem" }}>
              <a href="/press/archive" className="btn btn-primary">View Press Release Archive</a>
            </div>
          </div>
        </section>

        <section className="info-section" style={{ marginTop: "3rem" }}>
          <h2 className="info-section-title">Media Coverage</h2>
          <div className="media-coverage" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "2rem", marginTop: "2rem" }}>
            <div className="media-item" style={{ padding: "1.5rem", borderRadius: "8px", boxShadow: "0 2px 4px rgba(0,0,0,0.05)", border: "1px solid #eee" }}>
              <div className="source-logo" style={{ height: "40px", backgroundColor: "#f8f9fa", marginBottom: "1rem", display: "flex", alignItems: "center", padding: "0 1rem" }}>
                <span style={{ fontWeight: "bold" }}>TechCrunch</span>
              </div>
              <h3 style={{ fontSize: "1.1rem", marginBottom: "0.75rem" }}>How WePay is Revolutionizing Cross-Border Payments with Blockchain</h3>
              <p style={{ color: "#666", marginBottom: "1rem" }}>May 25, 2023</p>
              <a href="https://techcrunch.com/example" target="_blank" rel="noopener noreferrer" className="btn btn-sm btn-outline">Read Article</a>
            </div>

            <div className="media-item" style={{ padding: "1.5rem", borderRadius: "8px", boxShadow: "0 2px 4px rgba(0,0,0,0.05)", border: "1px solid #eee" }}>
              <div className="source-logo" style={{ height: "40px", backgroundColor: "#f8f9fa", marginBottom: "1rem", display: "flex", alignItems: "center", padding: "0 1rem" }}>
                <span style={{ fontWeight: "bold" }}>Forbes</span>
              </div>
              <h3 style={{ fontSize: "1.1rem", marginBottom: "0.75rem" }}>WePay CEO Sarah Johnson Named to Forbes 30 Under 30 in Finance</h3>
              <p style={{ color: "#666", marginBottom: "1rem" }}>March 15, 2023</p>
              <a href="https://forbes.com/example" target="_blank" rel="noopener noreferrer" className="btn btn-sm btn-outline">Read Article</a>
            </div>

            <div className="media-item" style={{ padding: "1.5rem", borderRadius: "8px", boxShadow: "0 2px 4px rgba(0,0,0,0.05)", border: "1px solid #eee" }}>
              <div className="source-logo" style={{ height: "40px", backgroundColor: "#f8f9fa", marginBottom: "1rem", display: "flex", alignItems: "center", padding: "0 1rem" }}>
                <span style={{ fontWeight: "bold" }}>CNBC</span>
              </div>
              <h3 style={{ fontSize: "1.1rem", marginBottom: "0.75rem" }}>The Future of Payment Processing: CNBC Exclusive with WePay Founders</h3>
              <p style={{ color: "#666", marginBottom: "1rem" }}>January 30, 2023</p>
              <a href="https://cnbc.com/example" target="_blank" rel="noopener noreferrer" className="btn btn-sm btn-outline">Watch Interview</a>
            </div>

            <div className="media-item" style={{ padding: "1.5rem", borderRadius: "8px", boxShadow: "0 2px 4px rgba(0,0,0,0.05)", border: "1px solid #eee" }}>
              <div className="source-logo" style={{ height: "40px", backgroundColor: "#f8f9fa", marginBottom: "1rem", display: "flex", alignItems: "center", padding: "0 1rem" }}>
                <span style={{ fontWeight: "bold" }}>CoinDesk</span>
              </div>
              <h3 style={{ fontSize: "1.1rem", marginBottom: "0.75rem" }}>WePay's Multi-Chain System: A Game-Changer for Crypto Adoption</h3>
              <p style={{ color: "#666", marginBottom: "1rem" }}>April 5, 2023</p>
              <a href="https://coindesk.com/example" target="_blank" rel="noopener noreferrer" className="btn btn-sm btn-outline">Read Article</a>
            </div>

            <div className="media-item" style={{ padding: "1.5rem", borderRadius: "8px", boxShadow: "0 2px 4px rgba(0,0,0,0.05)", border: "1px solid #eee" }}>
              <div className="source-logo" style={{ height: "40px", backgroundColor: "#f8f9fa", marginBottom: "1rem", display: "flex", alignItems: "center", padding: "0 1rem" }}>
                <span style={{ fontWeight: "bold" }}>Bloomberg</span>
              </div>
              <h3 style={{ fontSize: "1.1rem", marginBottom: "0.75rem" }}>WePay Leads Innovation in the Cryptocurrency Payment Space, Analysts Say</h3>
              <p style={{ color: "#666", marginBottom: "1rem" }}>December 12, 2022</p>
              <a href="https://bloomberg.com/example" target="_blank" rel="noopener noreferrer" className="btn btn-sm btn-outline">Read Article</a>
            </div>

            <div className="media-item" style={{ padding: "1.5rem", borderRadius: "8px", boxShadow: "0 2px 4px rgba(0,0,0,0.05)", border: "1px solid #eee" }}>
              <div className="source-logo" style={{ height: "40px", backgroundColor: "#f8f9fa", marginBottom: "1rem", display: "flex", alignItems: "center", padding: "0 1rem" }}>
                <span style={{ fontWeight: "bold" }}>The Wall Street Journal</span>
              </div>
              <h3 style={{ fontSize: "1.1rem", marginBottom: "0.75rem" }}>Cryptocurrency Payments Going Mainstream with WePay's Retail Partnerships</h3>
              <p style={{ color: "#666", marginBottom: "1rem" }}>February 10, 2023</p>
              <a href="https://wsj.com/example" target="_blank" rel="noopener noreferrer" className="btn btn-sm btn-outline">Read Article</a>
            </div>
          </div>
        </section>

        <section className="info-section" style={{ marginTop: "3rem" }}>
          <h2 className="info-section-title">Media Assets</h2>
          <p className="section-description">Download our brand assets for use in articles and media coverage. Please adhere to our <a href="/brand-guidelines" style={{ color: "#0a85d1" }}>brand guidelines</a> when using these materials.</p>
          
          <div className="asset-categories" style={{ marginTop: "2rem" }}>
            <div className="asset-category" style={{ marginBottom: "2.5rem" }}>
              <h3>Logo Package</h3>
              <div className="asset-gallery" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))", gap: "1.5rem", marginTop: "1rem" }}>
                <div className="asset-item" style={{ padding: "1.5rem", borderRadius: "8px", border: "1px solid #eee", backgroundColor: "white" }}>
                  <div className="asset-preview" style={{ height: "150px", backgroundColor: "#f8f9fa", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "1rem" }}>
                    <span>WePay Logo (Color)</span>
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <span>PNG, SVG, EPS</span>
                    <a href="/media/logos/wepay-logo-pack.zip" className="btn btn-sm btn-outline">Download</a>
                  </div>
                </div>
                
                <div className="asset-item" style={{ padding: "1.5rem", borderRadius: "8px", border: "1px solid #eee", backgroundColor: "white" }}>
                  <div className="asset-preview" style={{ height: "150px", backgroundColor: "#f8f9fa", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "1rem" }}>
                    <span>WePay Logo (White)</span>
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <span>PNG, SVG, EPS</span>
                    <a href="/media/logos/wepay-white-logo-pack.zip" className="btn btn-sm btn-outline">Download</a>
                  </div>
                </div>
                
                <div className="asset-item" style={{ padding: "1.5rem", borderRadius: "8px", border: "1px solid #eee", backgroundColor: "white" }}>
                  <div className="asset-preview" style={{ height: "150px", backgroundColor: "#f8f9fa", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "1rem" }}>
                    <span>WePay Logo (Black)</span>
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <span>PNG, SVG, EPS</span>
                    <a href="/media/logos/wepay-black-logo-pack.zip" className="btn btn-sm btn-outline">Download</a>
                  </div>
                </div>
                
                <div className="asset-item" style={{ padding: "1.5rem", borderRadius: "8px", border: "1px solid #eee", backgroundColor: "white" }}>
                  <div className="asset-preview" style={{ height: "150px", backgroundColor: "#f8f9fa", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "1rem" }}>
                    <span>WePay Icon Set</span>
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <span>PNG, SVG</span>
                    <a href="/media/logos/wepay-icon-pack.zip" className="btn btn-sm btn-outline">Download</a>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="asset-category" style={{ marginBottom: "2.5rem" }}>
              <h3>Product Screenshots</h3>
              <div className="asset-gallery" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))", gap: "1.5rem", marginTop: "1rem" }}>
                <div className="asset-item" style={{ padding: "1.5rem", borderRadius: "8px", border: "1px solid #eee", backgroundColor: "white" }}>
                  <div className="asset-preview" style={{ height: "150px", backgroundColor: "#f8f9fa", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "1rem" }}>
                    <span>Dashboard Screenshots</span>
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <span>High-res PNG</span>
                    <a href="/media/screenshots/dashboard-pack.zip" className="btn btn-sm btn-outline">Download</a>
                  </div>
                </div>
                
                <div className="asset-item" style={{ padding: "1.5rem", borderRadius: "8px", border: "1px solid #eee", backgroundColor: "white" }}>
                  <div className="asset-preview" style={{ height: "150px", backgroundColor: "#f8f9fa", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "1rem" }}>
                    <span>Mobile App Screenshots</span>
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <span>High-res PNG</span>
                    <a href="/media/screenshots/mobile-pack.zip" className="btn btn-sm btn-outline">Download</a>
                  </div>
                </div>
                
                <div className="asset-item" style={{ padding: "1.5rem", borderRadius: "8px", border: "1px solid #eee", backgroundColor: "white" }}>
                  <div className="asset-preview" style={{ height: "150px", backgroundColor: "#f8f9fa", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "1rem" }}>
                    <span>Payment Flow Screenshots</span>
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <span>High-res PNG</span>
                    <a href="/media/screenshots/payment-flow-pack.zip" className="btn btn-sm btn-outline">Download</a>
                  </div>
                </div>
                
                <div className="asset-item" style={{ padding: "1.5rem", borderRadius: "8px", border: "1px solid #eee", backgroundColor: "white" }}>
                  <div className="asset-preview" style={{ height: "150px", backgroundColor: "#f8f9fa", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "1rem" }}>
                    <span>Merchant Tools Screenshots</span>
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <span>High-res PNG</span>
                    <a href="/media/screenshots/merchant-tools-pack.zip" className="btn btn-sm btn-outline">Download</a>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="asset-category">
              <h3>Executive Team Photos</h3>
              <div className="asset-gallery" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))", gap: "1.5rem", marginTop: "1rem" }}>
                <div className="asset-item" style={{ padding: "1.5rem", borderRadius: "8px", border: "1px solid #eee", backgroundColor: "white" }}>
                  <div className="asset-preview" style={{ height: "150px", backgroundColor: "#f8f9fa", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "1rem" }}>
                    <span>CEO - Sarah Johnson</span>
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <span>High-res JPG</span>
                    <a href="/media/photos/sarah-johnson.zip" className="btn btn-sm btn-outline">Download</a>
                  </div>
                </div>
                
                <div className="asset-item" style={{ padding: "1.5rem", borderRadius: "8px", border: "1px solid #eee", backgroundColor: "white" }}>
                  <div className="asset-preview" style={{ height: "150px", backgroundColor: "#f8f9fa", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "1rem" }}>
                    <span>CTO - Michael Chen</span>
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <span>High-res JPG</span>
                    <a href="/media/photos/michael-chen.zip" className="btn btn-sm btn-outline">Download</a>
                  </div>
                </div>
                
                <div className="asset-item" style={{ padding: "1.5rem", borderRadius: "8px", border: "1px solid #eee", backgroundColor: "white" }}>
                  <div className="asset-preview" style={{ height: "150px", backgroundColor: "#f8f9fa", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "1rem" }}>
                    <span>Executive Team</span>
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <span>High-res JPG</span>
                    <a href="/media/photos/executive-team.zip" className="btn btn-sm btn-outline">Download</a>
                  </div>
                </div>
                
                <div className="asset-item" style={{ padding: "1.5rem", borderRadius: "8px", border: "1px solid #eee", backgroundColor: "white" }}>
                  <div className="asset-preview" style={{ height: "150px", backgroundColor: "#f8f9fa", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "1rem" }}>
                    <span>Complete Team Photo Pack</span>
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <span>High-res JPG</span>
                    <a href="/media/photos/team-photo-pack.zip" className="btn btn-sm btn-outline">Download</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="info-section" style={{ marginTop: "3rem" }}>
          <h2 className="info-section-title">Company Information</h2>
          <div className="company-info" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "2rem", marginTop: "2rem" }}>
            <div className="info-card" style={{ padding: "2rem", borderRadius: "8px", backgroundColor: "#f8f9fa" }}>
              <h3>About WePay</h3>
              <p>
                WePay is a leading cryptocurrency payment platform that enables businesses to accept, process, and manage digital currency transactions. Founded in 2019, our mission is to make cryptocurrency payments accessible, secure, and seamless for businesses and consumers worldwide.
              </p>
              <a href="/about-us" className="btn btn-sm btn-outline" style={{ marginTop: "1rem" }}>Learn More</a>
            </div>
            
            <div className="info-card" style={{ padding: "2rem", borderRadius: "8px", backgroundColor: "#f8f9fa" }}>
              <h3>Executive Leadership</h3>
              <ul style={{ paddingLeft: "1.25rem", marginBottom: "1rem" }}>
                <li>Sarah Johnson - Chief Executive Officer</li>
                <li>Michael Chen - Chief Technology Officer</li>
                <li>David Lee - Chief Product Officer</li>
                <li>Anna Rodriguez - Chief Financial Officer</li>
                <li>James Wilson - Chief Operating Officer</li>
              </ul>
              <a href="/team" className="btn btn-sm btn-outline">View Team Page</a>
            </div>
            
            <div className="info-card" style={{ padding: "2rem", borderRadius: "8px", backgroundColor: "#f8f9fa" }}>
              <h3>Company Facts</h3>
              <ul style={{ paddingLeft: "1.25rem" }}>
                <li>Founded: 2019</li>
                <li>Headquarters: San Francisco, CA</li>
                <li>Employees: 180+</li>
                <li>Funding: $75 Million</li>
                <li>Merchants: 10,000+</li>
                <li>Supported Cryptocurrencies: 25+</li>
                <li>Processing Volume: $2+ Billion annually</li>
              </ul>
            </div>
            
            <div className="info-card" style={{ padding: "2rem", borderRadius: "8px", backgroundColor: "#f8f9fa" }}>
              <h3>Boilerplate</h3>
              <p style={{ fontSize: "0.9rem" }}>
                WePay is a leading cryptocurrency payment platform enabling merchants worldwide to accept, process, and manage digital currency transactions with ease. Its multi-chain infrastructure supports Bitcoin, Ethereum, and 20+ cryptocurrencies, offering businesses reduced fees, faster settlements, and enhanced security. Founded in 2019 and headquartered in San Francisco, WePay serves over 10,000 merchants across 65+ countries, processing more than $2 billion in annual transaction volume. Backed by top-tier investors including Blockchain Capital, Andreessen Horowitz, and Sequoia Capital, WePay is revolutionizing the future of digital payments through innovative blockchain technology.
              </p>
              <button
                onClick={() => {navigator.clipboard.writeText("WePay is a leading cryptocurrency payment platform enabling merchants worldwide to accept, process, and manage digital currency transactions with ease. Its multi-chain infrastructure supports Bitcoin, Ethereum, and 20+ cryptocurrencies, offering businesses reduced fees, faster settlements, and enhanced security. Founded in 2019 and headquartered in San Francisco, WePay serves over 10,000 merchants across 65+ countries, processing more than $2 billion in annual transaction volume. Backed by top-tier investors including Blockchain Capital, Andreessen Horowitz, and Sequoia Capital, WePay is revolutionizing the future of digital payments through innovative blockchain technology.")}}
                className="btn btn-sm btn-outline"
                style={{ marginTop: "1rem" }}
              >
                Copy Text
              </button>
            </div>
          </div>
        </section>

        <div className="cta-section" style={{ padding: "3rem", textAlign: "center", marginTop: "3rem", backgroundColor: "#f8f9fa", borderRadius: "12px" }}>
          <h2>Stay Updated</h2>
          <p>Subscribe to our press releases and company news to stay informed about the latest developments at WePay.</p>
          <form className="subscribe-form" style={{ maxWidth: "500px", margin: "1.5rem auto 0", display: "flex", gap: "0.5rem" }}>
            <input type="email" placeholder="Enter your email address" className="form-input" style={{ flex: "1", padding: "0.75rem", borderRadius: "4px", border: "1px solid #ddd" }} />
            <button type="submit" className="btn btn-primary">Subscribe</button>
          </form>
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

export default Press; 