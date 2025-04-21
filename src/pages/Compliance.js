import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Pages.css';
import logoImage from '../assets/images/logo.png';

const Compliance = () => {
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
        <h1 className="info-page-title">Compliance Framework</h1>
        <p className="info-page-subtitle">Our Commitment to Regulatory Compliance</p>
      </div>

      <div className="info-page-content legal-content">
        <div className="table-of-contents" style={{ backgroundColor: "#f8f9fa", padding: "2rem", borderRadius: "8px", marginBottom: "3rem" }}>
          <h2 style={{ marginTop: 0 }}>Table of Contents</h2>
          <ul style={{ columns: "2", columnGap: "2rem", listStyleType: "none", padding: 0 }}>
            <li><a href="#overview" style={{ textDecoration: "none", color: "#0a85d1", display: "block", padding: "0.5rem 0" }}>1. Compliance Overview</a></li>
            <li><a href="#aml" style={{ textDecoration: "none", color: "#0a85d1", display: "block", padding: "0.5rem 0" }}>2. AML/CTF Compliance</a></li>
            <li><a href="#kyc" style={{ textDecoration: "none", color: "#0a85d1", display: "block", padding: "0.5rem 0" }}>3. KYC Procedures</a></li>
            <li><a href="#regulations" style={{ textDecoration: "none", color: "#0a85d1", display: "block", padding: "0.5rem 0" }}>4. Regulatory Framework</a></li>
            <li><a href="#data" style={{ textDecoration: "none", color: "#0a85d1", display: "block", padding: "0.5rem 0" }}>5. Data Protection Compliance</a></li>
            <li><a href="#audit" style={{ textDecoration: "none", color: "#0a85d1", display: "block", padding: "0.5rem 0" }}>6. Audit & Reporting</a></li>
            <li><a href="#risks" style={{ textDecoration: "none", color: "#0a85d1", display: "block", padding: "0.5rem 0" }}>7. Risk Management</a></li>
            <li><a href="#partners" style={{ textDecoration: "none", color: "#0a85d1", display: "block", padding: "0.5rem 0" }}>8. Compliance Partners</a></li>
            <li><a href="#education" style={{ textDecoration: "none", color: "#0a85d1", display: "block", padding: "0.5rem 0" }}>9. User Education</a></li>
            <li><a href="#contact" style={{ textDecoration: "none", color: "#0a85d1", display: "block", padding: "0.5rem 0" }}>10. Contact Compliance Team</a></li>
          </ul>
        </div>

        <section id="overview" className="legal-section">
          <h2>1. Compliance Overview</h2>
          <p>At WePay Crypto, Inc. ("WePay"), we are committed to maintaining the highest standards of regulatory compliance across all jurisdictions in which we operate. Our compliance framework is designed to protect our users, prevent financial crime, and ensure the integrity of the cryptocurrency ecosystem.</p>
          <p>Our compliance program includes:</p>
          <ul>
            <li>Comprehensive Anti-Money Laundering (AML) and Counter-Terrorism Financing (CTF) policies</li>
            <li>Robust Know Your Customer (KYC) procedures</li>
            <li>Transaction monitoring systems</li>
            <li>Risk assessment frameworks</li>
            <li>Ongoing staff training</li>
            <li>Regular independent audits</li>
          </ul>
          <p>This page outlines our approach to compliance and the measures we have implemented to meet regulatory requirements while providing a secure and efficient service to our users.</p>
        </section>

        <section id="aml" className="legal-section">
          <h2>2. AML/CTF Compliance</h2>
          <p>Our Anti-Money Laundering (AML) and Counter-Terrorism Financing (CTF) program is designed to prevent the use of our platform for illicit purposes. We have implemented a comprehensive framework that includes:</p>

          <h3>2.1 Risk-Based Approach</h3>
          <p>We apply a risk-based approach to AML/CTF compliance, allocating resources based on the level of risk associated with different customers, transactions, and geographic locations. This approach allows us to focus our efforts where they are most needed while maintaining appropriate controls across all activities.</p>

          <h3>2.2 Transaction Monitoring</h3>
          <p>We have implemented sophisticated transaction monitoring systems that use both rule-based and machine learning algorithms to identify suspicious activities. Our systems are designed to detect:</p>
          <ul>
            <li>Unusual transaction patterns</li>
            <li>Structured transactions designed to avoid reporting thresholds</li>
            <li>Transactions with high-risk jurisdictions</li>
            <li>Transactions with sanctioned individuals or entities</li>
            <li>Unusual source or destination of funds</li>
          </ul>

          <h3>2.3 Suspicious Activity Reporting</h3>
          <p>We have established procedures for filing Suspicious Activity Reports (SARs) with relevant authorities when we identify potentially suspicious activities. Our compliance team reviews all alerts generated by our monitoring systems and conducts further investigations as necessary.</p>

          <h3>2.4 Sanctions Compliance</h3>
          <p>We screen all users and transactions against sanctions lists maintained by various authorities, including:</p>
          <ul>
            <li>Office of Foreign Assets Control (OFAC)</li>
            <li>United Nations Security Council</li>
            <li>European Union</li>
            <li>Financial Action Task Force (FATF)</li>
            <li>Local sanctions lists in jurisdictions where we operate</li>
          </ul>
          <p>We prohibit transactions with sanctioned individuals, entities, and jurisdictions.</p>
        </section>

        <section id="kyc" className="legal-section">
          <h2>3. KYC Procedures</h2>
          <p>Our Know Your Customer (KYC) procedures are designed to verify the identity of our users and assess the risk associated with each customer relationship. Our KYC process includes:</p>

          <h3>3.1 Customer Identification</h3>
          <p>We collect and verify the following information from our users:</p>
          <ul>
            <li><strong>Individual Users:</strong> Full name, date of birth, address, nationality, and identification documents (e.g., passport, driver's license, national ID card).</li>
            <li><strong>Business Users:</strong> Business name, registration number, address, ownership structure, identification of beneficial owners, and relevant corporate documents.</li>
          </ul>

          <h3>3.2 Identity Verification</h3>
          <p>We use a combination of automated and manual verification methods to confirm the authenticity of the information and documents provided by our users. This includes:</p>
          <ul>
            <li>Document verification (checking for authenticity and validity)</li>
            <li>Facial recognition (comparing the user's selfie with their ID photo)</li>
            <li>Address verification</li>
            <li>Liveness detection (ensuring the user is a real person present during verification)</li>
          </ul>

          <h3>3.3 Enhanced Due Diligence</h3>
          <p>We conduct Enhanced Due Diligence (EDD) for high-risk customers, including:</p>
          <ul>
            <li>Politically Exposed Persons (PEPs)</li>
            <li>Customers from high-risk jurisdictions</li>
            <li>Customers with complex ownership structures</li>
            <li>Customers with unusual transaction patterns</li>
            <li>Customers involved in high-risk business activities</li>
          </ul>
          <p>EDD measures may include obtaining additional information about the source of funds, the purpose of transactions, and the nature of the business relationship.</p>

          <h3>3.4 Ongoing Monitoring</h3>
          <p>Customer due diligence is not a one-time process. We continuously monitor customer relationships and update customer information periodically, with the frequency determined by the risk level associated with each customer.</p>
        </section>

        <section id="regulations" className="legal-section">
          <h2>4. Regulatory Framework</h2>
          <p>WePay operates in compliance with applicable laws and regulations in all jurisdictions where our services are available. We actively monitor regulatory developments and adapt our compliance program accordingly.</p>

          <h3>4.1 Licensing</h3>
          <p>We maintain appropriate licenses and registrations in jurisdictions where they are required for cryptocurrency-related activities, including:</p>
          <ul>
            <li>Money Services Business (MSB) registration with FinCEN in the United States</li>
            <li>Virtual Asset Service Provider (VASP) registration in applicable jurisdictions</li>
            <li>Payment Institution licensing where required</li>
            <li>Other relevant licenses as determined by local regulations</li>
          </ul>

          <h3>4.2 Key Regulations</h3>
          <p>Our compliance program addresses requirements from various regulatory frameworks, including but not limited to:</p>
          <ul>
            <li><strong>United States:</strong> Bank Secrecy Act (BSA), USA PATRIOT Act, State Money Transmitter Laws</li>
            <li><strong>European Union:</strong> 5th Anti-Money Laundering Directive (5AMLD), 6th Anti-Money Laundering Directive (6AMLD), Payment Services Directive 2 (PSD2)</li>
            <li><strong>Asia-Pacific:</strong> Various country-specific regulations for virtual asset service providers</li>
            <li><strong>Global:</strong> FATF Recommendations, including the "Travel Rule" for virtual assets</li>
          </ul>

          <h3>4.3 Travel Rule Compliance</h3>
          <p>We are committed to implementing the FATF's "Travel Rule," which requires virtual asset service providers to share sender and recipient information for cryptocurrency transactions above certain thresholds. We work with industry partners to develop and implement technical solutions for Travel Rule compliance while maintaining user privacy and security.</p>

          <h3>4.4 Regulatory Engagement</h3>
          <p>We actively engage with regulators and policymakers to contribute to the development of balanced and effective regulations for the cryptocurrency industry. We participate in industry associations, regulatory consultations, and other forums to share our expertise and advocate for responsible innovation.</p>
        </section>

        <section id="data" className="legal-section">
          <h2>5. Data Protection Compliance</h2>
          <p>We are committed to protecting the personal data of our users in accordance with applicable data protection laws, including the General Data Protection Regulation (GDPR) in the European Union and the California Consumer Privacy Act (CCPA) in the United States.</p>

          <h3>5.1 Data Protection Principles</h3>
          <p>Our data protection framework is based on the following principles:</p>
          <ul>
            <li><strong>Lawfulness, fairness, and transparency:</strong> We process personal data lawfully, fairly, and in a transparent manner.</li>
            <li><strong>Purpose limitation:</strong> We collect personal data for specified, explicit, and legitimate purposes.</li>
            <li><strong>Data minimization:</strong> We limit the collection of personal data to what is necessary for the purposes for which it is processed.</li>
            <li><strong>Accuracy:</strong> We take reasonable steps to ensure that personal data is accurate and kept up to date.</li>
            <li><strong>Storage limitation:</strong> We retain personal data only for as long as necessary for the purposes for which it is processed.</li>
            <li><strong>Integrity and confidentiality:</strong> We process personal data in a manner that ensures appropriate security, including protection against unauthorized or unlawful processing and against accidental loss, destruction, or damage.</li>
          </ul>

          <h3>5.2 Data Subject Rights</h3>
          <p>We respect the rights of data subjects under applicable data protection laws, including:</p>
          <ul>
            <li>The right to access personal data</li>
            <li>The right to rectification of inaccurate personal data</li>
            <li>The right to erasure (the "right to be forgotten")</li>
            <li>The right to restriction of processing</li>
            <li>The right to data portability</li>
            <li>The right to object to processing</li>
            <li>Rights related to automated decision-making and profiling</li>
          </ul>
          <p>For more information about how we process personal data and how to exercise your rights, please see our <Link to="/privacy-policy" style={{ color: "#0a85d1" }}>Privacy Policy</Link>.</p>
        </section>

        <section id="audit" className="legal-section">
          <h2>6. Audit & Reporting</h2>
          <p>We maintain a robust audit and reporting framework to ensure the effectiveness of our compliance program and to meet regulatory reporting requirements.</p>

          <h3>6.1 Internal Audits</h3>
          <p>We conduct regular internal audits of our compliance program to identify areas for improvement and ensure that our policies and procedures are being implemented effectively. These audits cover all aspects of our compliance program, including:</p>
          <ul>
            <li>AML/CTF policies and procedures</li>
            <li>KYC processes</li>
            <li>Transaction monitoring systems</li>
            <li>Sanctions screening</li>
            <li>Record-keeping</li>
            <li>Staff training</li>
          </ul>

          <h3>6.2 External Audits</h3>
          <p>In addition to internal audits, we engage independent third parties to conduct external audits of our compliance program. These external audits provide an objective assessment of our compliance with regulatory requirements and industry best practices.</p>

          <h3>6.3 Regulatory Reporting</h3>
          <p>We fulfill all regulatory reporting obligations in jurisdictions where we operate, including:</p>
          <ul>
            <li>Suspicious Activity Reports (SARs)</li>
            <li>Currency Transaction Reports (CTRs) or equivalent reports</li>
            <li>Annual compliance reports to relevant regulators</li>
            <li>Other reports as required by applicable regulations</li>
          </ul>

          <h3>6.4 Transparency Reports</h3>
          <p>We publish regular transparency reports that provide information about government requests for user data, account suspensions for compliance reasons, and other compliance-related metrics, to the extent permitted by law.</p>
        </section>

        <section id="risks" className="legal-section">
          <h2>7. Risk Management</h2>
          <p>We have implemented a comprehensive risk management framework to identify, assess, and mitigate compliance risks associated with our business activities.</p>

          <h3>7.1 Risk Assessment</h3>
          <p>We conduct regular risk assessments to identify and evaluate compliance risks. Our risk assessment methodology considers various factors, including:</p>
          <ul>
            <li>Customer risk (e.g., customer type, transaction patterns, geographic location)</li>
            <li>Product and service risk (e.g., anonymity features, cross-border capabilities)</li>
            <li>Geographic risk (e.g., high-risk jurisdictions, sanctions)</li>
            <li>Operational risk (e.g., system vulnerabilities, human error)</li>
            <li>Regulatory risk (e.g., changing regulations, enforcement actions)</li>
          </ul>

          <h3>7.2 Risk Mitigation</h3>
          <p>Based on our risk assessments, we implement appropriate controls to mitigate identified risks. These controls include:</p>
          <ul>
            <li>Policy and procedure updates</li>
            <li>Enhanced due diligence for high-risk customers</li>
            <li>Additional verification steps for high-risk transactions</li>
            <li>System enhancements</li>
            <li>Staff training</li>
            <li>Increased monitoring and auditing</li>
          </ul>

          <h3>7.3 Risk Documentation</h3>
          <p>We maintain detailed documentation of our risk assessment process, identified risks, and implemented controls. This documentation is regularly reviewed and updated to reflect changes in our business, the regulatory environment, and the threat landscape.</p>
        </section>

        <section id="partners" className="legal-section">
          <h2>8. Compliance Partners</h2>
          <p>We work with industry-leading compliance partners to enhance our compliance capabilities and stay at the forefront of regulatory developments.</p>

          <h3>8.1 Identity Verification Providers</h3>
          <p>We partner with trusted identity verification providers to ensure that our KYC processes are robust, efficient, and compliant with regulatory requirements.</p>

          <h3>8.2 Blockchain Analytics</h3>
          <p>We use advanced blockchain analytics tools to monitor transactions, identify high-risk wallet addresses, and detect suspicious activities on the blockchain.</p>

          <h3>8.3 Compliance Technology</h3>
          <p>We leverage cutting-edge compliance technology to automate and enhance various aspects of our compliance program, including transaction monitoring, sanctions screening, and regulatory reporting.</p>

          <h3>8.4 Legal and Regulatory Advisors</h3>
          <p>We work with experienced legal and regulatory advisors who specialize in cryptocurrency compliance to ensure that our policies and procedures align with regulatory requirements and industry best practices.</p>
        </section>

        <section id="education" className="legal-section">
          <h2>9. User Education</h2>
          <p>We believe that user education is an essential component of a comprehensive compliance program. We provide resources to help our users understand their compliance obligations and use our platform responsibly.</p>

          <h3>9.1 Compliance Guides</h3>
          <p>We publish compliance guides that explain regulatory requirements and best practices for individual and business users of our platform.</p>

          <h3>9.2 Tax Resources</h3>
          <p>We provide resources to help users understand the tax implications of cryptocurrency transactions and fulfill their tax reporting obligations.</p>

          <h3>9.3 Security Best Practices</h3>
          <p>We educate users about security best practices to protect their accounts and assets from unauthorized access and fraud.</p>

          <h3>9.4 Compliance Updates</h3>
          <p>We keep our users informed about significant regulatory developments that may affect their use of our platform.</p>
        </section>

        <section id="contact" className="legal-section">
          <h2>10. Contact Compliance Team</h2>
          <p>If you have any questions, concerns, or suggestions regarding our compliance program, please contact our compliance team:</p>
          <p>WePay Crypto, Inc.<br />
            Attn: Compliance Department<br />
            123 Blockchain Avenue<br />
            San Francisco, CA 94107<br />
            United States<br />
            Email: compliance@wepay-crypto.com</p>
        </section>

        <div className="compliance-footer" style={{ marginTop: "4rem", padding: "2rem", backgroundColor: "#f8f9fa", borderRadius: "8px", textAlign: "center" }}>
          <p>This Compliance Framework is for informational purposes only and is not intended as legal advice. Regulatory requirements may vary by jurisdiction, and users are responsible for complying with all applicable laws and regulations.</p>
          <div style={{ marginTop: "1.5rem" }}>
            <Link to="/terms-of-service" className="btn btn-outline" style={{ marginRight: "1rem" }}>Terms of Service</Link>
            <Link to="/privacy-policy" className="btn btn-outline">Privacy Policy</Link>
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

export default Compliance; 