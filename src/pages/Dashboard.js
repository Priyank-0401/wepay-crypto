import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useOutletContext } from 'react-router-dom';
import '../styles/Dashboard.css';
import { QRCodeSVG } from 'qrcode.react';
import TransactionService from '../services/transactionService';
import axios from 'axios';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  TimeScale,
} from 'chart.js';
import 'chartjs-adapter-date-fns';

// Helper function to format addresses - moved outside component
const formatAddressUtil = (address) => {
    if (!address) return 'Unknown';
    return `${address.substring(0, 6)}...${address.substring(address.length - 4)}`;
  };

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  TimeScale,
  Title,
  Tooltip,
  Legend
);

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
  const [priceHistory, setPriceHistory] = useState([]);
  const [chartTimeframe, setChartTimeframe] = useState('1d'); // '1d', '7d', '30d'
  const [chartLoading, setChartLoading] = useState(true);
  const chartRef = useRef(null);
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
      setChartLoading(true);
      
      // Fetch current price data
      const priceResponse = await axios.get('https://api.coingecko.com/api/v3/coins/ethereum', {
        params: {
          localization: false,
          tickers: false,
          market_data: true,
          community_data: false,
          developer_data: false,
          sparkline: false
        }
      });
      
      if (priceResponse.data && priceResponse.data.market_data) {
        const marketData = priceResponse.data.market_data;
        
        // Update price state
        const currentPrice = marketData.current_price.usd;
        setEthPrice(currentPrice);
        
        // Update price change percentage
        const changePercentage = marketData.price_change_percentage_24h;
        setEthPriceChange(changePercentage ? parseFloat(changePercentage.toFixed(2)) : 0);
        
        // Update market cap and volume
        const marketCapInB = marketData.market_cap.usd / 1000000000;
        setMarketCap(parseFloat(marketCapInB.toFixed(2)));
        
        const volumeInB = marketData.total_volume.usd / 1000000000;
        setVolume24h(parseFloat(volumeInB.toFixed(2)));
        
        // Update DeFi portfolio values based on ETH price
        setDefiPortfolio(prevState => prevState.map(item => ({
          ...item,
          value: (item.amount * currentPrice).toFixed(2)
        })));
      }
      
      // Fetch historical price data for chart
      let days;
      switch (chartTimeframe) {
        case '7d':
          days = 7;
          break;
        case '30d':
          days = 30;
          break;
        case '1d':
        default:
          days = 1;
          break;
      }
      
      const historyResponse = await axios.get('https://api.coingecko.com/api/v3/coins/ethereum/market_chart', {
        params: {
          vs_currency: 'usd',
          days: days,
          interval: days > 1 ? 'daily' : 'hourly'
        }
      });
      
      if (historyResponse.data && historyResponse.data.prices) {
        const priceData = historyResponse.data.prices.map(item => ({
          timestamp: item[0],
          price: item[1]
        }));
        
        setPriceHistory(priceData);
      }
      
      setChartLoading(false);
    } catch (error) {
      console.error("Error fetching ETH price data:", error);
      setChartLoading(false);
      
      // Fallback to mock data if API fails
      if (connectionStatus === 'Connected') {
        setEthPrice(2842.15);
        setEthPriceChange(3.27);
        setMarketCap(318.45);
        setVolume24h(12.75);
        
        // Create mock price history data
        const mockHistory = [];
        const now = Date.now();
        const basePrice = 2842.15;
        
        for (let i = 24; i >= 0; i--) {
          const time = now - (i * 60 * 60 * 1000);
          const randomChange = (Math.random() - 0.5) * 50;
          mockHistory.push({
            timestamp: time,
            price: basePrice + randomChange
          });
        }
        
        setPriceHistory(mockHistory);
        
        // Update DeFi portfolio values based on ETH price
        setDefiPortfolio(prevState => prevState.map(item => ({
          ...item,
          value: (item.amount * 2842.15).toFixed(2)
        })));
      }
    }
  }, [connectionStatus, chartTimeframe]);

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

  // Render ETH price chart
  const renderPriceChart = useCallback(() => {
    if (chartLoading || priceHistory.length === 0) {
      return (
        <div className="chart-loading">
          <div className="spinner"></div>
          <p>Loading chart data...</p>
        </div>
      );
    }
    
    const chartData = {
      labels: priceHistory.map(dataPoint => new Date(dataPoint.timestamp)),
      datasets: [
        {
          label: 'ETH Price (USD)',
          data: priceHistory.map(dataPoint => dataPoint.price),
          borderColor: ethPriceChange >= 0 ? 'rgba(46, 204, 113, 1)' : 'rgba(231, 76, 60, 1)', 
          backgroundColor: ethPriceChange >= 0 ? 'rgba(46, 204, 113, 0.1)' : 'rgba(231, 76, 60, 0.1)',
          borderWidth: 2,
          fill: true,
          tension: 0.4,
          pointRadius: 0,
          pointHoverRadius: 3,
        }
      ]
    };
    
    const chartOptions = {
      responsive: true,
      maintainAspectRatio: false,
      interaction: {
        mode: 'index',
        intersect: false,
      },
      plugins: {
        legend: {
          display: false,
        },
        tooltip: {
          callbacks: {
            label: function(context) {
              return `$${context.raw.toFixed(2)}`;
            },
            title: function(context) {
              // Ensure we have a valid date by using the timestamp directly from the dataset
              const dataIndex = context[0].dataIndex;
              const timestamp = priceHistory[dataIndex]?.timestamp;
              
              if (!timestamp) return 'Unknown date';
              
              const date = new Date(timestamp);
              if (isNaN(date.getTime())) return 'Invalid date';
              
              const formatDate = chartTimeframe === '1d' 
                ? date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
                : date.toLocaleDateString([], { month: 'short', day: 'numeric', year: '2-digit' });
                
              return formatDate;
            }
          }
        }
      },
      scales: {
        x: {
          type: 'time',
          time: {
            unit: chartTimeframe === '1d' ? 'hour' : 'day',
            tooltipFormat: chartTimeframe === '1d' ? 'HH:mm' : 'MMM d',
            displayFormats: {
              hour: 'HH:mm',
              day: 'MMM d'
            }
          },
          grid: {
            display: false,
            drawBorder: false,
          },
          ticks: {
            maxRotation: 0,
            autoSkip: true,
            maxTicksLimit: 6,
            color: 'rgba(255, 255, 255, 0.5)', 
          }
        },
        y: {
          grid: {
            color: 'rgba(255, 255, 255, 0.1)',
          },
          ticks: {
            callback: function(value) {
              return '$' + value.toLocaleString();
            },
            color: 'rgba(255, 255, 255, 0.5)',
          }
        }
      }
    };
    
    return (
      <div className="price-chart-container">
        <div className="chart-timeframe-selector">
          <button 
            className={`timeframe-btn ${chartTimeframe === '1d' ? 'active' : ''}`}
            onClick={() => setChartTimeframe('1d')}
          >
            1D
          </button>
          <button 
            className={`timeframe-btn ${chartTimeframe === '7d' ? 'active' : ''}`}
            onClick={() => setChartTimeframe('7d')}
          >
            7D
          </button>
          <button 
            className={`timeframe-btn ${chartTimeframe === '30d' ? 'active' : ''}`}
            onClick={() => setChartTimeframe('30d')}
          >
            30D
          </button>
        </div>
        <div className="price-chart">
          <Line ref={chartRef} data={chartData} options={chartOptions} />
        </div>
      </div>
    );
  }, [chartLoading, priceHistory, ethPriceChange, chartTimeframe]);

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
                  <div className="stat-value income">+{transactionStats.received} ETH</div>
                  <div className="stat-label">Received</div>
                </div>
              </div>
              <div className="stat-item">
                <div className="stat-icon outgoing"></div>
                <div className="stat-data">
                  <div className="stat-value expense">-{transactionStats.sent} ETH</div>
                  <div className="stat-label">Sent</div>
                </div>
              </div>
              <div className="stat-item">
                <div className="stat-icon gas"></div>
                <div className="stat-data">
                  <div className="stat-value expense">{parseFloat(totalGasUsed).toFixed(6)} ETH</div>
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
        
        {/* ETH Price chart full width */}
        <div className="price-card full-width">
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
            {/* Add chart */}
            {renderPriceChart()}
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
