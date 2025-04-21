# WePay Gas Optimization System - Integration Guide

This guide provides detailed instructions for integrating the WePay contract system with external applications, including both Web and Mobile interfaces.

## Overview

The WePay Gas Optimization System provides a set of smart contracts that optimize gas costs by batching multiple transactions together. This guide explains how to integrate your application with these contracts using Web3.js, ethers.js, or other libraries.

## Prerequisites

- Basic understanding of Ethereum and Web3
- Node.js environment for web applications
- Solidity knowledge for contract interactions
- A functioning Web3 provider (Infura, Alchemy, or your own node)

## Available Contracts

The WePay system consists of the following key contracts:

| Contract Name | Description | Address |
|--------------|-------------|---------|
| WePayGasOptimizer | Core contract that handles transaction batching | Determined at deployment |
| WePayProxy | Transparent proxy for upgradability | Determined at deployment |
| WePayGovernance | Governance protocol for system parameters | Determined at deployment |
| CrossChainExecutor | Enables cross-chain transactions | Determined at deployment |
| Layer2Executor | Supports Layer 2 scaling solutions | Determined at deployment |

## Integration Options

### 1. Direct Contract Interaction

For applications that need direct interaction with the WePay contracts, you can use the contract ABIs and addresses.

#### Using Web3.js

```javascript
import Web3 from 'web3';
import WePayGasOptimizerABI from './abis/WePayGasOptimizer.json';

// Initialize Web3 with provider
const web3 = new Web3(window.ethereum || 'https://mainnet.infura.io/v3/YOUR_INFURA_KEY');

// Initialize contract instance
const optimizerAddress = '0x...'; // WePay Optimizer address
const optimizerContract = new web3.eth.Contract(WePayGasOptimizerABI, optimizerAddress);

// Example: Deposit ETH to the contract
async function depositEth(amount) {
  try {
    const accounts = await web3.eth.getAccounts();
    const sender = accounts[0];
    const amountWei = web3.utils.toWei(amount.toString(), 'ether');
    
    const tx = await optimizerContract.methods.deposit().send({
      from: sender,
      value: amountWei,
      gas: 50000
    });
    
    console.log('Deposit successful:', tx.transactionHash);
    return tx;
  } catch (error) {
    console.error('Deposit failed:', error);
    throw error;
  }
}

// Example: Submit a transaction to be batched
async function submitTransaction(recipient, amount, data = '0x') {
  try {
    const accounts = await web3.eth.getAccounts();
    const sender = accounts[0];
    const amountWei = web3.utils.toWei(amount.toString(), 'ether');
    
    const tx = await optimizerContract.methods.submitTransaction(
      recipient,
      amountWei,
      data
    ).send({
      from: sender,
      gas: 100000
    });
    
    console.log('Transaction submitted:', tx.transactionHash);
    return tx;
  } catch (error) {
    console.error('Transaction submission failed:', error);
    throw error;
  }
}

// Example: Check account balance in the contract
async function checkBalance(address) {
  try {
    const balanceWei = await optimizerContract.methods.balances(address).call();
    const balanceEth = web3.utils.fromWei(balanceWei, 'ether');
    return balanceEth;
  } catch (error) {
    console.error('Balance check failed:', error);
    throw error;
  }
}
```

#### Using ethers.js

