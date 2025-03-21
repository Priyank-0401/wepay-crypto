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

  useEffect(() => {
    // Check if user is logged in
    const user = localStorage.getItem('user');
    const token = localStorage.getItem('token');
    
    console.log("Dashboard init - localStorage check:", { 
      userExists: !!user, 
      tokenExists: !!token 
    });
    
    if (!user || !token) {
      console.log("Missing user or token, redirecting to login");
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
        
        // Connect directly to Ganache with minimal timeout
        const ganacheUrl = 'http://127.0.0.1:7545';
        console.log(`Connecting to Ganache at ${ganacheUrl}`);
        
        // Create Web3 instance with minimal timeout settings
        const web3Instance = new Web3(new Web3.providers.HttpProvider(ganacheUrl, {
          timeout: 5000, // Reduced to 5 seconds
        }));
        
        // Store the web3 instance first
        setWeb3(web3Instance);
        setDebugMessage("Web3 instance created");
        
        // Try to display something even if we can't connect fully
        let partialSuccess = false;

        // Check if connected with a simple call
        try {
          setDebugMessage("Checking blockchain connection...");
          const isListening = await web3Instance.eth.net.isListening();
          console.log("Web3 connected:", isListening);
          setConnectionStatus(isListening ? 'Connected' : 'Disconnected');
          setDebugMessage(isListening ? "Connected to blockchain" : "Failed to connect");
          
          if (!isListening) {
            throw new Error("Failed to connect to blockchain network");
          }
          partialSuccess = true;
        } catch (connErr) {
          console.error("Connection check failed:", connErr);
          setError("Failed to connect to Ganache. Is it running on port 7545?");
          setDebugMessage("Connection failed: " + connErr.message);
          setLoading(false);
          return; // Exit early
        }

        // Get network information - don't fail if this doesn't work
        try {
          setDebugMessage("Getting network ID...");
          const netId = await web3Instance.eth.net.getId();
          console.log("Network ID:", netId);
          setNetworkId(netId || 'Unknown');
          
          // Determine network name based on ID
          let network = 'Unknown';
          if (netId === 5777 || netId === 1337) {
            network = 'Ganache Local';
          } else if (netId === 1) {
            network = 'Ethereum Mainnet';
          } else if (netId === 11155111) {
            network = 'Sepolia Testnet';
          } else if (netId === 5) {
            network = 'Goerli Testnet';
          }
          setNetworkName(network);
          console.log("Network name:", network);
          partialSuccess = true;
        } catch (netIdErr) {
          console.error("Failed to get network ID:", netIdErr);
          setNetworkId('Unknown');
          setNetworkName('Unknown');
          setDebugMessage("Network ID retrieval failed, continuing...");
          // Continue anyway - this is not critical
        }

        // Get current block number - don't fail if this doesn't work
        try {
          setDebugMessage("Getting block number...");
          const currentBlock = await web3Instance.eth.getBlockNumber();
          console.log("Current block:", currentBlock);
          setBlockNumber(currentBlock);
          partialSuccess = true;
        } catch (blockErr) {
          console.error("Failed to get block number:", blockErr);
          setBlockNumber(0);
          setDebugMessage("Block number retrieval failed, continuing...");
          // Continue anyway - this is not critical
        }

        // Try to get accounts
        let accounts = [];
        try {
          setDebugMessage("Getting accounts...");
          accounts = await web3Instance.eth.getAccounts();
          console.log("Accounts found:", accounts);
          
          if (accounts.length === 0) {
            console.warn("No accounts found in Ganache");
            setDebugMessage("No accounts found, using mock data");
            // Don't throw error, use mock data instead
            accounts = ['0x742d35Cc6634C0532925a3b844Bc454e4438f44e'];
          }
          partialSuccess = true;
        } catch (accountsError) {
          console.error("Error getting accounts:", accountsError);
          setDebugMessage("Account retrieval failed, using mock data");
          // Use a mock account instead of failing
          accounts = ['0x742d35Cc6634C0532925a3b844Bc454e4438f44e'];
        }
        
        // Always use the first account
        const userAddress = accounts[0];
        console.log("Using address:", userAddress);
        setAccount(userAddress);

        // Try to get account balance
        try {
          setDebugMessage("Getting balance...");
          const balanceWei = await web3Instance.eth.getBalance(userAddress);
          const balanceEth = web3Instance.utils.fromWei(balanceWei, 'ether');
          console.log("Account balance:", balanceEth, "ETH");
          setEthBalance(parseFloat(balanceEth).toFixed(4));
          partialSuccess = true;
        } catch (balanceError) {
          console.error("Error getting balance:", balanceError);
          setEthBalance("0.0000");
          setDebugMessage("Balance retrieval failed, using mock data");
          // Continue anyway - this is not critical
        }

        // Try to get gas price
        try {
          setDebugMessage("Getting gas price...");
          const gasPriceWei = await web3Instance.eth.getGasPrice();
          const gasPriceGwei = web3Instance.utils.fromWei(gasPriceWei, 'gwei');
          console.log("Gas price:", gasPriceGwei, "Gwei");
          setGasPrice(parseFloat(gasPriceGwei).toFixed(2));
          partialSuccess = true;
        } catch (gasError) {
          console.error("Error getting gas price:", gasError);
          setGasPrice("20.00"); // Set a default value
          setDebugMessage("Gas price retrieval failed, using default");
          // Continue anyway - this is not critical
        }

        // Always fetch mock transactions even if other things fail
        setDebugMessage("Setting up mock transactions...");
        fetchTransactions(userAddress, web3Instance);
        
        // Get pending transactions (mock data for demo)
        setPendingTransactions(Math.floor(Math.random() * 5));
        
        // Calculate total gas used (mock data for demo)
        setTotalGasUsed(parseFloat((Math.random() * 0.01).toFixed(4)));
        
        console.log("Dashboard data loaded successfully");
        setDebugMessage("Data loaded successfully");
        setLoading(false);
        
        // If at least some data was retrieved, hide the loading screen
        if (partialSuccess) {
          setLoading(false);
        }
      } catch (error) {
        console.error("Failed to initialize web3:", error);
        setError("Failed to connect to blockchain: " + error.message);
        setDebugMessage("Fatal error: " + error.message);
        setLoading(false);
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

  // Function to fetch transactions - in a real app, you would get real transactions from the blockchain
  const fetchTransactions = async (address, web3Instance) => {
    console.log("Fetching transactions for address:", address);
    try {
      // For demo purposes, we'll use mock data
      // In a real app, you would use web3.eth.getPastLogs or a blockchain explorer API
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
        {
          id: '0x9a8b7c6d5e4f3a2b1c0d9e8f7a6b5c4d3e2f1a0b9c8d7e6f5a4b3c2d1e0f9a8b',
          from: address,
          to: '0x1Db3439a222C519ab44bb1144fC28167b4Fa6EE6',
          value: web3Instance ? web3Instance.utils.toWei('0.02', 'ether') : '20000000000000000',
          date: '2025-03-15',
          gas: '32000',
          gasPrice: web3Instance ? web3Instance.utils.toWei('22', 'gwei') : '22000000000',
          status: 'confirmed',
          confirmations: 36,
          type: 'DeFi'
        },
        {
          id: '0x7f6e5d4c3b2a1f0e9d8c7b6a5f4e3d2c1b0a9f8e7d6c5b4a3f2e1d0c9b8a7f6e5',
          from: '0x742d35Cc6634C0532925a3b844Bc454e4438f44e',
          to: address,
          value: web3Instance ? web3Instance.utils.toWei('0.15', 'ether') : '150000000000000000',
          date: '2025-03-12',
          gas: '21000',
          gasPrice: web3Instance ? web3Instance.utils.toWei('15', 'gwei') : '15000000000',
          status: 'confirmed',
          confirmations: 48,
          type: 'Receive'
        },
      ];

      setTransactions(mockTxs);
      console.log("Transactions loaded:", mockTxs.length);
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

  // Show dashboard with partial data
  const handleShowAnyway = () => {
    setLoading(false);
    setError(null);
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
            <h2>ETH Wallet</h2>
            <div className="eth-balance">{ethBalance} ETH</div>
            <div className="wallet-details">
              <div className="wallet-address">
                <span>Address:</span>
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
    </div>
  );
};

export default Dashboard;