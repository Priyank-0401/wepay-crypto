import React, { useState, useEffect, useCallback } from 'react';
import { useOutletContext } from 'react-router-dom';
import '../styles/Dashboard.css';
import { QRCodeSVG } from 'qrcode.react';
import TransactionService from '../services/transactionService';

// Helper function to format addresses - moved outside component
const formatAddressUtil = (address) => {
    if (!address) return 'Unknown';
    return `${address.substring(0, 6)}...${address.substring(address.length - 4)}`;
  };

const Dashboard = () => {
  useOutletContext();
  
  // State variables
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [account, setAccount] = useState('');
  const [ethBalance, setEthBalance] = useState(0);
  const [transactions, setTransactions] = useState([]);
  const [gasPrice, setGasPrice] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [web3, setWeb3] = useState(null);
  const [networkId, setNetworkId] = useState('');
  const [networkName, setNetworkName] = useState('');
  const [connectionStatus, setConnectionStatus] = useState('Disconnected');
  const [blockNumber, setBlockNumber] = useState(0);
  const [totalGasUsed, setTotalGasUsed] = useState(0);
  const [pendingTransactions, setPendingTransactions] = useState(0);
  const [connectionAttempts, setConnectionAttempts] = useState(0);
  const [debugMessage, setDebugMessage] = useState('Initializing...');
  const [sendFormOpen, setSendFormOpen] = useState(false);
  const [receiveFormOpen, setReceiveFormOpen] = useState(false);
  const [sendAmount, setSendAmount] = useState('');
  const [recipientAddress, setRecipientAddress] = useState('');
  const [transactionStatus, setTransactionStatus] = useState(null);
  const [transactionHash, setTransactionHash] = useState('');
  const [transactionError, setTransactionError] = useState(null);
  const [userInitial, setUserInitial] = useState('');
  
  // State variables for additional dashboard data
  const [ethPrice, setEthPrice] = useState(0);
  const [ethPriceChange, setEthPriceChange] = useState(0);
  const [marketCap, setMarketCap] = useState(0);
  const [volume24h, setVolume24h] = useState(0);
  const [transactionStats, setTransactionStats] = useState({
    sent: 0.07,
    received: 0.95,
    totalFees: 0,
    avgValue: 0
  });
  const [defiPortfolio, setDefiPortfolio] = useState([
    { protocol: 'Aave', amount: 0.05, apy: 3.2, value: 0 },
    { protocol: 'Compound', amount: 0.1, apy: 2.8, value: 0 },
    { protocol: 'Uniswap', amount: 0.02, apy: 5.4, value: 0 }
  ]);
  // Initialize spendingByCategory state with only categories, not mock data
  const [spendingByCategory, setSpendingByCategory] = useState([
    { category: 'Transfers', amount: 0, color: '#3498db' },
    { category: 'DeFi', amount: 0, color: '#2ecc71' },
    { category: 'NFTs', amount: 0, color: '#9b59b6' },
    { category: 'Smart Contracts', amount: 0, color: '#f1c40f' },
    { category: 'Gas Fees', amount: 0, color: '#e74c3c' },
  ]);

  // Get user data for profile icon
  useEffect(() => {
    const getUserData = () => {
      try {
        const userString = localStorage.getItem('user');
        if (userString) {
          const userData = JSON.parse(userString);
          if (userData) {
            // Try to get initial from name first
            if (userData.name) {
              const initial = userData.name.charAt(0).toUpperCase();
              setUserInitial(initial);
            } 
            // Fall back to email if name is not available
            else if (userData.email) {
              const initial = userData.email.charAt(0).toUpperCase();
              setUserInitial(initial);
            }
            // Fallback to username if available
            else if (userData.username) {
              const initial = userData.username.charAt(0).toUpperCase();
              setUserInitial(initial);
            }
          }
        }
      } catch (error) {
        console.error('Error retrieving user data:', error);
      }
    };
    
    getUserData();
  }, []);
  
  // Handle clicking outside to close dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      const userDropdown = document.querySelector('.dashboard-user-controls');
      if (userDropdown && !userDropdown.contains(event.target) && dropdownOpen) {
        setDropdownOpen(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [dropdownOpen]);

  // Fetch transactions function - Define this first so it can be used in setMockData
  const fetchTransactions = useCallback(async (address) => {
    if (!address) {
      console.error("Missing address for transaction fetch");
      return;
    }
    
    try {
      console.log(`Fetching transactions for: ${address}`);
      const txList = await TransactionService.getTransactions(address);
      console.log(`Found ${txList.length} transactions`);
      
      if (txList.length > 0) {
        setTransactions(txList);
        
        // Update transaction stats based on fetched transactions
        let sent = 0;
        let received = 0;
        let totalFees = 0;
        
        txList.forEach(tx => {
          const txValue = parseFloat(TransactionService.weiToEth(tx.value));
          
          if (tx.type === 'Transfer') {
            sent += txValue;
          } else if (tx.type === 'Receive') {
            received += txValue;
          }
          
          const gasFee = parseFloat(TransactionService.calculateGasFee(tx.gas, tx.gasPrice));
          totalFees += gasFee;
        });
        
        // Update transaction stats
        setTransactionStats({
          sent: sent.toFixed(4),
          received: received.toFixed(4),
          totalFees: totalFees.toFixed(6),
          avgValue: txList.length > 0 ? ((sent + received) / txList.length).toFixed(4) : '0'
        });
        
        // Update total gas used
        setTotalGasUsed(totalFees);
      } else {
        console.log("No transactions found");
        setTransactions([]);
      }
    } catch (error) {
      console.error("Error fetching transactions:", error);
    }
  }, []);

  // Set mock data function - remove mock data for spending categories
  const setMockData = useCallback(() => {
    const mockAddr = '0x742d35Cc6634C0532925a3b844Bc454e4438f44e';
    setAccount(mockAddr);
    setEthBalance("1.2345"); 
    setGasPrice("20.00");
    setNetworkId("1337");
    setNetworkName("Ganache Local");
    fetchTransactions(mockAddr);
    setPendingTransactions(Math.floor(Math.random() * 5));
    const randomGasUsed = parseFloat((Math.random() * 0.01).toFixed(4));
    setTotalGasUsed(randomGasUsed);
    setBlockNumber(12345);
    
    // Mock price and market data
    setEthPrice(2842.15);
    setEthPriceChange(3.27);
    setMarketCap(318.45);
    setVolume24h(12.75);
    
    // Mock transaction stats
    setTransactionStats({
      sent: 0.07,
      received: 0.95,
      totalFees: randomGasUsed,
      avgValue: 0.12
    });
    
    // Update DeFi portfolio values based on ETH price
    setDefiPortfolio(prevState => prevState.map(item => ({
      ...item,
      value: (item.amount * 2842.15).toFixed(2)
    })));
    
    console.log("Mock data loaded successfully");
  }, [fetchTransactions]);

  // Define weiToEth with useCallback
  const weiToEth = useCallback((wei) => {
    if (!web3 || !wei) return "0";
    return web3.utils.fromWei(wei.toString(), 'ether');
  }, [web3]);

  // Define fetchEthPriceData with useCallback
  const fetchEthPriceData = useCallback(async () => {
    try {
      // In a real app, you would use an API like CoinGecko or CryptoCompare
      // For now, we'll mock the data for demonstration
      if (connectionStatus === 'Connected') {
        // Mock data for now
        setEthPrice(2842.15);
        setEthPriceChange(3.27);
        setMarketCap(318.45);
        setVolume24h(12.75);
        
        // Update DeFi portfolio values based on ETH price
        setDefiPortfolio(prevState => prevState.map(item => ({
          ...item,
          value: (item.amount * 2842.15).toFixed(2)
        })));
      }
    } catch (error) {
      console.error("Error fetching ETH price data:", error);
    }
  }, [connectionStatus]);

  // Initialize Web3 
  useEffect(() => {
    const initializeWeb3 = async () => {
      try {
        console.log('Initializing Web3 and blockchain connection...');
        setLoading(true);
        setDebugMessage("Connecting to Ganache...");
        
        // Initialize the TransactionService first
        const serviceInitialized = await TransactionService.init();
        if (!serviceInitialized) {
          console.error('Failed to initialize TransactionService');
          setError('Could not connect to Ganache. Is it running?');
          setConnectionAttempts(prev => prev + 1); // Increment connection attempts
          setLoading(false);
          return;
        }
        
        // Use the same Web3 instance from TransactionService
        if (TransactionService.web3) {
          setWeb3(TransactionService.web3);
          console.log('Using TransactionService Web3 instance');
          
          try {
            // Get user's account
            const userAccount = await TransactionService.getDefaultAccount();
            
            if (!userAccount) {
              setError('No account available');
              setConnectionAttempts(prev => prev + 1); // Increment connection attempts
              setLoading(false);
              return;
            }
            
            console.log('Using account:', userAccount);
            setAccount(userAccount);
            
            // Get account balance
            try {
              const balance = await TransactionService.getBalance(userAccount);
              setEthBalance(balance);
          
          // Get network info
              const netId = await TransactionService.web3.eth.net.getId();
          setNetworkId(netId.toString());
          
          let network = 'Unknown';
          if (netId === 5777 || netId === 1337) {
            network = 'Ganache Local';
          }
          setNetworkName(network);
          
              // Get current block number
              const blockNumber = await TransactionService.web3.eth.getBlockNumber();
              setBlockNumber(blockNumber);
              
              // Get gas price
              const gasPrice = await TransactionService.web3.eth.getGasPrice();
              const gasPriceGwei = TransactionService.web3.utils.fromWei(gasPrice, 'gwei');
          setGasPrice(parseFloat(gasPriceGwei).toFixed(2));
          
              // Set connection status
              setConnectionStatus('Connected');
              
              // Fetch transactions
              fetchTransactions(userAccount);
              
              // Mock price data for now
              setEthPrice(2842.15);
              setEthPriceChange(3.27);
            } catch (balanceError) {
              console.error('Error fetching balance:', balanceError);
              setEthBalance('0');
              setConnectionAttempts(prev => prev + 1); // Increment connection attempts
            }
          } catch (accountsError) {
            console.error('Error fetching account:', accountsError);
            setError('Error fetching account');
            setConnectionAttempts(prev => prev + 1); // Increment connection attempts
          }
          } else {
          console.error('Web3 not initialized in TransactionService');
          setError('Web3 not initialized');
          setConnectionAttempts(prev => prev + 1); // Increment connection attempts
          }
      } catch (error) {
        console.error('Error initializing Web3:', error);
        setError(`Error connecting to Ganache: ${error.message}`);
        setConnectionAttempts(prev => prev + 1); // Increment connection attempts
        } finally {
          setLoading(false);
      }
    };
    
    initializeWeb3();
    
    // Set up polling for transactions
    const interval = setInterval(() => {
      if (account && connectionStatus === 'Connected') {
        fetchTransactions(account);
      }
    }, 5000);
    
    return () => clearInterval(interval);
  }, [account, connectionStatus, fetchTransactions]);

  // Add useEffect to fetch price data
  useEffect(() => {
    // Fetch price data when component mounts and then every 60 seconds
    fetchEthPriceData();
    
    const priceInterval = setInterval(() => {
      fetchEthPriceData();
    }, 60000); // Every minute
    
    return () => {
      clearInterval(priceInterval);
    };
  }, [fetchEthPriceData]); // Include fetchEthPriceData in the dependency array

  // Update spending by category when transactions or gas fees change
  useEffect(() => {
    // Calculate total sent amount from transactions
    let transferAmount = 0;
    let nftAmount = 0;
    let smartContractAmount = 0;
    
    if (transactions.length > 0) {
      transactions.forEach(tx => {
        try {
          // Only count outgoing transactions for categorization
          if (tx.from && account && tx.from.toLowerCase() === account.toLowerCase()) {
            const value = parseFloat(weiToEth(tx.value) || '0');
            
            // Categorize transactions based on their properties
            if (tx.input && tx.input !== '0x') {
              // This is a contract interaction
              if (tx.input.includes('0xa9059cbb') || tx.input.includes('0x23b872dd')) {
                // Common ERC20 transfer methods - categorize as transfers
                transferAmount += isNaN(value) ? 0 : value;
              } else if (tx.input.includes('0x42842e0e') || tx.input.includes('0x23b872dd')) {
                // Common NFT transfer methods - categorize as NFTs
                nftAmount += isNaN(value) ? 0 : value;
              } else {
                // Other contract interactions
                smartContractAmount += isNaN(value) ? 0 : value;
              }
            } else {
              // Simple ETH transfers
              transferAmount += isNaN(value) ? 0 : value;
            }
          }
        } catch (error) {
          console.error("Error processing transaction for spending category:", error, tx);
          // Continue with next transaction
        }
      });
    }
    
    // Update spending categories
    setSpendingByCategory(prevCategories => {
      const updatedCategories = [...prevCategories];
      
      // Update Transfers category
      const transferIndex = updatedCategories.findIndex(cat => cat.category === 'Transfers');
      if (transferIndex !== -1) {
        updatedCategories[transferIndex].amount = parseFloat(transferAmount.toFixed(4));
      }
      
      // Update DeFi category based on portfolio
      const defiIndex = updatedCategories.findIndex(cat => cat.category === 'DeFi');
      if (defiIndex !== -1) {
        const defiTotal = defiPortfolio.reduce((sum, item) => sum + parseFloat(item.amount || 0), 0);
        updatedCategories[defiIndex].amount = parseFloat(defiTotal.toFixed(4));
      }
      
      // Update NFTs category
      const nftIndex = updatedCategories.findIndex(cat => cat.category === 'NFTs');
      if (nftIndex !== -1) {
        updatedCategories[nftIndex].amount = parseFloat(nftAmount.toFixed(4));
      }
      
      // Update Smart Contracts category
      const scIndex = updatedCategories.findIndex(cat => cat.category === 'Smart Contracts');
      if (scIndex !== -1) {
        updatedCategories[scIndex].amount = parseFloat(smartContractAmount.toFixed(4));
      }
      
      // Update Gas Fees category
      const gasIndex = updatedCategories.findIndex(cat => cat.category === 'Gas Fees');
      if (gasIndex !== -1) {
        updatedCategories[gasIndex].amount = parseFloat(totalGasUsed || 0);
      }
      
      return updatedCategories;
    });
  }, [transactions, totalGasUsed, account, defiPortfolio, weiToEth]);

  // Handle retry connection
  const handleRetryConnection = () => {
    setLoading(true);
    setError(null);
    setDebugMessage("Retrying connection...");
    window.location.reload();
  };

  // Handle show anyway
  const handleShowAnyway = useCallback(() => {
    console.log("User clicked 'Show Dashboard Anyway'");
    setLoading(false);
    setError(null);
    setDebugMessage("Showing dashboard in offline mode");
    
    // Set mock data directly
    setMockData();
  }, [setMockData]);

  // Add a useEffect to handle scroll behavior
  useEffect(() => {
    // Force enabling scroll
    document.body.style.overflow = 'auto';
    document.documentElement.style.overflow = 'auto';
    
    // Create a scroll event listener to debug scroll behavior
    const handleScroll = () => {
      console.log('Scrolling detected');
    };
    
    window.addEventListener('scroll', handleScroll);
    
    // Clean up
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []); // Only run once on component mount

  // Helper function to format addresses
  const formatAddress = useCallback((address) => {
    return formatAddressUtil(address);
  }, []);

  // Helper function to shorten addresses for display
  const shortenAddress = useCallback((address) => {
    if (!address) return 'Unknown';
    return `${address.substring(0, 6)}...${address.substring(address.length - 4)}`;
  }, []);

  // Function to update wallet balance in the database
  const updateWalletBalance = useCallback(async (address, balance) => {
    try {
      const userString = localStorage.getItem('user');
      if (!userString) return;
      
      let user;
      try {
        user = JSON.parse(userString);
      } catch (error) {
        console.error("Error parsing user data:", error);
        return;
      }
      
      if (!user || !user.id) return;
      
      const response = await fetch('http://localhost/wepay-crypto/server/api/wallet/update_balance.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          user_id: user.id,
          wallet_address: address,
          balance: balance
        }),
      });
      
      const data = await response.json();
      if (data.success) {
        console.log("Wallet balance updated in database");
        
        // Update user data in localStorage
        user.wallet_balance = balance;
        localStorage.setItem('user', JSON.stringify(user));
      }
    } catch (err) {
      console.error("Error updating wallet balance:", err);
    }
  }, []);

  // Function to send ETH transaction
  const sendTransaction = useCallback(async () => {
    try {
      if (!account) {
        setTransactionError("Account not available");
        return;
      }
      
      if (!sendAmount || isNaN(parseFloat(sendAmount)) || parseFloat(sendAmount) <= 0) {
        setTransactionError("Please enter a valid amount");
        return;
      }
      
      if (!TransactionService.web3.utils.isAddress(recipientAddress)) {
        setTransactionError("Please enter a valid Ethereum address");
        return;
      }
      
      setTransactionStatus("pending");
      setTransactionError(null);
      
      // Send transaction using the TransactionService
      const receipt = await TransactionService.sendTransaction(recipientAddress, sendAmount, account);
      
      console.log("Transaction sent:", receipt);
      setTransactionHash(receipt.transactionHash);
      setTransactionStatus("confirmed");
      
      // Update balance
      const newBalance = await TransactionService.getBalance(account);
      setEthBalance(newBalance);
      
      // Update in database if needed
      updateWalletBalance(account, newBalance);
      
        // Refresh transactions
      fetchTransactions(account);
      
      // Reset form
      setSendAmount('');
      setRecipientAddress('');
      
      // Close form after successful transaction
      setTimeout(() => {
        setSendFormOpen(false);
        setTransactionStatus(null);
      }, 3000);
      
    } catch (error) {
      console.error("Transaction error:", error);
      setTransactionStatus("failed");
      setTransactionError(error.message);
    }
  }, [account, sendAmount, recipientAddress, fetchTransactions, updateWalletBalance]);

  // Helper function to render just the transaction content without the View All link
  const renderRecentTransactionsContent = useCallback(() => {
    if (loading) {
      return (
        <div className="dashboard-card-body loading-state">
          <div className="loading-spinner"></div>
          <div className="loading-text">Loading transactions...</div>
        </div>
      );
    }

    if (transactions.length === 0) {
      return (
        <div className="dashboard-card-body empty-state">
          <div className="empty-icon">📊</div>
          <div className="empty-text">No transactions found</div>
          <div className="empty-subtext">Your transaction history will appear here</div>
        </div>
      );
    }

    return (
      <div className="dashboard-card-body">
        <div className="transaction-list">
          {transactions.slice(0, 3).map((tx) => {
            try {
              const isOutgoing = tx.type === 'Transfer';
              const direction = isOutgoing ? 'outgoing' : 'incoming';
              const ethValue = TransactionService.weiToEth(tx.value);
              
              return (
                <div 
                  key={tx.id} 
                  className={`transaction-item ${direction}`}
                >
                  <div className="transaction-icon">
                    {isOutgoing ? '↑' : '↓'}
                  </div>
                  <div className="transaction-details">
                    <div className="transaction-type">
                      {isOutgoing ? 'Sent to' : 'Received from'}
                    </div>
                    <div className="transaction-address">
                      {isOutgoing 
                        ? formatAddress(tx.to)
                        : formatAddress(tx.from)
                      }
                    </div>
                  </div>
                  <div className="transaction-amount">
                    <div className={`amount ${isOutgoing ? 'negative' : 'positive'}`}>
                      {isOutgoing ? '-' : '+'}{ethValue} ETH
                    </div>
                    <div className="transaction-date">
                      {new Date(Number(tx.timestamp)).toLocaleString()}
                    </div>
                  </div>
                </div>
              );
            } catch (error) {
              console.error("Error rendering transaction:", error, tx);
              return null; // Skip this transaction if there's an error
            }
          }).filter(Boolean)} {/* Filter out null values */}
        </div>
      </div>
    );
  }, [loading, transactions, formatAddress]);

  // eslint-disable-next-line no-unused-vars
  const renderRecentTransactions = useCallback(() => {
    if (loading) {
      return (
        <div className="dashboard-card-body loading-state">
          <div className="loading-spinner"></div>
          <div className="loading-text">Loading transactions...</div>
        </div>
      );
    }

    if (transactions.length === 0) {
      return (
        <div className="dashboard-card-body empty-state">
          <div className="empty-icon">📊</div>
          <div className="empty-text">No transactions found</div>
          <div className="empty-subtext">Your transaction history will appear here</div>
        </div>
      );
    }

    return (
      <div className="dashboard-card-body">
        <div className="transaction-list">
          {transactions.slice(0, 3).map((tx) => {
            try {
              const isOutgoing = tx.type === 'Transfer';
              const direction = isOutgoing ? 'outgoing' : 'incoming';
              const ethValue = TransactionService.weiToEth(tx.value);
              
              return (
                <div 
                  key={tx.id} 
                  className={`transaction-item ${direction}`}
                >
                  <div className="transaction-icon">
                    {isOutgoing ? '↑' : '↓'}
                  </div>
                  <div className="transaction-details">
                    <div className="transaction-type">
                      {isOutgoing ? 'Sent to' : 'Received from'}
                    </div>
                    <div className="transaction-address">
                      {isOutgoing 
                        ? formatAddress(tx.to)
                        : formatAddress(tx.from)
                      }
                    </div>
                  </div>
                  <div className="transaction-amount">
                    <div className={`amount ${isOutgoing ? 'negative' : 'positive'}`}>
                      {isOutgoing ? '-' : '+'}{ethValue} ETH
                    </div>
                    <div className="transaction-date">
                      {new Date(Number(tx.timestamp)).toLocaleString()}
                    </div>
                  </div>
                </div>
              );
    } catch (error) {
              console.error("Error rendering transaction:", error, tx);
              return null; // Skip this transaction if there's an error
            }
          }).filter(Boolean)}
        </div>
      </div>
    );
  }, [loading, transactions, formatAddress]);

  // Enhance the spending categories section
  const renderSpendingCategories = () => {
    // Calculate total spending for percentage calculation
    const totalSpending = spendingByCategory.reduce((sum, category) => sum + category.amount, 0);
    
    // Filter out categories with zero amounts
    const activeCategories = spendingByCategory.filter(category => category.amount > 0);
    
    if (activeCategories.length === 0) {
      return (
        <div className="empty-state">
          <div className="empty-icon">📊</div>
          <div className="empty-text">No spending data yet</div>
          <div className="empty-subtext">
            Make transactions to see your spending categories
          </div>
        </div>
      );
    }
    
    return (
      <div className="categories-grid">
        {activeCategories.map((category, index) => {
          const percentage = totalSpending > 0 
            ? (category.amount / totalSpending * 100).toFixed(1) 
            : 0;
            
          return (
            <div className="category-item" key={index}>
              <div className="category-header" style={{ backgroundColor: category.color }}>
                <span className="category-name">{category.category}</span>
              </div>
              <div className="category-amount">
                <span>{category.amount.toFixed(4)} ETH</span>
                <span className="category-usd">${(category.amount * ethPrice).toFixed(2)}</span>
              </div>
              <div className="category-bar">
                <div 
                  className="category-bar-fill" 
                  style={{ 
                    width: `${percentage}%`, 
                    backgroundColor: category.color 
                  }}
                ></div>
              </div>
              <div className="category-percentage">
                {percentage}% of total spend
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  // Show a loading state
  if (loading) {
    return (
      <div className="dashboard loading-state dark-mode" style={{ height: '100vh', overflowY: 'auto' }}>
        <div className="loading-indicator">
          <p>Connecting to Ganache blockchain...</p>
          <div className="spinner"></div>
          <p className="loading-tip">Make sure Ganache is running on http://127.0.0.1:7545</p>
          <p className="debug-message">{debugMessage}</p>
          {connectionAttempts > 0 && (
            <div className="loading-actions">
              <button onClick={handleRetryConnection} className="retry-btn">
                Retry Connection
              </button>
              <button onClick={handleShowAnyway} className="show-anyway-btn">
                Show Dashboard Anyway
              </button>
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="dashboard dark-mode">
      {/* Dashboard header with title and profile icon */}
      <div className="dashboard-header">
        <h1>Dashboard</h1>
        <div className="user-profile" onClick={() => setDropdownOpen(!dropdownOpen)}>
          <div className="profile-icon">
            {userInitial || "P"}
          </div>
          {dropdownOpen && (
            <div className="user-dropdown">
              <a href="/profile">Profile</a>
              <a href="/settings">Settings</a>
              <button onClick={() => {
                localStorage.removeItem('user');
                localStorage.removeItem('token');
                window.location.href = '/login';
              }}>Logout</button>
            </div>
          )}
        </div>
      </div>

        {/* Show error message if there is one */}
        {error && (
          <div className="error-message">
            <h3>Blockchain Connection Error</h3>
            <p>{error}</p>
            <p>Please make sure Ganache is running on http://127.0.0.1:7545</p>
            <button onClick={handleRetryConnection} className="retry-btn">
              Retry Connection
            </button>
          </div>
        )}
        
      <div className="dashboard-content">
        <div className="dashboard-grid">
          <div className="wallet-card">
            <h2>Your ETH Wallet</h2>
            <div className="eth-balance">{parseFloat(ethBalance).toFixed(4)} ETH</div>
            <div className="wallet-details">
              <div className="wallet-address">
                <span>Your Address:</span>
                <span className="address-text">{shortenAddress(account)}</span>
                <button className="copy-btn" onClick={() => navigator.clipboard.writeText(account)}>
                  Copy
                </button>
              </div>
              <div className="wallet-network">
                <span>Network:</span>
                <span className="network-badge">{networkName}</span>
              </div>
            </div>
            <div className="wallet-actions">
              <button className="action-btn" onClick={() => setSendFormOpen(true)}>Send ETH</button>
              <button className="action-btn" onClick={() => setReceiveFormOpen(true)}>Receive</button>
              <button className="action-btn">Swap</button>
            </div>
          </div>
          
          <div className="stats-card">
            <h2>Blockchain Activity</h2>
            <div className="stats-grid">
              <div className="stat-item">
                <div className="stat-icon incoming"></div>
                <div className="stat-data">
                  <div className="stat-value income">+0.95 ETH</div>
                  <div className="stat-label">Received</div>
                </div>
              </div>
              <div className="stat-item">
                <div className="stat-icon outgoing"></div>
                <div className="stat-data">
                  <div className="stat-value expense">-0.07 ETH</div>
                  <div className="stat-label">Sent</div>
                </div>
              </div>
              <div className="stat-item">
                <div className="stat-icon gas"></div>
                <div className="stat-data">
                  <div className="stat-value expense">{totalGasUsed} ETH</div>
                  <div className="stat-label">Gas Fees</div>
                </div>
              </div>
              <div className="stat-item">
                <div className="stat-icon transaction"></div>
                <div className="stat-data">
                  <div className="stat-value">{transactions.length}</div>
                  <div className="stat-label">Transactions</div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="gas-tracker-card">
            <h2>Gas Tracker</h2>
            <div className="gas-data">
              <div className="gas-price-display">
                <span className="gas-price-value">{gasPrice}</span>
                <span className="gas-price-unit">Gwei</span>
              </div>
              <div className="gas-price-label">Current Gas Price</div>
            </div>
            <div className="gas-estimate">
              <div className="gas-row">
                <span>Regular Transfer:</span>
                <span>{(parseFloat(gasPrice) * 21000 / 1000000000).toFixed(6)} ETH</span>
              </div>
              <div className="gas-row">
                <span>Token Transfer:</span>
                <span>{(parseFloat(gasPrice) * 65000 / 1000000000).toFixed(6)} ETH</span>
              </div>
              <div className="gas-row">
                <span>Smart Contract:</span>
                <span>{(parseFloat(gasPrice) * 200000 / 1000000000).toFixed(6)} ETH</span>
              </div>
            </div>
          </div>
          
          <div className="network-card">
            <h2>Network Status</h2>
            <div className="network-data">
              <div className="network-row">
                <span>Current Block:</span>
                <span>{blockNumber}</span>
              </div>
              <div className="network-row">
                <span>Network ID:</span>
                <span>{networkId}</span>
              </div>
              <div className="network-row">
                <span>Pending Transactions:</span>
                <span>{pendingTransactions}</span>
              </div>
              <div className="network-row">
                <span>Connection:</span>
                <span className={connectionStatus === 'Connected' ? 'status-connected' : 'status-error'}>
                  {connectionStatus}
                </span>
              </div>
            </div>
          </div>
          
          {/* ETH Price Card */}
          <div className="price-card">
            <h2>ETH Price</h2>
            <div className="price-data">
              <div className="price-main">
                <span className="price-value">${ethPrice.toLocaleString()}</span>
                <span className={`price-change ${ethPriceChange >= 0 ? 'positive' : 'negative'}`}>
                  {ethPriceChange >= 0 ? '+' : ''}{ethPriceChange}%
                </span>
              </div>
              <div className="price-stats">
                <div className="price-row">
                  <span>Market Cap:</span>
                  <span>${marketCap.toLocaleString()} B</span>
                </div>
                <div className="price-row">
                  <span>24h Volume:</span>
                  <span>${volume24h.toLocaleString()} B</span>
                </div>
                <div className="price-row">
                  <span>Your Holdings:</span>
                  <span>${(parseFloat(ethBalance) * ethPrice).toLocaleString()}</span>
                </div>
              </div>
            </div>
          </div>
          
          {/* Transaction Stats Card */}
          <div className="tx-stats-card">
            <h2>Your Stats</h2>
            <div className="tx-stats-data">
              <div className="tx-stats-grid">
                <div className="tx-stat-item">
                  <div className="tx-stat-label">Sent</div>
                  <div className="tx-stat-value expense">{transactionStats.sent} ETH</div>
                  <div className="tx-stat-usd">${(parseFloat(transactionStats.sent) * ethPrice).toFixed(2)}</div>
                </div>
                <div className="tx-stat-item">
                  <div className="tx-stat-label">Received</div>
                  <div className="tx-stat-value income">{transactionStats.received} ETH</div>
                  <div className="tx-stat-usd">${(parseFloat(transactionStats.received) * ethPrice).toFixed(2)}</div>
                </div>
                <div className="tx-stat-item">
                  <div className="tx-stat-label">Gas Fees</div>
                  <div className="tx-stat-value expense">{transactionStats.totalFees} ETH</div>
                  <div className="tx-stat-usd">${(parseFloat(transactionStats.totalFees) * ethPrice).toFixed(2)}</div>
                </div>
                <div className="tx-stat-item">
                  <div className="tx-stat-label">Avg. Transaction</div>
                  <div className="tx-stat-value">{transactionStats.avgValue} ETH</div>
                  <div className="tx-stat-usd">${(parseFloat(transactionStats.avgValue) * ethPrice).toFixed(2)}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="transactions-section">
          <h2>Recent Transactions</h2>
          {transactions.length > 5 && (
            <a href="/transactions" className="view-all-btn">View all</a>
          )}
          {renderRecentTransactionsContent()}
        </div>
        
        <div className="defi-portfolio-section">
          <h2>DeFi Portfolio</h2>
          <button className="view-all-btn">Manage Assets</button>
          <div className="defi-card-grid">
            {defiPortfolio.map((asset, index) => (
              <div className="defi-card" key={index}>
                <div className="defi-card-header">
                  <h3 className="protocol-name">{asset.protocol}</h3>
                  <div className="apy-badge">APY: {asset.apy}%</div>
                </div>
                <div className="defi-card-body">
                  <div className="asset-amount">{asset.amount} ETH</div>
                  <div className="asset-value">${asset.value}</div>
                  <div className="asset-growth">
                    <span className="growth-label">Earned:</span>
                    <span className="growth-value positive">+{(asset.amount * asset.apy / 365).toFixed(6)} ETH / day</span>
                  </div>
                </div>
                <div className="defi-card-actions">
                  <button className="defi-action-btn deposit">Deposit</button>
                  <button className="defi-action-btn withdraw">Withdraw</button>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Update spending categories section */}
        <div className="spending-categories-section">
          <h2>Spending Categories</h2>
          <div className="categories-card">
            {renderSpendingCategories()}
          </div>
        </div>
      </div>
      
      {/* Send ETH Transaction Modal */}
      {sendFormOpen && (
        <div className="modal-overlay">
          <div className="transaction-modal">
            <div className="modal-header">
              <h3>Send ETH</h3>
              <button className="close-btn" onClick={() => {
                setSendFormOpen(false);
                setTransactionStatus(null);
                setTransactionError(null);
              }}>×</button>
            </div>
            
            <div className="modal-body">
              {transactionStatus === "confirmed" ? (
                <div className="transaction-success">
                  <div className="success-icon">✓</div>
                  <h4>Transaction Successful!</h4>
                  <p>Transaction Hash: {shortenAddress(transactionHash)}</p>
                  <button className="view-tx-btn" onClick={() => window.open(`https://etherscan.io/tx/${transactionHash}`, '_blank')}>
                    View on Etherscan
                  </button>
                </div>
              ) : (
                <form onSubmit={(e) => {
                  e.preventDefault();
                  sendTransaction();
                }}>
                  <div className="form-group">
                    <label>Recipient Address</label>
                    <input
                      type="text"
                      placeholder="0x..."
                      value={recipientAddress}
                      onChange={(e) => setRecipientAddress(e.target.value)}
                      disabled={transactionStatus === "pending"}
                    />
                  </div>
                  
                  <div className="form-group">
                    <label>Amount (ETH)</label>
                    <input
                      type="number"
                      step="0.0001"
                      min="0"
                      placeholder="0.0"
                      value={sendAmount}
                      onChange={(e) => setSendAmount(e.target.value)}
                      disabled={transactionStatus === "pending"}
                    />
                    <div className="balance-display">
                      <span>Balance: {parseFloat(ethBalance).toFixed(4)} ETH</span>
                      <button 
                        type="button" 
                        onClick={() => setSendAmount(parseFloat(ethBalance).toFixed(4))}
                        disabled={transactionStatus === "pending"}
                      >
                        MAX
                      </button>
                    </div>
                  </div>
                  
                  <div className="form-group">
                    <label>Estimated Gas Fee</label>
                    <div className="gas-estimate-display">
                      {gasPrice ? `~${(parseFloat(gasPrice) * 21000 / 1000000000).toFixed(6)} ETH` : 'Calculating...'}
                    </div>
                  </div>
                  
                  {transactionError && (
                    <div className="transaction-error">
                      {transactionError}
                    </div>
                  )}
                  
                  <div className="form-actions">
                    <button
                      type="button"
                      className="cancel-btn"
                      onClick={() => setSendFormOpen(false)}
                      disabled={transactionStatus === "pending"}
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="send-btn"
                      disabled={transactionStatus === "pending"}
                    >
                      {transactionStatus === "pending" ? (
                        <><span className="spinner-sm"></span> Sending...</>
                      ) : (
                        'Send ETH'
                      )}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      )}
      
      {/* Receive ETH Modal */}
      {receiveFormOpen && (
        <div className="modal-overlay">
          <div className="transaction-modal">
            <div className="modal-header">
              <h3>Receive ETH</h3>
              <button className="close-btn" onClick={() => setReceiveFormOpen(false)}>×</button>
            </div>
            
            <div className="modal-body">
              <div className="receive-address">
                <p>Your ETH Address:</p>
                <div className="address-display">
                  {account}
                </div>
                <button 
                  className="copy-address-btn"
                  onClick={() => {
                    navigator.clipboard.writeText(account);
                    alert('Address copied to clipboard!');
                  }}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                  </svg>
                  Copy Address
                </button>
              </div>
              
              <div className="qr-code-container">
                <p>Scan QR Code:</p>
                <QRCodeSVG value={account} size={200} level="H" />
              </div>
              
              <div className="receive-note">
                <p>Send only ETH to this address. Sending other assets may result in permanent loss.</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