```javascript
import { ethers } from 'ethers';
import WePayGasOptimizerABI from './abis/WePayGasOptimizer.json';

// Initialize provider and signer
const provider = new ethers.providers.Web3Provider(window.ethereum);
const signer = provider.getSigner();

// Initialize contract instance
const optimizerAddress = '0x...'; // WePay Optimizer address
const optimizerContract = new ethers.Contract(
  optimizerAddress,
  WePayGasOptimizerABI,
  signer
);

// Example: Deposit ETH to the contract
async function depositEth(amount) {
  try {
    const amountWei = ethers.utils.parseEther(amount.toString());
    const tx = await optimizerContract.deposit({ value: amountWei });
    const receipt = await tx.wait();
    
    console.log('Deposit successful:', receipt.transactionHash);
    return receipt;
  } catch (error) {
    console.error('Deposit failed:', error);
    throw error;
  }
}

// Example: Submit a transaction to be batched
async function submitTransaction(recipient, amount, data = '0x') {
  try {
    const amountWei = ethers.utils.parseEther(amount.toString());
    const tx = await optimizerContract.submitTransaction(recipient, amountWei, data);
    const receipt = await tx.wait();
    
    console.log('Transaction submitted:', receipt.transactionHash);
    return receipt;
  } catch (error) {
    console.error('Transaction submission failed:', error);
    throw error;
  }
}

// Example: Check account balance in the contract
async function checkBalance(address) {
  try {
    const balanceWei = await optimizerContract.balances(address);
    const balanceEth = ethers.utils.formatEther(balanceWei);
    return balanceEth;
  } catch (error) {
    console.error('Balance check failed:', error);
    throw error;
  }
}
```

### 2. Using WePay SDK (Recommended)

For easier integration, you can use our prebuilt SDK that handles all contract interactions.

```javascript
import { WePaySDK } from '@wepay/sdk';

// Initialize the SDK with your provider
const wepay = new WePaySDK({
  provider: window.ethereum || 'https://mainnet.infura.io/v3/YOUR_INFURA_KEY',
  network: 'mainnet', // or 'testnet', 'goerli', etc.
});

// Connect user's wallet
async function connectWallet() {
  try {
    await wepay.connect();
    console.log('Connected account:', wepay.getAccount());
  } catch (error) {
    console.error('Connection failed:', error);
  }
}

// Deposit funds
async function deposit(amount) {
  try {
    const result = await wepay.deposit(amount);
    console.log('Deposit successful:', result.transactionHash);
    return result;
  } catch (error) {
    console.error('Deposit failed:', error);
  }
}

// Submit transaction
async function sendTransaction(recipient, amount, options = {}) {
  try {
    const result = await wepay.sendTransaction(recipient, amount, options);
    console.log('Transaction submitted:', result.transactionHash);
    return result;
  } catch (error) {
    console.error('Transaction failed:', error);
  }
}

// Get account info
async function getAccountInfo() {
  try {
    const info = await wepay.getAccountInfo();
    console.log('Account info:', info);
    return info;
  } catch (error) {
    console.error('Failed to get account info:', error);
  }
}
```

## Event Monitoring

To monitor contract events for updates:

```javascript
// Using Web3.js
function subscribeToEvents() {
  // Listen for deposit events
  optimizerContract.events.FundsDeposited({
    filter: { user: userAddress }
  }, (error, event) => {
    if (error) {
      console.error('Event subscription error:', error);
      return;
    }
    console.log('Deposit event:', event.returnValues);
  });
  
  // Listen for transaction submission events
  optimizerContract.events.TransactionSubmitted({
    filter: { user: userAddress }
  }, (error, event) => {
    if (error) {
      console.error('Event subscription error:', error);
      return;
    }
    console.log('Transaction submitted event:', event.returnValues);
  });
  
  // Listen for transaction execution events
  optimizerContract.events.TransactionExecuted({
    filter: { user: userAddress }
  }, (error, event) => {
    if (error) {
      console.error('Event subscription error:', error);
      return;
    }
    console.log('Transaction executed event:', event.returnValues);
  });
  
  // Listen for batch execution events
  optimizerContract.events.BatchExecuted({}, (error, event) => {
    if (error) {
      console.error('Event subscription error:', error);
      return;
    }
    console.log('Batch executed event:', event.returnValues);
  });
}

// Using ethers.js
function subscribeToEvents() {
  // Listen for deposit events
  optimizerContract.on('FundsDeposited', (user, amount, event) => {
    if (user === userAddress) {
      console.log('Deposit event:', {
        user,
        amount: ethers.utils.formatEther(amount),
        transactionHash: event.transactionHash
      });
    }
  });
  
  // Listen for transaction submission events
  optimizerContract.on('TransactionSubmitted', (user, to, value, txId, event) => {
    if (user === userAddress) {
      console.log('Transaction submitted event:', {
        user,
        to,
        value: ethers.utils.formatEther(value),
        txId: txId.toString(),
        transactionHash: event.transactionHash
      });
    }
  });
  
  // Listen for transaction execution events
  optimizerContract.on('TransactionExecuted', (user, to, value, txId, gasSaved, event) => {
    if (user === userAddress) {
      console.log('Transaction executed event:', {
        user,
        to,
        value: ethers.utils.formatEther(value),
        txId: txId.toString(),
        gasSaved: gasSaved.toString(),
        transactionHash: event.transactionHash
      });
    }
  });
  
  // Listen for batch execution events
  optimizerContract.on('BatchExecuted', (batchSize, totalGasSaved, event) => {
    console.log('Batch executed event:', {
      batchSize: batchSize.toString(),
      totalGasSaved: totalGasSaved.toString(),
      transactionHash: event.transactionHash
    });
  });
}
```

