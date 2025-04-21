import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Pages.css';
import '../styles/CookiePolicy.css';
import logoImage from '../assets/images/logo.png';

const CookiePolicy = () => {
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
        <h1 className="info-page-title">Cookie Policy</h1>
        <p className="info-page-subtitle">How WePay Uses Cookies and Similar Technologies</p>
      </div>

      <div className="info-page-content legal-content">
        <div className="table-of-contents" style={{ backgroundColor: "#f8f9fa", padding: "2rem", borderRadius: "8px", marginBottom: "3rem" }}>
          <h2 style={{ marginTop: 0 }}>Table of Contents</h2>
          <ul style={{ columns: "2", columnGap: "2rem", listStyleType: "none", padding: 0 }}>
            <li><a href="#introduction" style={{ textDecoration: "none", color: "#0a85d1", display: "block", padding: "0.5rem 0" }}>1. Introduction</a></li>
            <li><a href="#what-are-cookies" style={{ textDecoration: "none", color: "#0a85d1", display: "block", padding: "0.5rem 0" }}>2. What Are Cookies?</a></li>
            <li><a href="#types-of-cookies" style={{ textDecoration: "none", color: "#0a85d1", display: "block", padding: "0.5rem 0" }}>3. Types of Cookies We Use</a></li>
            <li><a href="#third-party-cookies" style={{ textDecoration: "none", color: "#0a85d1", display: "block", padding: "0.5rem 0" }}>4. Third-Party Cookies</a></li>
            <li><a href="#cookie-purposes" style={{ textDecoration: "none", color: "#0a85d1", display: "block", padding: "0.5rem 0" }}>5. How We Use Cookies</a></li>
            <li><a href="#managing-cookies" style={{ textDecoration: "none", color: "#0a85d1", display: "block", padding: "0.5rem 0" }}>6. Managing Your Cookie Preferences</a></li>
            <li><a href="#similar-technologies" style={{ textDecoration: "none", color: "#0a85d1", display: "block", padding: "0.5rem 0" }}>7. Similar Technologies</a></li>
            <li><a href="#policy-updates" style={{ textDecoration: "none", color: "#0a85d1", display: "block", padding: "0.5rem 0" }}>8. Updates to this Policy</a></li>
            <li><a href="#contact" style={{ textDecoration: "none", color: "#0a85d1", display: "block", padding: "0.5rem 0" }}>9. Contact Us</a></li>
          </ul>
        </div>

        <section id="introduction" className="legal-section">
          <h2>1. Introduction</h2>
          <p>WePay Crypto, Inc. ("WePay," "we," "our," or "us") uses cookies and similar technologies on our website, mobile applications, and other online services (collectively, our "Services") to help provide you with the best possible user experience and to allow us to analyze and improve our Services.</p>
          <p>This Cookie Policy explains what cookies are, what types of cookies and similar technologies we use, how we use them, why we use them, and how you can manage or remove them. This Cookie Policy should be read together with our <Link to="/privacy-policy" style={{ color: "#0a85d1" }}>Privacy Policy</Link>, which provides more information about how we collect, use, and share your personal information.</p>
          <p>By continuing to use our Services, you are accepting the terms of this Cookie Policy. If you do not agree to the use of cookies and similar technologies as set out in this Cookie Policy, you can adjust your browser settings to reject cookies or you can manually reject cookies by following the relevant opt-out links provided in this Cookie Policy. However, if you do so, this may impact your ability to use our Services effectively.</p>
        </section>

        <section id="what-are-cookies" className="legal-section">
          <h2>2. What Are Cookies?</h2>
          <p>Cookies are small text files that are stored on your computer or mobile device when you visit a website. They are widely used to make websites work more efficiently and provide information to the website owners. Cookies can perform various functions, such as remembering your preferences, storing items in your shopping cart, and generally improving your user experience.</p>
          <p>Cookies may be set by the website you are visiting (first-party cookies) or by other websites that provide content or services on the website you are visiting (third-party cookies). For example, we may use Google Analytics to help us understand how visitors interact with our website, and these cookies would be set by Google.</p>
          <p>Cookies can remain on your computer or mobile device for different periods of time. Some cookies are "session cookies," which are stored only temporarily during a browsing session and are deleted when you close your browser. Other cookies are "persistent cookies," which remain on your device for a set period or until you delete them manually.</p>
        </section>

        <section id="types-of-cookies" className="legal-section">
          <h2>3. Types of Cookies We Use</h2>
          <p>We use the following types of cookies on our Services:</p>

          <h3>3.1 Essential/Necessary Cookies</h3>
          <p>These cookies are necessary for the Services to function properly and securely. They enable basic functions such as page navigation, secure areas, shopping carts, and electronic billing. The Services cannot function properly without these cookies, and they can only be disabled by changing your browser preferences.</p>
          <p>Examples of essential cookies we use:</p>
          <ul>
            <li><strong>Authentication cookies:</strong> These help us identify you when you log in to our Services so that we can provide you with access to your account and maintain appropriate security.</li>
            <li><strong>Security cookies:</strong> These help us detect and prevent security risks, such as unauthorized login attempts.</li>
            <li><strong>Load balancing cookies:</strong> These help distribute the workload across multiple computers, ensuring that our Services remain available and responsive.</li>
          </ul>

          <h3>3.2 Preference/Functionality Cookies</h3>
          <p>These cookies allow our Services to remember choices you make (such as your username, language, or the region you are in) and provide enhanced, more personal features. They can also be used to remember changes you have made to text size, fonts, and other customizable parts of web pages.</p>
          <p>Examples of preference cookies we use:</p>
          <ul>
            <li><strong>Language preference cookies:</strong> These remember your preferred language settings.</li>
            <li><strong>Region preference cookies:</strong> These remember your preferred region or location.</li>
            <li><strong>Customization cookies:</strong> These remember your preferences for the display and functionality of our Services.</li>
          </ul>

          <h3>3.3 Analytics/Performance Cookies</h3>
          <p>These cookies collect information about how you use our Services, such as which pages you visit most often and if you receive any error messages from certain pages. These cookies are used to improve how our Services function and perform, to understand how users interact with our Services, and to test new features.</p>
          <p>Examples of analytics cookies we use:</p>
          <ul>
            <li><strong>Google Analytics:</strong> We use Google Analytics to understand how users interact with our Services. This helps us improve our Services and provide a better user experience.</li>
            <li><strong>Performance cookies:</strong> These help us understand which pages are popular, track the number of visitors to our Services, and understand how users navigate our Services.</li>
            <li><strong>Error monitoring cookies:</strong> These help us identify and fix technical issues and errors on our Services.</li>
          </ul>

          <h3>3.4 Marketing/Advertising Cookies</h3>
          <p>These cookies are used to deliver advertisements that are more relevant to you and your interests. They are also used to limit the number of times you see an advertisement and to help measure the effectiveness of advertising campaigns. They are usually placed by advertising networks with our permission.</p>
          <p>Examples of marketing cookies we use:</p>
          <ul>
            <li><strong>Retargeting cookies:</strong> These help us show you advertisements based on your previous interactions with our Services when you visit other websites.</li>
            <li><strong>Social media cookies:</strong> These allow you to share content from our Services on social media platforms.</li>
            <li><strong>Advertising effectiveness cookies:</strong> These help us measure the effectiveness of our advertising campaigns.</li>
          </ul>
        </section>

        <section id="third-party-cookies" className="legal-section">
          <h2>4. Third-Party Cookies</h2>
          <p>Some of the cookies placed on your computer or mobile device when you use our Services are placed by third parties, such as service providers, advertising networks, and analytics providers. These third parties may use cookies, web beacons, and similar technologies to collect information about your use of our Services and other websites. This information may be used by these third parties to analyze and track data, determine the popularity of certain content, deliver advertising and content targeted to your interests, and better understand your online activity.</p>
          <p>Third-party services we use that may place cookies on your device include:</p>
          <ul>
            <li><strong>Analytics providers:</strong> Google Analytics, Mixpanel, Hotjar</li>
            <li><strong>Advertising networks:</strong> Google Ads, Facebook Pixel, LinkedIn Insight Tag</li>
            <li><strong>Social media platforms:</strong> Facebook, Twitter, LinkedIn, Instagram</li>
            <li><strong>Customer support tools:</strong> Zendesk, Intercom</li>
            <li><strong>Payment processors:</strong> Stripe, PayPal</li>
          </ul>
          <p>This Cookie Policy does not apply to the cookies, web beacons, or other tracking technologies used by these third parties. We recommend that you review the privacy policies and cookie policies of these third parties to understand their practices and your rights.</p>
        </section>

        <section id="cookie-purposes" className="legal-section">
          <h2>5. How We Use Cookies</h2>
          <p>We use cookies and similar technologies for the following purposes:</p>

          <h3>5.1 Essential Purposes</h3>
          <p>We use cookies that are necessary for our Services to function properly and securely, including:</p>
          <ul>
            <li>To authenticate and identify you when you use our Services</li>
            <li>To store information about your preferences and settings</li>
            <li>To process transactions and maintain shopping carts</li>
            <li>To prevent fraudulent activity and improve security</li>
            <li>To fulfill requests that you make, such as form submission</li>
          </ul>

          <h3>5.2 Performance and Functionality Purposes</h3>
          <p>We use cookies to improve the performance and functionality of our Services, including:</p>
          <ul>
            <li>To remember information about your browser and preferences</li>
            <li>To remember your settings and personalize your experience</li>
            <li>To maintain the state of your session</li>
            <li>To improve the way our Services work</li>
          </ul>

          <h3>5.3 Analytics and Customization Purposes</h3>
          <p>We use cookies to gather information about how users interact with our Services to help us improve them and to customize your experience, including:</p>
          <ul>
            <li>To count visitors and track traffic sources</li>
            <li>To measure and improve the performance of our Services</li>
            <li>To understand which pages are popular and how users navigate our Services</li>
            <li>To track the success of our marketing campaigns</li>
            <li>To gather feedback and improve our customer support</li>
          </ul>

          <h3>5.4 Advertising Purposes</h3>
          <p>We use cookies to deliver, measure, and improve advertisements, including:</p>
          <ul>
            <li>To show you advertisements based on your interests and previous interactions with our Services</li>
            <li>To track the effectiveness of our advertising campaigns</li>
            <li>To limit the number of times you see an advertisement</li>
            <li>To improve the relevance of advertisements you see</li>
          </ul>

          <h3>5.5 Social Media Purposes</h3>
          <p>We use cookies to enable social media functionality and to share content on social media platforms, including:</p>
          <ul>
            <li>To allow you to share content from our Services on social media platforms</li>
            <li>To track your use of our Services from links on social media platforms</li>
            <li>To enable social media features integrated into our Services</li>
          </ul>
        </section>

        <section id="managing-cookies" className="legal-section">
          <h2>6. Managing Your Cookie Preferences</h2>
          <p>You have the right to decide whether to accept or reject cookies. You can exercise this right in the following ways:</p>

          <h3>6.1 Cookie Preference Settings</h3>
          <p>When you first visit our Services, you may be presented with a cookie banner that allows you to accept or reject different categories of cookies. You can change your cookie preferences at any time by clicking on "Cookie Settings" in the footer of our website.</p>

          <h3>6.2 Browser Settings</h3>
          <p>You can set or amend your web browser controls to accept or refuse cookies. If you choose to reject cookies, you may still use our Services, but your access to some functionality and areas of our Services may be restricted. The way you can refuse cookies through your web browser controls varies from browser to browser, so you should visit your browser's help menu for more information.</p>
          <p>Here are links to the cookie management pages of major web browsers:</p>
          <ul>
            <li><a href="https://support.google.com/chrome/answer/95647" target="_blank" rel="noopener noreferrer" style={{ color: "#0a85d1" }}>Google Chrome</a></li>
            <li><a href="https://support.mozilla.org/en-US/kb/cookies-information-websites-store-on-your-computer" target="_blank" rel="noopener noreferrer" style={{ color: "#0a85d1" }}>Mozilla Firefox</a></li>
            <li><a href="https://support.microsoft.com/en-us/windows/delete-and-manage-cookies-168dab11-0753-043d-7c16-ede5947fc64d" target="_blank" rel="noopener noreferrer" style={{ color: "#0a85d1" }}>Microsoft Edge</a></li>
            <li><a href="https://support.apple.com/guide/safari/manage-cookies-and-website-data-sfri11471/mac" target="_blank" rel="noopener noreferrer" style={{ color: "#0a85d1" }}>Apple Safari</a></li>
            <li><a href="https://help.opera.com/en/latest/web-preferences/#cookies" target="_blank" rel="noopener noreferrer" style={{ color: "#0a85d1" }}>Opera</a></li>
          </ul>

          <h3>6.3 Specific Opt-Out Mechanisms</h3>
          <p>Some of the third-party services we use provide specific opt-out mechanisms:</p>
          <ul>
            <li><strong>Google Analytics:</strong> You can opt out of Google Analytics by installing the <a href="https://tools.google.com/dlpage/gaoptout" target="_blank" rel="noopener noreferrer" style={{ color: "#0a85d1" }}>Google Analytics Opt-out Browser Add-on</a>.</li>
            <li><strong>Google Ads:</strong> You can opt out of personalized Google Ads by visiting <a href="https://adssettings.google.com" target="_blank" rel="noopener noreferrer" style={{ color: "#0a85d1" }}>Google Ads Settings</a>.</li>
            <li><strong>Facebook:</strong> You can control your Facebook cookie preferences through your Facebook account settings or by using the <a href="https://www.facebook.com/help/568137493302217" target="_blank" rel="noopener noreferrer" style={{ color: "#0a85d1" }}>Facebook "Your Ad Preferences" tool</a>.</li>
          </ul>

          <h3>6.4 Mobile Device Settings</h3>
          <p>On your mobile device, you can control your cookie preferences through the settings of your mobile operating system (iOS or Android) or the settings of the mobile application you are using.</p>

          <h3>6.5 Do Not Track</h3>
          <p>Some browsers have a "Do Not Track" feature that signals to websites that you do not want your online activities tracked. Because there is not yet a common understanding of how to interpret the DNT signal, our Services do not currently respond to browser DNT signals.</p>
        </section>

        <section id="similar-technologies" className="legal-section">
          <h2>7. Similar Technologies</h2>
          <p>In addition to cookies, we may use other similar technologies on our Services, including:</p>

          <h3>7.1 Web Beacons</h3>
          <p>Web beacons (also known as clear GIFs, pixel tags, or web bugs) are tiny graphics with a unique identifier, similar in function to cookies, that are used to track the online movements of users or to access cookies. Unlike cookies, which are stored on the user's computer hard drive, web beacons are embedded invisibly on web pages (or in an email) and are about the size of the period at the end of this sentence.</p>
          <p>We use web beacons to monitor the behavior of users, such as to count how many users access a specific page, to track how users navigate through our Services, and to count how many emails or links were actually opened or clicked.</p>

          <h3>7.2 Local Storage Objects</h3>
          <p>We use Local Storage Objects (LSOs) such as HTML5 LocalStorage and IndexedDB to store content information and preferences. Third parties with whom we partner to provide certain features on our Services or to display advertising based upon your web browsing activity may use LSOs such as HTML5 to collect and store information.</p>
          <p>Various browsers may offer their own management tools for removing HTML5 LSOs. To manage Flash LSOs, please visit <a href="https://www.macromedia.com/support/documentation/en/flashplayer/help/settings_manager07.html" target="_blank" rel="noopener noreferrer" style={{ color: "#0a85d1" }}>Adobe's website</a>.</p>

          <h3>7.3 Embedded Scripts</h3>
          <p>An embedded script is programming code that is designed to collect information about your interactions with our Services, such as the links you click on. The code is temporarily downloaded onto your device from our web server or a third-party service provider, is active only while you are connected to our Services, and is deactivated or deleted thereafter.</p>

          <h3>7.4 Device Fingerprinting</h3>
          <p>Device fingerprinting is the process of collecting and analyzing information from your device, such as your operating system, browser type, installed plugins, screen resolution, fonts, and time zone, to create a "fingerprint" of your device. This fingerprint may be used to identify your device on future visits to our Services.</p>
          <p>We use device fingerprinting to enhance security and to help prevent fraud. We do not use device fingerprinting to track you across multiple websites operated by different companies.</p>
        </section>

        <section id="policy-updates" className="legal-section">
          <h2>8. Updates to this Policy</h2>
          <p>We may update this Cookie Policy from time to time to reflect changes in technology, our business operations, or legal requirements. When we post changes to this Cookie Policy, we will revise the "Last Updated" date at the top of this policy. If we make significant changes to this Cookie Policy, we will notify you by posting a notice on our Services or by sending you a notification directly.</p>
          <p>We encourage you to periodically review this Cookie Policy to stay informed about our use of cookies and related technologies.</p>
        </section>

        <section id="contact" className="legal-section">
          <h2>9. Contact Us</h2>
          <p>If you have any questions or concerns about our use of cookies and similar technologies, please contact us at:</p>
          <p>WePay Crypto, Inc.<br />
            Attn: Privacy Team<br />
            123 Blockchain Avenue<br />
            San Francisco, CA 94107<br />
            United States<br />
            Email: privacy@wepay-crypto.com</p>
        </section>

        <div className="compliance-footer" style={{ marginTop: "4rem", padding: "2rem", backgroundColor: "#f8f9fa", borderRadius: "8px", textAlign: "center" }}>
          <p>This Cookie Policy was last updated on July 1, 2025.</p>
          <div style={{ marginTop: "1.5rem" }}>
            <Link to="/terms-of-service" className="btn btn-outline" style={{ marginRight: "1rem" }}>Terms of Service</Link>
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

export default CookiePolicy; 