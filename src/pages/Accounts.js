import React, { useState, useEffect } from 'react';
import '../styles/Pages.css';

const Accounts = () => {
  const [accounts, setAccounts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedAccount, setSelectedAccount] = useState(null);
  const [showAddAccount, setShowAddAccount] = useState(false);

  useEffect(() => {
    const fetchAccounts = async () => {
      setLoading(true);
      try {
        // Mock data for accounts
        const mockAccounts = [
          {
            id: '1',
            address: '0x742d35Cc6634C0532925a3b844Bc454e4438f44e',
            name: 'Main Wallet',
            balance: '1.2345',
            type: 'ETH',
            lastActivity: Date.now() - 1000 * 60 * 30, // 30 mins ago
            isDefault: true
          },
          {
            id: '2',
            address: '0x8Fe7A9C9bA9C6628232CDc299E9Daa4127b5F5E2',
            name: 'Trading Wallet',
            balance: '0.8765',
            type: 'ETH',
            lastActivity: Date.now() - 1000 * 60 * 60 * 24 * 2, // 2 days ago
            isDefault: false
          },
          {
            id: '3',
            address: '0x3Aa9d9CB581f0B73E85C5913e3e455430BF262d0',
            name: 'Savings Wallet',
            balance: '5.4321',
            type: 'ETH',
            lastActivity: Date.now() - 1000 * 60 * 60 * 24 * 7, // 7 days ago
            isDefault: false
          }
        ];
        
        setAccounts(mockAccounts);
        setSelectedAccount(mockAccounts[0]);
      } catch (error) {
        console.error('Error fetching accounts:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchAccounts();
  }, []);

  // Format address to show only first and last few characters
  const formatAddress = (address) => {
    if (!address) return '';
    return `${address.substring(0, 6)}...${address.substring(address.length - 4)}`;
  };

  // Format date from timestamp
  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    
    // If activity was today, show "Today at XX:XX"
    const isToday = new Date().toDateString() === date.toDateString();
    
    if (isToday) {
      return `Today at ${date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
    }
    
    // Check if the activity was yesterday
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const isYesterday = yesterday.toDateString() === date.toDateString();
    
    if (isYesterday) {
      return `Yesterday at ${date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
    }
    
    // Otherwise show the full date
    return date.toLocaleDateString([], { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  // Handle account selection
  const handleAccountSelect = (account) => {
    setSelectedAccount(account);
  };

  return (
    <div className="page-container accounts-page">
      <div className="dashboard-header">
        <h1>Accounts</h1>
      </div>

      <div className="page-content">
        <div className="page-actions" style={{ marginBottom: '1.5rem' }}>
          <button 
            className="btn btn-primary"
            onClick={() => setShowAddAccount(true)}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="12" y1="5" x2="12" y2="19"></line>
              <line x1="5" y1="12" x2="19" y2="12"></line>
            </svg>
            Add Account
          </button>
          <button className="btn btn-secondary">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M3 3h18v18H3zM12 8v8M8 12h8"></path>
            </svg>
            Connect Hardware Wallet
          </button>
        </div>
        
        {loading ? (
          <div className="page-card">
            <div className="empty-state">
              <div className="empty-state-icon">⏳</div>
              <div className="empty-state-title">Loading accounts...</div>
              <div className="empty-state-text">Please wait while we fetch your account data.</div>
            </div>
          </div>
        ) : (
          <div className="accounts-content-area">
            <div className="accounts-wrapper">
              <div className="accounts-list">
                {accounts.map(account => (
                  <div 
                    key={account.id}
                    className={`account-item ${selectedAccount && selectedAccount.id === account.id ? 'account-item-active' : ''}`}
                    onClick={() => handleAccountSelect(account)}
                  >
                    <div className="account-icon">
                      {account.type}
                    </div>
                    <div className="account-details">
                      <div className="account-name">
                        {account.name}
                        {account.isDefault && (
                          <span className="account-badge">Default</span>
                        )}
                      </div>
                      <div className="account-address">{formatAddress(account.address)}</div>
                    </div>
                    <div className="account-balance">
                      <div className="balance-amount">{account.balance} ETH</div>
                      <div className="balance-value">${(parseFloat(account.balance) * 2842.15).toFixed(2)}</div>
                    </div>
                  </div>
                ))}
              </div>
              
              {selectedAccount && (
                <div className="account-details-panel">
                  <div className="account-header">
                    <h3>{selectedAccount.name}</h3>
                    <div className="account-actions">
                      <button className="btn btn-secondary btn-sm">
                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"></path>
                        </svg>
                        Edit
                      </button>
                      <button className="btn btn-secondary btn-sm">
                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                          <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                        </svg>
                        Copy Address
                      </button>
                    </div>
                  </div>
                  
                  <div className="detail-row">
                    <div className="detail-label">Address</div>
                    <div className="detail-value monospace">{selectedAccount.address}</div>
                  </div>
                  
                  <div className="detail-row">
                    <div className="detail-label">Balance</div>
                    <div className="detail-value">{selectedAccount.balance} ETH (${(parseFloat(selectedAccount.balance) * 2842.15).toFixed(2)})</div>
                  </div>
                  
                  <div className="detail-row">
                    <div className="detail-label">Last Activity</div>
                    <div className="detail-value">{formatDate(selectedAccount.lastActivity)}</div>
                  </div>
                  
                  <div className="account-actions-row">
                    <button className="btn btn-primary">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="12" y1="19" x2="12" y2="5"></line>
                        <polyline points="5 12 12 5 19 12"></polyline>
                      </svg>
                      Send
                    </button>
                    <button className="btn btn-secondary">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="12" y1="5" x2="12" y2="19"></line>
                        <polyline points="19 12 12 19 5 12"></polyline>
                      </svg>
                      Receive
                    </button>
                    <button className="btn btn-secondary">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="12" cy="12" r="10"></circle>
                        <path d="M8 14s1.5 2 4 2 4-2 4-2"></path>
                        <line x1="9" y1="9" x2="9.01" y2="9"></line>
                        <line x1="15" y1="9" x2="15.01" y2="9"></line>
                      </svg>
                      View in Explorer
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {showAddAccount && (
        <div className="modal-overlay">
          <div className="page-card">
            <div className="page-card-header">
              <h2 className="page-card-title">Add New Account</h2>
              <button className="close-btn" onClick={() => setShowAddAccount(false)}>×</button>
            </div>
            <p>Account adding form will be here.</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Accounts;
