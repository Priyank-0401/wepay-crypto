/**
 * Script to interact with WePay Gas Optimizer contracts
 * 
 * Run with: truffle exec scripts/interact.js --network development
 */

module.exports = async function(callback) {
  try {
    // Get accounts
    const accounts = await web3.eth.getAccounts();
    const owner = accounts[0];
    const user1 = accounts[1];
    const user2 = accounts[2];
    
    console.log("Using accounts:");
    console.log("- Owner:", owner);
    console.log("- User1:", user1);
    console.log("- User2:", user2);
    
    // Get contract instances
    const WePayGasOptimizer = artifacts.require("WePayGasOptimizer");
    const WePayGasOptimizerV1 = artifacts.require("WePayGasOptimizerV1");
    
    const optimizer = await WePayGasOptimizer.deployed();
    const optimizerV1 = await WePayGasOptimizerV1.deployed();
    
    console.log("\nContract addresses:");
    console.log("- WePayGasOptimizer:", optimizer.address);
    console.log("- WePayGasOptimizerV1:", optimizerV1.address);
    
    // Deposit ETH to both contracts
    const depositAmount = web3.utils.toWei("1", "ether");
    console.log(`\nDepositing ${web3.utils.fromWei(depositAmount, "ether")} ETH from User1...`);
    
    await optimizer.deposit({ from: user1, value: depositAmount });
    await optimizerV1.deposit({ from: user1, value: depositAmount });
    
    // Check balances
    const balance = await optimizer.balances(user1);
    const balanceV1 = await optimizerV1.balances(user1);
    
    console.log("\nUser1 Balances:");
    console.log("- WePayGasOptimizer:", web3.utils.fromWei(balance, "ether"), "ETH");
    console.log("- WePayGasOptimizerV1:", web3.utils.fromWei(balanceV1, "ether"), "ETH");
    
    // Submit transactions
    const sendAmount = web3.utils.toWei("0.1", "ether");
    console.log(`\nSubmitting transactions to send ${web3.utils.fromWei(sendAmount, "ether")} ETH to User2...`);
    
    const tx1 = await optimizer.submitTransaction(user2, sendAmount, "0x", { from: user1 });
    console.log("- Transaction submitted to WePayGasOptimizer, txId:", tx1.logs[0].args.transactionId.toString());
    
    const tx2 = await optimizerV1.submitTransaction(user2, sendAmount, "0x", { from: user1 });
    console.log("- Transaction submitted to WePayGasOptimizerV1, txId:", tx2.logs[0].args.transactionId.toString());
    
    // Wait 3 seconds
    console.log("\nWaiting 3 seconds...");
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    // Submit more transactions (to reach batch threshold)
    console.log("\nSubmitting more transactions...");
    for (let i = 0; i < 3; i++) {
      await optimizer.submitTransaction(user2, sendAmount, "0x", { from: user1 });
      await optimizerV1.submitTransaction(user2, sendAmount, "0x", { from: user1 });
    }
    
    // Check pending transaction counts
    const pendingCount = await optimizer.pendingTransactions(user1, 0);
    const pendingCountV1 = await optimizerV1.getPendingTransactionCount(user1);
    
    console.log("\nPending Transaction Counts:");
    console.log("- WePayGasOptimizer: Contract doesn't have a count getter, but we submitted 4 transactions");
    console.log("- WePayGasOptimizerV1:", pendingCountV1.toString());
    
    console.log("\nScript execution completed successfully!");
    callback();
  } catch (error) {
    console.error("\nError:", error);
    callback(error);
  }
}; 