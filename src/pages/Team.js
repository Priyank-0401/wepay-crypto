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
        </div>
        <div className="auth-buttons">
          <Link to="/login" className="login-btn">Log In</Link>
          <Link to="/signup" className="create-account-btn">Create Account</Link>
        </div>
      </header>

      {/* Main page content */}
      <div className="info-page-header">
        <h1 className="info-page-title">Our Team</h1>
        <p className="info-page-subtitle">Meet the passionate expert behind the future of blockchain transactions.</p>
      </div>

      <div className="info-page-content">
        <section className="info-section founder-section">
          <h2 className="info-section-title">Founder & Lead Developer</h2>
          <div className="founder-profile">
            <div className="founder-photo-container">
              <div className="founder-photo" style={{ backgroundColor: "#5d00d5", height: "300px", width: "300px", borderRadius: "50%" }}>
                <div className="founder-initials">PP</div>
              </div>
            </div>
            <div className="founder-details">
              <h3 className="founder-name">Priyank Pahwa</h3>
              <p className="founder-title">Founder & Full-Stack Blockchain Developer</p>
              <div className="founder-social">
                <a href="https://github.com/Priyank-0401" className="social-link" target="_blank" rel="noopener noreferrer"><i className="social-icon github"></i>GitHub</a>
                <a href="https://linkedin.com/in/priyankpahwa41" className="social-link" target="_blank" rel="noopener noreferrer"><i className="social-icon linkedin"></i>LinkedIn</a>
                <a href="mailto:priyankpahwa41@gmail.com" className="social-link"><i className="social-icon email"></i>Email</a>
              </div>
              <div className="founder-bio">
                <p>Innovative blockchain developer with expertise in Web3, smart contract development, and decentralized applications. Currently pursuing Computer Science with a minor in IoT at Manipal University Jaipur with a GPA of 8.5/10.</p>
                <p>As the sole developer of WePay, I handle all aspects of the project:</p>
                <div className="role-cards">
                  <div className="role-card">
                    <div className="role-icon">💻</div>
                    <h4>Full-Stack Development</h4>
                    <p>Building both frontend and backend systems using React.js and Node.js</p>
                  </div>
                  <div className="role-card">
                    <div className="role-icon">🔗</div>
                    <h4>Blockchain Architecture</h4>
                    <p>Designing and implementing smart contracts in Solidity</p>
                  </div>
                  <div className="role-card">
                    <div className="role-icon">🛡️</div>
                    <h4>Security Implementation</h4>
                    <p>Ensuring transactions remain secure and tamper-proof</p>
                  </div>
                  <div className="role-card">
                    <div className="role-icon">🎨</div>
                    <h4>UI/UX Design</h4>
                    <p>Creating intuitive interfaces for seamless user experience</p>
                  </div>
                  <div className="role-card">
                    <div className="role-icon">📊</div>
                    <h4>Data Analytics</h4>
                    <p>Implementing transaction analytics and visualization tools</p>
                  </div>
                  <div className="role-card">
                    <div className="role-icon">🚀</div>
                    <h4>Project Vision</h4>
                    <p>Directing the strategic development and future roadmap</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="info-section">
          <h2 className="info-section-title">Projects</h2>
          <div className="projects-container">
            <div className="project-card">
              <h3 className="project-title">WePay - Blockchain Transaction Application</h3>
              <p className="project-date">January 2025 - April 2025</p>
              <p className="project-description">
                A blockchain-powered payment platform designed to facilitate secure and tamper-proof financial transactions for up to 1,000+ concurrent users.
              </p>
              <div className="project-features">
                <div className="feature-item">
                  <span className="feature-icon">✓</span>
                  <p>Engineered smart contracts in Solidity to ensure fraud-proof transactions and eliminate third-party interference</p>
                </div>
                <div className="feature-item">
                  <span className="feature-icon">✓</span>
                  <p>Designed a user-friendly frontend with React.js, enhancing accessibility and ease of use</p>
                </div>
                <div className="feature-item">
                  <span className="feature-icon">✓</span>
                  <p>Architected a scalable backend capable of handling thousands of transactions per month</p>
                </div>
                <div className="feature-item">
                  <span className="feature-icon">✓</span>
                  <p>Integrated wallet management features, aiming to support multi-currency transactions in future expansions</p>
                </div>
              </div>
              <div className="project-future">
                <h4>Future Vision</h4>
                <ul>
                  <li>Scaling the platform to support 1,000+ concurrent users and businesses globally</li>
                  <li>Facilitating seamless cross-border transactions with minimal fees using blockchain technology</li>
                </ul>
              </div>
            </div>

            <div className="project-card">
              <h3 className="project-title">PharmaFleet - Smart Medicine Inventory Management System</h3>
              <p className="project-date">January 2025 - Current</p>
              <p className="project-description">
                An advanced medicine inventory management system utilizing smart cartons with integrated sensors, NFC tags, and barcode-based tracking for real-time monitoring and efficient stock management.
              </p>
              <div className="project-features">
                <div className="feature-item">
                  <span className="feature-icon">✓</span>
                  <p>Engineered a real-time interactive dashboard using Power BI to provide data-driven insights into inventory levels and trends</p>
                </div>
                <div className="feature-item">
                  <span className="feature-icon">✓</span>
                  <p>Implemented Wi-Fi-based long-range tracking to enhance supply chain visibility and streamline warehouse operations</p>
                </div>
                <div className="feature-item">
                  <span className="feature-icon">✓</span>
                  <p>Designed a sensor-integrated smart carton system for monitoring storage conditions, ensuring pharmaceutical compliance</p>
                </div>
                <div className="feature-item">
                  <span className="feature-icon">✓</span>
                  <p>Developed automated stock updates to minimize manual errors and operational inefficiencies</p>
                </div>
              </div>
              <div className="project-future">
                <h4>Future Vision</h4>
                <ul>
                  <li>Expanding smart carton tracking to 10,000+ units, optimizing large-scale pharmaceutical logistics</li>
                  <li>Integrating blockchain for immutable inventory tracking, ensuring 100% data integrity and security</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section className="info-section">
          <h2 className="info-section-title">Skills & Expertise</h2>
          <div className="skills-container">
            <div className="skills-category">
              <h3>Blockchain & Web3</h3>
              <div className="skills-list">
                <span className="skill-item">Web3</span>
                <span className="skill-item">Blockchain Fundamentals</span>
                <span className="skill-item">Solidity</span>
                <span className="skill-item">DApps</span>
                <span className="skill-item">DeFi</span>
                <span className="skill-item">Smart Contracts</span>
              </div>
            </div>
            <div className="skills-category">
              <h3>Frontend Development</h3>
              <div className="skills-list">
                <span className="skill-item">ReactJS</span>
                <span className="skill-item">Front End Development</span>
                <span className="skill-item">JavaScript</span>
                <span className="skill-item">HTML/CSS</span>
              </div>
            </div>
            <div className="skills-category">
              <h3>Backend Development</h3>
              <div className="skills-list">
                <span className="skill-item">NodeJS</span>
                <span className="skill-item">SQL</span>
                <span className="skill-item">PHP</span>
                <span className="skill-item">Python</span>
                <span className="skill-item">Java</span>
                <span className="skill-item">C++</span>
              </div>
            </div>
            <div className="skills-category">
              <h3>Other Technical Skills</h3>
              <div className="skills-list">
                <span className="skill-item">OOP</span>
                <span className="skill-item">Github</span>
                <span className="skill-item">Project Management</span>
              </div>
            </div>
          </div>
        </section>

        <section className="info-section">
          <h2 className="info-section-title">Education & Certifications</h2>
          <div className="education-container">
            <div className="education-item">
              <h3>Manipal University Jaipur</h3>
              <p className="education-detail">Bachelor of Technology, Computer Science</p>
              <p className="education-date">Expected May 2026</p>
              <p className="education-description">Minor in Internet of Things</p>
              <p className="education-gpa">Cumulative GPA: 8.5/10</p>
            </div>
            <div className="education-item">
              <h3>Blue Bells Model School</h3>
              <p className="education-detail">Higher Secondary Education, CBSE</p>
              <p className="education-date">April 2021 - June 2022</p>
              <p className="education-gpa">79%</p>
            </div>
            <div className="certifications-container">
              <h3>Certifications</h3>
              <div className="certification-list">
                <div className="certification-item">
                  <span className="certification-name">Ethereum Fundamentals by Alchemy University</span>
                </div>
                <div className="certification-item">
                  <span className="certification-name">MySQL</span>
                </div>
                <div className="certification-item">
                  <span className="certification-name">Web Development</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="info-section">
          <h2 className="info-section-title">Achievements</h2>
          <div className="achievements-container">
            <div className="achievement-item">
              <div className="achievement-icon">🏆</div>
              <div className="achievement-content">
                <h3>2nd Position in All-India Quiz Competition</h3>
                <p>Organized by Inquisitive Minds, with a teammate (9th Grade)</p>
              </div>
            </div>
            <div className="achievement-item">
              <div className="achievement-icon">🏀</div>
              <div className="achievement-content">
                <h3>State Level Basketball Championship Runner-Up</h3>
              </div>
            </div>
            <div className="achievement-item">
              <div className="achievement-icon">🏅</div>
              <div className="achievement-content">
                <h3>Medals in Several Olympiads</h3>
              </div>
            </div>
          </div>
        </section>

        <section className="info-section">
          <h2 className="info-section-title">Contact Me</h2>
          <p className="info-text">
            Interested in learning more about WePay or discussing potential collaborations? Feel free to reach out directly.
          </p>
          <div className="contact-details">
            <div className="contact-item">
              <div className="contact-icon">📧</div>
              <div className="contact-info">
                <h3>Email</h3>
                <p><a href="mailto:priyankpahwa41@gmail.com">priyankpahwa41@gmail.com</a></p>
              </div>
            </div>
            <div className="contact-item">
              <div className="contact-icon">🔗</div>
              <div className="contact-info">
                <h3>LinkedIn</h3>
                <p><a href="https://linkedin.com/in/priyankpahwa41" target="_blank" rel="noopener noreferrer">linkedin.com/in/priyankpahwa41</a></p>
              </div>
            </div>
            <div className="contact-item">
              <div className="contact-icon">💻</div>
              <div className="contact-info">
                <h3>GitHub</h3>
                <p><a href="https://github.com/Priyank-0401" target="_blank" rel="noopener noreferrer">github.com/Priyank-0401</a></p>
              </div>
            </div>
          </div>
        </section>
      </div>

      <footer className="footer">
        <div className="footer-container">
          <div className="footer-logo">
            <Link to="/" className="logo-link">
              <img src={logoImage} alt="WePay Logo" className="footer-logo-img" />
              <span className="logo-text">WePay</span>
            </Link>
            <p>Secure blockchain transactions for everyone</p>
          </div>
          <div className="footer-links">
            <div className="footer-column">
              <h4>Company</h4>
              <ul>
                <li><Link to="/about-us">About Us</Link></li>
                <li><Link to="/team">Our Team</Link></li>
              </ul>
            </div>
            <div className="footer-column">
              <h4>Resources</h4>
              <ul>
                <li><Link to="/features">Features</Link></li>
                <li><Link to="/security">Security</Link></li>
              </ul>
            </div>
            <div className="footer-column">
              <h4>Legal</h4>
              <ul>
                <li><Link to="/terms-of-service">Terms of Service</Link></li>
                <li><Link to="/privacy-policy">Privacy Policy</Link></li>
              </ul>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; 2025 WePay. All rights reserved.</p>
          <p>Created by Priyank Pahwa</p>
        </div>
      </footer>
    </div>
  );
};

export default Team; 