// Create a new file: src/services/transactionService.js

import Web3 from 'web3';

// Simple transaction service focused on reliability
const TransactionService = {
  // Web3 instance
  web3: null,
  
  // Initialize the service with direct connection to Ganache
  init: async () => {
    try {
      console.log('Initializing TransactionService...');
      
      // Connect directly to Ganache with HTTP provider
      const ganacheUrl = 'http://127.0.0.1:7545';
      console.log(`Connecting to Ganache at ${ganacheUrl}`);
      
      // Create a new Web3 instance with HTTP provider
      const provider = new Web3.providers.HttpProvider(ganacheUrl);
      TransactionService.web3 = new Web3(provider);
      
      // Verify connection
      const isConnected = await TransactionService.web3.eth.net.isListening();
      
      if (isConnected) {
        console.log('Successfully connected to Ganache');
        
        // Get chain ID to confirm connection
        const chainId = await TransactionService.web3.eth.getChainId();
        console.log(`Connected to chain ID: ${chainId}`);
        
        return true;
      } else {
        console.error('Failed to connect to Ganache');
        return false;
      }
    } catch (error) {
      console.error('TransactionService initialization error:', error);
      return false;
    }
  },
  
  // Get all accounts from Ganache
  getAccounts: async () => {
    try {
      // Ensure web3 is initialized
      if (!TransactionService.web3) {
        await TransactionService.init();
      }
      
      const accounts = await TransactionService.web3.eth.getAccounts();
      console.log(`Retrieved ${accounts.length} accounts from Ganache`);
      return accounts;
    } catch (error) {
      console.error('Error getting accounts:', error);
      return [];
    }
  },
  
  // Get first account (for simplicity since users only have one account)
  getDefaultAccount: async () => {
    try {
      // Get user's account from localStorage if available
      const userString = localStorage.getItem('user');
      if (userString) {
        const userData = JSON.parse(userString);
        if (userData && userData.wallet_address) {
          return userData.wallet_address;
        }
      }
      
      // Fall back to first Ganache account
      const accounts = await TransactionService.getAccounts();
      return accounts.length > 0 ? accounts[0] : null;
    } catch (error) {
      console.error('Error getting default account:', error);
      return null;
    }
  },
  
  // Get account balance
  getBalance: async (address) => {
    try {
      if (!TransactionService.web3) {
        await TransactionService.init();
      }
      
      if (!address) {
        address = await TransactionService.getDefaultAccount();
      }
      
      if (!address) {
        throw new Error('No account available');
      }
      
      const balanceWei = await TransactionService.web3.eth.getBalance(address);
      // Ensure balanceWei is handled as string
      const balanceEth = TransactionService.web3.utils.fromWei(String(balanceWei), 'ether');
      return balanceEth;
    } catch (error) {
      console.error('Error getting balance:', error);
      return '0';
    }
  },
  
  // Get all transactions for an account directly from Ganache
  getTransactions: async (address) => {
    try {
      if (!TransactionService.web3) {
        await TransactionService.init();
      }
      
      if (!address) {
        address = await TransactionService.getDefaultAccount();
      }
      
      if (!address) {
        throw new Error('No account available');
      }
      
      // Normalize the address for comparison
      const normalizedAddress = address.toLowerCase();
      console.log(`Fetching transactions for address: ${normalizedAddress}`);
      
      // Get the latest block number
      const latestBlockNumber = await TransactionService.web3.eth.getBlockNumber();
      console.log(`Latest block number: ${latestBlockNumber}`);
      
      // Check the last 50 blocks (adjust as needed)
      // Convert latestBlockNumber to a regular number to avoid BigInt errors with Math.min
      const latestBlockAsNumber = Number(latestBlockNumber);
      const blocksToCheck = Math.min(50, latestBlockAsNumber);
      console.log(`Will check the latest ${blocksToCheck} blocks`);
      
      const transactions = [];
      
      // Process blocks one by one (more reliable than batch processing)
      for (let i = 0; i < blocksToCheck; i++) {
        const blockNumber = latestBlockAsNumber - i;
        
        try {
          // Get the block with full transaction objects
          const block = await TransactionService.web3.eth.getBlock(blockNumber, true);
          
          if (block && block.transactions) {
            console.log(`Block ${blockNumber} has ${block.transactions.length} transactions`);
            
            // Check each transaction in the block
            for (const tx of block.transactions) {
              // Convert addresses to lowercase for comparison
              const txFromAddress = tx.from ? tx.from.toLowerCase() : '';
              const txToAddress = tx.to ? tx.to.toLowerCase() : '';
              
              // Check if transaction involves our address
              if (txFromAddress === normalizedAddress || txToAddress === normalizedAddress) {
                console.log(`Found matching transaction: ${tx.hash}`);
                
                // Determine transaction type
                const type = txFromAddress === normalizedAddress ? 'Transfer' : 'Receive';
                
                // Create a transaction object - convert all numeric values to strings
                const transaction = {
                  id: tx.hash,
                  blockNumber: String(tx.blockNumber),
                  from: tx.from,
                  to: tx.to || 'Contract Creation',
                  value: String(tx.value), // Convert to string to avoid BigInt issues
                  gas: String(tx.gas || '0'),
                  gasPrice: String(tx.gasPrice || '0'),
                  timestamp: Number(block.timestamp) * 1000, // Convert to milliseconds after converting to Number
                  status: 'confirmed',
                  type: type
                };
                
                transactions.push(transaction);
              }
            }
          }
        } catch (blockError) {
          console.error(`Error processing block ${blockNumber}:`, blockError);
          // Continue with next block
        }
      }
      
      console.log(`Found ${transactions.length} transactions for address ${normalizedAddress}`);
      
      // Add local transactions from localStorage
      const localTransactions = TransactionService.getLocalTransactions();
      
      // Add local transactions that aren't already in the list
      for (const localTx of localTransactions) {
        if (!transactions.some(tx => tx.id === localTx.hash)) {
          const isOutgoing = localTx.from.toLowerCase() === normalizedAddress;
          
          transactions.push({
            id: localTx.hash,
            blockNumber: '0',
            from: localTx.from,
            to: localTx.to,
            value: String(localTx.value || '0'),
            gas: String(localTx.gas || '21000'),
            gasPrice: String(localTx.gasPrice || '0'),
            timestamp: localTx.timestamp,
            status: localTx.status || 'confirmed',
            type: isOutgoing ? 'Transfer' : 'Receive'
          });
        }
      }
      
      // Sort by timestamp (newest first)
      transactions.sort((a, b) => Number(b.timestamp) - Number(a.timestamp));
      
      return transactions;
    } catch (error) {
      console.error('Error fetching transactions:', error);
      return [];
    }
  },
  
  // Send ETH transaction
  sendTransaction: async (to, amount, from = null) => {
    try {
      if (!TransactionService.web3) {
        await TransactionService.init();
      }
      
      if (!from) {
        from = await TransactionService.getDefaultAccount();
      }
      
      if (!from) {
        throw new Error('No sender account available');
      }
      
      if (!to || !TransactionService.web3.utils.isAddress(to)) {
        throw new Error('Invalid recipient address');
      }
      
      if (!amount || isNaN(Number(amount)) || Number(amount) <= 0) {
        throw new Error('Invalid amount');
      }
      
      // Convert ETH to Wei
      const amountWei = TransactionService.web3.utils.toWei(String(amount), 'ether');
      
      // Get the current gas price
      const gasPrice = await TransactionService.web3.eth.getGasPrice();
      console.log('Current gas price:', TransactionService.web3.utils.fromWei(gasPrice, 'gwei'), 'Gwei');
      
      // Create transaction object
      const txObject = {
        from: from,
        to: to,
        value: amountWei,
        gas: 21000,
        gasPrice: gasPrice
      };
      
      console.log('Sending transaction:', txObject);
      
      // Send transaction
      const receipt = await TransactionService.web3.eth.sendTransaction(txObject);
      console.log('Transaction receipt:', receipt);
      
      // Save to local storage
      const transaction = {
        hash: receipt.transactionHash,
        from: from,
        to: to,
        value: String(amount),
        gas: '21000',
        gasPrice: String(gasPrice),
        timestamp: Date.now(),
        status: receipt.status ? 'success' : 'failed',
        type: 'Transfer'
      };
      
      TransactionService.saveLocalTransaction(transaction);
      
      return receipt;
    } catch (error) {
      console.error('Error sending transaction:', error);
      throw error;
    }
  },
  
  // Get transactions from localStorage
  getLocalTransactions: () => {
    try {
      const transactionsJson = localStorage.getItem('transactions');
      return transactionsJson ? JSON.parse(transactionsJson) : [];
    } catch (error) {
      console.error('Error getting local transactions:', error);
      return [];
    }
  },
  
  // Save transaction to localStorage
  saveLocalTransaction: (transaction) => {
    try {
      const transactions = TransactionService.getLocalTransactions();
      
      // Add to beginning of array
      transactions.unshift(transaction);
      
      // Save back to localStorage
      localStorage.setItem('transactions', JSON.stringify(transactions));
      
      console.log('Transaction saved to localStorage');
    } catch (error) {
      console.error('Error saving transaction:', error);
    }
  },
  
  // Convert Wei to ETH (safely handling BigInt)
  weiToEth: (weiValue) => {
    try {
      if (!weiValue) return '0';
      
      // Ensure we have a valid Web3 instance
      if (!TransactionService.web3) {
        return '0';
      }
      
      // Always convert to string to handle BigInt values
      const weiString = String(weiValue);
      return TransactionService.web3.utils.fromWei(weiString, 'ether');
    } catch (error) {
      console.error('Error converting Wei to ETH:', error);
      return '0';
    }
  },
  
  // Calculate gas fee in ETH
  calculateGasFee: (gas, gasPrice) => {
    try {
      if (!gas || !gasPrice) return '0';
      
      // Ensure we have a valid Web3 instance
      if (!TransactionService.web3) {
        return '0';
      }
      
      // Always convert to string to handle large values
      const gasString = String(gas);
      const gasPriceString = String(gasPrice);
      
      try {
        // Use Web3's fromWei directly instead of BigInt
        if (TransactionService.web3.utils.fromWei) {
          // For larger numbers, we can use string calculation through Web3
          // First, calculate gas * gasPrice in wei
          // Since we can't multiply strings, convert to reasonable numbers first
          // Then convert the result to ether
          
          // Convert to safe numbers if possible
          const gasNum = Number(gasString);
          const gasPriceNum = Number(gasPriceString);
          
          // Check if conversion is safe (not too large)
          if (!isNaN(gasNum) && !isNaN(gasPriceNum) && 
              gasNum < 1e15 && gasPriceNum < 1e15) {
            // Safe to multiply as numbers
            const gasFeeWei = gasNum * gasPriceNum;
            return TransactionService.web3.utils.fromWei(String(Math.floor(gasFeeWei)), 'ether');
          } else {
            // Numbers too large, use a more careful approach
            // We'll divide by 1e18 manually for conversion to ether
            // This is less accurate but should handle most cases
            return (Number(gasString) * Number(gasPriceString) / 1e18).toFixed(18);
          }
        } else {
          // If fromWei is not available, do manual calculation
          return (Number(gasString) * Number(gasPriceString) / 1e18).toFixed(18);
        }
      } catch (calcError) {
        console.error('Gas calculation error:', calcError);
        
        // Last resort fallback calculation
        // Try to extract numeric parts if strings contain non-numeric characters
        const extractNumber = (str) => {
          const matches = str.match(/\d+/);
          return matches ? Number(matches[0]) : 0;
        };
        
        const gasNum = extractNumber(gasString);
        const gasPriceNum = extractNumber(gasPriceString);
        return (gasNum * gasPriceNum / 1e18).toFixed(18);
      }
    } catch (error) {
      console.error('Error calculating gas fee:', error);
      return '0';
    }
  }
};

export default TransactionService;