## Cross-Chain Integration

To utilize the cross-chain capabilities:

```javascript
import { ethers } from 'ethers';
import CrossChainExecutorABI from './abis/CrossChainExecutor.json';

// Initialize contract
const crossChainAddress = '0x...'; // CrossChainExecutor address
const crossChainContract = new ethers.Contract(
  crossChainAddress,
  CrossChainExecutorABI,
  signer
);

// Send a cross-chain transaction
async function sendCrossChainTransaction(destChainId, recipient, data, value = '0') {
  try {
    const valueWei = ethers.utils.parseEther(value.toString());
    const tx = await crossChainContract.sendCrossChainTransaction(
      destChainId,
      recipient,
      data,
      { value: valueWei }
    );
    const receipt = await tx.wait();
    
    console.log('Cross-chain transaction sent:', receipt.transactionHash);
    return receipt;
  } catch (error) {
    console.error('Cross-chain transaction failed:', error);
    throw error;
  }
}
```

## Layer 2 Integration

For Layer 2 scaling solutions:

```javascript
import { ethers } from 'ethers';
import Layer2ExecutorABI from './abis/Layer2Executor.json';

// Initialize contract
const layer2Address = '0x...'; // Layer2Executor address
const layer2Contract = new ethers.Contract(
  layer2Address,
  Layer2ExecutorABI,
  signer
);

// Execute transactions on Layer 2
async function executeOnLayer2(l2Name, l2Target, targets, values, datas) {
  try {
    // Convert ETH values to Wei
    const valuesWei = values.map(value => ethers.utils.parseEther(value.toString()));
    
    // Total value to send (sum of all transaction values)
    const totalValue = valuesWei.reduce(
      (sum, val) => sum.add(val),
      ethers.BigNumber.from(0)
    );
    
    const tx = await layer2Contract.executeL2Batch(
      l2Name,
      l2Target,
      targets,
      valuesWei,
      datas,
      { value: totalValue }
    );
    const receipt = await tx.wait();
    
    console.log('Layer 2 batch executed:', receipt.transactionHash);
    return receipt;
  } catch (error) {
    console.error('Layer 2 execution failed:', error);
    throw error;
  }
}
```

## React Integration Example

Here's a complete example of integrating WePay with a React application:

