# WePay Gas Optimization System - Implementation Guide

This guide provides detailed instructions for implementing the WePay contract system in a real-world application.

## Development Environment Setup

### Prerequisites
- Node.js v14+ and npm
- Hardhat or Truffle development framework
- Solidity knowledge
- MetaMask or another web3 wallet

### Initial Setup

```bash
# Create a new project
mkdir wepay-gas-optimizer
cd wepay-gas-optimizer

# Initialize npm project
npm init -y

# Install dependencies
npm install --save-dev hardhat @nomiclabs/hardhat-waffle ethereum-waffle chai @nomiclabs/hardhat-ethers ethers @openzeppelin/contracts solidity-coverage hardhat-gas-reporter @nomiclabs/hardhat-etherscan dotenv
```

### Configure Hardhat

Create a `hardhat.config.js` file:

```javascript
require('@nomiclabs/hardhat-waffle');
require('@nomiclabs/hardhat-ethers');
require('@nomiclabs/hardhat-etherscan');
require('hardhat-gas-reporter');
require('solidity-coverage');
require('dotenv').config();

module.exports = {
  solidity: {
    version: "0.8.17",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200
      }
    }
  },
  networks: {
    hardhat: {
      chainId: 1337
    },
    goerli: {
      url: `https://goerli.infura.io/v3/${process.env.INFURA_API_KEY}`,
      accounts: [process.env.PRIVATE_KEY]
    },
    mainnet: {
      url: `https://mainnet.infura.io/v3/${process.env.INFURA_API_KEY}`,
      accounts: [process.env.PRIVATE_KEY]
    }
  },
  etherscan: {
    apiKey: process.env.ETHERSCAN_API_KEY
  },
  gasReporter: {
    enabled: true,
    currency: 'USD',
    coinmarketcap: process.env.COINMARKETCAP_API_KEY
  }
};
```

## Contract Implementation

### 1. Create Contract Structure

Create the following directory structure:

```
contracts/
├── interfaces/
│   └── IWePayGasOptimizer.sol
├── implementation/
│   └── WePayGasOptimizerV1.sol
├── proxy/
│   └── WePayProxy.sol
├── security/
│   ├── AccessControl.sol
│   ├── FlashLoanGuard.sol
│   └── ReentrancyGuard.sol
├── governance/
│   ├── WePayGovernance.sol
│   └── Timelock.sol
├── extensions/
│   ├── CrossChainExecutor.sol
│   └── Layer2Executor.sol
└── factory/
    └── WePayGasOptimizerFactory.sol
```

### 2. Deploy Script

Create a deployment script in `scripts/deploy.js`:

```javascript
const hre = require("hardhat");

