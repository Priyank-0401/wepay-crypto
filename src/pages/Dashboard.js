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
        
        // Connect directly to Ganache - no MetaMask fallback attempt
        const ganacheUrl = 'http://127.0.0.1:7545';
        console.log(`Connecting to Ganache at ${ganacheUrl}`);
        
        // Create Web3 instance with timeout to prevent hanging
        // Modify your Web3 provider initialization
const web3Instance = new Web3(new Web3.providers.HttpProvider(ganacheUrl, {
  timeout: 30000, // Increase timeout to 30 seconds
  reconnect: {
    auto: true,
    delay: 5000,
    maxAttempts: 5, // More attempts
  }
}));

// Add more detailed logging
console.log("Web3 instance created, attempting to connect...");

// Improve the connection check
try {
  const isListening = await web3Instance.eth.net.isListening();
  console.log("Connection successful, blockchain is listening:", isListening);
  setConnectionStatus(isListening ? 'Connected' : 'Failed to connect');
  
  if (!isListening) {
    throw new Error("Blockchain is not listening");
  }
} catch (connErr) {
  console.error("Connection error details:", connErr);
  setError(`Connection failed: ${connErr.message || "Unknown error"}`);
  setLoading(false);
  return; // Exit early on connection failure
}
        
        setWeb3(web3Instance);
        
        // Check if connected with timeout
        let isConnected = false;
        try {
          // Add timeout to prevent hanging
          const connectionPromise = web3Instance.eth.net.isListening();
          isConnected = await Promise.race([
            connectionPromise,
            new Promise((_, reject) => 
              setTimeout(() => reject(new Error("Connection timeout")), 5000)
            )
          ]);
        } catch (connErr) {
          console.error("Connection check failed:", connErr);
          throw new Error("Failed to connect to Ganache. Is it running on port 7545?");
        }
        
        console.log("Web3 connected:", isConnected);
        setConnectionStatus(isConnected ? 'Connected' : 'Failed to connect');
        
        if (!isConnected) {
          throw new Error("Failed to connect to Ganache. Please check if it's running on http://127.0.0.1:7545");
        }

        // Get network information
        let netId;
        try {
          netId = await web3Instance.eth.net.getId();
          console.log("Network ID:", netId);
          setNetworkId(netId || 'Unknown');
        } catch (netIdErr) {
          console.error("Failed to get network ID:", netIdErr);
          setNetworkId('Unknown');
          // Continue anyway - this is not critical
        }
        
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

        // Get current block number
        try {
          const currentBlock = await web3Instance.eth.getBlockNumber();
          setBlockNumber(currentBlock);
          console.log("Current block:", currentBlock);
        } catch (blockErr) {
          console.error("Failed to get block number:", blockErr);
          setBlockNumber(0);
          // Continue anyway - this is not critical
        }

        // Get accounts
        let accounts = [];
        try {
          accounts = await web3Instance.eth.getAccounts();
          console.log("Accounts found:", accounts);
        } catch (accountsError) {
          console.error("Error getting accounts:", accountsError);
          accounts = [];
          throw new Error("Could not get Ganache accounts. Please check your Ganache configuration.");
        }
        
        if (accounts.length === 0) {
          throw new Error("No accounts found in Ganache. Please check your Ganache configuration.");
        }
        
        // Always use the first account from Ganache
        const userAddress = accounts[0];
        console.log("Using address:", userAddress);
        setAccount(userAddress);

        // Get account balance
        try {
          const balanceWei = await web3Instance.eth.getBalance(userAddress);
          const balanceEth = web3Instance.utils.fromWei(balanceWei, 'ether');
          console.log("Account balance:", balanceEth, "ETH");
          setEthBalance(parseFloat(balanceEth).toFixed(4));
        } catch (balanceError) {
          console.error("Error getting balance:", balanceError);
          setEthBalance("0.0000");
          // Continue anyway - this is not critical
        }

        // Get gas price
        try {
          const gasPriceWei = await web3Instance.eth.getGasPrice();
          const gasPriceGwei = web3Instance.utils.fromWei(gasPriceWei, 'gwei');
          console.log("Gas price:", gasPriceGwei, "Gwei");
          setGasPrice(parseFloat(gasPriceGwei).toFixed(2));
        } catch (e) {
          console.error("Error getting gas price:", e);
          setGasPrice("20.00"); // Set a default value
          // Continue anyway - this is not critical
        }

        // Fetch transactions
        fetchTransactions(userAddress, web3Instance);
        
        // Get pending transactions (mock data for demo)
        setPendingTransactions(Math.floor(Math.random() * 5));
        
        // Calculate total gas used (mock data for demo)
        setTotalGasUsed(parseFloat((Math.random() * 0.01).toFixed(4)));
        
        console.log("Dashboard data loaded successfully");
        setLoading(false);
      } catch (error) {
        console.error("Failed to initialize web3:", error);
        setError(error.message || "Failed to connect to blockchain");
        setLoading(false);
      }
    };

    // Add a small delay before attempting to connect to ensure UI renders first
    const connectionTimer = setTimeout(() => {
      initWeb3();
    }, 30);
    
    // Clean up the timer if component unmounts
    return () => clearTimeout(connectionTimer);
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
          value: web3Instance.utils.toWei('0.05', 'ether'),
          date: '2025-03-18',
          gas: '21000',
          gasPrice: web3Instance.utils.toWei('20', 'gwei'),
          status: 'confirmed',
          confirmations: 12,
          type: 'Transfer'
        },
        {
          id: '0x1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b',
          from: '0x2932b7A2355D6fecc4b5c0B6BD44cC31df247a2e',
          to: address,
          value: web3Instance.utils.toWei('0.8', 'ether'),
          date: '2025-03-16',
          gas: '21000',
          gasPrice: web3Instance.utils.toWei('18', 'gwei'),
          status: 'confirmed',
          confirmations: 24,
          type: 'Receive'
        },
        {
          id: '0x9a8b7c6d5e4f3a2b1c0d9e8f7a6b5c4d3e2f1a0b9c8d7e6f5a4b3c2d1e0f9a8b',
          from: address,
          to: '0x1Db3439a222C519ab44bb1144fC28167b4Fa6EE6',
          value: web3Instance.utils.toWei('0.02', 'ether'),
          date: '2025-03-15',
          gas: '32000',
          gasPrice: web3Instance.utils.toWei('22', 'gwei'),
          status: 'confirmed',
          confirmations: 36,
          type: 'DeFi'
        },
        {
          id: '0x7f6e5d4c3b2a1f0e9d8c7b6a5f4e3d2c1b0a9f8e7d6c5b4a3f2e1d0c9b8a7f6e5',
          from: '0x742d35Cc6634C0532925a3b844Bc454e4438f44e',
          to: address,
          value: web3Instance.utils.toWei('0.15', 'ether'),
          date: '2025-03-12',
          gas: '21000',
          gasPrice: web3Instance.utils.toWei('15', 'gwei'),
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
      return '0';
    }
  };

  // Calculate gas fee for a transaction
  const calculateGasFee = (gas, gasPrice) => {
    if (!web3 || !gas || !gasPrice) return '0';
    try {
      const gasFeeWei = web3.utils.toBN(gas).mul(web3.utils.toBN(gasPrice));
      return parseFloat(web3.utils.fromWei(gasFeeWei, 'ether')).toFixed(6);
    } catch (e) {
      console.error("Error calculating gas fee:", e);
      return '0';
    }
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
          <button onClick={() => window.location.reload()} className="retry-btn">
            Retry Connection
          </button>
        </div>
      )}
      
      {/* Main dashboard content - still show even if there's an error */}
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
  );
};

export default Dashboard;