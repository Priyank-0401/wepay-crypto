// src/pages/Transactions.js
import React, { useState, useEffect } from 'react';
import '../styles/Pages.css';
import TransactionService from '../services/transactionService';

const Transactions = () => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedType, setSelectedType] = useState('all');
  const [error, setError] = useState(null);

  // Fetch transactions when component mounts
  useEffect(() => {
    const fetchTransactions = async () => {
      setLoading(true);
      setError(null);
      
      try {
        // Initialize TransactionService if needed
        if (!TransactionService.web3) {
          await TransactionService.init();
        }
        
        // Get user's account
        const userAccount = await TransactionService.getDefaultAccount();
        
        if (!userAccount) {
          setError("Could not determine user account");
          setLoading(false);
          return;
        }
        
        console.log(`Using account: ${userAccount}`);
        
        // Fetch transactions for this account
        const txList = await TransactionService.getTransactions(userAccount);
        console.log(`Found ${txList.length} transactions`);
        
        setTransactions(txList);
      } catch (error) {
        console.error('Error fetching transactions:', error);
        setError("Failed to fetch transaction data");
      } finally {
        setLoading(false);
      }
    };
    
    fetchTransactions();
    
    // Set up polling for transactions every 5 seconds
    const interval = setInterval(() => {
      fetchTransactions();
    }, 5000);
    
    // Clean up interval on unmount
    return () => clearInterval(interval);
  }, []);

  // Filter transactions by type
  const filteredTransactions = transactions.filter(tx => {
    return selectedType === 'all' || tx.type === selectedType;
  });

  // Helper function to format addresses
  const formatAddress = (address) => {
    if (!address) return 'Unknown';
    return `${address.substring(0, 6)}...${address.substring(address.length - 4)}`;
  };

  // Helper function to format date
  const formatDate = (timestamp) => {
    return new Date(Number(timestamp)).toLocaleString();
  };

  // Helper function to determine badge class
  const getBadgeClass = (status) => {
    if (!status) return 'badge-info';
    
    switch (status.toLowerCase()) {
      case 'success':
      case 'confirmed':
        return 'badge-success';
      case 'pending':
        return 'badge-warning';
      case 'failed':
        return 'badge-danger';
      default:
        return 'badge-info';
    }
  };

  // Helper function to calculate total sent
  const calculateTotalSent = () => {
    try {
      return transactions
        .filter(tx => tx.type === 'Transfer')
        .reduce((sum, tx) => {
          const ethValue = TransactionService.weiToEth(tx.value);
          return sum + parseFloat(ethValue || '0');
        }, 0)
        .toFixed(4);
    } catch (error) {
      console.error('Error calculating total sent:', error);
      return '0.0000';
    }
  };

  // Helper function to calculate total received
  const calculateTotalReceived = () => {
    try {
      return transactions
        .filter(tx => tx.type === 'Receive')
        .reduce((sum, tx) => {
          const ethValue = TransactionService.weiToEth(tx.value);
          return sum + parseFloat(ethValue || '0');
        }, 0)
        .toFixed(4);
    } catch (error) {
      console.error('Error calculating total received:', error);
      return '0.0000';
    }
  };
  
  // Helper function to calculate total gas fees
  const calculateTotalGasFees = () => {
    try {
      return transactions
        .reduce((sum, tx) => {
          const fee = TransactionService.calculateGasFee(tx.gas, tx.gasPrice);
          return sum + parseFloat(fee || '0');
        }, 0)
        .toFixed(6);
    } catch (error) {
      console.error('Error calculating total gas fees:', error);
      return '0.000000';
    }
  };

  return (
    <div className="page-container transactions-page">
      {/* Simple Header like Dashboard */}
      <div className="dashboard-header">
        <h1>Transactions</h1>
        {/* Optional: Add user profile/controls if needed, matching Dashboard */}
        {/* 
        <div className="user-profile">
          <div className="profile-icon">P</div>
        </div> 
        */}
      </div>

      <div className="page-content"> 
        {error && (
          <div className="error-message">
            <p>{error}</p>
          </div>
        )}
        
        {/* Main Content Area (No longer wrapped in a card) */}
        <div className="transactions-content-area"> 
          {/* Removed redundant card header */}
          {/* <div className="page-card-header">
            <h2 className="page-card-title">Transaction History</h2>
          </div> */}
          
          <div className="filter-controls">
            <div className="form-control">
              <label htmlFor="type-filter">Filter by Type</label>
              <select 
                id="type-filter"
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
              >
                <option value="all">All Types</option>
                <option value="Transfer">Sent</option>
                <option value="Receive">Received</option>
              </select>
            </div>
          </div>
          
          {loading ? (
            <div className="loading-state">
              <span className="spinner"></span> Loading transactions...
            </div>
          ) : filteredTransactions.length > 0 ? (
            <div className="table-container">
              <table className="table">
                <thead>
                  <tr>
                    <th>Date</th>
                    <th>Type</th>
                    <th>Address</th>
                    <th>Amount</th>
                    <th>Gas Fee</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredTransactions.map((tx) => {
                    const isOutgoing = tx.type === 'Transfer';
                    const displayAddress = isOutgoing ? tx.to : tx.from;
                    
                    return (
                      <tr key={tx.id}>
                        <td>{formatDate(tx.timestamp)}</td>
                        <td>
                          <span className={`badge ${isOutgoing ? 'badge-info' : 'badge-success'}`}>
                            {isOutgoing ? 'Sent' : 'Received'}
                          </span>
                        </td>
                        <td style={{ fontFamily: 'monospace' }}>{formatAddress(displayAddress)}</td>
                        <td>
                          <span style={{ 
                            color: isOutgoing ? 'var(--danger)' : 'var(--success)',
                            fontWeight: '600'
                          }}>
                            {isOutgoing ? '-' : '+'}{TransactionService.weiToEth(tx.value)} ETH
                          </span>
                        </td>
                        <td>{TransactionService.calculateGasFee(tx.gas, tx.gasPrice)} ETH</td>
                        <td>
                          <span className={`badge ${getBadgeClass(tx.status)}`}>
                            {tx.status ? tx.status.charAt(0).toUpperCase() + tx.status.slice(1) : 'Unknown'}
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="empty-state">
              <p>No transactions found</p>
              <p className="empty-state-sub">Transactions will appear here after you send or receive ETH</p>
            </div>
          )}
        </div>
        
        {/* Statistics Card (Keep as a card) */}
        <div className="page-card stats-summary-card">
          <div className="page-card-header">
            <h2 className="page-card-title">Transaction Statistics</h2>
          </div>
          
          <div className="form-grid stats-grid">
            <div className="stat-card">
              <div className="stat-title">Total Sent</div>
              <div className="stat-value expense">-{calculateTotalSent()} ETH</div>
            </div>
            
            <div className="stat-card">
              <div className="stat-title">Total Received</div>
              <div className="stat-value income">+{calculateTotalReceived()} ETH</div>
            </div>
            
            <div className="stat-card">
              <div className="stat-title">Gas Fees Spent</div>
              <div className="stat-value">{calculateTotalGasFees()} ETH</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Transactions;