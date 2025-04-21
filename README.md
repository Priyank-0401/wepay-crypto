# WePay – Blockchain Transaction Application


## Overview

**WePay** is a blockchain-powered payment platform designed to facilitate secure and tamper-proof financial transactions. Built with **Solidity**, **HTML**, **CSS**, and **JavaScript**, it enables **trustless, fraud-proof transactions** while ensuring high scalability and efficiency.  

This platform is designed to support up to **1,000+ concurrent users**, with future expansions aiming at **global adoption** and **multi-currency transactions**.

## Features

✅ **Smart Contracts** – Eliminates third-party interference and ensures fraud-proof transactions.  
✅ **Secure Wallet Management** – Integrated wallet system for storing and transferring digital assets.  
✅ **User-Friendly Interface** – HTML, CSS, and JavaScript-powered UI for seamless navigation and interaction.  
✅ **Real-time Transaction Processing** – Ensures fast and reliable payment settlements on the blockchain.  
✅ **Cross-Border Transactions (Upcoming)** – Aiming to facilitate low-cost, global transactions.  

## Tech Stack

| Layer        | Technology Used       |
|-------------|----------------------|
| **Frontend**  | HTML, CSS, JavaScript |
| **Blockchain** |  Ethereum  |
| **Database** | PHPMyAdmin, MySQL |

## Installation & Setup

Follow these steps to set up the **WePay** project locally:

### Prerequisites

- Node.js (v18+ recommended)  
- PHPMyAdmin and MySQL (for database management)  
- MetaMask (for blockchain interactions)  
- Ganache (for local Ethereum blockchain testing)  
- Truffle/Hardhat (for smart contract development)

### Steps

1. **Clone the repository**  
   ```sh
   git clone https://github.com/Priyank-0401/wepay-crypto.git
   cd wepay-crypto
   ```

2. **Set up environment variables**  
   Create a `.env` file and configure the following:
   ```sh
   PRIVATE_KEY=your_wallet_private_key
   INFURA_API_KEY=your_infura_project_id
   JWT_SECRET=your_secret_key
   ```

3. **Compile and deploy smart contracts**  
   ```sh
   npx hardhat compile
   npx hardhat run scripts/deploy.js --network goerli
   ```

4. **Access the application**  
   Open `index.html` in your browser.

## Smart Contract Details

| Feature          | Implementation |
|-----------------|---------------|
| **Transaction Security** | Uses cryptographic signatures for authentication |
| **Gas Optimization** | Optimized Solidity functions to reduce fees |
| **Scalability** | Designed for handling thousands of transactions per second |
| **Multi-Currency Support** | Future implementation planned |

## Future Roadmap

🚀 **Scalability Enhancements** – Upgrade to support **1,000+ concurrent users**.  
🌍 **Cross-Border Transactions** – Reduce fees and improve speed for global payments.  
💰 **Multi-Currency Wallet** – Enable transactions in multiple cryptocurrencies.  
📱 **Mobile App Development** – Extend functionality to iOS & Android.  
🔐 **Enhanced Security** – Implement multi-signature authentication for high-value transactions.  

## Contributing

Contributions are welcome! To get started:

1. Fork the repository  
2. Create a new branch: `git checkout -b feature-branch`  
3. Commit your changes: `git commit -m "Added a new feature"`  
4. Push to the branch: `git push origin feature-branch`  
5. Open a Pull Request  

## License

This project is licensed under the **MIT License**. See [LICENSE](LICENSE) for more details.

---

### 📞 Contact

For any queries or support, feel free to reach out:  

📧 Email: [priyankpahwa41@gmail.com](mailto:priyankpahwa41@gmail.com)  
🔗 LinkedIn: [Priyank Pahwa](https://linkedin.com/in/priyankpahwa41)  

---

🔹 **WePay – Secure, Scalable, and Seamless Blockchain Payments** 🔹  

# WePay Crypto - Gas Optimization

This project implements Ethereum smart contracts for gas optimization through transaction batching.

## Setup & Testing

### Prerequisites
- Ganache (for local Ethereum blockchain)
- Truffle (for deployment and testing)
- Node.js & npm

### Installation

1. Install Truffle globally (if not installed):
   ```
   npm install -g truffle
   ```

2. Start Ganache:
   - Use Ganache GUI or run `ganache-cli` in a terminal window
   - Make sure it's running on port 7545 (default for Ganache GUI) or update the port in `truffle-config.js`

### Deploy Contracts

1. Compile the contracts:
   ```
   truffle compile
   ```

2. Deploy the contracts to Ganache:
   ```
   truffle migrate --reset
   ```

### Testing the Contracts

1. Run the automated tests:
   ```
   truffle test
   ```

2. Run the interactive script:
   ```
   truffle exec scripts/interact.js
   ```

### Interactive Console

You can interact with the contracts directly using the Truffle console:

```
truffle console
```

Then try these commands:

```javascript
// Get contract instances
const optimizer = await WePayGasOptimizer.deployed()
const optimizerV1 = await WePayGasOptimizerV1.deployed()

// Get accounts
const accounts = await web3.eth.getAccounts()
const user = accounts[1]

// Deposit 1 ETH
await optimizer.deposit({ from: user, value: web3.utils.toWei('1', 'ether') })

// Check balance
const balance = await optimizer.balances(user)
web3.utils.fromWei(balance, 'ether')

// Submit a transaction
await optimizer.submitTransaction(accounts[2], web3.utils.toWei('0.1', 'ether'), '0x', { from: user })

// Submit multiple transactions to trigger batch execution
for (let i = 0; i < 3; i++) {
  await optimizer.submitTransaction(accounts[2], web3.utils.toWei('0.1', 'ether'), '0x', { from: user })
}
```

## Contract Overview

- `WePayGasOptimizer.sol`: Basic gas optimization through transaction batching
- `WePayGasOptimizerV1.sol`: Enhanced implementation with security features (access control, reentrancy protection)

## Features

- Batch multiple transactions to save gas
- Automatic batch execution when threshold is reached
- MEV protection
- Flash loan attack protection
- Reentrancy protection