```jsx
import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import WePayGasOptimizerABI from './abis/WePayGasOptimizer.json';

function WePayIntegration() {
  const [account, setAccount] = useState('');
  const [balance, setBalance] = useState('0');
  const [amount, setAmount] = useState('');
  const [recipient, setRecipient] = useState('');
  const [loading, setLoading] = useState(false);
  const [contract, setContract] = useState(null);
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    async function initializeContract() {
      if (window.ethereum) {
        try {
          // Request account access
          await window.ethereum.request({ method: 'eth_requestAccounts' });
          
          // Set up ethers provider and signer
          const provider = new ethers.providers.Web3Provider(window.ethereum);
          const signer = provider.getSigner();
          const accounts = await provider.listAccounts();
          setAccount(accounts[0]);
          
          // Initialize contract
          const optimizerAddress = '0x...'; // WePay Optimizer address
          const optimizerContract = new ethers.Contract(
            optimizerAddress,
            WePayGasOptimizerABI,
            signer
          );
          setContract(optimizerContract);
          
          // Get initial balance
          await updateBalance(accounts[0], optimizerContract);
          
          // Set up event listeners
          setupEventListeners(optimizerContract, accounts[0]);
        } catch (error) {
          console.error('Initialization error:', error);
        }
      } else {
        console.error('Ethereum wallet not detected');
      }
    }
    
    initializeContract();
  }, []);
  
  async function updateBalance(address, contractInstance) {
    try {
      const balanceWei = await contractInstance.balances(address);
      const balanceEth = ethers.utils.formatEther(balanceWei);
      setBalance(balanceEth);
    } catch (error) {
      console.error('Error fetching balance:', error);
    }
  }
  
  function setupEventListeners(contractInstance, userAddress) {
    // Listen for transaction events
    contractInstance.on('TransactionSubmitted', (user, to, value, txId, event) => {
      if (user.toLowerCase() === userAddress.toLowerCase()) {
        const newTx = {
          id: txId.toString(),
          type: 'Submitted',
          to,
          value: ethers.utils.formatEther(value),
          hash: event.transactionHash,
          timestamp: new Date().toISOString()
        };
        setTransactions(prev => [newTx, ...prev]);
      }
    });
    
    contractInstance.on('TransactionExecuted', (user, to, value, txId, gasSaved, event) => {
      if (user.toLowerCase() === userAddress.toLowerCase()) {
        const newTx = {
          id: txId.toString(),
          type: 'Executed',
          to,
          value: ethers.utils.formatEther(value),
          gasSaved: ethers.utils.formatEther(gasSaved),
          hash: event.transactionHash,
          timestamp: new Date().toISOString()
        };
        setTransactions(prev => [newTx, ...prev]);
        
        // Update balance after transaction execution
        updateBalance(userAddress, contractInstance);
      }
    });
  }
  
  async function handleDeposit() {
    if (!amount || !contract) return;
    
    setLoading(true);
    try {
      const amountWei = ethers.utils.parseEther(amount);
      const tx = await contract.deposit({ value: amountWei });
      await tx.wait();
      
      // Update balance after deposit
      await updateBalance(account, contract);
      setAmount('');
    } catch (error) {
      console.error('Deposit error:', error);
    } finally {
      setLoading(false);
    }
  }
  
  async function handleSubmitTransaction() {
    if (!amount || !recipient || !contract) return;
    
    setLoading(true);
    try {
      const amountWei = ethers.utils.parseEther(amount);
      const tx = await contract.submitTransaction(recipient, amountWei, '0x');
      await tx.wait();
      
      setAmount('');
      setRecipient('');
    } catch (error) {
      console.error('Transaction submission error:', error);
    } finally {
      setLoading(false);
    }
  }
  
  return (
    <div className="wepay-integration">
      <h2>WePay Gas Optimizer</h2>
      
      <div className="account-info">
        <p>Connected Account: {account ? `${account.substring(0, 6)}...${account.substring(38)}` : 'Not connected'}</p>
        <p>Balance in Contract: {balance} ETH</p>
      </div>
      
      <div className="deposit-section">
        <h3>Deposit ETH</h3>
        <input
          type="text"
          placeholder="Amount in ETH"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          disabled={loading}
        />
        <button onClick={handleDeposit} disabled={loading || !amount}>
          {loading ? 'Processing...' : 'Deposit'}
        </button>
      </div>
      
      <div className="transaction-section">
        <h3>Submit Transaction</h3>
        <input
          type="text"
          placeholder="Recipient Address"
          value={recipient}
          onChange={(e) => setRecipient(e.target.value)}
          disabled={loading}
        />
        <input
          type="text"
          placeholder="Amount in ETH"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          disabled={loading}
        />
        <button onClick={handleSubmitTransaction} disabled={loading || !amount || !recipient}>
          {loading ? 'Processing...' : 'Submit Transaction'}
        </button>
      </div>
      
      <div className="transactions-section">
        <h3>Recent Transactions</h3>
        {transactions.length === 0 ? (
          <p>No transactions yet</p>
        ) : (
          <ul>
            {transactions.map(tx => (
              <li key={`${tx.type}-${tx.id}-${tx.hash}`}>
                <strong>{tx.type}:</strong> {tx.value} ETH to {tx.to.substring(0, 6)}...
                {tx.type === 'Executed' && ` (Saved: ${tx.gasSaved} ETH)`}
                <br />
                <small>{new Date(tx.timestamp).toLocaleString()}</small>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default WePayIntegration;
```

