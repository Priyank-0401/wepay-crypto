// src/pages/Transactions.js
import React, { useState, useEffect } from 'react';
import '../styles/Pages.css';

const Transactions = () => {
  const [transactions, setTransactions] = useState([]);
  const [accounts, setAccounts] = useState([]);
  const [selectedAccount, setSelectedAccount] = useState('all');
  const [selectedType, setSelectedType] = useState('all');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        // Mock data for accounts
        const mockAccounts = [
          '0x742d35Cc6634C0532925a3b844Bc454e4438f44e',
          '0x8Fe7A9C9bA9C6628232CDc299E9Daa4127b5F5E2'
        ];
        
        // Mock data for transactions
        const mockTransactions = [
          {
            id: '0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef',
            type: 'send',
            from: '0x742d35Cc6634C0532925a3b844Bc454e4438f44e',
            to: '0x8Fe7A9C9bA9C6628232CDc299E9Daa4127b5F5E2',
            value: '0.5',
            timestamp: Date.now() - 1000 * 60 * 60 * 2, // 2 hours ago
            status: 'success',
            gasUsed: '0.0021'
          },
          {
            id: '0xabcdef1234567890abcdef1234567890abcdef1234567890abcdef1234567890',
            type: 'receive',
            from: '0x8Fe7A9C9bA9C6628232CDc299E9Daa4127b5F5E2',
            to: '0x742d35Cc6634C0532925a3b844Bc454e4438f44e',
            value: '0.8',
            timestamp: Date.now() - 1000 * 60 * 60 * 24 * 2, // 2 days ago
            status: 'success',
            gasUsed: '0'
          },
          {
            id: '0xfedcba0987654321fedcba0987654321fedcba0987654321fedcba0987654321',
            type: 'send',
            from: '0x742d35Cc6634C0532925a3b844Bc454e4438f44e',
            to: '0x742d35Cc6634C0532925a3b844Bc454e4438f44e',
            value: '0.2',
            timestamp: Date.now() - 1000 * 60 * 30, // 30 mins ago
            status: 'pending',
            gasUsed: '0.0015'
          },
          {
            id: '0x0987654321fedcba0987654321fedcba0987654321fedcba0987654321fedcba',
            type: 'send',
            from: '0x742d35Cc6634C0532925a3b844Bc454e4438f44e',
            to: '0x1a2b3c4d5e6f7g8h9i0j1k2l3m4n5o6p7q8r9s0t',
            value: '0.3',
            timestamp: Date.now() - 1000 * 60 * 60 * 24 * 5, // 5 days ago
            status: 'failed',
            gasUsed: '0.0008'
          }
        ];
        
        setAccounts(mockAccounts);
        setTransactions(mockTransactions);
      } catch (error) {
        console.error('Error fetching transaction data:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, []);

  // Filter transactions based on selected account and type
  const filteredTransactions = transactions.filter(tx => {
    const accountMatch = selectedAccount === 'all' || 
                         tx.from === selectedAccount || 
                         tx.to === selectedAccount;
    const typeMatch = selectedType === 'all' || tx.type === selectedType;
    
    return accountMatch && typeMatch;
  });

  // Sort transactions by timestamp (newest first)
  const sortedTransactions = [...filteredTransactions].sort((a, b) => b.timestamp - a.timestamp);

  // Format date from timestamp
  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    
    // If the transaction was today, show only the time
    const isToday = new Date().toDateString() === date.toDateString();
    
    if (isToday) {
      return `Today at ${date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
    }
    
    // Check if the transaction was yesterday
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
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // Format address to show only first and last few characters
  const formatAddress = (address) => {
    if (!address) return '';
    return `${address.substring(0, 6)}...${address.substring(address.length - 4)}`;
  };

  // Determine badge class based on transaction status
  const getBadgeClass = (status) => {
    switch (status) {
      case 'success':
      case 'completed':
        return 'badge-success';
      case 'pending':
        return 'badge-warning';
      case 'failed':
        return 'badge-danger';
      default:
        return 'badge-info';
    }
  };

  return (
    <div className="page-container">
      <div className="page-header">
        <h1 className="page-title">Transactions</h1>
        <div className="page-actions">
          <button className="btn btn-primary">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="12" y1="5" x2="12" y2="19"></line>
              <line x1="5" y1="12" x2="19" y2="12"></line>
            </svg>
            New Transaction
          </button>
          <button className="btn btn-secondary">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
              <polyline points="7 10 12 15 17 10"></polyline>
              <line x1="12" y1="15" x2="12" y2="3"></line>
            </svg>
            Export
          </button>
        </div>
      </div>
      
      <div className="page-card">
        <div className="page-card-header">
          <h2 className="page-card-title">Transaction History</h2>
        </div>
        
        <div className="form-grid" style={{ marginBottom: '2rem' }}>
          <div className="form-control">
            <label htmlFor="account-filter">Filter by Account</label>
            <select 
              id="account-filter"
              value={selectedAccount}
              onChange={(e) => setSelectedAccount(e.target.value)}
            >
              <option value="all">All Accounts</option>
              {accounts.map((account) => (
                <option key={account} value={account}>
                  {formatAddress(account)}
                </option>
              ))}
            </select>
          </div>
          
          <div className="form-control">
            <label htmlFor="type-filter">Filter by Type</label>
            <select 
              id="type-filter"
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
            >
              <option value="all">All Types</option>
              <option value="send">Send</option>
              <option value="receive">Receive</option>
              <option value="swap">Swap</option>
            </select>
          </div>
        </div>
        
        {loading ? (
          <div className="empty-state">
            <div className="empty-state-icon">⏳</div>
            <div className="empty-state-title">Loading transactions...</div>
            <div className="empty-state-text">Please wait while we fetch your transaction history.</div>
          </div>
        ) : sortedTransactions.length === 0 ? (
          <div className="empty-state">
            <div className="empty-state-icon">📭</div>
            <div className="empty-state-title">No transactions found</div>
            <div className="empty-state-text">
              We couldn't find any transactions matching your current filters.
            </div>
            {(selectedAccount !== 'all' || selectedType !== 'all') && (
              <button 
                className="btn btn-secondary"
                onClick={() => {
                  setSelectedAccount('all');
                  setSelectedType('all');
                }}
              >
                Clear Filters
              </button>
            )}
          </div>
        ) : (
          <div className="table-container">
            <table className="table">
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Type</th>
                  <th>From</th>
                  <th>To</th>
                  <th>Amount</th>
                  <th>Gas Fee</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {sortedTransactions.map((tx) => (
                  <tr key={tx.id}>
                    <td>{formatDate(tx.timestamp)}</td>
                    <td>
                      <span className={`badge ${tx.type === 'send' ? 'badge-info' : 'badge-success'}`}>
                        {tx.type.charAt(0).toUpperCase() + tx.type.slice(1)}
                      </span>
                    </td>
                    <td style={{ fontFamily: 'monospace' }}>{formatAddress(tx.from)}</td>
                    <td style={{ fontFamily: 'monospace' }}>{formatAddress(tx.to)}</td>
                    <td>
                      <span style={{ 
                        color: tx.type === 'send' ? 'var(--danger)' : 'var(--success)',
                        fontWeight: '600'
                      }}>
                        {tx.type === 'send' ? '-' : '+'}{tx.value} ETH
                      </span>
                    </td>
                    <td>{tx.gasUsed} ETH</td>
                    <td>
                      <span className={`badge ${getBadgeClass(tx.status)}`}>
                        {tx.status.charAt(0).toUpperCase() + tx.status.slice(1)}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
      
      <div className="page-card">
        <div className="page-card-header">
          <h2 className="page-card-title">Transaction Statistics</h2>
        </div>
        
        <div className="form-grid">
          <div className="stat-card">
            <div className="stat-title">Total Sent</div>
            <div className="stat-value">1.0 ETH</div>
            <div className="stat-change negative">-5% from last month</div>
          </div>
          
          <div className="stat-card">
            <div className="stat-title">Total Received</div>
            <div className="stat-value">0.8 ETH</div>
            <div className="stat-change positive">+12% from last month</div>
          </div>
          
          <div className="stat-card">
            <div className="stat-title">Gas Fees Spent</div>
            <div className="stat-value">0.0044 ETH</div>
            <div className="stat-change neutral">Same as last month</div>
          </div>
          
          <div className="stat-card">
            <div className="stat-title">Transaction Count</div>
            <div className="stat-value">4</div>
            <div className="stat-change positive">+2 from last month</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Transactions;