async function main() {
  // Deploy governance token first
  const WePayToken = await hre.ethers.getContractFactory("WePayToken");
  const token = await WePayToken.deploy("WePayToken", "WPAY", ethers.utils.parseEther("1000000"));
  await token.deployed();
  console.log("WePayToken deployed to:", token.address);

  // Deploy the factory
  const WePayGasOptimizerFactory = await hre.ethers.getContractFactory("WePayGasOptimizerFactory");
  const factory = await WePayGasOptimizerFactory.deploy();
  await factory.deployed();
  console.log("WePayGasOptimizerFactory deployed to:", factory.address);

  // Deploy the system
  const minBatchSize = 5;
  const maxBatchSize = 100;
  const discountRate = 20; // 20%
  const governanceToken = token.address;
  const trustedRelayer = "0x..."; // Trusted relayer address
  const maxGasPrice = ethers.utils.parseUnits("100", "gwei");

  const tx = await factory.deploySystem(
    minBatchSize,
    maxBatchSize,
    discountRate,
    governanceToken,
    trustedRelayer,
    maxGasPrice
  );
  
  // Wait for the transaction
  const receipt = await tx.wait();
  
  // Get the deployed system addresses from events
  const systemDeployedEvent = receipt.events.find(e => e.event === "SystemDeployed");
  
  if (systemDeployedEvent) {
    const { implementation, proxy, governance, crossChainExecutor, layer2Executor } = systemDeployedEvent.args;
    
    console.log("System deployed:");
    console.log("Implementation:", implementation);
    console.log("Proxy:", proxy);
    console.log("Governance:", governance);
    console.log("CrossChainExecutor:", crossChainExecutor);
    console.log("Layer2Executor:", layer2Executor);
  }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
```

## Web Frontend Integration

### 1. Connect with Web3 Library

```javascript
// utils/web3.js
import { ethers } from 'ethers';
import WePayGasOptimizerABI from '../abis/WePayGasOptimizer.json';

export const getWeb3 = async () => {
  // Check if MetaMask is installed
  if (!window.ethereum) {
    throw new Error("Please install MetaMask to use this application");
  }
  
  try {
    // Request account access
    await window.ethereum.request({ method: 'eth_requestAccounts' });
    
    // Create Web3 instance
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const network = await provider.getNetwork();
    
    return { provider, signer, network };
  } catch (error) {
    throw new Error("Failed to connect to Ethereum network: " + error.message);
  }
};

export const getOptimizerContract = async (contractAddress) => {
  const { signer } = await getWeb3();
  return new ethers.Contract(contractAddress, WePayGasOptimizerABI, signer);
};
```

### 2. Create Main UI Components

```javascript
// components/DepositForm.js
import React, { useState } from 'react';
import { ethers } from 'ethers';
import { getOptimizerContract } from '../utils/web3';

const DepositForm = ({ contractAddress }) => {
  const [amount, setAmount] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleDeposit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const contract = await getOptimizerContract(contractAddress);
      const weiAmount = ethers.utils.parseEther(amount);
      
      const tx = await contract.deposit({ value: weiAmount });
      await tx.wait();
      
      setSuccess(`Successfully deposited ${amount} ETH`);
      setAmount('');
    } catch (err) {
      setError(`Deposit failed: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="deposit-form">
      <h2>Deposit ETH</h2>
      {error && <div className="error">{error}</div>}
      {success && <div className="success">{success}</div>}
      
      <form onSubmit={handleDeposit}>
        <div className="form-group">
          <label>Amount (ETH)</label>
          <input
            type="text"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="0.1"
            required
          />
        </div>
        
        <button type="submit" disabled={loading}>
          {loading ? 'Processing...' : 'Deposit'}
        </button>
      </form>
    </div>
  );
};

export default DepositForm;
```

```javascript
// components/TransactionForm.js
import React, { useState } from 'react';
import { ethers } from 'ethers';
import { getOptimizerContract } from '../utils/web3';

const TransactionForm = ({ contractAddress }) => {
  const [recipient, setRecipient] = useState('');
  const [amount, setAmount] = useState('');
  const [data, setData] = useState('0x');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const contract = await getOptimizerContract(contractAddress);
      const weiAmount = ethers.utils.parseEther(amount);
      
      const tx = await contract.submitTransaction(recipient, weiAmount, data);
      await tx.wait();
      
      setSuccess(`Transaction submitted to batch queue`);
      setRecipient('');
      setAmount('');
      setData('0x');
    } catch (err) {
      setError(`Transaction submission failed: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="transaction-form">
      <h2>Submit Transaction</h2>
      {error && <div className="error">{error}</div>}
      {success && <div className="success">{success}</div>}
      
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Recipient Address</label>
          <input
            type="text"
            value={recipient}
            onChange={(e) => setRecipient(e.target.value)}
            placeholder="0x..."
            required
          />
        </div>
        
        <div className="form-group">
          <label>Amount (ETH)</label>
          <input
            type="text"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="0.01"
            required
          />
        </div>
        
        <div className="form-group">
          <label>Data (hex)</label>
          <input
            type="text"
            value={data}
            onChange={(e) => setData(e.target.value)}
            placeholder="0x"
          />
        </div>
        
        <button type="submit" disabled={loading}>
          {loading ? 'Processing...' : 'Submit Transaction'}
        </button>
      </form>
    </div>
  );
};

export default TransactionForm;
```

## Backend Integration (Optional)

For projects requiring backend support, create a Node.js server:

```javascript
// server.js
const express = require('express');
const { ethers } = require('ethers');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// Connect to Ethereum
const provider = new ethers.providers.JsonRpcProvider(process.env.RPC_URL);
const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);
const optimizerAddress = process.env.OPTIMIZER_ADDRESS;
const optimizerABI = require('./abis/WePayGasOptimizer.json');
const optimizer = new ethers.Contract(optimizerAddress, optimizerABI, wallet);