## Mobile Integration

For mobile applications, you can use Web3 libraries for React Native or native solutions.

### React Native Example

```javascript
import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, FlatList } from 'react-native';
import Web3 from 'web3';
import { WalletConnectProvider } from '@walletconnect/react-native-dapp';
import WePayGasOptimizerABI from './abis/WePayGasOptimizer.json';

// WalletConnect setup code omitted for brevity

function WePayMobileApp() {
  // State variables and functions similar to React example
  // With WalletConnect integration for mobile
  
  // Implementation here...
}

export default WePayMobileApp;
```

## API Integration

For backend services or apps without direct Web3 access, you can use our REST API:

```javascript
import axios from 'axios';

const API_BASE_URL = 'https://api.wepay.app/v1';
const API_KEY = 'your_api_key';

// Get transaction status
async function getTransactionStatus(txHash) {
  try {
    const response = await axios.get(`${API_BASE_URL}/transactions/${txHash}`, {
      headers: { 'X-API-Key': API_KEY }
    });
    return response.data;
  } catch (error) {
    console.error('API error:', error);
    throw error;
  }
}

// Get user balance
async function getUserBalance(address) {
  try {
    const response = await axios.get(`${API_BASE_URL}/balances/${address}`, {
      headers: { 'X-API-Key': API_KEY }
    });
    return response.data;
  } catch (error) {
    console.error('API error:', error);
    throw error;
  }
}

// Create a transaction request
async function createTransactionRequest(from, to, amount, data = '0x') {
  try {
    const response = await axios.post(`${API_BASE_URL}/transactions`, {
      from,
      to,
      amount,
      data
    }, {
      headers: { 'X-API-Key': API_KEY }
    });
    return response.data;
  } catch (error) {
    console.error('API error:', error);
    throw error;
  }
}
```

## Security Best Practices

1. **Always verify contract addresses** before interaction
2. **Use hardware wallets** for high-value transactions
3. **Set reasonable gas limits** for your transactions
4. **Monitor events** for transaction confirmation
5. **Implement proper error handling** in your integration
6. **Keep your provider keys secure** and never expose them in client-side code

## Support and Troubleshooting

If you encounter issues during integration:

1. Check the contract addresses and ABIs are correct
2. Ensure your Web3 provider is properly configured
3. Verify your account has sufficient balance for transactions
4. Check gas price and limits for failed transactions
5. Contact our support team at support@wepay.app for further assistance

## Resources

- [Complete API Documentation](https://docs.wepay.app/api)
- [GitHub Repository](https://github.com/wepay/wepay-contracts)
- [Developer Discord](https://discord.gg/wepay)
- [Contract Audit Reports](https://docs.wepay.app/audits) 