// Dashboard.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Web3 from 'web3';
import '../styles/Dashboard.css';

const Dashboard = () => {
  const navigate = useNavigate();
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

  // Function definitions - this is where setMockData should go
  const setMockData = () => {
    const mockAddr = '0x742d35Cc6634C0532925a3b844Bc454e4438f44e';
    setAccount(mockAddr);
    setEthBalance("1.2345"); 
    setGasPrice("20.00");
    setNetworkId("1337");
    setNetworkName("Ganache Local");
    fetchTransactions(mockAddr, web3);
    setPendingTransactions(Math.floor(Math.random() * 5));
    setTotalGasUsed(parseFloat((Math.random() * 0.01).toFixed(4)));
    setBlockNumber(12345);
    console.log("Mock data loaded successfully");
  };

  useEffect(() => {
    // Check if user is logged in
    const userString = localStorage.getItem('user');
    const token = localStorage.getItem('token');
    
    console.log("Dashboard init - localStorage check:", { 
      userExists: !!userString, 
      tokenExists: !!token 
    });
    
    if (!userString || !token) {
      console.log("Missing user or token, redirecting to login");
      navigate('/login');
      return;
    }

    // Parse user data safely with error handling
    let userData;
    try {
      userData = JSON.parse(userString);
      if (!userData) {
        throw new Error("User data is null after parsing");
      }
    } catch (error) {
      console.error("Error parsing user data from localStorage:", error);
      localStorage.removeItem('user'); // Clear invalid data
      localStorage.removeItem('token');
      navigate('/login');
      return;
    }
    
    // Initialize Web3 with Ganache
    const initWeb3 = async () => {
      try {
        console.log("Attempting to connect to Ganache blockchain...");
        setLoading(true);
        setError(null);
        setConnectionAttempts(prev => prev + 1);
        setDebugMessage("Connecting to Ganache...");
        
        // Ganache URL
        const ganacheUrl = 'http://127.0.0.1:7545';
        console.log(`Connecting to Ganache at ${ganacheUrl}`);
        
        // Create Web3 instance
        const web3Instance = new Web3(ganacheUrl);
        setWeb3(web3Instance);
        
        // Set up connection timeout
        let connectionTimeout = setTimeout(() => {
          console.log("Connection timeout - showing user's wallet data");
          setLoading(false);
          setDebugMessage("Connection timed out, showing your wallet data");
          setConnectionStatus('Disconnected');
          
          // Use user's wallet from registration instead of random mock data
          if (userData.wallet_address) {
            setAccount(userData.wallet_address);
            setEthBalance(userData.wallet_balance || "0.0000");
            fetchTransactions(userData.wallet_address, web3Instance);
          } else {
            // Fallback if no wallet in user data
            setMockData();
          }
        }, 5000);
        
        try {
          // Quick check that connection works
          const blockNumber = await web3Instance.eth.getBlockNumber();
          
          // Clear the timeout
          clearTimeout(connectionTimeout);
          
          setBlockNumber(blockNumber);
          setConnectionStatus('Connected');
          setDebugMessage("Connected to Ganache successfully");
          
          // Use the user's wallet address instead of getting accounts
          if (userData.wallet_address) {
            setAccount(userData.wallet_address);
            
            // Get real-time balance for the user's address
            try {
              const balanceWei = await web3Instance.eth.getBalance(userData.wallet_address);
              const balanceEth = web3Instance.utils.fromWei(balanceWei, 'ether');
              setEthBalance(parseFloat(balanceEth).toFixed(4));
              
              // Update in database via API call
              updateWalletBalance(userData.wallet_address, balanceEth);
              
              // Get user's transactions
              fetchTransactions(userData.wallet_address, web3Instance);
            } catch (balanceError) {
              console.error("Error getting balance:", balanceError);
              setEthBalance(userData.wallet_balance || "0.0000");
            }
          } else {
            console.warn("User has no wallet address assigned");
            setMockData();
          }
          
          // Get network info
          const netId = await web3Instance.eth.net.getId();
          setNetworkId(netId.toString());
          
          let network = 'Unknown';
          if (netId === 5777 || netId === 1337) {
            network = 'Ganache Local';
          } else if (netId === 1) {
            network = 'Ethereum Mainnet';
          }
          setNetworkName(network);
          
          const gasPriceWei = await web3Instance.eth.getGasPrice();
          const gasPriceGwei = web3Instance.utils.fromWei(gasPriceWei, 'gwei');
          setGasPrice(parseFloat(gasPriceGwei).toFixed(2));
          
          // Mock data for transaction counts, etc.
          setPendingTransactions(Math.floor(Math.random() * 3));
          setTotalGasUsed(parseFloat((Math.random() * 0.005).toFixed(4)));
        } catch (error) {
          console.error("Error connecting to web3:", error);
          clearTimeout(connectionTimeout);
          setConnectionStatus('Disconnected');
          setError("Could not connect to blockchain: " + error.message);
          
          // Use user's wallet data from registration
          if (userData.wallet_address) {
            setAccount(userData.wallet_address);
            setEthBalance(userData.wallet_balance || "0.0000");
          } else {
            setMockData();
          }
        } finally {
          setLoading(false);
        }
      } catch (error) {
        console.error("Critical failure:", error);
        setLoading(false);
        setError("Critical error: " + error.message);
        setDebugMessage("Critical failure in connection");
        
        // Still try to use user data
        if (userData.wallet_address) {
          setAccount(userData.wallet_address);
          setEthBalance(userData.wallet_balance || "0.0000");
        } else {
          setMockData();
        }
      }
    };
    
    // Execute connection logic
    initWeb3();
    
    // Setup a cleanup function
    return () => {
      // Close any open connections if needed
      if (web3 && web3.currentProvider && web3.currentProvider.disconnect) {
        web3.currentProvider.disconnect();
      }
    };
    // eslint-disable-next-line
  }, [navigate]);

  // Add function to update wallet balance in the database
  const updateWalletBalance = async (address, balance) => {
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
  };

  // Modify fetchTransactions to filter for only the user's transactions
  const fetchTransactions = async (address, web3Instance) => {
    console.log("Fetching transactions for address:", address);
    try {
      // In a real app, you would get transactions from the blockchain for this specific address
      // For now, we'll simulate this with filtered mock data
      
      // First, check if we can get real transactions
      if (web3Instance) {
        try {
          // Try to get the last few blocks to check for transactions
          const latestBlock = await web3Instance.eth.getBlockNumber();
          const realTransactions = [];
          
          // Look through the last 50 blocks for transactions involving this address
          for (let i = 0; i < 50; i++) {
            if (latestBlock - i < 0) break;
            
            const block = await web3Instance.eth.getBlock(latestBlock - i, true);
            if (block && block.transactions) {
              block.transactions.forEach(tx => {
                if (tx.from === address || tx.to === address) {
                  realTransactions.push({
                    id: tx.hash,
                    from: tx.from,
                    to: tx.to,
                    value: tx.value,
                    date: new Date().toISOString().slice(0, 10), // Just today's date
                    gas: tx.gas,
                    gasPrice: tx.gasPrice,
                    status: 'confirmed',
                    confirmations: i,
                    type: tx.from === address ? 'Transfer' : 'Receive'
                  });
                }
              });
            }
          }
          
          if (realTransactions.length > 0) {
            console.log("Found real transactions:", realTransactions.length);
            setTransactions(realTransactions);
            return;
          }
        } catch (realTxError) {
          console.error("Error getting real transactions:", realTxError);
          // Fall back to mock data if we can't get real transactions
        }
      }
      
      // Mock data filtering - only show transactions related to this address
      const mockTxs = [
        {
          id: '0x3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b3c4d5e6f7a8b9c0d1e2f3a4b',
          from: address,
          to: '0x71C7656EC7ab88b098defB751B7401B5f6d8976F',
          value: web3Instance ? web3Instance.utils.toWei('0.05', 'ether') : '50000000000000000',
          date: '2025-03-18',
          gas: '21000',
          gasPrice: web3Instance ? web3Instance.utils.toWei('20', 'gwei') : '20000000000',
          status: 'confirmed',
          confirmations: 12,
          type: 'Transfer'
        },
        {
          id: '0x1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b',
          from: '0x2932b7A2355D6fecc4b5c0B6BD44cC31df247a2e',
          to: address,
          value: web3Instance ? web3Instance.utils.toWei('0.8', 'ether') : '800000000000000000',
          date: '2025-03-16',
          gas: '21000',
          gasPrice: web3Instance ? web3Instance.utils.toWei('18', 'gwei') : '18000000000',
          status: 'confirmed',
          confirmations: 24,
          type: 'Receive'
        },
        // More mock transactions...
      ];

      setTransactions(mockTxs);
      console.log("Mock transactions loaded for address:", address);
    } catch (err) {
      console.error("Error fetching transactions:", err);
      setTransactions([]);
    }
  };

  // Helper function to shorten addresses for display
  const shortenAddress = (address) => {
    if (!address) return 'Unknown';
    return `${address.substring(0, 6)}...${address.substring(address.length - 4)}`;
  };

  // Helper function to convert wei to ETH for display
  const weiToEth = (wei) => {
    if (!web3 || !wei) return '0';
    try {
      return parseFloat(web3.utils.fromWei(wei, 'ether')).toFixed(4);
    } catch (e) {
      console.error("Error converting wei to ETH:", e);
      // Fallback calculation if web3 isn't available
      return (parseFloat(wei) / 1e18).toFixed(4);
    }
  };

  // Calculate gas fee for a transaction
  const calculateGasFee = (gas, gasPrice) => {
    if (!web3 || !gas || !gasPrice) {
      // Fallback calculation if web3 isn't available
      return (parseFloat(gas) * parseFloat(gasPrice) / 1e18).toFixed(6);
    }
    
    try {
      // Handle possible BigNumber conversion issues
      let gasBN, gasPriceBN;
      try {
        gasBN = web3.utils.toBN(gas);
        gasPriceBN = web3.utils.toBN(gasPrice);
      } catch (bnError) {
        console.error("Error converting to BN:", bnError);
        // Fallback calculation
        return (parseFloat(gas) * parseFloat(gasPrice) / 1e18).toFixed(6);
      }
      
      const gasFeeWei = gasBN.mul(gasPriceBN);
      return parseFloat(web3.utils.fromWei(gasFeeWei, 'ether')).toFixed(6);
    } catch (e) {
      console.error("Error calculating gas fee:", e);
      return (parseFloat(gas) * parseFloat(gasPrice) / 1e18).toFixed(6);
    }
  };

  // Handle retry connection
  const handleRetryConnection = () => {
    setLoading(true);
    setError(null);
    setDebugMessage("Retrying connection...");
    window.location.reload();
  };

  // Handle show anyway - Fix #6: Simplified this function
  const handleShowAnyway = () => {
    console.log("User clicked 'Show Dashboard Anyway'");
    setLoading(false);
    setError(null);
    setDebugMessage("Showing dashboard in offline mode");
    
    // Set mock data directly
    setMockData();
  };

  // ETH activity by category data
  const spendingByCategory = [
    { category: 'Transfers', amount: 0.05, color: '#3498db' },
    { category: 'DeFi', amount: 0.02, color: '#2ecc71' },
    { category: 'NFTs', amount: 0, color: '#9b59b6' },
    { category: 'Smart Contracts', amount: 0, color: '#f1c40f' },
    { category: 'Gas Fees', amount: totalGasUsed, color: '#e74c3c' },
  ];

  // Render connection status or error for debugging
  const renderDebugInfo = () => {
    return (
      <div className="debug-info">
        <h3>Network Status</h3>
        <div className="debug-grid">
          <div className="debug-item">
            <span>Status:</span>
            <span className={connectionStatus === 'Connected' ? 'status-connected' : 'status-error'}>
              {connectionStatus}
            </span>
          </div>
          <div className="debug-item">
            <span>Network:</span>
            <span>{networkName || 'Unknown'} (ID: {networkId || 'Unknown'})</span>
          </div>
          <div className="debug-item">
            <span>Current Block:</span>
            <span>{blockNumber}</span>
          </div>
          <div className="debug-item">
            <span>Gas Price:</span>
            <span>{gasPrice} Gwei</span>
          </div>
          <div className="debug-item">
            <span>Connection Attempts:</span>
            <span>{connectionAttempts}</span>
          </div>
          <div className="debug-item">
            <span>Debug Message:</span>
            <span>{debugMessage}</span>
          </div>
        </div>
      </div>
    );
  };

  // Show a loading state
  if (loading) {
    return (
      <div className="dashboard loading-state">
        <h1>Ethereum Blockchain Dashboard</h1>
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

  const handleLogout = () => {
    console.log("Logging out...");
    
    // Clear authentication data from localStorage
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    
    // If you have any auth state in your app context, clear it too
    // This depends on how your app is structured
    // For example: setAuthState(false) or dispatch({ type: 'LOGOUT' })
    
    // Force reload the application to clear any in-memory state
    // and redirect to login page
    window.location.href = '/login';
  };

  return (
    <div className="dashboard">
      <h1>Ethereum Blockchain Dashboard</h1>
      
      {/* Debugging information */}
      {renderDebugInfo()}
      
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
      
      {/* Main dashboard content - always show now */}
      <div className="dashboard-content">
        <div className="dashboard-grid">
          <div className="wallet-card">
            <h2>Your ETH Wallet</h2>
            <div className="eth-balance">{ethBalance} ETH</div>
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
              <button className="action-btn">Send ETH</button>
              <button className="action-btn">Receive</button>
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
        </div>
        
        <div className="transactions-section">
          <div className="section-header">
            <h2>Recent Transactions</h2>
            <button className="view-all-btn">View All</button>
          </div>
          <div className="transaction-list">
            {transactions.length > 0 ? (
              transactions.map(transaction => (
                <div key={transaction.id} className="transaction-item">
                  <div className="transaction-icon">
                    <div className={`tx-icon ${transaction.from === account ? 'outgoing' : 'incoming'}`}></div>
                  </div>
                  <div className="transaction-details">
                    <div className="transaction-primary">
                      <div className="transaction-type">{transaction.type}</div>
                      <div className="transaction-amount">
                        <span className={transaction.from === account ? 'expense' : 'income'}>
                          {transaction.from === account ? '-' : '+'}
                          {weiToEth(transaction.value)} ETH
                        </span>
                      </div>
                    </div>
                    <div className="transaction-secondary">
                      <div className="transaction-addresses">
                        {transaction.from === account 
                          ? `To: ${shortenAddress(transaction.to)}` 
                          : `From: ${shortenAddress(transaction.from)}`}
                      </div>
                      <div className="transaction-gas">
                        Gas: {calculateGasFee(transaction.gas, transaction.gasPrice)} ETH
                      </div>
                    </div>
                    <div className="transaction-meta">
                      <div className="transaction-date">{transaction.date}</div>
                      <div className="transaction-confirmations">
                        {transaction.confirmations} confirmations
                      </div>
                      <div className="transaction-hash">
                        Tx: {shortenAddress(transaction.id)}
                      </div>
                    </div>
                  </div>
                  <div className="transaction-status">
                    <div className={`status-badge ${transaction.status}`}>
                      {transaction.status}
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="no-transactions">
                <p>No transactions found for this address</p>
              </div>
            )}
          </div>
        </div>
        
        <div className="analytics-section">
          <div className="section-header">
            <h2>ETH Activity Analysis</h2>
          </div>
          <div className="analytics-grid">
            <div className="category-card">
              <h3>Activity by Category</h3>
              <div className="placeholder-chart">
                <div className="chart-note">ETH Distribution Chart</div>
              </div>
              <div className="category-list">
                {spendingByCategory.map((item, index) => (
                  <div key={index} className="category-item">
                    <div className="category-color" style={{ backgroundColor: item.color }}></div>
                    <div className="category-name">{item.category}</div>
                    <div className="category-value">{item.amount} ETH</div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="token-card">
              <h3>ERC-20 Tokens</h3>
              <div className="token-list">
                <div className="token-item">
                  <div className="token-icon">DAI</div>
                  <div className="token-details">
                    <div className="token-name">Dai Stablecoin</div>
                    <div className="token-balance">0 DAI</div>
                  </div>
                </div>
                <div className="token-item">
                  <div className="token-icon">USDC</div>
                  <div className="token-details">
                    <div className="token-name">USD Coin</div>
                    <div className="token-balance">0 USDC</div>
                  </div>
                </div>
                <div className="token-item">
                  <div className="token-icon">LINK</div>
                  <div className="token-details">
                    <div className="token-name">Chainlink</div>
                    <div className="token-balance">0 LINK</div>
                  </div>
                </div>
              </div>
              <div className="token-actions">
                <button className="token-action-btn">Add Token</button>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <button onClick={handleLogout} className="logout-btn">
        Logout
      </button>
    </div>
  );
};

export default Dashboard;