// Dashboard.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Web3 from 'web3';
import '../styles/Dashboard.css';
import { QRCodeSVG } from 'qrcode.react';

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
  const [sendFormOpen, setSendFormOpen] = useState(false);
  const [receiveFormOpen, setReceiveFormOpen] = useState(false);
  const [sendAmount, setSendAmount] = useState('');
  const [recipientAddress, setRecipientAddress] = useState('');
  const [transactionStatus, setTransactionStatus] = useState(null);
  const [transactionHash, setTransactionHash] = useState('');
  const [transactionError, setTransactionError] = useState(null);

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

  useEffect(() => {
    // Only set up transaction polling if we have a web3 connection and an account
    if (web3 && account && connectionStatus === 'Connected') {
      console.log("Setting up transaction polling");
      
      // Set up interval to fetch transactions every 15 seconds
      const transactionInterval = setInterval(() => {
        fetchTransactions(account, web3);
      }, 15000);
      
      // Clean up interval on component unmount
      return () => {
        clearInterval(transactionInterval);
      };
    }
  }, [web3, account, connectionStatus]); // Dependencies to ensure interval is only set up when needed

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

  // Update the fetchTransactions function to better retrieve real transactions
  const fetchTransactions = async (address, web3Instance) => {
    console.log("Fetching transactions for address:", address);
    try {
      if (!web3Instance || !address) {
        console.error("Missing web3 instance or address");
        setTransactions([]);
        return;
      }
      
      // Clear existing transactions while fetching
      setTransactions([]);
      
      try {
        // Get the latest block number
        const latestBlock = await web3Instance.eth.getBlockNumber();
        console.log(`Current block number: ${latestBlock}`);
        
        // Look back through more blocks for a comprehensive history
        // In Ganache, you might want to check all blocks since it's a test environment
        const blocksToCheck = Math.min(100, latestBlock); // Check up to 100 blocks or all blocks if less
        const realTransactions = [];
        
        console.log(`Checking ${blocksToCheck} blocks for transactions...`);
        
        // Use a more efficient approach - get block details in batches
        const batchSize = 10;
        for (let batch = 0; batch < blocksToCheck; batch += batchSize) {
          const batchPromises = [];
          
          for (let i = 0; i < batchSize && batch + i < blocksToCheck; i++) {
            const blockNumber = latestBlock - batch - i;
            if (blockNumber >= 0) {
              batchPromises.push(web3Instance.eth.getBlock(blockNumber, true));
            }
          }
          
          const blocks = await Promise.all(batchPromises);
          
          // Process each block's transactions
          blocks.forEach((block, index) => {
            if (block && block.transactions && block.transactions.length > 0) {
              // Process all transactions in this block
              block.transactions.forEach(tx => {
                const normalizedFromAddress = tx.from.toLowerCase();
                const normalizedToAddress = tx.to ? tx.to.toLowerCase() : null;
                const normalizedUserAddress = address.toLowerCase();
                
                // Check if this transaction involves the user's address
                if (normalizedFromAddress === normalizedUserAddress || normalizedToAddress === normalizedUserAddress) {
                  // Format transaction data
                  realTransactions.push({
                    id: tx.hash,
                    from: tx.from,
                    to: tx.to || 'Contract Creation',
                    value: tx.value,
                    // Use actual timestamp from block
                    date: new Date(block.timestamp * 1000).toISOString().split('T')[0],
                    gas: tx.gas,
                    gasPrice: tx.gasPrice,
                    status: 'confirmed',
                    confirmations: latestBlock - block.number,
                    blockNumber: block.number,
                    // Determine if this is a send or receive transaction
                    type: normalizedFromAddress === normalizedUserAddress ? 'Transfer' : 'Receive'
                  });
                }
              });
            }
          });
        }
        
        if (realTransactions.length > 0) {
          console.log(`Found ${realTransactions.length} real transactions for address ${address}`);
          
          // Sort transactions by block number (descending) to show most recent first
          realTransactions.sort((a, b) => b.blockNumber - a.blockNumber);
          
          // Update state with real transactions
          setTransactions(realTransactions);
          return;
        } else {
          console.log("No transactions found on-chain for this address");
        }
      } catch (error) {
        console.error("Error fetching real transactions:", error);
      }
      
      // Only fall back to mock data if explicitly desired
      // For now, just show empty state to be more accurate
      console.log("No transactions found, showing empty state");
      setTransactions([]);
      
    } catch (err) {
      console.error("Error in transaction fetching process:", err);
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

  // Function to send ETH transaction
  const sendTransaction = async () => {
    try {
      if (!web3 || !account) {
        setTransactionError("Web3 or account not available");
        return;
      }
      
      if (!sendAmount || isNaN(parseFloat(sendAmount)) || parseFloat(sendAmount) <= 0) {
        setTransactionError("Please enter a valid amount");
        return;
      }
      
      if (!web3.utils.isAddress(recipientAddress)) {
        setTransactionError("Please enter a valid Ethereum address");
        return;
      }
      
      setTransactionStatus("pending");
      setTransactionError(null);
      
      // Convert ETH amount to Wei
      const amountWei = web3.utils.toWei(sendAmount, 'ether');
      
      // Get gas estimate (optional but recommended)
      const gasEstimate = await web3.eth.estimateGas({
        from: account,
        to: recipientAddress,
        value: amountWei
      });
      
      // Send transaction
      const tx = await web3.eth.sendTransaction({
        from: account,
        to: recipientAddress,
        value: amountWei,
        gas: gasEstimate
      });
      
      console.log("Transaction sent:", tx);
      setTransactionHash(tx.transactionHash);
      setTransactionStatus("confirmed");
      
      // Update balance
      const newBalanceWei = await web3.eth.getBalance(account);
      const newBalanceEth = web3.utils.fromWei(newBalanceWei, 'ether');
      setEthBalance(parseFloat(newBalanceEth).toFixed(4));
      
      // Update in database
      updateWalletBalance(account, newBalanceEth);
      
      // Add a slight delay before fetching transactions to ensure the transaction
      // has been included in a block
      setTimeout(() => {
        // Refresh transactions
        fetchTransactions(account, web3);
      }, 1000);
      
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
  };

  // eslint-disable-next-line no-unused-vars
  const sendTestTransaction = async () => {
    try {
      if (!web3 || !account) {
        alert("Web3 or account not available");
        return;
      }
      
      // Get the first account from Ganache to send to
      const accounts = await web3.eth.getAccounts();
      if (accounts.length === 0) {
        alert("No accounts found in Ganache");
        return;
      }
      
      // Pick a different account than the current one
      const recipientAddress = accounts[0].toLowerCase() !== account.toLowerCase() ? 
        accounts[0] : accounts[1];
      
      console.log("Sending test transaction:");
      console.log("From:", account);
      console.log("To:", recipientAddress);
      
      // Send a very small amount
      const amountWei = web3.utils.toWei('0.001', 'ether');
      
      // First check if the account is unlocked/available
      try {
        // Get account balance first to verify access
        const balanceWei = await web3.eth.getBalance(account);
        console.log(`Current balance: ${web3.utils.fromWei(balanceWei, 'ether')} ETH`);
        
        if (balanceWei === '0') {
          alert("Account has zero balance. Cannot send transaction.");
          return;
        }
      } catch (balanceError) {
        console.error("Error checking balance:", balanceError);
        alert(`Cannot access account: ${balanceError.message}`);
        return;
      }
      
      // Send transaction
      try {
        const tx = await web3.eth.sendTransaction({
          from: account,
          to: recipientAddress,
          value: amountWei,
          gas: 21000
        });
        
        console.log("Test transaction sent:", tx);
        alert(`Transaction sent! Hash: ${tx.transactionHash}`);
        
        // Update balance
        const newBalanceWei = await web3.eth.getBalance(account);
        const newBalanceEth = web3.utils.fromWei(newBalanceWei, 'ether');
        setEthBalance(parseFloat(newBalanceEth).toFixed(4));
        
        // Refresh transactions after a delay
        setTimeout(() => {
          fetchTransactions(account, web3);
        }, 1000);
      } catch (txError) {
        console.error("Error sending transaction:", txError);
        alert(`Transaction failed: ${txError.message}`);
      }
    } catch (error) {
      console.error("Test transaction error:", error);
      alert(`Error: ${error.message}`);
    }
  };

  // Show a loading state
  if (loading) {
    return (
      <div className="dashboard loading-state">
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
      <div className="dashboard-content">
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
        </div>
        
        <div className="transactions-section">
          <div className="section-header">
            <h2>Recent Transactions</h2>
            <button className="view-all-btn">View All</button>
          </div>
          <div className="transaction-list">
            {loading ? (
              <div className="loading-transactions">
                <span className="spinner-sm"></span> Loading transactions...
              </div>
            ) : transactions.length > 0 ? (
              transactions.map(transaction => (
                <div key={transaction.id} className="transaction-item">
                  <div className="transaction-icon">
                    <div className={`tx-icon ${transaction.from.toLowerCase() === account.toLowerCase() ? 'outgoing' : 'incoming'}`}></div>
                  </div>
                  <div className="transaction-details">
                    <div className="transaction-primary">
                      <div className="transaction-type">{transaction.type}</div>
                      <div className="transaction-amount">
                        <span className={transaction.from.toLowerCase() === account.toLowerCase() ? 'expense' : 'income'}>
                          {transaction.from.toLowerCase() === account.toLowerCase() ? '-' : '+'}
                          {weiToEth(transaction.value)} ETH
                        </span>
                      </div>
                    </div>
                    <div className="transaction-secondary">
                      <div className="transaction-addresses">
                        {transaction.from.toLowerCase() === account.toLowerCase() 
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
                      Balance: {ethBalance} ETH
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
      
      <div className="dashboard-actions">
        <button onClick={handleLogout} className="logout-btn">
          Logout
        </button>
      </div>
    </div>
  );
};

export default Dashboard;