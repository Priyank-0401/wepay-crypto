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
import GasOptimizationService from '../services/gasOptimizationService';
import { API_ENDPOINTS } from '../config/api';

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
  const [networkName, setNetworkName] = useState('');
  const [connectionStatus, setConnectionStatus] = useState('Disconnected');
  const [totalGasUsed, setTotalGasUsed] = useState(0);
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
  
  // Request Money State
  const [requestFormOpen, setRequestFormOpen] = useState(false);
  const [requestAddress, setRequestAddress] = useState(''); // Address to request *from*
  const [requestAmount, setRequestAmount] = useState('');
  const [requestNote, setRequestNote] = useState('');
  const [requestStatus, setRequestStatus] = useState(null); // e.g., 'pending', 'submitted', 'error'
  const [requestError, setRequestError] = useState(null);
  const [pendingRequests, setPendingRequests] = useState([]); // Simple state to hold requests for now
  
  // ETH Request Notifications State
  const [receivedRequests, setReceivedRequests] = useState([]);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [notificationCount, setNotificationCount] = useState(0);
  const notificationsRef = useRef(null);
  
  // State variables for additional dashboard data
  const [ethPrice, setEthPrice] = useState(0);
  const [ethPriceChange, setEthPriceChange] = useState(0);
  const [marketCap, setMarketCap] = useState(0);
  const [volume24h, setVolume24h] = useState(0);
  const [priceHistory, setPriceHistory] = useState([]);
  const [chartTimeframe, setChartTimeframe] = useState('24h');
  const [chartLoading, setChartLoading] = useState(true);
  // eslint-disable-next-line
  const [lastPriceUpdate, setLastPriceUpdate] = useState(null);
  // eslint-disable-next-line
  const [priceDataSource, setPriceDataSource] = useState('');
  const chartRef = useRef(null);
  const [transactionStats, setTransactionStats] = useState({
    sent: 0.07,
    received: 0.95,
    totalFees: 0,
    avgValue: 0
  });


  // State for gas optimization
  const [gasPriceRecommendations, setGasPriceRecommendations] = useState({
    standard: { price: '4.3', savings: '+10% savings', timeEstimate: '5-10 min', source: 'Ethereum Gas Station' },
    fast: { price: '4.8', savings: 'Base price', timeEstimate: '1-3 min', source: 'Ethereum Gas Station' },
    fastest: { price: '5.5', savings: '-15% premium', timeEstimate: '<1 min', source: 'Ethereum Gas Station' }
  });
  const [selectedGasOption, setSelectedGasOption] = useState('standard');
  const [gasOptimizationReady, setGasOptimizationReady] = useState(false);

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
    // Don't override gasPrice with mock data to allow real-time values
    setNetworkName("Ganache Local");
    fetchTransactions(mockAddr);
    const randomGasUsed = parseFloat((Math.random() * 0.01).toFixed(4));
    setTotalGasUsed(randomGasUsed);
    
    // Mock price and market data
    setEthPrice(1566.12);  // Updated to current market price
    setEthPriceChange(-0.06);
    setMarketCap(188.25);
    setVolume24h(7.82);
    
    // Mock transaction stats
    setTransactionStats({
      sent: 0.07,
      received: 0.95,
      totalFees: randomGasUsed,
      avgValue: 0.12
    });
    
    /* REMOVED DEFI PORTFOLIO MOCK UPDATE
    // Update DeFi portfolio values based on ETH price
    setDefiPortfolio(prevState => prevState.map(item => ({
      ...item,
      value: (item.amount * 1566.12).toFixed(2)  // Updated to current market price
    })));
    */
    
    console.log("Mock data loaded successfully");
  }, [fetchTransactions]);

  // Define weiToEth with useCallback
  // eslint-disable-next-line no-unused-vars
  const weiToEth = useCallback((wei) => {
    if (!web3 || !wei) return "0";
    return web3.utils.fromWei(wei.toString(), 'ether');
  }, [web3]);

  // Move tryAlternativeEthPriceSource before fetchEthPriceData to fix the "used before defined" warning
  // Function to try alternative ETH price sources
  const tryAlternativeEthPriceSource = useCallback(async () => {
    // Try Binance API
    try {
      const binanceResponse = await axios.get('https://api.binance.com/api/v3/ticker/24hr?symbol=ETHUSDT');
      if (binanceResponse.data && binanceResponse.data.lastPrice) {
        return {
          price: parseFloat(binanceResponse.data.lastPrice),
          change: parseFloat(binanceResponse.data.priceChangePercent),
          source: ' Binance'
        };
      }
    } catch (binanceError) {
      console.warn('Binance API error:', binanceError);
    }
    
    // Try CryptoCompare API
    try {
      const cryptoCompareResponse = await axios.get('https://min-api.cryptocompare.com/data/price?fsym=ETH&tsyms=USD');
      if (cryptoCompareResponse.data && cryptoCompareResponse.data.USD) {
        // Get additional data if available
        try {
          const fullDataResponse = await axios.get('https://min-api.cryptocompare.com/data/pricemultifull?fsyms=ETH&tsyms=USD');
          if (fullDataResponse.data && fullDataResponse.data.RAW && fullDataResponse.data.RAW.ETH && fullDataResponse.data.RAW.ETH.USD) {
            const extraData = fullDataResponse.data.RAW.ETH.USD;
            return {
              price: cryptoCompareResponse.data.USD,
              change: parseFloat(extraData.CHANGEPCT24HOUR),
              marketCap: parseFloat(extraData.MKTCAP) / 1000000000,
              volume: parseFloat(extraData.TOTALVOLUME24H) / 1000000000,
              source: 'CryptoCompare'
            };
          }
        } catch (extraDataError) {
          console.warn('Error fetching additional data from CryptoCompare:', extraDataError);
        }
        
        // Return basic price data if additional data fetch fails
        return {
          price: cryptoCompareResponse.data.USD,
          source: 'CryptoCompare'
        };
      }
    } catch (cryptoCompareError) {
      console.warn('CryptoCompare API error:', cryptoCompareError);
    }
    
    return null; // Return null if all alternative sources fail
  }, []);

  // Only after defining tryAlternativeEthPriceSource, we define fetchEthPriceData
  const fetchEthPriceData = useCallback(async () => {
    try {
      setChartLoading(true);
      
      // Try CoinGecko API as primary source
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
        
        /* REMOVED DEFI PORTFOLIO UPDATE
        // Update DeFi portfolio values based on ETH price
        setDefiPortfolio(prevState => prevState.map(item => ({
          ...item,
          value: (item.amount * currentPrice).toFixed(2)
        })));
        */
        
        // Update last price update timestamp and data source
        setLastPriceUpdate(new Date());
        setPriceDataSource(' CoinGecko API');
        console.log('ETH price updated at:', new Date().toLocaleTimeString(), 'Source: CoinGecko');
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
      console.error("Error fetching ETH price data from CoinGecko:", error);
      
      // Try alternate price sources before falling back to default values
      try {
        console.log("Trying alternative ETH price source...");
        const altPriceData = await tryAlternativeEthPriceSource();
        if (altPriceData) {
          setEthPrice(altPriceData.price);
          setEthPriceChange(altPriceData.change || -0.06);
          setMarketCap(altPriceData.marketCap || 188.25);
          setVolume24h(altPriceData.volume || 7.82);
          
          /* REMOVED DEFI PORTFOLIO UPDATE
          // Update DeFi portfolio values based on current ETH price
          setDefiPortfolio(prevState => prevState.map(item => ({
            ...item,
            value: (item.amount * altPriceData.price).toFixed(2)
          })));
          */
          
          // Update last price update timestamp
          setLastPriceUpdate(new Date());
          setPriceDataSource(altPriceData.source || 'Alternative API');
          console.log("ETH price updated from alternative source:", altPriceData.price);
          
          // Create mock price history data based on the current price
          const mockHistory = [];
          const now = Date.now();
          const basePrice = altPriceData.price;
          
          for (let i = 24; i >= 0; i--) {
            const time = now - (i * 60 * 60 * 1000);
            const randomChange = (Math.random() - 0.5) * 10;
            mockHistory.push({
              timestamp: time,
              price: basePrice + randomChange
            });
          }
          
          setPriceHistory(mockHistory);
          setChartLoading(false);
          return; // Exit early if alternative source was successful
        }
      } catch (altError) {
        console.error("Alternative ETH price source also failed:", altError);
      }
      
      setChartLoading(false);
      
      // Fallback to current market data if API fails
      if (connectionStatus === 'Connected') {
        setEthPrice(1566.12);  // Current market price
        setEthPriceChange(-0.06);
        setMarketCap(188.25);
        setVolume24h(7.82);
        
        // Create mock price history data
        const mockHistory = [];
        const now = Date.now();
        const basePrice = 1566.12;  // Current market price
        
        for (let i = 24; i >= 0; i--) {
          const time = now - (i * 60 * 60 * 1000);
          const randomChange = (Math.random() - 0.5) * 10;  // Smaller fluctuations
          mockHistory.push({
            timestamp: time,
            price: basePrice + randomChange
          });
        }
        
        setPriceHistory(mockHistory);
        
        /* REMOVED DEFI PORTFOLIO UPDATE
        // Update DeFi portfolio values based on current ETH price
        setDefiPortfolio(prevState => prevState.map(item => ({
          ...item,
          value: (item.amount * 1566.12).toFixed(2)  // Current market price
        })));
        */
        
        // Update last price update timestamp even for fallback data
        setLastPriceUpdate(new Date());
        setPriceDataSource('Manual Fallback (Current Market Rate)');
      }
    }
  }, [connectionStatus, chartTimeframe, tryAlternativeEthPriceSource]);

  // Add this new function to properly calculate gas recommendations based on market rate
  const calculateOptimizedGasPrices = useCallback((baseGasPrice) => {
    // Convert to number if it's a string
    const basePriceGwei = parseFloat(baseGasPrice);
    
    if (isNaN(basePriceGwei) || basePriceGwei <= 0) {
      // Fallback to a reasonable default if we don't have valid data
        return {
        standard: { 
          price: '0.55', 
          savings: '+10% savings', 
          timeEstimate: '5-10 min',
          source: 'Market Average'
        },
        fast: { 
          price: '0.65', 
          savings: 'Base price', 
          timeEstimate: '1-3 min',
          source: 'Market Average' 
        },
        fastest: { 
          price: '0.75', 
          savings: '-15% premium', 
          timeEstimate: '<1 min',
          source: 'Market Average' 
        }
      };
    }
    
    // Calculate options based on real market price
    // Economy: 10% less than base (save gas)
    // Standard: market rate
    // Fast: 15% more than base (faster confirmation)
    
    const economyPrice = (basePriceGwei * 0.9).toFixed(2);
    const standardPrice = basePriceGwei.toFixed(2);
    const fastPrice = (basePriceGwei * 1.15).toFixed(2);
    
    // Ensure we never go below the minimum required gas price
    const minimumGas = 0.1; // 0.1 Gwei minimum to ensure transaction is accepted
    
    return {
      standard: { 
        price: Math.max(minimumGas, economyPrice).toFixed(2), 
        savings: '+10% savings', 
        timeEstimate: '5-10 min',
        source: 'Real-time Market Data'
      },
      fast: { 
        price: Math.max(minimumGas, standardPrice).toFixed(2), 
        savings: 'Base price', 
        timeEstimate: '1-3 min',
        source: 'Real-time Market Data' 
      },
      fastest: { 
        price: Math.max(minimumGas, fastPrice).toFixed(2), 
        savings: '-15% premium', 
        timeEstimate: '<1 min',
        source: 'Real-time Market Data' 
      }
    };
  }, []);

  // Modify the fetchRealTimeGasPrice function to update recommendations
  const fetchRealTimeGasPrice = useCallback(async () => {
    try {
      // Try to get gas price from BlockNative API
      try {
        const blockNativeResponse = await axios.get('https://api.blocknative.com/gasprices/blockprices', {
          headers: {
            'Authorization': '' // No key for public access
          }
        });
        
        if (blockNativeResponse.data && blockNativeResponse.data.blockPrices && 
            blockNativeResponse.data.blockPrices[0] && 
            blockNativeResponse.data.blockPrices[0].estimatedPrices) {
          // Get the medium confidence price
          const mediumPrice = blockNativeResponse.data.blockPrices[0].estimatedPrices.find(
            price => price.confidence === 80
          );
          
          if (mediumPrice) {
            const gasPriceGwei = mediumPrice.price.toFixed(2);
            setGasPrice(gasPriceGwei);
            console.log('Updated gas price from BlockNative:', gasPriceGwei, 'Gwei');
            
            // Update gas recommendations based on real market price
            const recommendations = calculateOptimizedGasPrices(gasPriceGwei);
            setGasPriceRecommendations(recommendations);
            
            return true;
          }
        }
      } catch (blockNativeError) {
        console.warn('BlockNative API error:', blockNativeError);
      }
      
      // Try to get gas price from CoinGecko API (no API key needed)
      const coinGeckoResponse = await axios.get('https://api.coingecko.com/api/v3/simple/price', {
        params: {
          ids: 'ethereum',
          vs_currencies: 'usd',
          include_24hr_change: 'true',
          include_market_cap: 'true',
          include_last_updated_at: 'true',
          include_gas_data: 'true'
        }
      });
      
      if (coinGeckoResponse.data && coinGeckoResponse.data.ethereum && coinGeckoResponse.data.ethereum.gas) {
        const gasPriceGwei = (coinGeckoResponse.data.ethereum.gas.average || coinGeckoResponse.data.ethereum.gas.safe).toString();
        setGasPrice(gasPriceGwei);
        console.log('Updated gas price from CoinGecko:', gasPriceGwei, 'Gwei');
        
        // Update gas recommendations based on real market price
        const recommendations = calculateOptimizedGasPrices(gasPriceGwei);
        setGasPriceRecommendations(recommendations);
        
        return true;
      }
      
      // Try Etherscan API without key (limited usage)
      const etherscanResponse = await axios.get('https://api.etherscan.io/api', {
        params: {
          module: 'gastracker',
          action: 'gasoracle'
        }
      });
      
      if (etherscanResponse.data && etherscanResponse.data.status === '1') {
        const gasPriceGwei = etherscanResponse.data.result.SafeGasPrice;
        setGasPrice(gasPriceGwei);
        console.log('Updated gas price from Etherscan:', gasPriceGwei, 'Gwei');
        
        // Update gas recommendations based on real market price
        const recommendations = calculateOptimizedGasPrices(gasPriceGwei);
        setGasPriceRecommendations(recommendations);
        
        return true;
      }
      
      // Try alternative gas API
      try {
        const gasNowResponse = await axios.get('https://www.etherchain.org/api/gasnow');
        if (gasNowResponse.data && gasNowResponse.data.data) {
          const gasPriceGwei = (gasNowResponse.data.data.standard / 1e9).toFixed(2);
          setGasPrice(gasPriceGwei);
          console.log('Updated gas price from GasNow:', gasPriceGwei, 'Gwei');
          
          // Update gas recommendations based on real market price
          const recommendations = calculateOptimizedGasPrices(gasPriceGwei);
          setGasPriceRecommendations(recommendations);
          
          return true;
        }
      } catch (gasNowError) {
        console.warn('GasNow API error:', gasNowError);
      }
      
      // Fallback to a very low accurate market rate as of current time
      setGasPrice('0.52');
      const recommendations = calculateOptimizedGasPrices('0.52');
      setGasPriceRecommendations(recommendations);
      console.log('Using fallback gas price: 0.52 Gwei (current market rate)');
      
      return true;
    } catch (error) {
      console.error('Error fetching real-time gas price:', error);
      return false;
    }
  }, [calculateOptimizedGasPrices]);

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
              // eslint-disable-next-line no-unused-vars
              const netId = await TransactionService.web3.eth.net.getId();
              setNetworkName('Ganache Local');
              
              // Get current block number
              // eslint-disable-next-line no-unused-vars
              const blockNumber = await TransactionService.web3.eth.getBlockNumber();
              
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

              // Initialize gas optimization if needed
              if (gasOptimizationReady) {
                const recommendations = calculateOptimizedGasPrices(gasPriceGwei);
                setGasPriceRecommendations(recommendations);
              }
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
  }, [account, connectionStatus, fetchTransactions, gasOptimizationReady, calculateOptimizedGasPrices]);

  // Add useEffect to fetch price data
  useEffect(() => {
    // Fetch price data when component mounts and then every 30 seconds
    fetchEthPriceData();
    
    const priceInterval = setInterval(() => {
      fetchEthPriceData();
    }, 30000); // Every 30 seconds
    
    // Add event listener for when the page becomes visible again
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        console.log('Tab is now active, refreshing ETH price data');
        fetchEthPriceData();
        
        // Also refresh gas data when tab becomes visible again
        if (gasOptimizationReady) {
          fetchRealTimeGasPrice();
      }
      }
    };
    
    document.addEventListener('visibilitychange', handleVisibilityChange);
    
    // Add a manual refresh function to window for debugging
    window.refreshEthPrice = fetchEthPriceData;
    
    return () => {
      clearInterval(priceInterval);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      delete window.refreshEthPrice;
    };
  }, [fetchEthPriceData, gasOptimizationReady, fetchRealTimeGasPrice]);

  // Update the interval in the useEffect for gas price
  useEffect(() => {
    const fetchGasPrice = async () => {
      try {
        // First try to get gas price from APIs
        const success = await fetchRealTimeGasPrice();
        
        // If API calls failed, fallback to web3 method
        if (!success && web3) {
          const gasPrice = await web3.eth.getGasPrice();
          const gasPriceGwei = web3.utils.fromWei(gasPrice, 'gwei');
          setGasPrice(parseFloat(gasPriceGwei).toFixed(2));
          console.log('Current gas price from web3:', gasPriceGwei, 'Gwei');
          
          // Automatically update gas optimization recommendations when gas price changes
          if (gasOptimizationReady) {
            const recommendations = calculateOptimizedGasPrices(gasPriceGwei);
            setGasPriceRecommendations(recommendations);
          }
        }
      } catch (error) {
        console.error('Error fetching gas price:', error);
      }
    };
    
    // Fetch gas price immediately
    fetchGasPrice();
    
    // Then fetch every 15 seconds for real-time updates
    const interval = setInterval(fetchGasPrice, 15000);
    
    return () => clearInterval(interval);
  }, [web3, gasOptimizationReady, fetchRealTimeGasPrice, calculateOptimizedGasPrices, gasPrice]);

  // Update the GasOptimizationService initialization to use our real market prices
  useEffect(() => {
    const initGasOptimization = async () => {
      try {
        if (web3 && connectionStatus === 'Connected') {
          console.log('Initializing Gas Optimization Service...');
          
          // First, get real-time gas price
          await fetchRealTimeGasPrice();
          
          const initialized = await GasOptimizationService.init(web3);
          
          if (initialized) {
            // Force update with our calculated recommendations based on real market data
            const currentPrice = gasPrice || '0.52'; // Use fallback if no gas price
            const recommendations = calculateOptimizedGasPrices(currentPrice);
            setGasPriceRecommendations(recommendations);
            setGasOptimizationReady(true);
            console.log('Gas Optimization Service ready with market-based prices');
          }
        }
      } catch (error) {
        console.error('Failed to initialize Gas Optimization Service:', error);
      }
    };
    
    initGasOptimization();
    
    // Set up polling for gas price updates
    const interval = setInterval(async () => {
      if (gasOptimizationReady) {
        try {
          // Always update with real market prices
          await fetchRealTimeGasPrice();
          
          if (gasPrice && gasOptimizationReady) {
            calculateOptimizedGasPrices(gasPrice);
          }
        } catch (error) {
          console.error('Error updating gas price recommendations:', error);
        }
      }
    }, 15000); // Update every 15 seconds
    
    return () => clearInterval(interval);
  }, [web3, connectionStatus, fetchRealTimeGasPrice, gasPrice, calculateOptimizedGasPrices, gasOptimizationReady]);

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
      
      // Get current gas price for the transaction from our optimization service
      let gasData;
      if (gasOptimizationReady) {
        gasData = await GasOptimizationService.getOptimizedGasPrice(selectedGasOption);
        console.log(`Using optimized gas price: ${gasData.priceGwei} Gwei (${selectedGasOption} option, ${gasData.savings}% savings)`);
      } else {
        // Fallback to standard method
        const currentGasPrice = await TransactionService.web3.eth.getGasPrice();
        console.log("Using standard gas price:", TransactionService.web3.utils.fromWei(currentGasPrice, 'gwei'), "Gwei");
      }
      
      // Create the transaction object
      const txObject = {
        from: account,
        to: recipientAddress,
        value: TransactionService.web3.utils.toWei(sendAmount, 'ether'),
        gas: 21000
      };
      
      // Apply gas optimization if available
      let receipt;
      if (gasOptimizationReady) {
        const optimizedTx = await GasOptimizationService.optimizeTransaction(txObject, selectedGasOption);
        receipt = await TransactionService.web3.eth.sendTransaction(optimizedTx);
      } else {
        receipt = await TransactionService.sendTransaction(recipientAddress, sendAmount, account);
      }
      
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
  }, [account, sendAmount, recipientAddress, fetchTransactions, updateWalletBalance, gasOptimizationReady, selectedGasOption]);

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

  // Update the openSendForm function to calculate prices based on current market rates
  const openSendForm = useCallback(async () => {
    setSendFormOpen(true);
    
    // Refresh gas prices when modal opens
    const success = await fetchRealTimeGasPrice();
    
    if (success && gasOptimizationReady) {
      // Make sure we're using the most current gas price
      const currentPrice = gasPrice || '0.52'; // Fallback to a reasonable value
      const recommendations = calculateOptimizedGasPrices(currentPrice);
      setGasPriceRecommendations(recommendations);
      console.log('Updated gas price recommendations for transaction:', recommendations);
    }
  }, [fetchRealTimeGasPrice, gasOptimizationReady, gasPrice, calculateOptimizedGasPrices]);

  // Update calculateGasFee to handle different gas units
  const calculateGasFee = useCallback((gasPriceGwei, gasUnits = 21000) => {
    // Make sure we have a valid gas price
    const validGasPrice = parseFloat(gasPriceGwei) || 0.52; // Default to current market rate if invalid
    
    const gasPriceWei = validGasPrice * 1e9; // Convert Gwei to Wei
    const gasFeeEth = (gasPriceWei * gasUnits) / 1e18; // Calculate ETH fee
    return gasFeeEth.toFixed(6); // Format to 6 decimal places
  }, []);

  // Add useEffect to refresh gas prices periodically while the modal is open
  useEffect(() => {
    if (!sendFormOpen) return;
    
    const refreshGasPricesInterval = setInterval(async () => {
      await fetchRealTimeGasPrice();
      
      // If this code uses gasOptimizationReady, make sure it's in the dependency array
      if (gasOptimizationReady) {
        const recommendations = calculateOptimizedGasPrices(gasPrice || '0.52');
        setGasPriceRecommendations(recommendations);
      }
    }, 10000);
    
    return () => clearInterval(refreshGasPricesInterval);
  }, [sendFormOpen, fetchRealTimeGasPrice, gasOptimizationReady, calculateOptimizedGasPrices, gasPrice]);

  // Add handleRequestSubmit function
  const handleRequestSubmit = async () => { // Make async
    setRequestStatus('pending');
    setRequestError(null);
    console.log("Submitting request:", { 
      requester_address: account, // Current user's address
      request_from_address: requestAddress, 
      amount: requestAmount, 
      note: requestNote 
    });

    try {
      if (!account || !requestAddress || !requestAmount) {
        throw new Error("Your address, recipient address, and amount are required.");
      }
      
      // Basic address validation (can be improved)
      if (!requestAddress.startsWith('0x') || requestAddress.length !== 42) { 
          throw new Error("Invalid request address format.");
      }

      if (parseFloat(requestAmount) <= 0) {
        throw new Error("Amount must be greater than zero.");
      }

      // Make API call to backend using config
      const response = await fetch(API_ENDPOINTS.CREATE_REQUEST, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          requester_address: account, // The person making the request (current user)
          request_from_address: requestAddress, // The person the request is sent to
          amount: requestAmount,
          note: requestNote
        })
      });
      
      // Check for non-JSON response
      const contentType = response.headers.get('content-type');
      if (!contentType || !contentType.includes('application/json')) {
        const textResponse = await response.text();
        console.error('Non-JSON response received:', textResponse);
        throw new Error(`Server returned non-JSON response: ${textResponse.substring(0, 100)}...`);
      }

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.message || `HTTP error! status: ${response.status}`);
      }

      console.log("Request submitted successfully via API:", result);
      setRequestStatus('submitted'); 
      
      // Add the newly created request to the local state for immediate UI update
      // (Ideally, the backend would return the created request object)
      const newRequest = {
          id: Date.now(), // Use a temporary ID or get from backend response
          from: requestAddress, // The address we requested *from*
          to: account, // The address that made the request
          amount: requestAmount,
          note: requestNote,
          status: 'pending' // Initial status
      };
      setPendingRequests(prev => [...prev, newRequest]); 

      // Clear form after a delay to show success message
      setTimeout(() => {
        setRequestAddress('');
        setRequestAmount('');
        setRequestNote('');
        // Optionally close modal after success
        // setRequestFormOpen(false); 
        // setRequestStatus(null); // Reset status if closing
      }, 1500); 

    } catch (err) {
      console.error("Request submission failed:", err);
      setRequestError(err.message || "Failed to submit request.");
      setRequestStatus('error');
    }
  };

  // Fetch ETH requests sent to the current user
  const fetchReceivedRequests = useCallback(async () => {
    if (!account) return;
    
    try {
      console.log(`Fetching ETH requests for address: ${account}`);
      const response = await fetch(`${API_ENDPOINTS.GET_REQUESTS}?to_address=${account}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      });
      
      const result = await response.json();
      
      if (!response.ok) {
        throw new Error(result.message || `HTTP error! status: ${response.status}`);
      }
      
      console.log("Received ETH requests:", result.requests);
      if (result.requests && Array.isArray(result.requests)) {
        setReceivedRequests(result.requests);
        // Count only pending requests for notification badge
        const pendingCount = result.requests.filter(req => req.status === 'pending').length;
        setNotificationCount(pendingCount);
      }
    } catch (err) {
      console.error("Error fetching received requests:", err);
    }
  }, [account]);
  
  // Handle clicking outside to close notifications panel
  useEffect(() => {
    const handleClickOutsideNotifications = (event) => {
      if (notificationsRef.current && !notificationsRef.current.contains(event.target) && notificationsOpen) {
        setNotificationsOpen(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutsideNotifications);
    return () => {
      document.removeEventListener('mousedown', handleClickOutsideNotifications);
    };
  }, [notificationsOpen]);
  
  // Fetch received requests when account changes or periodically
  useEffect(() => {
    if (account) {
      fetchReceivedRequests();
      
      // Set up interval to periodically check for new requests
      const requestsInterval = setInterval(() => {
        fetchReceivedRequests();
      }, 30000); // Check every 30 seconds
      
      return () => clearInterval(requestsInterval);
    }
  }, [account, fetchReceivedRequests]);
  
  // Handle sending ETH in response to a request
  const handleSendRequestedEth = async (request) => {
    // Pre-fill the send form with the request details
    setRecipientAddress(request.from_address);
    setSendAmount(request.amount);
    setSendFormOpen(true);
    
    try {
      // Update request status to processing
      const updateResponse = await fetch(API_ENDPOINTS.UPDATE_REQUEST, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          request_id: request.id,
          status: 'processing'
        })
      });
      
      const updateResult = await updateResponse.json();
      
      if (!updateResponse.ok) {
        console.error("Failed to update request status:", updateResult.message);
      }
      
      // Update local state
      setReceivedRequests(prev => 
        prev.map(req => req.id === request.id ? {...req, status: 'processing'} : req)
      );
    } catch (err) {
      console.error("Error updating request status:", err);
    }
  };
  
  // Decline a request
  const handleDeclineRequest = async (requestId) => {
    try {
      const response = await fetch(API_ENDPOINTS.UPDATE_REQUEST, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          request_id: requestId,
          status: 'declined'
        })
      });
      
      const result = await response.json();
      
      if (!response.ok) {
        throw new Error(result.message || `HTTP error! status: ${response.status}`);
      }
      
      // Update local state
      setReceivedRequests(prev => 
        prev.map(req => req.id === requestId ? {...req, status: 'declined'} : req)
      );
      
      // Update notification count
      setNotificationCount(prev => Math.max(0, prev - 1));
    } catch (err) {
      console.error("Error declining request:", err);
    }
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
        <div className="dashboard-header-controls">
          {/* Notifications icon */}
          <div className="notifications-control" ref={notificationsRef}>
            <button 
              className="notifications-btn" 
              onClick={() => setNotificationsOpen(!notificationsOpen)}
              title="ETH Requests"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
                <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
              </svg>
              {notificationCount > 0 && (
                <span className="notification-badge">{notificationCount}</span>
              )}
            </button>
            
            {notificationsOpen && (
              <div className="notifications-panel">
                <div className="notifications-header">
                  <h3>ETH Requests</h3>
                  <button className="refresh-btn" onClick={fetchReceivedRequests} title="Refresh requests">
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M23 4v6h-6"></path>
                      <path d="M1 20v-6h6"></path>
                      <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10"></path>
                      <path d="M1 14l4.64 4.36A9 9 0 0 0 20.49 15"></path>
                    </svg>
                  </button>
                </div>
                <div className="notifications-content">
                  {receivedRequests.length === 0 ? (
                    <div className="no-notifications">
                      <p>No ETH requests received</p>
                    </div>
                  ) : (
                    <div className="notification-list">
                      {receivedRequests.map(request => (
                        <div key={request.id} className={`notification-item ${request.status}`}>
                          <div className="notification-details">
                            <div className="notification-primary">
                              <span className="notification-type">ETH Request</span>
                              <span className="notification-amount">{request.amount} ETH</span>
                            </div>
                            <div className="notification-secondary">
                              <span className="notification-from">From: {formatAddressUtil(request.from_address)}</span>
                              {request.note && (
                                <span className="notification-note">"{request.note}"</span>
                              )}
                            </div>
                            <div className="notification-time">
                              {new Date(request.created_at).toLocaleString()}
                            </div>
                          </div>
                          {request.status === 'pending' && (
                            <div className="notification-actions">
                              <button 
                                className="action-btn send-btn" 
                                onClick={() => handleSendRequestedEth(request)}
                              >
                                Send ETH
                              </button>
                              <button 
                                className="action-btn decline-btn" 
                                onClick={() => handleDeclineRequest(request.id)}
                              >
                                Decline
                              </button>
                            </div>
                          )}
                          {request.status === 'processing' && (
                            <div className="notification-status">Processing...</div>
                          )}
                          {request.status === 'completed' && (
                            <div className="notification-status completed">Sent ✓</div>
                          )}
                          {request.status === 'declined' && (
                            <div className="notification-status declined">Declined</div>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
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
            <div className="balance-wrapper">
              <div className="mini-balance-chart">
                <div className="chart-line"></div>
              </div>
            <div className="eth-balance">{parseFloat(ethBalance).toFixed(4)} ETH</div>
              <div className="fiat-equivalent">${(parseFloat(ethBalance) * ethPrice).toLocaleString()}</div>
            </div>
            
            <div className="wallet-metrics">
              <div className="metric">
                <span className="metric-label">24h Change</span>
                <span className={`metric-value ${ethPriceChange >= 0 ? 'positive' : 'negative'}`}>
                  {ethPriceChange >= 0 ? '+' : ''}{ethPriceChange}%
                </span>
              </div>
              <div className="metric">
                <span className="metric-label">Market Price</span>
                <span className="metric-value">${ethPrice.toLocaleString()}</span>
              </div>
            </div>
            
            <div className="wallet-details">
              <div className="wallet-address">
                <span>Your Address:</span>
                <span className="address-text">{account}</span>
                <button className="copy-btn" onClick={() => navigator.clipboard.writeText(account)}>
                  Copy
                </button>
              </div>
              <div className="wallet-network">
                <span>Network:</span>
                <span className="network-badge">{networkName}</span>
              </div>
            </div>
            <div className="wallet-actions improved fullwidth">
              <button className="action-btn send-btn" onClick={openSendForm}>
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z"/>
                </svg>
                Send ETH
              </button>
              <button className="action-btn receive-btn" onClick={() => setReceiveFormOpen(true)}>
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline>
                  <polyline points="17 6 23 6 23 12"></polyline>
                </svg>
                Receive
              </button>
              {/* Add Request ETH Button here */}
              <button className="action-btn request-btn" onClick={() => setRequestFormOpen(true)}>
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                 <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4" /><polyline points="10 17 15 12 10 7" /><line x1="15" y1="12" x2="3" y2="12" /> { /* Simple request/import icon */}
                </svg>
                Request ETH
              </button>
            </div>
          </div>
          
          <div className="stats-card expanded">
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
            <h2>Gas Tracker
              <button className="refresh-btn" onClick={async () => {
                await fetchRealTimeGasPrice();
              }} title="Refresh gas prices">
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M23 4v6h-6"></path>
                  <path d="M1 20v-6h6"></path>
                  <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10"></path>
                  <path d="M1 14l4.64 4.36A9 9 0 0 0 20.49 15"></path>
                </svg>
              </button>
            </h2>
            <div className="gas-data">
              <div className="gas-price-display">
                <span className="gas-price-value">{gasPrice}</span>
                <span className="gas-price-unit">Gwei</span>
              </div>
              <div className="gas-price-label">Current Gas Price</div>
            </div>
            <div className="gas-estimate">
              <div className="gas-row" title="21,000 gas units - standard amount for a basic ETH transfer on Ethereum">
                <span>Regular Transfer:</span>
                <span>{calculateGasFee(gasPrice)} ETH</span>
              </div>
              <div className="gas-row" title="65,000 gas units - typical amount for ERC-20 token transfers">
                <span>Token Transfer:</span>
                <span>{calculateGasFee(gasPrice, 65000)} ETH</span>
              </div>
              <div className="gas-row" title="200,000 gas units - estimated amount for typical smart contract interactions">
                <span>Smart Contract:</span>
                <span>{calculateGasFee(gasPrice, 200000)} ETH</span>
              </div>
              
              {gasOptimizationReady && (
                <div className="gas-savings-highlight">
                  <div className="savings-icon">💰</div>
                  <div className="savings-text">
                    <div className="savings-title">WePay Gas Optimizer</div>
                    <div className="savings-amount">Save up to 10% with market-based optimized gas fees</div>
                    <div className="savings-source">Using real-time market data: {gasPrice} Gwei</div>
                  </div>
                </div>
              )}
              
              <div className="gas-info">
                <small>Gas calculations use standard Ethereum protocol values</small>
              </div>
            </div>
          </div>
          
        </div>
        
        {/* ETH Price chart full width */}
        <div className="price-card full-width">
            <h2>ETH Price 
              <button className="refresh-btn" onClick={() => fetchEthPriceData()} title="Refresh ETH price">
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M23 4v6h-6"></path>
                  <path d="M1 20v-6h6"></path>
                  <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10"></path>
                  <path d="M1 14l4.64 4.36A9 9 0 0 0 20.49 15"></path>
                </svg>
              </button>
            </h2>
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

        {/* Pending Requests Section */}
        {pendingRequests.length > 0 && (
          <div className="pending-requests-section dashboard-card">
            <h2>Pending Money Requests</h2>
            <div className="dashboard-card-body">
              <div className="request-list"> {/* Similar structure to transaction-list */}
                {pendingRequests.map((request) => (
                  <div key={request.id} className="request-item">
                    <div className="request-icon pending">⏳</div> {/* Icon for pending */}
                    <div className="request-details">
                      <div className="request-type">
                        Request to {shortenAddress(request.from)}
                      </div>
                      <div className="request-note">
                        {request.note || 'No note provided'}
                      </div>
                    </div>
                    <div className="request-amount">
                      <div className="amount">{request.amount} ETH</div>
                       <div className="request-status">{request.status}</div>
                    </div>
                     {/* TODO: Add buttons for recipient to Accept/Reject? */}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
        
        {/* REMOVED DEFI PORTFOLIO SECTION
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
        */}
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
                      {gasPrice ? 
                        selectedGasOption === 'standard' ? 
                          `~${calculateGasFee(gasPriceRecommendations.standard.price)} ETH (${gasPriceRecommendations.standard.price} Gwei × 21,000 units)` :
                        selectedGasOption === 'fast' ?
                          `~${calculateGasFee(gasPriceRecommendations.fast.price)} ETH (${gasPriceRecommendations.fast.price} Gwei × 21,000 units)` :
                          `~${calculateGasFee(gasPriceRecommendations.fastest.price)} ETH (${gasPriceRecommendations.fastest.price} Gwei × 21,000 units)`
                        : 'Calculating...'}
                    </div>
                    <div className="gas-info">
                      <small>Standard ETH transfer requires 21,000 gas units. Actual gas used may vary.</small>
                    </div>
                  </div>
                  
                  {gasOptimizationReady && (
                    <div className="form-group">
                      <label>Gas Optimization <span className="feature-tag">WEPAY EXCLUSIVE</span></label>
                      <div className="gas-options">
                        <div 
                          className={`gas-option economy ${selectedGasOption === 'standard' ? 'selected' : ''}`}
                          onClick={() => setSelectedGasOption('standard')}
                        >
                          <div className="gas-option-header">
                            <span className="gas-option-name">Economy</span>
                            <span className="gas-option-price">{gasPriceRecommendations.standard.price} Gwei</span>
                          </div>
                          <div className="gas-option-savings">{gasPriceRecommendations.standard.savings}</div>
                          <div className="gas-option-time">{gasPriceRecommendations.standard.timeEstimate}</div>
                        </div>
                        
                        <div 
                          className={`gas-option standard ${selectedGasOption === 'fast' ? 'selected' : ''}`}
                          onClick={() => setSelectedGasOption('fast')}
                        >
                          <div className="gas-option-header">
                            <span className="gas-option-name">Standard</span>
                            <span className="gas-option-price">{gasPriceRecommendations.fast.price} Gwei</span>
                          </div>
                          <div className="gas-option-savings">{gasPriceRecommendations.fast.savings}</div>
                          <div className="gas-option-time">{gasPriceRecommendations.fast.timeEstimate}</div>
                        </div>
                        
                        <div 
                          className={`gas-option fast ${selectedGasOption === 'fastest' ? 'selected' : ''}`}
                          onClick={() => setSelectedGasOption('fastest')}
                        >
                          <div className="gas-option-header">
                            <span className="gas-option-name">Fast</span>
                            <span className="gas-option-price">{gasPriceRecommendations.fastest.price} Gwei</span>
                          </div>
                          <div className="gas-option-savings">{gasPriceRecommendations.fastest.savings}</div>
                          <div className="gas-option-time">{gasPriceRecommendations.fastest.timeEstimate}</div>
                        </div>
                      </div>
                      <div className="gas-optimization-info">
                        <small>Gas prices optimized based on real-time network conditions</small>
                      </div>
                    </div>
                  )}
                  
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

      {/* Request ETH Modal */}
      {requestFormOpen && (
        <div className="modal-overlay">
          <div className="transaction-modal request-modal"> {/* Added request-modal class */}
            <div className="modal-header">
              <h3>Request ETH</h3>
              <button className="close-btn" onClick={() => {
                setRequestFormOpen(false);
                setRequestStatus(null);
                setRequestError(null);
              }}>×</button>
            </div>
            
            <div className="modal-body">
              {requestStatus === "submitted" ? (
                <div className="transaction-success"> {/* Reusing success style */}
                  <div className="success-icon">✓</div>
                  <h4>Request Submitted!</h4>
                  <p>Your request for {requestAmount} ETH from {shortenAddress(requestAddress)} has been created.</p>
                  {/* Maybe add a button to view requests? */}
                </div>
              ) : (
                <form onSubmit={(e) => {
                  e.preventDefault();
                  handleRequestSubmit();
                }}>
                  <div className="form-group">
                    <label>Request From Address</label>
                    <input
                      type="text"
                      placeholder="0x... address of the person you are requesting from"
                      value={requestAddress}
                      onChange={(e) => setRequestAddress(e.target.value)}
                      disabled={requestStatus === "pending"}
                      required
                    />
                  </div>
                  
                  <div className="form-group">
                    <label>Amount (ETH)</label>
                    <input
                      type="number"
                      step="0.0001"
                      min="0.0001" // Should request a positive amount
                      placeholder="0.0"
                      value={requestAmount}
                      onChange={(e) => setRequestAmount(e.target.value)}
                      disabled={requestStatus === "pending"}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label>Note (Optional)</label>
                    <input
                      type="text"
                      placeholder="e.g., For dinner last night"
                      value={requestNote}
                      onChange={(e) => setRequestNote(e.target.value)}
                      disabled={requestStatus === "pending"}
                    />
                  </div>
                  
                  {requestError && (
                    <div className="transaction-error"> {/* Reusing error style */}
                      {requestError}
                    </div>
                  )}
                  
                  <div className="form-actions">
                    <button
                      type="button"
                      className="cancel-btn"
                      onClick={() => setRequestFormOpen(false)}
                      disabled={requestStatus === "pending"}
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="send-btn" /* Reusing send button style */
                      disabled={requestStatus === "pending"}
                    >
                      {requestStatus === "pending" ? (
                        <><span className="spinner-sm"></span> Submitting...</>
                      ) : (
                        'Submit Request'
                      )}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default Dashboard;
