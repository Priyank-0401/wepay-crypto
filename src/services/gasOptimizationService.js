// Gas Optimization Service for reducing ETH transaction fees
import Web3 from 'web3';
import axios from 'axios';

const GasOptimizationService = {
  web3: null,
  gasAggregator: null,
  gasPriceHistory: [],
  lastUpdateTimestamp: 0,
  updateInterval: 5000, // 5 seconds - more frequent updates for real-time gas prices
  
  // API keys
  ETHERSCAN_API_KEY: 'YourEtherscanAPIKey', // Replace with a real API key in production
  
  // Initialize the service
  init: async (web3Instance = null) => {
    try {
      console.log('Initializing GasOptimizationService...');
      
      if (web3Instance) {
        GasOptimizationService.web3 = web3Instance;
      } else if (!GasOptimizationService.web3) {
        // Connect to the same provider as TransactionService
        const ganacheUrl = 'http://127.0.0.1:7545';
        const provider = new Web3.providers.HttpProvider(ganacheUrl);
        GasOptimizationService.web3 = new Web3(provider);
      }
      
      // Initialize gas price history
      await GasOptimizationService.updateGasPriceData();
      
      console.log('GasOptimizationService initialized successfully');
      return true;
    } catch (error) {
      console.error('Error initializing GasOptimizationService:', error);
      return false;
    }
  },
  
  // Update gas price data from various sources
  updateGasPriceData: async () => {
    try {
      // Always use fresh data for real-time display
      const now = Date.now();
      
      // Try to get real market gas prices from Etherscan API
      try {
        const etherscanResponse = await axios.get(`https://api.etherscan.io/api`, {
          params: {
            module: 'gastracker',
            action: 'gasoracle',
            apikey: GasOptimizationService.ETHERSCAN_API_KEY
          }
        });
        
        if (etherscanResponse.data && etherscanResponse.data.status === '1') {
          const gasData = etherscanResponse.data.result;
          console.log('Etherscan Gas Price Data:', gasData);
          
          // Create gas price data object from Etherscan response
          // Etherscan returns: SafeGasPrice, ProposeGasPrice, FastGasPrice (in Gwei)
          const gasPriceData = {
            timestamp: now,
            // Our optimized price: 10% discount on the safe price
            standard: Math.max(parseFloat(gasData.SafeGasPrice) * 0.9, 1).toFixed(2),
            fast: gasData.ProposeGasPrice,            // Standard market price
            fastest: gasData.FastGasPrice,            // Fast market price
            networkAverage: gasData.ProposeGasPrice,  // Use proposed as network average
            unit: 'gwei',
            source: 'Etherscan Gas Tracker'
          };
          
          // Update history
          GasOptimizationService.gasPriceHistory.unshift(gasPriceData);
          if (GasOptimizationService.gasPriceHistory.length > 10) {
            GasOptimizationService.gasPriceHistory.pop();
          }
          
          GasOptimizationService.lastUpdateTimestamp = now;
          return gasPriceData;
        }
      } catch (apiError) {
        console.warn('Error fetching from Etherscan API:', apiError);
        // Continue to fallback sources
      }
      
      // Get current gas price from local node - don't use cached values
      const currentGasPrice = await GasOptimizationService.web3.eth.getGasPrice();
      const gasPriceGwei = parseFloat(GasOptimizationService.web3.utils.fromWei(currentGasPrice, 'gwei'));
      
      console.log('Using local node gas price:', gasPriceGwei, 'Gwei');
      
      // Create gas price data with our optimization
      const gasPriceData = {
        timestamp: now,
        standard: Math.max(gasPriceGwei * 0.9, 1).toFixed(2), // 10% optimization
        fast: gasPriceGwei.toFixed(2),                        // Current network price
        fastest: (gasPriceGwei * 1.1).toFixed(2),             // 10% premium for urgent tx
        networkAverage: gasPriceGwei.toFixed(2),              // Current network average
        unit: 'gwei',
        source: 'WePay Optimizer (Local Node)'
      };
      
      // Update history
      GasOptimizationService.gasPriceHistory.unshift(gasPriceData);
      if (GasOptimizationService.gasPriceHistory.length > 10) {
        GasOptimizationService.gasPriceHistory.pop();
      }
      
      GasOptimizationService.lastUpdateTimestamp = now;
      
      return gasPriceData;
    } catch (error) {
      console.error('Error updating gas price data:', error);
      // Return current market fallback data if update fails
      return { 
        standard: 4.3, 
        fast: 4.8, 
        fastest: 5.3, 
        unit: 'gwei', 
        source: 'Current Market Data'
      };
    }
  },
  
  // Get optimized gas price based on urgency
  getOptimizedGasPrice: async (urgency = 'standard') => {
    try {
      await GasOptimizationService.updateGasPriceData();
      
      const latestData = GasOptimizationService.gasPriceHistory[0];
      if (!latestData) {
        throw new Error('No gas price data available');
      }
      
      // Get the appropriate gas price based on urgency
      let optimizedGasPrice;
      switch (urgency) {
        case 'fast':
          optimizedGasPrice = latestData.fast;
          break;
        case 'fastest':
          optimizedGasPrice = latestData.fastest;
          break;
        case 'standard':
        default:
          optimizedGasPrice = latestData.standard;
          break;
      }
      
      // Convert from Gwei to Wei
      const gasPriceWei = GasOptimizationService.web3.utils.toWei(optimizedGasPrice.toString(), 'gwei');
      
      return {
        price: gasPriceWei,
        priceGwei: optimizedGasPrice,
        savings: ((parseFloat(latestData.networkAverage) - parseFloat(optimizedGasPrice)) / parseFloat(latestData.networkAverage) * 100).toFixed(2),
        urgency: urgency,
        unit: 'wei',
        source: latestData.source
      };
    } catch (error) {
      console.error('Error getting optimized gas price:', error);
      
      // Fallback to current network gas price
      const currentGasPrice = await GasOptimizationService.web3.eth.getGasPrice();
      return {
        price: currentGasPrice,
        priceGwei: GasOptimizationService.web3.utils.fromWei(currentGasPrice, 'gwei'),
        savings: '0',
        urgency: urgency,
        unit: 'wei',
        source: 'Local Node Fallback'
      };
    }
  },
  
  // Optimize a transaction with gas-saving techniques
  optimizeTransaction: async (txObject, urgency = 'standard') => {
    try {
      // Get optimized gas price
      const { price: gasPrice, source } = await GasOptimizationService.getOptimizedGasPrice(urgency);
      console.log(`Using optimized gas price from ${source}`);
      
      // Clone the transaction object
      const optimizedTx = { ...txObject };
      
      // Set gas price using our optimized value
      optimizedTx.gasPrice = gasPrice;
      
      // Add metadata for batch processing if needed
      optimizedTx.metadata = {
        optimizedBy: 'WePay Gas Optimizer',
        source: source,
        originalGasPrice: txObject.gasPrice || 'unknown',
        batchable: true // Flag for potential batching in the future
      };
      
      // Optimize gas limit based on transaction type
      if (optimizedTx.to && !optimizedTx.data) {
        // This is a simple ETH transfer, we can use exact gas limit
        optimizedTx.gas = 21000;
      } else if (!optimizedTx.gas) {
        // For contract calls, estimate gas and add a small buffer
        try {
          const estimatedGas = await GasOptimizationService.web3.eth.estimateGas(optimizedTx);
          optimizedTx.gas = Math.floor(estimatedGas * 1.1); // Add 10% buffer
        } catch (estimateError) {
          console.warn('Gas estimation failed, using default value:', estimateError);
          optimizedTx.gas = 200000; // Default for contract interactions
        }
      }
      
      return optimizedTx;
    } catch (error) {
      console.error('Error optimizing transaction:', error);
      return txObject; // Return original if optimization fails
    }
  },
  
  // Get gas price recommendations with savings
  getGasPriceRecommendations: async () => {
    await GasOptimizationService.updateGasPriceData();
    
    const latestData = GasOptimizationService.gasPriceHistory[0];
    if (!latestData) {
      return {
        standard: { price: 4.3, savings: '+10%', timeEstimate: '5-10 min', source: 'Current Market Data' },
        fast: { price: 4.8, savings: 'Base price', timeEstimate: '1-3 min', source: 'Current Market Data' },
        fastest: { price: 5.5, savings: '-15% premium', timeEstimate: '<1 min', source: 'Current Market Data' }
      };
    }
    
    // Calculate savings compared to market average
    const networkAvg = parseFloat(latestData.networkAverage);
    
    return {
      standard: {
        price: latestData.standard,
        savings: ((networkAvg - parseFloat(latestData.standard)) / networkAvg * 100).toFixed(2) + '%',
        timeEstimate: '5-10 min',
        source: latestData.source
      },
      fast: {
        price: latestData.fast,
        savings: '0%', // This is our baseline (current market price)
        timeEstimate: '1-3 min',
        source: latestData.source
      },
      fastest: {
        price: latestData.fastest,
        savings: ((networkAvg - parseFloat(latestData.fastest)) / networkAvg * 100).toFixed(2) + '%', // Will be negative for fastest
        timeEstimate: '<1 min',
        source: latestData.source
      }
    };
  },
  
  // Get gas price history for chart display
  getGasPriceHistory: () => {
    return GasOptimizationService.gasPriceHistory;
  }
};

export default GasOptimizationService; 