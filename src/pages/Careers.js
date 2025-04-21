import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Pages.css';
import '../styles/Careers.css';
import logoImage from '../assets/images/logo.png';

const Careers = () => {
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
        <h1 className="info-page-title">Careers at WePay</h1>
        <p className="info-page-subtitle">Join us in revolutionizing the future of digital payments through blockchain technology.</p>
      </div>

      <div className="info-page-content">
        <section className="info-section">
          <h2 className="info-section-title">Why Work With Us</h2>
          <div className="values-grid">
            <div className="value-card">
              <div className="value-icon" style={{ backgroundColor: "#e9f7fe", color: "#0a85d1", padding: "15px", borderRadius: "50%", width: "60px", height: "60px", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "24px" }}>🚀</div>
              <h3>Innovation-Driven</h3>
              <p>We're constantly pushing boundaries and exploring new technologies to stay at the forefront of the blockchain revolution.</p>
            </div>
            
            <div className="value-card">
              <div className="value-icon" style={{ backgroundColor: "#fef4e9", color: "#d18d0a", padding: "15px", borderRadius: "50%", width: "60px", height: "60px", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "24px" }}>🌍</div>
              <h3>Global Impact</h3>
              <p>Our work directly impacts millions of users worldwide, making financial services more accessible and equitable.</p>
            </div>
            
            <div className="value-card">
              <div className="value-icon" style={{ backgroundColor: "#e9feef", color: "#0ad157", padding: "15px", borderRadius: "50%", width: "60px", height: "60px", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "24px" }}>🤝</div>
              <h3>Collaborative Culture</h3>
              <p>We believe in the power of diverse perspectives and foster an environment where collaboration thrives.</p>
            </div>
            
            <div className="value-card">
              <div className="value-icon" style={{ backgroundColor: "#f9e9fe", color: "#a10ad1", padding: "15px", borderRadius: "50%", width: "60px", height: "60px", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "24px" }}>📈</div>
              <h3>Growth Opportunities</h3>
              <p>We invest in our team's development with continuous learning, mentorship, and clear paths for advancement.</p>
            </div>
            
            <div className="value-card">
              <div className="value-icon" style={{ backgroundColor: "#fee9f4", color: "#d10a6c", padding: "15px", borderRadius: "50%", width: "60px", height: "60px", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "24px" }}>🛡️</div>
              <h3>Security Focus</h3>
              <p>We take pride in building robust, secure systems that users can trust with their financial transactions.</p>
            </div>
            
            <div className="value-card">
              <div className="value-icon" style={{ backgroundColor: "#e9ecfe", color: "#0a1fd1", padding: "15px", borderRadius: "50%", width: "60px", height: "60px", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "24px" }}>🎯</div>
              <h3>Mission-Driven</h3>
              <p>Our team is united by a shared mission to make cryptocurrency payments accessible to everyone.</p>
            </div>
          </div>
        </section>

        <section className="info-section benefits-section" style={{ backgroundColor: "#f8f9fa", padding: "3rem", borderRadius: "12px", marginTop: "2rem" }}>
          <h2 className="info-section-title">Benefits & Perks</h2>
          <div className="benefits-grid" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "2rem", marginTop: "2rem" }}>
            <div className="benefit-item">
              <h3>Competitive Compensation</h3>
              <p>Salary packages that recognize your skills and experience, including equity options to share in our success.</p>
            </div>
            
            <div className="benefit-item">
              <h3>Flexible Work Arrangements</h3>
              <p>Remote-first culture with flexible hours to help you maintain work-life balance.</p>
            </div>
            
            <div className="benefit-item">
              <h3>Health & Wellness</h3>
              <p>Comprehensive health insurance, mental health support, and wellness programs.</p>
            </div>
            
            <div className="benefit-item">
              <h3>Professional Development</h3>
              <p>Learning stipends, conference attendance, and dedicated time for professional growth.</p>
            </div>
            
            <div className="benefit-item">
              <h3>Team Retreats</h3>
              <p>Regular global meetups to strengthen team bonds and align on our vision.</p>
            </div>
            
            <div className="benefit-item">
              <h3>Equipment Allowance</h3>
              <p>Budget for your home office setup to ensure you have everything you need to work effectively.</p>
            </div>
            
            <div className="benefit-item">
              <h3>Paid Time Off</h3>
              <p>Generous vacation policy, plus additional wellness days and volunteer time off.</p>
            </div>
            
            <div className="benefit-item">
              <h3>Blockchain Education</h3>
              <p>Access to specialized courses and resources to deepen your blockchain knowledge.</p>
            </div>
          </div>
        </section>

        <section className="info-section">
          <h2 className="info-section-title">Open Positions</h2>
          <div className="job-categories">
            <div className="job-category">
              <h3 className="category-title">Engineering</h3>
              <div className="job-list">
                <div className="job-card" style={{ padding: "1.5rem", borderRadius: "8px", boxShadow: "0 2px 4px rgba(0,0,0,0.05)", marginBottom: "1.5rem", border: "1px solid #eee" }}>
                  <div className="job-header" style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "1rem" }}>
                    <div>
                      <h4 style={{ margin: "0 0 0.5rem 0" }}>Senior Blockchain Engineer</h4>
                      <p style={{ margin: "0", color: "#666" }}>Remote (Global) • Full-time</p>
                    </div>
                    <span style={{ backgroundColor: "#e9f7fe", color: "#0a85d1", padding: "0.25rem 0.75rem", borderRadius: "20px", fontSize: "0.8rem" }}>Senior</span>
                  </div>
                  <p className="job-description">Design and implement smart contracts and blockchain infrastructure for our next-generation payment platform.</p>
                  <a href="/careers/senior-blockchain-engineer" className="btn btn-outline">View Details</a>
                </div>
                
                <div className="job-card" style={{ padding: "1.5rem", borderRadius: "8px", boxShadow: "0 2px 4px rgba(0,0,0,0.05)", marginBottom: "1.5rem", border: "1px solid #eee" }}>
                  <div className="job-header" style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "1rem" }}>
                    <div>
                      <h4 style={{ margin: "0 0 0.5rem 0" }}>Frontend Developer</h4>
                      <p style={{ margin: "0", color: "#666" }}>Remote (Global) • Full-time</p>
                    </div>
                    <span style={{ backgroundColor: "#e9f7fe", color: "#0a85d1", padding: "0.25rem 0.75rem", borderRadius: "20px", fontSize: "0.8rem" }}>Mid-level</span>
                  </div>
                  <p className="job-description">Build beautiful, responsive user interfaces for our web and mobile applications using React and modern JavaScript frameworks.</p>
                  <a href="/careers/frontend-developer" className="btn btn-outline">View Details</a>
                </div>
                
                <div className="job-card" style={{ padding: "1.5rem", borderRadius: "8px", boxShadow: "0 2px 4px rgba(0,0,0,0.05)", marginBottom: "1.5rem", border: "1px solid #eee" }}>
                  <div className="job-header" style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "1rem" }}>
                    <div>
                      <h4 style={{ margin: "0 0 0.5rem 0" }}>Backend Engineer</h4>
                      <p style={{ margin: "0", color: "#666" }}>Remote (Global) • Full-time</p>
                    </div>
                    <span style={{ backgroundColor: "#e9f7fe", color: "#0a85d1", padding: "0.25rem 0.75rem", borderRadius: "20px", fontSize: "0.8rem" }}>Senior</span>
                  </div>
                  <p className="job-description">Develop and maintain our API infrastructure, database architecture, and backend services.</p>
                  <a href="/careers/backend-engineer" className="btn btn-outline">View Details</a>
                </div>
                
                <div className="job-card" style={{ padding: "1.5rem", borderRadius: "8px", boxShadow: "0 2px 4px rgba(0,0,0,0.05)", marginBottom: "1.5rem", border: "1px solid #eee" }}>
                  <div className="job-header" style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "1rem" }}>
                    <div>
                      <h4 style={{ margin: "0 0 0.5rem 0" }}>Security Engineer</h4>
                      <p style={{ margin: "0", color: "#666" }}>Remote (Global) • Full-time</p>
                    </div>
                    <span style={{ backgroundColor: "#e9f7fe", color: "#0a85d1", padding: "0.25rem 0.75rem", borderRadius: "20px", fontSize: "0.8rem" }}>Senior</span>
                  </div>
                  <p className="job-description">Ensure the security of our platform through code reviews, penetration testing, and security best practices implementation.</p>
                  <a href="/careers/security-engineer" className="btn btn-outline">View Details</a>
                </div>
              </div>
            </div>
            
            <div className="job-category">
              <h3 className="category-title">Product & Design</h3>
              <div className="job-list">
                <div className="job-card" style={{ padding: "1.5rem", borderRadius: "8px", boxShadow: "0 2px 4px rgba(0,0,0,0.05)", marginBottom: "1.5rem", border: "1px solid #eee" }}>
                  <div className="job-header" style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "1rem" }}>
                    <div>
                      <h4 style={{ margin: "0 0 0.5rem 0" }}>Product Manager</h4>
                      <p style={{ margin: "0", color: "#666" }}>Remote (Global) • Full-time</p>
                    </div>
                    <span style={{ backgroundColor: "#fef4e9", color: "#d18d0a", padding: "0.25rem 0.75rem", borderRadius: "20px", fontSize: "0.8rem" }}>Senior</span>
                  </div>
                  <p className="job-description">Lead the development of product features, working closely with users, engineering, and design teams.</p>
                  <a href="/careers/product-manager" className="btn btn-outline">View Details</a>
                </div>
                
                <div className="job-card" style={{ padding: "1.5rem", borderRadius: "8px", boxShadow: "0 2px 4px rgba(0,0,0,0.05)", marginBottom: "1.5rem", border: "1px solid #eee" }}>
                  <div className="job-header" style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "1rem" }}>
                    <div>
                      <h4 style={{ margin: "0 0 0.5rem 0" }}>UX/UI Designer</h4>
                      <p style={{ margin: "0", color: "#666" }}>Remote (Global) • Full-time</p>
                    </div>
                    <span style={{ backgroundColor: "#fef4e9", color: "#d18d0a", padding: "0.25rem 0.75rem", borderRadius: "20px", fontSize: "0.8rem" }}>Mid-level</span>
                  </div>
                  <p className="job-description">Create intuitive, beautiful user experiences that make complex blockchain interactions simple.</p>
                  <a href="/careers/ux-ui-designer" className="btn btn-outline">View Details</a>
                </div>
              </div>
            </div>
            
            <div className="job-category">
              <h3 className="category-title">Marketing & Growth</h3>
              <div className="job-list">
                <div className="job-card" style={{ padding: "1.5rem", borderRadius: "8px", boxShadow: "0 2px 4px rgba(0,0,0,0.05)", marginBottom: "1.5rem", border: "1px solid #eee" }}>
                  <div className="job-header" style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "1rem" }}>
                    <div>
                      <h4 style={{ margin: "0 0 0.5rem 0" }}>Growth Marketing Specialist</h4>
                      <p style={{ margin: "0", color: "#666" }}>Remote (Global) • Full-time</p>
                    </div>
                    <span style={{ backgroundColor: "#e9feef", color: "#0ad157", padding: "0.25rem 0.75rem", borderRadius: "20px", fontSize: "0.8rem" }}>Mid-level</span>
                  </div>
                  <p className="job-description">Drive user acquisition and retention through data-driven marketing campaigns and strategies.</p>
                  <a href="/careers/growth-marketing-specialist" className="btn btn-outline">View Details</a>
                </div>
                
                <div className="job-card" style={{ padding: "1.5rem", borderRadius: "8px", boxShadow: "0 2px 4px rgba(0,0,0,0.05)", marginBottom: "1.5rem", border: "1px solid #eee" }}>
                  <div className="job-header" style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "1rem" }}>
                    <div>
                      <h4 style={{ margin: "0 0 0.5rem 0" }}>Content Manager</h4>
                      <p style={{ margin: "0", color: "#666" }}>Remote (Global) • Full-time</p>
                    </div>
                    <span style={{ backgroundColor: "#e9feef", color: "#0ad157", padding: "0.25rem 0.75rem", borderRadius: "20px", fontSize: "0.8rem" }}>Mid-level</span>
                  </div>
                  <p className="job-description">Develop and execute our content strategy across blog, social media, and documentation.</p>
                  <a href="/careers/content-manager" className="btn btn-outline">View Details</a>
                </div>
                
                <div className="job-card" style={{ padding: "1.5rem", borderRadius: "8px", boxShadow: "0 2px 4px rgba(0,0,0,0.05)", marginBottom: "1.5rem", border: "1px solid #eee" }}>
                  <div className="job-header" style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "1rem" }}>
                    <div>
                      <h4 style={{ margin: "0 0 0.5rem 0" }}>Community Manager</h4>
                      <p style={{ margin: "0", color: "#666" }}>Remote (Global) • Full-time</p>
                    </div>
                    <span style={{ backgroundColor: "#e9feef", color: "#0ad157", padding: "0.25rem 0.75rem", borderRadius: "20px", fontSize: "0.8rem" }}>Mid-level</span>
                  </div>
                  <p className="job-description">Build and nurture our user community across various platforms and channels.</p>
                  <a href="/careers/community-manager" className="btn btn-outline">View Details</a>
                </div>
              </div>
            </div>
            
            <div className="job-category">
              <h3 className="category-title">Operations & Support</h3>
              <div className="job-list">
                <div className="job-card" style={{ padding: "1.5rem", borderRadius: "8px", boxShadow: "0 2px 4px rgba(0,0,0,0.05)", marginBottom: "1.5rem", border: "1px solid #eee" }}>
                  <div className="job-header" style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "1rem" }}>
                    <div>
                      <h4 style={{ margin: "0 0 0.5rem 0" }}>Customer Support Specialist</h4>
                      <p style={{ margin: "0", color: "#666" }}>Remote (Global) • Full-time</p>
                    </div>
                    <span style={{ backgroundColor: "#f9e9fe", color: "#a10ad1", padding: "0.25rem 0.75rem", borderRadius: "20px", fontSize: "0.8rem" }}>Entry-level</span>
                  </div>
                  <p className="job-description">Provide exceptional support to our users, helping them navigate our platform and resolve issues.</p>
                  <a href="/careers/customer-support-specialist" className="btn btn-outline">View Details</a>
                </div>
                
                <div className="job-card" style={{ padding: "1.5rem", borderRadius: "8px", boxShadow: "0 2px 4px rgba(0,0,0,0.05)", marginBottom: "1.5rem", border: "1px solid #eee" }}>
                  <div className="job-header" style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "1rem" }}>
                    <div>
                      <h4 style={{ margin: "0 0 0.5rem 0" }}>Compliance Officer</h4>
                      <p style={{ margin: "0", color: "#666" }}>Remote (Global) • Full-time</p>
                    </div>
                    <span style={{ backgroundColor: "#f9e9fe", color: "#a10ad1", padding: "0.25rem 0.75rem", borderRadius: "20px", fontSize: "0.8rem" }}>Senior</span>
                  </div>
                  <p className="job-description">Ensure our platform meets global regulatory requirements and stays compliant with evolving crypto regulations.</p>
                  <a href="/careers/compliance-officer" className="btn btn-outline">View Details</a>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="info-section" style={{ marginTop: "3rem" }}>
          <h2 className="info-section-title">Our Hiring Process</h2>
          <div className="process-steps" style={{ display: "flex", flexWrap: "wrap", gap: "1.5rem", marginTop: "2rem" }}>
            <div className="process-step" style={{ flex: "1 1 300px", padding: "2rem", borderRadius: "8px", border: "1px solid #eee", backgroundColor: "white" }}>
              <div className="step-number" style={{ backgroundColor: "#0a85d1", color: "white", width: "40px", height: "40px", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "1rem" }}>1</div>
              <h3>Application Review</h3>
              <p>We review your resume, portfolio, and application responses to assess your qualifications and experience.</p>
              <p className="step-time" style={{ color: "#666", fontSize: "0.9rem", marginTop: "1rem" }}>Timeframe: 1-2 weeks</p>
            </div>
            
            <div className="process-step" style={{ flex: "1 1 300px", padding: "2rem", borderRadius: "8px", border: "1px solid #eee", backgroundColor: "white" }}>
              <div className="step-number" style={{ backgroundColor: "#0a85d1", color: "white", width: "40px", height: "40px", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "1rem" }}>2</div>
              <h3>Initial Interview</h3>
              <p>A video call with our recruiting team to discuss your background, experience, and interest in the role.</p>
              <p className="step-time" style={{ color: "#666", fontSize: "0.9rem", marginTop: "1rem" }}>Timeframe: 30-45 minutes</p>
            </div>
            
            <div className="process-step" style={{ flex: "1 1 300px", padding: "2rem", borderRadius: "8px", border: "1px solid #eee", backgroundColor: "white" }}>
              <div className="step-number" style={{ backgroundColor: "#0a85d1", color: "white", width: "40px", height: "40px", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "1rem" }}>3</div>
              <h3>Technical Assessment</h3>
              <p>A take-home challenge or live coding session to evaluate your technical skills (for technical roles).</p>
              <p className="step-time" style={{ color: "#666", fontSize: "0.9rem", marginTop: "1rem" }}>Timeframe: 2-5 days</p>
            </div>
            
            <div className="process-step" style={{ flex: "1 1 300px", padding: "2rem", borderRadius: "8px", border: "1px solid #eee", backgroundColor: "white" }}>
              <div className="step-number" style={{ backgroundColor: "#0a85d1", color: "white", width: "40px", height: "40px", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "1rem" }}>4</div>
              <h3>Team Interviews</h3>
              <p>Interviews with potential teammates and cross-functional partners to assess team fit.</p>
              <p className="step-time" style={{ color: "#666", fontSize: "0.9rem", marginTop: "1rem" }}>Timeframe: 1-2 hours</p>
            </div>
            
            <div className="process-step" style={{ flex: "1 1 300px", padding: "2rem", borderRadius: "8px", border: "1px solid #eee", backgroundColor: "white" }}>
              <div className="step-number" style={{ backgroundColor: "#0a85d1", color: "white", width: "40px", height: "40px", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "1rem" }}>5</div>
              <h3>Final Interview</h3>
              <p>A conversation with a senior leader to discuss company vision, role expectations, and your career goals.</p>
              <p className="step-time" style={{ color: "#666", fontSize: "0.9rem", marginTop: "1rem" }}>Timeframe: 45-60 minutes</p>
            </div>
            
            <div className="process-step" style={{ flex: "1 1 300px", padding: "2rem", borderRadius: "8px", border: "1px solid #eee", backgroundColor: "white" }}>
              <div className="step-number" style={{ backgroundColor: "#0a85d1", color: "white", width: "40px", height: "40px", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "1rem" }}>6</div>
              <h3>Offer & Onboarding</h3>
              <p>Upon successful completion, we'll extend an offer and support you through the onboarding process.</p>
              <p className="step-time" style={{ color: "#666", fontSize: "0.9rem", marginTop: "1rem" }}>Timeframe: 1-3 weeks</p>
            </div>
          </div>
        </section>
        
        <section className="info-section">
          <h2 className="info-section-title">Employee Testimonials</h2>
          <div className="testimonials" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "2rem", marginTop: "2rem" }}>
            <div className="testimonial" style={{ padding: "2rem", borderRadius: "8px", boxShadow: "0 4px 12px rgba(0,0,0,0.05)", backgroundColor: "white", position: "relative" }}>
              <div style={{ position: "absolute", top: "-15px", left: "30px", fontSize: "60px", color: "#0a85d1", opacity: "0.2" }}>"</div>
              <p style={{ fontSize: "1.1rem", lineHeight: "1.6", marginBottom: "1.5rem" }}>
                Working at WePay has been the highlight of my career. I've had the opportunity to solve challenging technical problems while working with a team that truly cares about creating a more inclusive financial system.
              </p>
              <div className="testimonial-author" style={{ display: "flex", alignItems: "center" }}>
                <div className="author-photo" style={{ width: "50px", height: "50px", borderRadius: "50%", backgroundColor: "#f2f2f2", marginRight: "15px" }}></div>
                <div>
                  <p style={{ margin: "0", fontWeight: "bold" }}>Alex Chen</p>
                  <p style={{ margin: "0", color: "#666", fontSize: "0.9rem" }}>Senior Frontend Developer, 2 years</p>
                </div>
              </div>
            </div>
            
            <div className="testimonial" style={{ padding: "2rem", borderRadius: "8px", boxShadow: "0 4px 12px rgba(0,0,0,0.05)", backgroundColor: "white", position: "relative" }}>
              <div style={{ position: "absolute", top: "-15px", left: "30px", fontSize: "60px", color: "#0a85d1", opacity: "0.2" }}>"</div>
              <p style={{ fontSize: "1.1rem", lineHeight: "1.6", marginBottom: "1.5rem" }}>
                The remote-first culture at WePay has allowed me to work with talented people from all over the world. The team truly values work-life balance while still maintaining high standards of excellence.
              </p>
              <div className="testimonial-author" style={{ display: "flex", alignItems: "center" }}>
                <div className="author-photo" style={{ width: "50px", height: "50px", borderRadius: "50%", backgroundColor: "#f2f2f2", marginRight: "15px" }}></div>
                <div>
                  <p style={{ margin: "0", fontWeight: "bold" }}>Maya Johnson</p>
                  <p style={{ margin: "0", color: "#666", fontSize: "0.9rem" }}>Product Manager, 3 years</p>
                </div>
              </div>
            </div>
            
            <div className="testimonial" style={{ padding: "2rem", borderRadius: "8px", boxShadow: "0 4px 12px rgba(0,0,0,0.05)", backgroundColor: "white", position: "relative" }}>
              <div style={{ position: "absolute", top: "-15px", left: "30px", fontSize: "60px", color: "#0a85d1", opacity: "0.2" }}>"</div>
              <p style={{ fontSize: "1.1rem", lineHeight: "1.6", marginBottom: "1.5rem" }}>
                I joined WePay as an intern and have grown into a senior role. The company invests in its people, provides clear growth paths, and gives you the autonomy to make an impact.
              </p>
              <div className="testimonial-author" style={{ display: "flex", alignItems: "center" }}>
                <div className="author-photo" style={{ width: "50px", height: "50px", borderRadius: "50%", backgroundColor: "#f2f2f2", marginRight: "15px" }}></div>
                <div>
                  <p style={{ margin: "0", fontWeight: "bold" }}>David Lee</p>
                  <p style={{ margin: "0", color: "#666", fontSize: "0.9rem" }}>Blockchain Engineer, 4 years</p>
                </div>
              </div>
            </div>
            
            <div className="testimonial" style={{ padding: "2rem", borderRadius: "8px", boxShadow: "0 4px 12px rgba(0,0,0,0.05)", backgroundColor: "white", position: "relative" }}>
              <div style={{ position: "absolute", top: "-15px", left: "30px", fontSize: "60px", color: "#0a85d1", opacity: "0.2" }}>"</div>
              <p style={{ fontSize: "1.1rem", lineHeight: "1.6", marginBottom: "1.5rem" }}>
                What I love about WePay is our commitment to diversity and inclusion. We have team members from different backgrounds and cultures, which brings a wealth of perspectives to our work.
              </p>
              <div className="testimonial-author" style={{ display: "flex", alignItems: "center" }}>
                <div className="author-photo" style={{ width: "50px", height: "50px", borderRadius: "50%", backgroundColor: "#f2f2f2", marginRight: "15px" }}></div>
                <div>
                  <p style={{ margin: "0", fontWeight: "bold" }}>Sarah Williams</p>
                  <p style={{ margin: "0", color: "#666", fontSize: "0.9rem" }}>UX Designer, 2 years</p>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        <div className="cta-section" style={{ padding: "3rem", textAlign: "center", marginTop: "3rem", backgroundColor: "#f8f9fa", borderRadius: "12px" }}>
          <h2>Can't Find the Right Role?</h2>
          <p>We're always looking for exceptional talent. Send us your resume and we'll keep you in mind for future opportunities.</p>
          <a href="/careers/general-application" className="btn btn-primary" style={{ marginTop: "1.5rem" }}>Submit General Application</a>
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

export default Careers; 