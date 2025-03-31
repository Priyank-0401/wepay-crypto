// src/pages/Transactions.js
import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import TransactionService from '../services/transactionService';

const Transactions = () => {
  const [transactions, setTransactions] = useState([]);
  const [accounts, setAccounts] = useState([]);
  const [selectedAccount, setSelectedAccount] = useState('all');
  const [selectedType, setSelectedType] = useState('all');

  useEffect(() => {
    const initializeComponent = async () => {
      try {
        // Initialize transaction service
        await TransactionService.init();
        
        // Get accounts
        const accountsList = await TransactionService.getAccounts();
        setAccounts(accountsList);
        
        // Get transaction history
        const history = TransactionService.getTransactionHistory();
        setTransactions(history);
      } catch (err) {
        console.error('Failed to initialize Transactions component:', err);
      }
    };
    
    initializeComponent();
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
    return new Date(timestamp).toLocaleString();
  };

  // Format address to show only first and last few characters
  const formatAddress = (address) => {
    if (!address) return '';
    return `${address.substring(0, 6)}...${address.substring(address.length - 4)}`;
  };

  return (
    <Layout>
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-6">Transaction History</h1>
        
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="flex flex-col md:flex-row md:justify-between mb-6">
            <div className="mb-4 md:mb-0">
              <label className="block text-gray-700 mb-2">Filter by Account</label>
              <select 
                className="p-2 border rounded"
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
            
            <div>
              <label className="block text-gray-700 mb-2">Filter by Type</label>
              <select 
                className="p-2 border rounded"
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
              >
                <option value="all">All Types</option>
                <option value="send">Send</option>
                <option value="receive">Receive</option>
                <option value="request">Request</option>
              </select>
            </div>
          </div>
          
          {sortedTransactions.length === 0 ? (
            <div className="text-center py-6 text-gray-500">
              No transactions found
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white">
                <thead>
                  <tr className="bg-gray-100 text-gray-600 uppercase text-sm leading-normal">
                    <th className="py-3 px-6 text-left">Date</th>
                    <th className="py-3 px-6 text-left">Type</th>
                    <th className="py-3 px-6 text-left">From</th>
                    <th className="py-3 px-6 text-left">To</th>
                    <th className="py-3 px-6 text-right">Amount</th>
                    <th className="py-3 px-6 text-center">Status</th>
                  </tr>
                </thead>
                <tbody className="text-gray-600 text-sm">
                  {sortedTransactions.map((tx) => (
                    <tr 
                      key={tx.hash || tx.id} 
                      className="border-b border-gray-200 hover:bg-gray-50"
                    >
                      <td className="py-3 px-6 text-left">
                        {formatDate(tx.timestamp)}
                      </td>
                      <td className="py-3 px-6 text-left">
                        <span className={`py-1 px-3 rounded-full text-xs ${
                          tx.type === 'send' 
                            ? 'bg-blue-200 text-blue-800' 
                            : tx.type === 'receive' 
                              ? 'bg-green-200 text-green-800'
                              : 'bg-purple-200 text-purple-800'
                        }`}>
                          {tx.type.charAt(0).toUpperCase() + tx.type.slice(1)}
                        </span>
                      </td>
                      <td className="py-3 px-6 text-left font-mono">
                        {formatAddress(tx.from)}
                      </td>
                      <td className="py-3 px-6 text-left font-mono">
                        {formatAddress(tx.to)}
                      </td>
                      <td className="py-3 px-6 text-right">
                        {tx.value} ETH
                      </td>
                      <td className="py-3 px-6 text-center">
                        <span className={`py-1 px-3 rounded-full text-xs ${
                          tx.status === 'success' || tx.status === 'completed'
                            ? 'bg-green-200 text-green-800' 
                            : tx.status === 'pending'
                              ? 'bg-yellow-200 text-yellow-800'
                              : 'bg-red-200 text-red-800'
                        }`}>
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
      </div>
    </Layout>
  );
};

export default Transactions;