# WePay Gas Optimization System - User Guide

This guide explains how to interact with the WePay gas optimization system as an end user.

## What is WePay?

WePay is a gas optimization system that allows you to save on Ethereum transaction fees by batching your transactions with other users. By combining multiple transactions into a single batch execution, the system distributes fixed gas costs across all participants, resulting in significant savings.

## Getting Started

### Prerequisites

- An Ethereum wallet (MetaMask, Trust Wallet, etc.)
- ETH for deposits and gas fees
- Basic understanding of blockchain transactions

### Connecting Your Wallet

1. Visit the WePay dApp at [wepay.app](https://wepay.app)
2. Click the "Connect Wallet" button in the top right corner
3. Select your wallet provider from the list
4. Approve the connection request in your wallet

![Wallet Connection](https://i.imgur.com/walletconnect.png)

## Basic Operations

### Depositing Funds

Before you can submit transactions, you need to deposit ETH into the WePay contract:

1. From the dashboard, click the "Deposit" button
2. Enter the amount of ETH you wish to deposit
3. Click "Confirm Deposit"
4. Approve the transaction in your wallet
5. Wait for transaction confirmation

> **Note**: Deposited funds are held in the smart contract and can be withdrawn at any time.

### Submitting a Transaction

To submit a transaction for batched execution:

1. Navigate to the "New Transaction" page
2. Enter the recipient address
3. Enter the amount to send
4. Add optional data if needed (for contract interactions)
5. Click "Submit Transaction"
6. Approve the transaction in your wallet

Your transaction will be added to the pending queue and will be executed when the batch criteria are met.

### Checking Transaction Status

You can monitor the status of your submitted transactions:

1. Go to the "My Transactions" tab
2. View your pending transactions in the "Pending" section
3. View your executed transactions in the "History" section

Each transaction displays:
- Recipient address
- Amount
- Submission time
- Status (Pending, Executed, Failed)
- Gas savings

### Withdrawing Funds

To withdraw your unused funds:

1. Navigate to the "Withdraw" page
2. Enter the amount you wish to withdraw
3. Click "Confirm Withdrawal"
4. Approve the transaction in your wallet
5. Wait for transaction confirmation

## Advanced Features

### Gas Price Settings

You can customize your gas price preferences:

1. Go to "Settings" > "Gas Settings"
2. Choose your gas price strategy:
   - **Economy**: Lowest gas price, longer wait time
   - **Standard**: Balanced gas price and wait time
   - **Express**: Higher gas price, faster execution
3. Set custom maximum gas price if desired
4. Save your preferences

### Cancelling Transactions

To cancel a pending transaction:

1. Navigate to "My Transactions"
2. Find the pending transaction you wish to cancel
3. Click the "Cancel" button
4. Approve the cancellation transaction
5. The transaction will be removed from the queue and funds returned to your balance

> **Note**: You can only cancel transactions that have not yet been included in a batch being executed.

### Batch Execution Notifications

Enable notifications to be alerted when your transactions are executed:

1. Go to "Settings" > "Notifications"
2. Enable "Batch Execution Alerts"
3. Choose your preferred notification method:
   - Browser notifications
   - Email alerts
   - Webhook integration

## Understanding Gas Savings

The WePay dashboard provides transparency into your gas savings:

1. Visit the "Analytics" page
2. View your:
   - Total transactions executed
   - Total gas saved (in ETH)
   - Average gas savings percentage
   - Comparison chart of standard vs. batched transaction costs

![Gas Savings Analytics](https://i.imgur.com/gassavings.png)

### How Savings Are Calculated

Gas savings are calculated by comparing:
1. The gas cost if your transaction was sent individually
2. Your portion of the gas cost in the batched transaction

The formula is:
```
Savings = StandardGasCost - (BatchGasCost / NumberOfTransactionsInBatch)
```

## Using Cross-Chain Features

The WePay system supports transaction batching across multiple blockchain networks:

1. From the dashboard, select your target chain from the network dropdown
2. Deposit funds into that specific chain's contract
3. Submit transactions as normal
4. The system will handle cross-chain execution

Supported networks:
- Ethereum Mainnet
- Polygon
- Arbitrum
- Optimism
- Binance Smart Chain

## Security Best Practices

### Verifying Addresses

Always double-check recipient addresses before submitting transactions:
1. Use the address book feature to save frequently used addresses
2. Enable the "Address Verification" feature in settings
3. Check for the address identifier icon that appears next to verified addresses

### Setting Transaction Limits

Protect your account by setting transaction limits:

1. Go to "Settings" > "Security"
2. Set a maximum transaction amount
3. Enable two-factor authentication for large transactions
4. Save your preferences

## Troubleshooting

### Transaction Stuck Pending

If your transaction has been pending for an extended period:

1. Check the "Batch Status" page to see the current batch filling progress
2. Verify that the network gas prices are within your set thresholds
3. Consider cancelling and resubmitting with higher priority if urgent

### Failed Transactions

If your transaction failed during batch execution:

1. Go to "My Transactions" > "History"
2. Find the failed transaction and click "Details"
3. Review the error message
4. Common reasons for failure include:
   - Insufficient gas for complex contract interactions
   - Contract execution reverted
   - Target contract out of gas

Contact support if you need assistance understanding a failed transaction.

### Account Recovery

If you need to recover access to your WePay account:

1. Connect with the same wallet address you used previously
2. Your transaction history and balances will be automatically restored
3. For additional recovery options, contact support

## FAQ

**Q: How long until my transaction is executed?**
A: Transactions are executed when either:
- The minimum batch size is reached
- The maximum wait time has elapsed
- The gas price conditions are favorable

**Q: Can I prioritize my transaction?**
A: Yes, you can pay a small priority fee to have your transaction included in the next batch regardless of other conditions.

**Q: Is there a minimum deposit amount?**
A: The minimum deposit is 0.01 ETH.

**Q: How secure are my funds in the WePay contract?**
A: The WePay contracts have undergone security audits by leading firms. Additionally, the system implements circuit breakers and security guards to protect user funds.

**Q: Can I use WePay for complex contract interactions?**
A: Yes, WePay supports arbitrary contract calls, not just simple ETH transfers.

## Support

If you encounter any issues or have questions:

- Visit our [Help Center](https://wepay.app/help)
- Email support at support@wepay.app
- Join our [Discord community](https://discord.gg/wepay)
- Follow us on [Twitter](https://twitter.com/wepaydapp) for updates 