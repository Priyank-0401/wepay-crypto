// Create a new file: src/services/transactionService.js

import Web3 from 'web3';

// Transaction service to handle all Ethereum transactions
const TransactionService = {
  // Web3 instance
  web3: null,
  
  // Initialize the service
  init: async () => {
    try {
      // Connect to Ganache
      TransactionService.web3 = new Web3('http://127.0.0.1:7545');
      const isConnected = await TransactionService.web3.eth.net.isListening();
      if (!isConnected) {
        throw new Error('Failed to connect to Ganache');
      }
      console.log('TransactionService initialized successfully');
      return true;
    } catch (error) {
      console.error('TransactionService initialization error:', error);
      return false;
    }
  },
  
  // Get accounts from Ganache
  getAccounts: async () => {
    try {
      return await TransactionService.web3.eth.getAccounts();
    } catch (error) {
      console.error('Error getting accounts:', error);
      throw error;
    }
  },
  
  // Get balance for a specific account
  getBalance: async (address) => {
    try {
      const balanceWei = await TransactionService.web3.eth.getBalance(address);
      return TransactionService.web3.utils.fromWei(balanceWei, 'ether');
    } catch (error) {
      console.error('Error getting balance:', error);
      throw error;
    }
  },
  
  // Estimate gas for a transaction
  estimateGas: async (from, to, value) => {
    try {
      const gasPrice = await TransactionService.web3.eth.getGasPrice();
      const gasEstimate = await TransactionService.web3.eth.estimateGas({
        from,
        to,
        value: TransactionService.web3.utils.toWei(value, 'ether')
      });
      
      const gasFeeWei = calculateGasFee(gasEstimate, gasPrice);
      
      const gasCostWei = Web3.utils.toBN(gasFeeWei).mul(Web3.utils.toBN(gasEstimate));
      const gasCostEth = TransactionService.web3.utils.fromWei(gasCostWei.toString(), 'ether');
      
      return {
        gasEstimate,
        gasPrice: TransactionService.web3.utils.fromWei(gasPrice, 'gwei'),
        gasCostEth
      };
    } catch (error) {
      console.error('Error estimating gas:', error);
      throw error;
    }
  },
  
  // Send ETH from one account to another
  sendTransaction: async (from, to, amount, callback) => {
    try {
      const valueInWei = TransactionService.web3.utils.toWei(amount, 'ether');
      
      // Get the transaction count (nonce)
      const nonce = await TransactionService.web3.eth.getTransactionCount(from);
      
      const gasPrice = await TransactionService.web3.eth.getGasPrice();
      const gasLimit = await TransactionService.web3.eth.estimateGas({
        from,
        to,
        value: valueInWei
      });
      
      // Prepare transaction object
      const txObject = {
        from,
        to,
        value: valueInWei,
        gas: gasLimit,
        gasPrice,
        nonce
      };
      
      // Send the transaction
      const receipt = await TransactionService.web3.eth.sendTransaction(txObject);
      
      // Store in local storage for transaction history
      TransactionService.saveTransaction({
        hash: receipt.transactionHash,
        from,
        to,
        value: amount,
        timestamp: Date.now(),
        status: receipt.status ? 'success' : 'failed',
        type: 'send'
      });
      
      return receipt;
    } catch (error) {
      console.error('Error sending transaction:', error);
      throw error;
    }
  },
  
  // Save transaction to local storage for history
  saveTransaction: (transaction) => {
    try {
      const transactions = JSON.parse(localStorage.getItem('transactions') || '[]');
      transactions.push(transaction);
      localStorage.setItem('transactions', JSON.stringify(transactions));
    } catch (error) {
      console.error('Error saving transaction to history:', error);
    }
  },
  
  // Get transaction history from local storage
  getTransactionHistory: () => {
    try {
      return JSON.parse(localStorage.getItem('transactions') || '[]');
    } catch (error) {
      console.error('Error retrieving transaction history:', error);
      return [];
    }
  },
  
  // Create a request for ETH (stores in local storage)
  createRequest: async (from, to, amount, description) => {
    try {
      const request = {
        id: `req_${Date.now()}`,
        from,
        to,
        amount,
        description,
        status: 'pending',
        timestamp: Date.now()
      };
      
      // Save to local storage
      const requests = JSON.parse(localStorage.getItem('requests') || '[]');
      requests.push(request);
      localStorage.setItem('requests', JSON.stringify(requests));
      
      return request;
    } catch (error) {
      console.error('Error creating request:', error);
      throw error;
    }
  },
  
  // Get all pending requests
  getPendingRequests: (address) => {
    try {
      const requests = JSON.parse(localStorage.getItem('requests') || '[]');
      return requests.filter(req => 
        (req.to === address || req.from === address) && 
        req.status === 'pending'
      );
    } catch (error) {
      console.error('Error retrieving pending requests:', error);
      return [];
    }
  },
  
  // Fulfill a payment request
  fulfillRequest: async (requestId, from) => {
    try {
      const requests = JSON.parse(localStorage.getItem('requests') || '[]');
      const requestIndex = requests.findIndex(req => req.id === requestId);
      
      if (requestIndex === -1) {
        throw new Error('Request not found');
      }
      
      const request = requests[requestIndex];
      
      // Send the transaction
      const receipt = await TransactionService.sendTransaction(
        from, 
        request.from,  // The requester becomes the recipient
        request.amount
      );
      
      // Update request status
      request.status = 'completed';
      request.paymentTxHash = receipt.transactionHash;
      requests[requestIndex] = request;
      localStorage.setItem('requests', JSON.stringify(requests));
      
      return receipt;
    } catch (error) {
      console.error('Error fulfilling request:', error);
      throw error;
    }
  }
};

// Instead of BigInt
const calculateGasFee = (gas, gasPrice) => {
  try {
    // Create BN instances from Web3
    const gasBN = Web3.utils.toBN(gas);
    const gasPriceBN = Web3.utils.toBN(gasPrice);
    
    // Calculate gas fee
    const gasFeeWei = gasBN.mul(gasPriceBN);
    
    // Convert to ETH
    return Web3.utils.fromWei(gasFeeWei, 'ether');
  } catch (error) {
    console.error("Error calculating gas fee:", error);
    // Fallback calculation
    return (Number(gas) * Number(gasPrice) / 1e18).toFixed(6);
  }
};

export default TransactionService;