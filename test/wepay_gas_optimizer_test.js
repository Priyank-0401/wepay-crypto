const WePayGasOptimizer = artifacts.require("WePayGasOptimizer");
const WePayGasOptimizerV1 = artifacts.require("WePayGasOptimizerV1");

contract("WePayGasOptimizer", (accounts) => {
  const owner = accounts[0];
  const user1 = accounts[1];
  const user2 = accounts[2];
  
  let gasOptimizer;
  
  before(async () => {
    gasOptimizer = await WePayGasOptimizer.deployed();
    console.log("WePayGasOptimizer deployed at:", gasOptimizer.address);
  });
  
  it("should allow users to deposit ETH", async () => {
    // Deposit 1 ETH
    const depositAmount = web3.utils.toWei("1", "ether");
    await gasOptimizer.deposit({ from: user1, value: depositAmount });
    
    // Check balance
    const balance = await gasOptimizer.balances(user1);
    assert.equal(balance.toString(), depositAmount, "Balance should match deposit amount");
  });
  
  it("should allow users to submit transactions", async () => {
    // Submit a transaction to send 0.1 ETH to user2
    const sendAmount = web3.utils.toWei("0.1", "ether");
    const tx = await gasOptimizer.submitTransaction(user2, sendAmount, "0x", { from: user1 });
    
    // Check that the transaction was submitted (event emitted)
    assert.equal(tx.logs[0].event, "TransactionSubmitted", "TransactionSubmitted event should be emitted");
    
    // Check that the transaction is pending
    const pendingCount = await gasOptimizer.pendingTransactions(user1, 0);
    assert.equal(pendingCount[1].toString(), sendAmount, "Transaction amount should match");
  });
});

contract("WePayGasOptimizerV1", (accounts) => {
  const owner = accounts[0];
  const user1 = accounts[1];
  const user2 = accounts[2];
  
  let gasOptimizerV1;
  
  before(async () => {
    gasOptimizerV1 = await WePayGasOptimizerV1.deployed();
    console.log("WePayGasOptimizerV1 deployed at:", gasOptimizerV1.address);
  });
  
  it("should allow users to deposit ETH", async () => {
    // Deposit 1 ETH
    const depositAmount = web3.utils.toWei("1", "ether");
    await gasOptimizerV1.deposit({ from: user1, value: depositAmount });
    
    // Check balance
    const balance = await gasOptimizerV1.balances(user1);
    assert.equal(balance.toString(), depositAmount, "Balance should match deposit amount");
  });
  
  it("should allow users to submit transactions", async () => {
    // Submit a transaction to send 0.1 ETH to user2
    const sendAmount = web3.utils.toWei("0.1", "ether");
    const tx = await gasOptimizerV1.submitTransaction(user2, sendAmount, "0x", { from: user1 });
    
    // Check that the transaction was submitted (event emitted)
    assert.equal(tx.logs[0].event, "TransactionSubmitted", "TransactionSubmitted event should be emitted");
    
    // Check pending transaction count
    const count = await gasOptimizerV1.getPendingTransactionCount(user1);
    assert(count > 0, "Should have pending transactions");
  });
}); 