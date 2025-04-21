import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Pages.css';
import '../styles/TermsOfService.css';
import logoImage from '../assets/images/logo.png';

const TermsOfService = () => {
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
        <h1 className="info-page-title">Terms of Service</h1>
        <p className="info-page-subtitle">Last Updated: July 1, 2023</p>
      </div>

      <div className="info-page-content legal-content">
        <div className="table-of-contents" style={{ backgroundColor: "#f8f9fa", padding: "2rem", borderRadius: "8px", marginBottom: "3rem" }}>
          <h2 style={{ marginTop: 0 }}>Table of Contents</h2>
          <ul style={{ columns: "2", columnGap: "2rem", listStyleType: "none", padding: 0 }}>
            <li><a href="#acceptance" style={{ textDecoration: "none", color: "#0a85d1", display: "block", padding: "0.5rem 0" }}>1. Acceptance of Terms</a></li>
            <li><a href="#definitions" style={{ textDecoration: "none", color: "#0a85d1", display: "block", padding: "0.5rem 0" }}>2. Definitions</a></li>
            <li><a href="#eligibility" style={{ textDecoration: "none", color: "#0a85d1", display: "block", padding: "0.5rem 0" }}>3. Eligibility</a></li>
            <li><a href="#account" style={{ textDecoration: "none", color: "#0a85d1", display: "block", padding: "0.5rem 0" }}>4. Account Registration and Use</a></li>
            <li><a href="#services" style={{ textDecoration: "none", color: "#0a85d1", display: "block", padding: "0.5rem 0" }}>5. Services Description</a></li>
            <li><a href="#fees" style={{ textDecoration: "none", color: "#0a85d1", display: "block", padding: "0.5rem 0" }}>6. Fees and Payment</a></li>
            <li><a href="#security" style={{ textDecoration: "none", color: "#0a85d1", display: "block", padding: "0.5rem 0" }}>7. Security and Privacy</a></li>
            <li><a href="#risks" style={{ textDecoration: "none", color: "#0a85d1", display: "block", padding: "0.5rem 0" }}>8. Risks and Disclosures</a></li>
            <li><a href="#prohibited" style={{ textDecoration: "none", color: "#0a85d1", display: "block", padding: "0.5rem 0" }}>9. Prohibited Activities</a></li>
            <li><a href="#intellectual" style={{ textDecoration: "none", color: "#0a85d1", display: "block", padding: "0.5rem 0" }}>10. Intellectual Property</a></li>
            <li><a href="#warranties" style={{ textDecoration: "none", color: "#0a85d1", display: "block", padding: "0.5rem 0" }}>11. Warranties and Disclaimers</a></li>
            <li><a href="#liability" style={{ textDecoration: "none", color: "#0a85d1", display: "block", padding: "0.5rem 0" }}>12. Limitation of Liability</a></li>
            <li><a href="#indemnification" style={{ textDecoration: "none", color: "#0a85d1", display: "block", padding: "0.5rem 0" }}>13. Indemnification</a></li>
            <li><a href="#termination" style={{ textDecoration: "none", color: "#0a85d1", display: "block", padding: "0.5rem 0" }}>14. Term and Termination</a></li>
            <li><a href="#governing" style={{ textDecoration: "none", color: "#0a85d1", display: "block", padding: "0.5rem 0" }}>15. Governing Law</a></li>
            <li><a href="#dispute" style={{ textDecoration: "none", color: "#0a85d1", display: "block", padding: "0.5rem 0" }}>16. Dispute Resolution</a></li>
            <li><a href="#modifications" style={{ textDecoration: "none", color: "#0a85d1", display: "block", padding: "0.5rem 0" }}>17. Modifications to Terms</a></li>
            <li><a href="#miscellaneous" style={{ textDecoration: "none", color: "#0a85d1", display: "block", padding: "0.5rem 0" }}>18. Miscellaneous</a></li>
            <li><a href="#contact" style={{ textDecoration: "none", color: "#0a85d1", display: "block", padding: "0.5rem 0" }}>19. Contact Information</a></li>
          </ul>
        </div>

        <section id="acceptance" className="legal-section">
          <h2>1. Acceptance of Terms</h2>
          <p>Welcome to WePay. These Terms of Service ("Terms") govern your access to and use of the WePay website, mobile applications, APIs, and other online products and services (collectively, the "Services") provided by WePay Crypto, Inc. ("WePay," "we," "us," or "our").</p>
          <p>By accessing or using our Services, you agree to be bound by these Terms. If you do not agree to these Terms, you may not access or use the Services. If you are accessing and using the Services on behalf of a company or other legal entity, you represent and warrant that you have the authority to bind that entity to these Terms. In that case, "you" and "your" will refer to that entity.</p>
        </section>

        <section id="definitions" className="legal-section">
          <h2>2. Definitions</h2>
          <p>Throughout these Terms, we use specific terminology that may be unfamiliar. For clarity:</p>
          <ul>
            <li><strong>"Cryptocurrency"</strong> refers to blockchain-based digital assets, including but not limited to Bitcoin, Ethereum, and other altcoins.</li>
            <li><strong>"Digital Wallet"</strong> refers to software that allows users to store and manage their private keys, enabling the management of cryptocurrencies.</li>
            <li><strong>"Transaction"</strong> refers to the process of sending or receiving cryptocurrency via the blockchain network.</li>
            <li><strong>"Merchant"</strong> refers to a business or individual that uses our Services to accept cryptocurrency payments.</li>
            <li><strong>"User"</strong> refers to any individual or entity that accesses or uses our Services.</li>
          </ul>
        </section>

        <section id="eligibility" className="legal-section">
          <h2>3. Eligibility</h2>
          <p>To be eligible to use our Services, you must be at least 18 years old and capable of forming a binding contract. You must also not be barred from doing so under any applicable laws.</p>
          <p>Additionally, you represent and warrant that you are not:</p>
          <ul>
            <li>A resident of or located in any country subject to United States embargo, United Nations sanctions, Her Majesty's Treasury sanctions, or the European Union's sanctions ("Restricted Territories");</li>
            <li>An individual, or an individual employed by or associated with an entity, identified on the US Department of Commerce's Denied Persons or Entity List, the US Department of Treasury's Specially Designated Nationals or Blocked Persons Lists, or the US Department of State's Debarred Parties List, or similar lists promulgated by other relevant governmental authorities;</li>
            <li>Using our Services in connection with illegal activity, including but not limited to money laundering, terrorist financing, or fraud.</li>
          </ul>
        </section>

        <section id="account" className="legal-section">
          <h2>4. Account Registration and Use</h2>
          <p>To access certain features of the Services, you must register for an account. When you register, you agree to provide accurate, current, and complete information. You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account.</p>
          <p>You agree to:</p>
          <ul>
            <li>Create a strong password and maintain the confidentiality of your password and account;</li>
            <li>Update your information promptly if any of your registration data changes;</li>
            <li>Notify us immediately of any unauthorized access to or use of your account;</li>
            <li>Be solely responsible for all activities that occur under your account; and</li>
            <li>Ensure that you log out from your account at the end of each session when accessing the Services from a shared device.</li>
          </ul>
          <p>We reserve the right to suspend or terminate your account if any information provided during the registration process or thereafter proves to be inaccurate, incomplete, or fraudulent.</p>
        </section>

        <section id="services" className="legal-section">
          <h2>5. Services Description</h2>
          <p>WePay provides cryptocurrency payment processing services that allow merchants to accept cryptocurrency payments and users to make payments with cryptocurrencies. Our Services include, but are not limited to:</p>
          <ul>
            <li>Payment gateway integration for merchants;</li>
            <li>Multi-chain payment processing;</li>
            <li>Currency conversion services;</li>
            <li>Payment analytics and reporting;</li>
            <li>Digital wallet services;</li>
            <li>API access for developers;</li>
            <li>Merchant tools and plugins.</li>
          </ul>
          <p>We reserve the right to modify, suspend, or discontinue any part of the Services at any time without prior notice or liability.</p>
        </section>

        <section id="fees" className="legal-section">
          <h2>6. Fees and Payment</h2>
          <p>Use of certain aspects of the Services may be subject to fees. You agree to pay all applicable fees as described on our website or as otherwise communicated to you. We reserve the right to change our fee structure at any time upon notice.</p>
          <p>For merchants, we charge processing fees for cryptocurrency transactions. These fees are calculated as a percentage of the transaction value and/or a fixed fee per transaction, as specified in your merchant agreement or as published on our website.</p>
          <p>You acknowledge that:</p>
          <ul>
            <li>Network fees (also known as "gas fees" or "mining fees") are separate from our processing fees and are paid to the relevant blockchain network, not to WePay;</li>
            <li>Exchange rate spreads may be applied to cryptocurrency conversions;</li>
            <li>All fees are non-refundable unless otherwise stated or required by law;</li>
            <li>You are responsible for paying all taxes associated with your use of the Services.</li>
          </ul>
        </section>

        <section id="security" className="legal-section">
          <h2>7. Security and Privacy</h2>
          <p>We implement reasonable security measures to protect your information and transactions. However, no method of electronic transmission or storage is 100% secure, and we cannot guarantee absolute security.</p>
          <p>You are responsible for:</p>
          <ul>
            <li>Maintaining the security of your account credentials;</li>
            <li>Ensuring that your devices are free from malware or unauthorized software that could compromise your security;</li>
            <li>Verifying all payment details before confirming transactions;</li>
            <li>Reporting any suspicious activity to us immediately.</li>
          </ul>
          <p>Our collection and use of personal information in connection with the Services is described in our <Link to="/privacy-policy" style={{ color: "#0a85d1" }}>Privacy Policy</Link>, which is incorporated by reference into these Terms.</p>
        </section>

        <section id="risks" className="legal-section">
          <h2>8. Risks and Disclosures</h2>
          <p>Using cryptocurrency involves significant risks. By using our Services, you acknowledge and accept these risks, including but not limited to:</p>
          <ul>
            <li><strong>Price Volatility:</strong> The price of cryptocurrency can be highly volatile and subject to fluctuations.</li>
            <li><strong>Irreversible Transactions:</strong> Cryptocurrency transactions are typically irreversible once confirmed on the blockchain. Neither you nor WePay can reverse, cancel, or charge back a cryptocurrency transaction.</li>
            <li><strong>Regulatory Uncertainty:</strong> The regulatory status of cryptocurrencies may change in various jurisdictions, which could affect your ability to use our Services.</li>
            <li><strong>Technological Risks:</strong> Blockchain technology is still evolving, and there are risks associated with the use of this technology, including network delays, software bugs, or other technical issues.</li>
            <li><strong>Fork Events:</strong> Blockchain networks may undergo "fork" events, which could materially affect the value, function, or name of a cryptocurrency.</li>
            <li><strong>Market Disruptions:</strong> Trading markets for cryptocurrencies could experience disruptions due to extraordinary market volatility or other factors.</li>
          </ul>
          <p>WePay does not provide investment, tax, or legal advice. You should consult with qualified professionals before engaging in cryptocurrency transactions.</p>
        </section>

        <section id="prohibited" className="legal-section">
          <h2>9. Prohibited Activities</h2>
          <p>When using our Services, you agree not to:</p>
          <ul>
            <li>Violate any applicable law, regulation, or these Terms;</li>
            <li>Infringe the rights of others, including intellectual property rights;</li>
            <li>Use the Services for illegal activities, including but not limited to money laundering, terrorist financing, or fraud;</li>
            <li>Attempt to gain unauthorized access to the Services or other users' accounts;</li>
            <li>Interfere with or disrupt the Services or servers or networks connected to the Services;</li>
            <li>Circumvent, disable, or otherwise interfere with security-related features of the Services;</li>
            <li>Use the Services to transmit any malware, spyware, or other harmful code;</li>
            <li>Engage in any activity that could harm, disable, or overburden the Services;</li>
            <li>Use automated means, including bots, robots, or scrapers, to access the Services;</li>
            <li>Attempt to reverse engineer any portion of the Services;</li>
            <li>Encourage or enable any other individual to do any of the above.</li>
          </ul>
          <p>We reserve the right to investigate and take appropriate legal action against anyone who, in our sole discretion, violates this provision, including removing prohibited content, suspending or terminating accounts, and reporting violators to law enforcement authorities.</p>
        </section>

        <section id="intellectual" className="legal-section">
          <h2>10. Intellectual Property</h2>
          <p>The Services and all content and materials included on the Services, including but not limited to text, graphics, logos, button icons, images, audio clips, digital downloads, data compilations, and software, are the property of WePay or our licensors and are protected by copyright, trademark, and other intellectual property laws.</p>
          <p>Subject to your compliance with these Terms, we grant you a limited, non-exclusive, non-transferable, non-sublicensable license to access and use the Services for your personal or internal business purposes. This license does not include:</p>
          <ul>
            <li>Any resale or commercial use of the Services or its contents;</li>
            <li>Any collection and use of any product listings, descriptions, or prices;</li>
            <li>Any derivative use of the Services or its contents;</li>
            <li>Any downloading or copying of account information for the benefit of another merchant;</li>
            <li>Any use of data mining, robots, or similar data gathering and extraction tools.</li>
          </ul>
          <p>All rights not expressly granted to you in these Terms are reserved and retained by WePay or our licensors. No right, title, or interest in or to the Services or any content on the Services is transferred to you, and all rights not expressly granted are reserved by WePay.</p>
        </section>

        <section id="warranties" className="legal-section">
          <h2>11. Warranties and Disclaimers</h2>
          <p>THE SERVICES ARE PROVIDED ON AN "AS IS" AND "AS AVAILABLE" BASIS, WITHOUT WARRANTIES OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, TITLE, AND NON-INFRINGEMENT.</p>
          <p>WE DO NOT WARRANT THAT:</p>
          <ul>
            <li>THE SERVICES WILL FUNCTION UNINTERRUPTED, SECURE, OR AVAILABLE AT ANY PARTICULAR TIME OR LOCATION;</li>
            <li>ANY ERRORS OR DEFECTS WILL BE CORRECTED;</li>
            <li>THE SERVICES ARE FREE OF VIRUSES OR OTHER HARMFUL COMPONENTS;</li>
            <li>THE RESULTS OF USING THE SERVICES WILL MEET YOUR REQUIREMENTS.</li>
          </ul>
          <p>SOME JURISDICTIONS DO NOT ALLOW THE EXCLUSION OF IMPLIED WARRANTIES, SO THE ABOVE EXCLUSION MAY NOT APPLY TO YOU.</p>
        </section>

        <section id="liability" className="legal-section">
          <h2>12. Limitation of Liability</h2>
          <p>TO THE MAXIMUM EXTENT PERMITTED BY APPLICABLE LAW, IN NO EVENT SHALL WEPAY, ITS AFFILIATES, OR THEIR RESPECTIVE OFFICERS, DIRECTORS, EMPLOYEES, OR AGENTS BE LIABLE FOR ANY INDIRECT, PUNITIVE, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR EXEMPLARY DAMAGES, INCLUDING WITHOUT LIMITATION DAMAGES FOR LOSS OF PROFITS, GOODWILL, USE, DATA, OR OTHER INTANGIBLE LOSSES, THAT RESULT FROM THE USE OF, OR INABILITY TO USE, THE SERVICES.</p>
          <p>UNDER NO CIRCUMSTANCES WILL WEPAY BE RESPONSIBLE FOR ANY DAMAGE, LOSS, OR INJURY RESULTING FROM HACKING, TAMPERING, OR OTHER UNAUTHORIZED ACCESS OR USE OF THE SERVICES OR YOUR ACCOUNT OR THE INFORMATION CONTAINED THEREIN.</p>
          <p>WEPAY ASSUMES NO LIABILITY OR RESPONSIBILITY FOR:</p>
          <ul>
            <li>ANY ERRORS, MISTAKES, OR INACCURACIES OF CONTENT;</li>
            <li>PERSONAL INJURY OR PROPERTY DAMAGE, OF ANY NATURE WHATSOEVER, RESULTING FROM YOUR ACCESS TO AND USE OF THE SERVICES;</li>
            <li>ANY UNAUTHORIZED ACCESS TO OR USE OF OUR SECURE SERVERS AND/OR ANY AND ALL PERSONAL INFORMATION STORED THEREIN;</li>
            <li>ANY INTERRUPTION OR CESSATION OF TRANSMISSION TO OR FROM THE SERVICES;</li>
            <li>ANY BUGS, VIRUSES, TROJAN HORSES, OR THE LIKE THAT MAY BE TRANSMITTED TO OR THROUGH THE SERVICES BY ANY THIRD PARTY;</li>
            <li>ANY ERRORS OR OMISSIONS IN ANY CONTENT OR FOR ANY LOSS OR DAMAGE INCURRED AS A RESULT OF THE USE OF ANY CONTENT POSTED, TRANSMITTED, OR OTHERWISE MADE AVAILABLE THROUGH THE SERVICES.</li>
          </ul>
          <p>IN NO EVENT SHALL WEPAY, ITS AFFILIATES, OR THEIR RESPECTIVE OFFICERS, DIRECTORS, EMPLOYEES, OR AGENTS BE LIABLE TO YOU FOR ANY CLAIMS, PROCEEDINGS, LIABILITIES, OBLIGATIONS, DAMAGES, LOSSES, OR COSTS IN AN AMOUNT EXCEEDING THE AMOUNT YOU PAID TO WEPAY IN THE THREE (3) MONTH PERIOD IMMEDIATELY PRECEDING THE EVENT THAT GAVE RISE TO THE LIABILITY, OR $100.00, WHICHEVER IS GREATER.</p>
          <p>THE LIMITATIONS OF LIABILITY IN THIS SECTION APPLY WHETHER THE ALLEGED LIABILITY IS BASED ON CONTRACT, TORT, NEGLIGENCE, STRICT LIABILITY, OR ANY OTHER BASIS, EVEN IF WEPAY HAS BEEN ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.</p>
          <p>SOME JURISDICTIONS DO NOT ALLOW THE EXCLUSION OR LIMITATION OF INCIDENTAL OR CONSEQUENTIAL DAMAGES, SO THE ABOVE LIMITATION OR EXCLUSION MAY NOT APPLY TO YOU.</p>
        </section>

        <section id="indemnification" className="legal-section">
          <h2>13. Indemnification</h2>
          <p>You agree to defend, indemnify, and hold harmless WePay, its affiliates, and their respective officers, directors, employees, and agents from and against any and all claims, damages, obligations, losses, liabilities, costs, and expenses (including but not limited to attorney's fees) arising from:</p>
          <ul>
            <li>Your use of and access to the Services;</li>
            <li>Your violation of any term of these Terms;</li>
            <li>Your violation of any third-party right, including without limitation any copyright, property, or privacy right;</li>
            <li>Any claim that your use of the Services caused damage to a third party.</li>
          </ul>
          <p>This defense and indemnification obligation will survive these Terms and your use of the Services.</p>
        </section>

        <section id="termination" className="legal-section">
          <h2>14. Term and Termination</h2>
          <p>These Terms shall remain in full force and effect while you use the Services. You may terminate your use of the Services or your account at any time by contacting us at support@wepay-crypto.com.</p>
          <p>Without limiting any other provision of these Terms, we reserve the right to, in our sole discretion and without notice or liability, deny access to and use of the Services to any person for any reason or for no reason, including without limitation for breach of any representation, warranty, or covenant contained in these Terms or of any applicable law or regulation.</p>
          <p>We may terminate your access to the Services or your account:</p>
          <ul>
            <li>If you breach these Terms;</li>
            <li>If we are unable to verify or authenticate any information you provide to us;</li>
            <li>If we believe that your actions may cause legal liability for you, our users, or us;</li>
            <li>If we suspect that you have engaged in fraudulent or illegal activities;</li>
            <li>For any other reason at our sole discretion.</li>
          </ul>
          <p>Upon termination of your account, your right to use the Services will immediately cease. All provisions of these Terms which by their nature should survive termination shall survive termination, including, without limitation, ownership provisions, warranty disclaimers, indemnity, and limitations of liability.</p>
        </section>

        <section id="governing" className="legal-section">
          <h2>15. Governing Law</h2>
          <p>These Terms and any separate agreements whereby we provide you Services shall be governed by and construed in accordance with the laws of the State of California, without regard to its conflict of law principles.</p>
        </section>

        <section id="dispute" className="legal-section">
          <h2>16. Dispute Resolution</h2>
          <p><strong>PLEASE READ THIS SECTION CAREFULLY – IT MAY SIGNIFICANTLY AFFECT YOUR LEGAL RIGHTS, INCLUDING YOUR RIGHT TO FILE A LAWSUIT IN COURT.</strong></p>
          <p><strong>16.1 Initial Dispute Resolution</strong></p>
          <p>We are committed to resolving disputes fairly and efficiently. Most concerns can be resolved quickly by contacting our customer support team at support@wepay-crypto.com. If our customer support team cannot resolve your concern, you and WePay agree to try in good faith to resolve any dispute between us through informal negotiation within sixty (60) days from the date the dispute arises.</p>
          <p><strong>16.2 Binding Arbitration</strong></p>
          <p>If we cannot resolve a dispute informally, you and WePay agree to resolve any disputes through binding arbitration in accordance with the American Arbitration Association's ("AAA") Commercial Arbitration Rules, rather than in court, except that you may assert claims in small claims court if your claims qualify.</p>
          <p>The arbitration will be conducted by a single, neutral arbitrator and shall take place in San Francisco, California, or another mutually agreeable location, in the English language. The arbitrator may award the same damages and relief as a court would.</p>
          <p><strong>16.3 Class Action Waiver</strong></p>
          <p>YOU AND WEPAY AGREE THAT EACH MAY BRING CLAIMS AGAINST THE OTHER ONLY IN YOUR OR ITS INDIVIDUAL CAPACITY, AND NOT AS A PLAINTIFF OR CLASS MEMBER IN ANY PURPORTED CLASS OR REPRESENTATIVE PROCEEDING.</p>
          <p>Further, unless both you and WePay agree otherwise, the arbitrator may not consolidate more than one person's claims, and may not otherwise preside over any form of a representative or class proceeding.</p>
          <p><strong>16.4 Opt-Out Rights</strong></p>
          <p>You have the right to opt out of the provisions of this Arbitration Agreement by sending written notice of your decision to opt out to legal@wepay-crypto.com within 30 days after first accepting these Terms. Your notice must include your name and address, your WePay username (if any), and a clear statement that you want to opt out of this Arbitration Agreement.</p>
          <p>If you opt out of this Arbitration Agreement, all other parts of these Terms will continue to apply to you.</p>
        </section>

        <section id="modifications" className="legal-section">
          <h2>17. Modifications to Terms</h2>
          <p>We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a revision is material, we will provide at least 30 days' notice prior to any new terms taking effect. What constitutes a material change will be determined at our sole discretion.</p>
          <p>By continuing to access or use our Services after those revisions become effective, you agree to be bound by the revised terms. If you do not agree to the new terms, you must stop using the Services.</p>
        </section>

        <section id="miscellaneous" className="legal-section">
          <h2>18. Miscellaneous</h2>
          <p><strong>18.1 Entire Agreement</strong></p>
          <p>These Terms, together with any other legal notices and agreements published by WePay via the Services, shall constitute the entire agreement between you and WePay concerning the Services.</p>
          <p><strong>18.2 Severability</strong></p>
          <p>If any provision of these Terms is deemed invalid by a court of competent jurisdiction, the invalidity of such provision shall not affect the validity of the remaining provisions of these Terms, which shall remain in full force and effect.</p>
          <p><strong>18.3 Waiver</strong></p>
          <p>No waiver of any term of these Terms shall be deemed a further or continuing waiver of such term or any other term, and WePay's failure to assert any right or provision under these Terms shall not constitute a waiver of such right or provision.</p>
          <p><strong>18.4 Assignment</strong></p>
          <p>These Terms, and any rights and licenses granted hereunder, may not be transferred or assigned by you but may be assigned by WePay without restriction.</p>
          <p><strong>18.5 Force Majeure</strong></p>
          <p>WePay shall not be liable for any delay or failure to perform resulting from causes outside its reasonable control, including but not limited to acts of God, war, terrorism, riots, embargoes, acts of civil or military authorities, fire, floods, accidents, strikes, shortages of transportation facilities, fuel, energy, labor or materials, or failures of telecommunications or internet service providers.</p>
        </section>

        <section id="contact" className="legal-section">
          <h2>19. Contact Information</h2>
          <p>If you have any questions about these Terms, please contact us at:</p>
          <p>WePay Crypto, Inc.<br />
            123 Blockchain Avenue<br />
            San Francisco, CA 94107<br />
            United States<br />
            Email: legal@wepay-crypto.com</p>
        </section>

        <div className="terms-footer" style={{ marginTop: "4rem", padding: "2rem", backgroundColor: "#f8f9fa", borderRadius: "8px", textAlign: "center" }}>
          <p>By using our Services, you acknowledge that you have read, understood, and agree to be bound by these Terms of Service.</p>
          <div style={{ marginTop: "1.5rem" }}>
            <Link to="/privacy-policy" className="btn btn-outline" style={{ marginRight: "1rem" }}>Privacy Policy</Link>
            <Link to="/compliance" className="btn btn-outline">Compliance</Link>
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

export default TermsOfService; 