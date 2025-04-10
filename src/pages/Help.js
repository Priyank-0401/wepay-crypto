import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/Help.css';

const Help = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('getting-started');
  const [expandedFaqs, setExpandedFaqs] = useState({});

  // FAQ Data
  const faqData = [
    {
      id: 1,
      question: 'How do I connect my wallet?',
      answer: "To connect your wallet, click on the \"Connect Wallet\" button in the top right corner of the dashboard. You can choose from MetaMask, WalletConnect, or Coinbase Wallet. Follow the prompts to complete the connection process. Your wallet will remain connected until you manually disconnect it or clear your browser cache."
    },
    {
      id: 2,
      question: 'What fees does WePay charge for crypto transactions?',
      answer: "WePay charges a flat 0.5% fee on transactions. Gas fees are separate and determined by network conditions. For large transactions over 10 ETH, fees are reduced to 0.3%. We offer fee-free transactions for premium members. All fees are transparently displayed before you confirm any transaction."
    },
    {
      id: 3,
      question: 'How secure is my crypto on WePay?',
      answer: "WePay uses industry-standard security practices including end-to-end encryption, multi-factor authentication, and regular security audits. We do not store your private keys - we use non-custodial wallet connections, meaning you always maintain control of your assets. Additionally, all smart contracts are audited by leading security firms."
    },
    {
      id: 4,
      question: 'Which cryptocurrencies are supported?',
      answer: "WePay currently supports Ethereum (ETH), Bitcoin (BTC), Solana (SOL), Polygon (MATIC), and all ERC-20 tokens. We regularly add support for new cryptocurrencies and tokens based on demand and security evaluations. Check the \"Accounts\" section for the complete list of supported assets."
    },
    {
      id: 5,
      question: 'How do I track my gas costs?',
      answer: "Gas costs are tracked automatically for all your transactions. You can view detailed gas information for each transaction in the transaction history. The Gas Tracker on your dashboard also provides real-time information about current gas prices and helps you optimize transaction timing for lower fees."
    },
    {
      id: 6,
      question: 'What should I do if my transaction is pending for too long?',
      answer: "If your transaction is pending for an extended period, you have several options: 1) Wait longer during times of network congestion, 2) Use the \"Speed Up\" option to increase the gas price and incentivize miners, or 3) If available, use the \"Cancel\" option if the transaction hasn't been mined yet. For specific help, contact our support team with your transaction hash."
    }
  ];

  // Sample knowledge base categories
  const categories = [
    {
      id: 'getting-started',
      name: 'Getting Started',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10"></circle>
          <line x1="12" y1="8" x2="12" y2="16"></line>
          <line x1="8" y1="12" x2="16" y2="12"></line>
        </svg>
      )
    },
    {
      id: 'faq',
      name: 'Frequently Asked Questions',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10"></circle>
          <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path>
          <line x1="12" y1="17" x2="12.01" y2="17"></line>
        </svg>
      )
    },
    {
      id: 'security',
      name: 'Security & Privacy',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
          <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
        </svg>
      )
    },
    {
      id: 'wallets',
      name: 'Wallets & Transactions',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="5" width="20" height="14" rx="2" ry="2"></rect>
          <path d="M16 12h4"></path>
          <circle cx="18" cy="12" r="1"></circle>
        </svg>
      )
    },
    {
      id: 'troubleshooting',
      name: 'Troubleshooting',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
        </svg>
      )
    }
  ];

  // Toggle FAQ expansion
  const toggleFaq = (id) => {
    setExpandedFaqs(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  // Filter FAQs based on search query
  const filteredFaqs = faqData.filter(faq => 
    faq.question.toLowerCase().includes(searchQuery.toLowerCase()) || 
    faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="help-page">
      <h1 className="help-header-title">Help & Support Center</h1>
      <p className="help-header-description">
        Find answers to common questions about crypto transactions, wallet connections, and security
      </p>
      
      <div className="help-searchbar">
        <svg className="help-searchbar-icon" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="11" cy="11" r="8"></circle>
          <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
        </svg>
        <input 
          type="text" 
          className="help-searchbar-input"
          placeholder="Search for help topics..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        {searchQuery && (
          <button 
            className="help-search-clear"
            onClick={() => setSearchQuery('')}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        )}
      </div>
      
      {/* Help Navigation */}
      <div className="help-nav-card">
        <div className="help-nav-header">
          <h2 className="help-nav-title">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
              <polyline points="14 2 14 8 20 8"></polyline>
              <line x1="16" y1="13" x2="8" y2="13"></line>
              <line x1="16" y1="17" x2="8" y2="17"></line>
              <polyline points="10 9 9 9 8 9"></polyline>
            </svg>
            Help Topics
          </h2>
        </div>
        
        <div className="help-nav-list">
          {categories.map(category => (
            <div key={category.id} className="help-nav-item">
              <button 
                className={`help-nav-link ${activeCategory === category.id ? 'active' : ''}`}
                onClick={() => setActiveCategory(category.id)}
              >
                {category.icon}
                {category.name}
              </button>
            </div>
          ))}
        </div>
      </div>
      
      {/* Two-column layout */}
      <div className="content-row">
        {/* Left column with support card */}
        <div className="content-col-left">
          <div className="help-support-card">
            <h3 className="help-support-title">Need More Help?</h3>
            <p className="help-support-text">
              Our support team is available 24/7 to assist you with any issues or questions.
            </p>
            <button className="help-support-button">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
              </svg>
              Contact Support
            </button>
          </div>
        </div>
        
        {/* Right column with main content */}
        <div className="content-col-right">
          {activeCategory === 'getting-started' && (
            <div className="help-section">
              <div className="help-section-header">
                <h2 className="help-section-title">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10"></circle>
                    <line x1="12" y1="8" x2="12" y2="16"></line>
                    <line x1="8" y1="12" x2="16" y2="12"></line>
                  </svg>
                  Getting Started
                </h2>
              </div>
              <div className="help-section-content">
                <div className="help-guides-grid">
                  <div className="help-guide-card">
                    <div className="help-guide-icon">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                        <circle cx="9" cy="7" r="4"></circle>
                        <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                        <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                      </svg>
                    </div>
                    <h3 className="help-guide-title">Creating Your Account</h3>
                    <p className="help-guide-description">
                      Learn how to set up your account and personalize your profile settings.
                    </p>
                    <Link to="#" className="help-guide-link">Read Guide</Link>
                  </div>
                  
                  <div className="help-guide-card">
                    <div className="help-guide-icon">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="2" y="5" width="20" height="14" rx="2" ry="2"></rect>
                        <path d="M16 12h4"></path>
                        <circle cx="18" cy="12" r="1"></circle>
                      </svg>
                    </div>
                    <h3 className="help-guide-title">Connecting Your Wallet</h3>
                    <p className="help-guide-description">
                      Step-by-step instructions for connecting your crypto wallet to WePay.
                    </p>
                    <Link to="#" className="help-guide-link">Read Guide</Link>
                  </div>
                  
                  <div className="help-guide-card">
                    <div className="help-guide-icon">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="12" y1="1" x2="12" y2="23"></line>
                        <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
                      </svg>
                    </div>
                    <h3 className="help-guide-title">First Transaction</h3>
                    <p className="help-guide-description">
                      How to send your first cryptocurrency transaction using WePay's platform.
                    </p>
                    <Link to="#" className="help-guide-link">Read Guide</Link>
                  </div>
                  
                  <div className="help-guide-card">
                    <div className="help-guide-icon">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path>
                      </svg>
                    </div>
                    <h3 className="help-guide-title">Gas and Fees</h3>
                    <p className="help-guide-description">
                      Understanding gas fees and how to optimize transaction costs.
                    </p>
                    <Link to="#" className="help-guide-link">Read Guide</Link>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {activeCategory === 'faq' && (
            <div className="help-section">
              <div className="help-section-header">
                <h2 className="help-section-title">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10"></circle>
                    <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path>
                    <line x1="12" y1="17" x2="12.01" y2="17"></line>
                  </svg>
                  Frequently Asked Questions
                </h2>
              </div>
              <div className="help-section-content">
                {searchQuery && filteredFaqs.length === 0 ? (
                  <div className="help-empty-state">
                    <div className="help-empty-state-icon">🔍</div>
                    <h3 className="help-empty-state-title">No Results Found</h3>
                    <p className="help-empty-state-text">
                      We couldn't find any matches for "{searchQuery}"
                    </p>
                    <button 
                      className="help-empty-state-button"
                      onClick={() => setSearchQuery('')}
                    >
                      Clear Search
                    </button>
                  </div>
                ) : (
                  <div className="help-faq-list">
                    {(searchQuery ? filteredFaqs : faqData).map(faq => (
                      <div 
                        key={faq.id} 
                        className={`help-faq-item ${expandedFaqs[faq.id] ? 'expanded' : ''}`}
                      >
                        <div 
                          className="help-faq-question"
                          onClick={() => toggleFaq(faq.id)}
                        >
                          <h3>{faq.question}</h3>
                          <div className="help-faq-toggle">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <polyline points="6 9 12 15 18 9"></polyline>
                            </svg>
                          </div>
                        </div>
                        <div className="help-faq-answer">
                          <p>{faq.answer}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}
          
          {(activeCategory !== 'faq' && activeCategory !== 'getting-started') && (
            <div className="help-section">
              <div className="help-section-header">
                <h2 className="help-section-title">
                  {categories.find(cat => cat.id === activeCategory)?.icon}
                  {categories.find(cat => cat.id === activeCategory)?.name}
                </h2>
              </div>
              <div className="help-section-content">
                <div className="help-empty-state">
                  <div className="help-empty-state-icon">🚧</div>
                  <h3 className="help-empty-state-title">Coming Soon</h3>
                  <p className="help-empty-state-text">
                    We're currently building this knowledge base section. Check back soon for helpful resources!
                  </p>
                  <button 
                    className="help-empty-state-button"
                    onClick={() => setActiveCategory('faq')}
                  >
                    View FAQs Instead
                  </button>
                </div>
              </div>
            </div>
          )}
          
          <div className="help-cta-card">
            <div className="help-cta-icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"></circle>
                <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path>
                <line x1="12" y1="17" x2="12.01" y2="17"></line>
              </svg>
            </div>
            <div className="help-cta-content">
              <h3 className="help-cta-title">Still Have Questions?</h3>
              <p className="help-cta-text">
                Can't find what you're looking for? Our support team is ready to help.
              </p>
              <div className="help-cta-buttons">
                <button className="help-cta-primary">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                  </svg>
                  Contact Support
                </button>
                <button className="help-cta-secondary">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
                  </svg>
                  Live Chat
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Help;
