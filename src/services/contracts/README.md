# WePay Enhanced Gas Optimization System

This smart contract system implements an advanced gas optimization solution with high security, upgradability, governance, and cross-chain capabilities.

## System Architecture

The system is composed of the following components:

1. **Core Gas Optimization**
   - `WePayGasOptimizerV1`: Main implementation that handles transaction batching
   - `WePayProxy`: Transparent proxy contract that enables upgradeability
   - `IWePayGasOptimizer`: Interface defining the contract's functions

2. **Security Components**
   - `AccessControl`: Role-based permission management
   - `FlashLoanGuard`: Protection against flash loan attacks
   - `ReentrancyGuard`: Prevention of reentrancy vulnerabilities
   - `WePayTimelock`: Timelock for critical operations

3. **Governance**
   - `WePayGovernance`: DAO-based voting system
   - `Timelock`: Execution delay for governance decisions

4. **Blockchain Extensions**
   - `CrossChainExecutor`: Execute transactions across multiple chains
   - `Layer2Executor`: Batch execution on L2 scaling solutions

5. **Factory**
   - `WePayGasOptimizerFactory`: Deploys and configures the entire system

## Contract Relationships

```
                           ┌─────────────────┐
                           │                 │
                           │  Factory        │
                           │                 │
                           └─────────────────┘
                                   │
                                   │ Deploys & Connects
                                   ▼
┌─────────────────┐       ┌─────────────────┐       ┌─────────────────┐
│                 │       │                 │       │                 │
│ Implementation  │◄──────│    Proxy        │──────►│  Governance     │
│                 │       │                 │       │                 │
└─────────────────┘       └─────────────────┘       └─────────────────┘
                                   │                         │
                                   │                         │
                                   ▼                         ▼
           ┌───────────────────────────────────┐   ┌─────────────────┐
           │                                   │   │                 │
           │       Security Layer              │   │    Timelock     │
           │                                   │   │                 │
           └───────────────────────────────────┘   └─────────────────┘
                                   │
                                   │
                 ┌─────────────────┴─────────────────┐
                 │                                   │
     ┌───────────▼───────────┐           ┌───────────▼───────────┐
     │                       │           │                       │
     │  Cross-Chain Executor │           │   Layer2 Executor     │
     │                       │           │                       │
     └───────────────────────┘           └───────────────────────┘
```

## Key Features

1. **Gas Optimization**
   - Batches multiple transactions together to save on gas costs
   - Dynamically adjusts batch sizes based on network conditions
   - Tracks and reports gas savings to users

2. **Upgradability**
   - Uses transparent proxy pattern to allow logic upgrades
   - Storage remains intact during upgrades
   - Access-controlled upgrade process

3. **Security Measures**
   - Role-based access control
   - Flash loan attack protection
   - Reentrancy guards
   - Timelock delays for admin actions

4. **MEV Protection**
   - Private transaction submission through trusted relayer
   - Gas price caps to prevent frontrunning
   - Transaction ordering protection

5. **Multi-Chain Support**
   - Execute transactions across different blockchains
   - L2 optimization for even greater gas savings
   - Cross-chain message passing and verification

6. **Decentralized Governance**
   - Token-based voting on proposals
   - On-chain execution of approved proposals
   - Timelocked implementation of changes

## How To Use

### Deploy the System

```solidity
// Deploy the entire system with one function call
WePayGasOptimizerFactory factory = new WePayGasOptimizerFactory();
address proxyAddress = factory.deploySystem(
    5,                      // Minimum batch size
    50,                     // Maximum batch size
    500,                    // 5% discount rate (in basis points)
    governanceTokenAddress, // Address of the governance token
    trustedRelayerAddress,  // Address of the trusted relayer
    100 gwei               // Maximum gas price
);
```

### User Interaction

```solidity
// Get the optimizer contract
IWePayGasOptimizer optimizer = IWePayGasOptimizer(proxyAddress);

// Deposit funds
optimizer.deposit{value: 1 ether}();

// Submit transactions to be batched
optimizer.submitTransaction(
    recipient,  // Address to send to
    0.1 ether,  // Amount to send
    data        // Call data (if any)
);

// Withdraw remaining funds
optimizer.withdraw();
```

### Cross-Chain & Layer 2

```solidity
// Execute transactions on Layer 2
CrossChainExecutor crossChain = CrossChainExecutor(crossChainAddress);
crossChain.sendCrossChainTransaction(
    10,         // Chain ID of destination
    recipient,  // Address on destination chain
    data        // Call data
);

// Execute batch on Layer 2
Layer2Executor l2 = Layer2Executor(l2Address);
l2.executeBatchOnL2(
    "optimism",              // Layer 2 name
    l2TargetAddress,         // Target contract on L2
    [address1, address2],    // Target addresses
    [0.1 ether, 0.2 ether],  // Values to send
    [data1, data2]           // Call data for each transaction
);
```

### Governance

```solidity
// Create a proposal
WePayGovernance governance = WePayGovernance(governanceAddress);
uint256 proposalId = governance.createProposal(
    targetContract,  // Contract to call
    0,               // ETH amount
    callData         // Function call data
);

// Vote on a proposal
governance.castVote(proposalId, true);  // true = vote for

// Execute a successful proposal
governance.executeProposal(proposalId);
```

## Development and Deployment

1. **Setup**
   - Install dependencies: `npm install`
   - Compile contracts: `npx hardhat compile`
   - Run tests: `npx hardhat test`

2. **Deploy Main System**
   - Create a `.env` file with required environment variables
   - Run deployment script: `npx hardhat run scripts/deploy.js --network mainnet`

3. **Verify Contracts**
   - Verify on Etherscan: `npx hardhat verify --network mainnet DEPLOYED_ADDRESS`
   - Verify proxy implementation: `npx hardhat verify --network mainnet IMPLEMENTATION_ADDRESS` 