// Endpoint to fetch batch status
app.get('/api/batch-status', async (req, res) => {
  try {
    const pendingCount = await optimizer.getPendingTransactionCount();
    const minBatchSize = await optimizer.minBatchSize();
    const maxBatchSize = await optimizer.maxBatchSize();
    
    res.json({
      pendingCount: pendingCount.toString(),
      minBatchSize: minBatchSize.toString(),
      maxBatchSize: maxBatchSize.toString(),
      readyToExecute: pendingCount.gte(minBatchSize)
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
});

// Endpoint for monitoring gas prices
app.get('/api/gas-price', async (req, res) => {
  try {
    const gasPrice = await provider.getGasPrice();
    const gweiPrice = ethers.utils.formatUnits(gasPrice, 'gwei');
    
    res.json({
      wei: gasPrice.toString(),
      gwei: gweiPrice,
      isLow: parseFloat(gweiPrice) < 20,
      isMedium: parseFloat(gweiPrice) >= 20 && parseFloat(gweiPrice) < 50,
      isHigh: parseFloat(gweiPrice) >= 50
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
```

## Testing Strategy

### 1. Unit Tests

Create tests for each contract component:

```javascript
// test/WePayGasOptimizer.test.js
const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("WePayGasOptimizer", function () {
  let optimizer;
  let owner, user1, user2, relayer;
  const minBatchSize = 2;
  const maxBatchSize = 5;
  const discountRate = 20; // 20%

  beforeEach(async function () {
    [owner, user1, user2, relayer] = await ethers.getSigners();

    // Deploy the factory
    const WePayGasOptimizerFactory = await ethers.getContractFactory("WePayGasOptimizerFactory");
    const factory = await WePayGasOptimizerFactory.deploy();
    
    // Deploy token
    const WePayToken = await ethers.getContractFactory("WePayToken");
    const token = await WePayToken.deploy("WePayToken", "WPAY", ethers.utils.parseEther("1000000"));
    
    // Deploy the system
    const tx = await factory.deploySystem(
      minBatchSize,
      maxBatchSize,
      discountRate,
      token.address,
      relayer.address,
      ethers.utils.parseUnits("100", "gwei")
    );
    
    const receipt = await tx.wait();
    const systemDeployedEvent = receipt.events.find(e => e.event === "SystemDeployed");
    const { proxy } = systemDeployedEvent.args;
    
    // Get the proxy as the optimizer
    const WePayGasOptimizer = await ethers.getContractFactory("WePayGasOptimizerV1");
    optimizer = WePayGasOptimizer.attach(proxy);
  });

  it("Should allow users to deposit ETH", async function () {
    const depositAmount = ethers.utils.parseEther("1.0");
    
    await expect(optimizer.connect(user1).deposit({ value: depositAmount }))
      .to.emit(optimizer, "Deposit")
      .withArgs(user1.address, depositAmount);
      
    const balance = await optimizer.balances(user1.address);
    expect(balance).to.equal(depositAmount);
  });

  it("Should allow users to submit transactions", async function () {
    // Deposit first
    const depositAmount = ethers.utils.parseEther("1.0");
    await optimizer.connect(user1).deposit({ value: depositAmount });
    
    // Submit transaction
    const recipient = user2.address;
    const txAmount = ethers.utils.parseEther("0.1");
    
    await expect(optimizer.connect(user1).submitTransaction(recipient, txAmount, "0x"))
      .to.emit(optimizer, "TransactionSubmitted")
      .withArgs(user1.address, recipient, txAmount);
      
    // Check pending queue
    const pendingCount = await optimizer.getPendingTransactionCount();
    expect(pendingCount).to.equal(1);
  });

  it("Should execute batch when minimum size is reached", async function () {
    // Deposit for two users
    const depositAmount = ethers.utils.parseEther("1.0");
    await optimizer.connect(user1).deposit({ value: depositAmount });
    await optimizer.connect(user2).deposit({ value: depositAmount });
    
    // Submit transactions to reach minBatchSize
    const recipient = owner.address;
    const txAmount = ethers.utils.parseEther("0.1");
    
    await optimizer.connect(user1).submitTransaction(recipient, txAmount, "0x");
    await optimizer.connect(user2).submitTransaction(recipient, txAmount, "0x");
    
    // Execute batch by relayer
    await expect(optimizer.connect(relayer).executeBatch())
      .to.emit(optimizer, "BatchExecuted");
      
    // Queue should be empty after execution
    const pendingCount = await optimizer.getPendingTransactionCount();
    expect(pendingCount).to.equal(0);
  });

  // Add more tests for edge cases, security features, etc.
});
```

### 2. Integration Tests

Test the entire system flow:

```javascript
// test/Integration.test.js
const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("WePay System Integration", function () {
  // Similar setup as unit tests, but test full flows
  
  it("Should complete a full end-to-end flow", async function () {
    // Setup system
    // ...
    
    // Step 1: Multiple users deposit
    // Step 2: They submit transactions
    // Step 3: Batch is executed
    // Step 4: Users withdraw remaining balances
    // Step 5: Governance proposal is made and executed
    
    // Assertions for each step
  });
});
```

## Deployment Checklist

### 1. Pre-Deployment
- [ ] Run all tests (`npx hardhat test`)
- [ ] Perform gas optimization analysis (`npx hardhat test --gas`)
- [ ] Run security audits and static analysis
- [ ] Verify all access control roles are properly set
- [ ] Create deployment scripts for all target networks

### 2. Deployment Process
- [ ] Deploy to testnets first (Goerli, Mumbai)
- [ ] Verify contracts on Etherscan
- [ ] Test live testnet contracts with actual transactions
- [ ] Schedule and announce mainnet deployment
- [ ] Deploy to mainnet with multisig if possible
- [ ] Verify all mainnet contracts

### 3. Post-Deployment
- [ ] Set up monitoring for contract events
- [ ] Configure alerts for unusual activity
- [ ] Update documentation with deployed addresses
- [ ] Create user guides for end users
- [ ] Establish a bug bounty program

## Security Considerations

1. **Regular Audits**: Schedule periodic security audits
2. **Secure Key Management**: Use hardware wallets or multisig for admin operations
3. **Gradual Rollout**: Start with lower transaction limits and gradually increase
4. **Upgrade Planning**: Create detailed plans for potential upgrades
5. **Emergency Response**: Develop incident response procedures for various scenarios 