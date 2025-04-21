# WePay Gas Optimization System - Usage Guide

This guide explains how to deploy, interact with, and monitor the WePay gas optimization contract system.

## Deployment Options

### 1. Local Development Environment

```bash
# Install development dependencies
npm install hardhat @nomiclabs/hardhat-ethers ethers hardhat-deploy

# Compile contracts
npx hardhat compile

# Deploy to local network
npx hardhat node
npx hardhat run scripts/deploy.js --network localhost
```

### 2. Test Networks

```bash
# Deploy to Goerli testnet
npx hardhat run scripts/deploy.js --network goerli

# Deploy to Polygon Mumbai testnet
npx hardhat run scripts/deploy.js --network mumbai
```

### 3. Production Deployment

```bash
# Deploy to Ethereum mainnet
npx hardhat run scripts/deploy.js --network mainnet

# Deploy to Polygon
npx hardhat run scripts/deploy.js --network polygon
```

## Frontend Integration

### 1. Web3.js Integration

```javascript
const Web3 = require('web3');
const optimizerABI = require('./abis/WePayGasOptimizer.json');

// Connect to Ethereum provider
const web3 = new Web3(window.ethereum);
await window.ethereum.enable();

// Get contract instance
const optimizerAddress = '0x...'; // Your deployed contract address
const optimizer = new web3.eth.Contract(optimizerABI, optimizerAddress);

// Deposit funds
const accounts = await web3.eth.getAccounts();
await optimizer.methods.deposit().send({
  from: accounts[0],
  value: web3.utils.toWei('1', 'ether')
});

// Submit transaction
await optimizer.methods.submitTransaction(
  '0xRecipientAddress',
  web3.utils.toWei('0.1', 'ether'),
  '0x' // Optional data
).send({ from: accounts[0] });

// Withdraw funds
await optimizer.methods.withdraw().send({ from: accounts[0] });
```

### 2. Ethers.js Integration

```javascript
const { ethers } = require('ethers');
const optimizerABI = require('./abis/WePayGasOptimizer.json');

// Connect to Ethereum provider
const provider = new ethers.providers.Web3Provider(window.ethereum);
await window.ethereum.request({ method: 'eth_requestAccounts' });
const signer = provider.getSigner();

// Get contract instance
const optimizerAddress = '0x...'; // Your deployed contract address
const optimizer = new ethers.Contract(optimizerAddress, optimizerABI, signer);

// Deposit funds
const tx = await optimizer.deposit({ value: ethers.utils.parseEther('1.0') });
await tx.wait();

// Submit transaction
const submitTx = await optimizer.submitTransaction(
  '0xRecipientAddress',
  ethers.utils.parseEther('0.1'),
  '0x' // Optional data
);
await submitTx.wait();

// Withdraw funds
const withdrawTx = await optimizer.withdraw();
await withdrawTx.wait();
```

## Monitoring and Analytics

### 1. Transaction Monitoring

You can monitor batched transactions and gas savings using blockchain explorers or analytics tools:

- **Etherscan**: View the contract page for transaction history
- **Tenderly**: Debug and analyze contract execution
- **Dune Analytics**: Create custom dashboards to track gas savings

### 2. Event Tracking

The contracts emit events that can be tracked for analytics:

```javascript
// Listen for transaction submission events
optimizer.events.TransactionSubmitted({})
  .on('data', (event) => {
    console.log('Transaction submitted:', event.returnValues);
  });

// Listen for batch execution events
optimizer.events.BatchExecuted({})
  .on('data', (event) => {
    console.log('Batch executed:', event.returnValues);
    console.log('Gas saved:', event.returnValues.totalGasSaved);
  });
```

### 3. Custom Analytics Dashboard

Create a custom dashboard to track:

- Total transactions processed
- Gas savings achieved
- User participation
- Batch efficiency metrics

## Cross-Chain Operations

### 1. L2 Transactions

```javascript
// Get L2 executor contract
const l2ExecutorAddress = '0x...'; // L2 executor address
const l2Executor = new ethers.Contract(l2ExecutorAddress, l2ExecutorABI, signer);

// Execute batch on Layer 2
const l2Tx = await l2Executor.executeBatchOnL2(
  'optimism',                                    // L2 name
  '0xL2TargetAddress',                          // Target address on L2
  ['0xAddress1', '0xAddress2'],                 // Target addresses
  [ethers.utils.parseEther('0.1'), ethers.utils.parseEther('0.2')], // Values
  ['0xData1', '0xData2']                        // Call data
);
await l2Tx.wait();
```

### 2. Cross-Chain Transactions

```javascript
// Get cross-chain executor contract
const crossChainAddress = '0x...'; // Cross-chain executor address
const crossChain = new ethers.Contract(crossChainAddress, crossChainABI, signer);

// Send cross-chain transaction
const ccTx = await crossChain.sendCrossChainTransaction(
  10,                 // Destination chain ID (e.g., 10 for Optimism)
  '0xRecipientAddress', // Recipient on destination chain
  '0xData'            // Call data
);
await ccTx.wait();
```

## Governance Participation

### 1. Creating Proposals

```javascript
// Get governance contract
const governanceAddress = '0x...'; // Governance contract address
const governance = new ethers.Contract(governanceAddress, governanceABI, signer);

// Create proposal
const proposalTx = await governance.createProposal(
  '0xTargetContract',  // Contract to call when executed
  ethers.utils.parseEther('0'),  // ETH value to send
  callData             // Function call data
);
const receipt = await proposalTx.wait();
const proposalId = receipt.events[0].args.proposalId;
```

### 2. Voting on Proposals

```javascript
// Vote on a proposal
const voteTx = await governance.castVote(proposalId, true); // true = vote for
await voteTx.wait();
```

### 3. Executing Successful Proposals

```javascript
// Execute a successful proposal
const executeTx = await governance.executeProposal(proposalId);
await executeTx.wait();
```

## Command Line Interaction

Using the Hardhat console for direct contract interaction:

```bash
# Start Hardhat console
npx hardhat console --network mainnet

# Get contract instance
const WePayGasOptimizer = await ethers.getContractFactory("WePayGasOptimizer");
const optimizer = await WePayGasOptimizer.attach("0x..."); // Your contract address

# Check contract state
const minBatchSize = await optimizer.minBatchSize();
console.log("Minimum batch size:", minBatchSize.toString());

# Check user balance
const userBalance = await optimizer.balances("0xUserAddress");
console.log("User balance:", ethers.utils.formatEther(userBalance));
```

## Gas Savings Analysis

To analyze the effectiveness of the gas optimization system:

1. Compare individual transaction gas costs vs. batched transactions
2. Track total gas saved across all users
3. Monitor gas prices at time of batch execution
4. Calculate cost savings in ETH and USD

Example query for Dune Analytics:

```sql
SELECT 
  date_trunc('day', block_time) as day,
  COUNT(*) as num_batches,
  SUM(gas_saved) as total_gas_saved,
  AVG(gas_saved) as avg_gas_saved_per_batch
FROM (
  SELECT 
    evt_block_time as block_time,
    evt_tx_hash,
    totalGasSaved as gas_saved
  FROM wepay_optimizer."WePayGasOptimizer_evt_BatchExecuted"
) t
GROUP BY 1
ORDER BY 1
``` 