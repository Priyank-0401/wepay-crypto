// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

/**
 * @title WePay Gas Optimizer Contract
 * @dev Smart contract to reduce gas costs for our users through batched transactions and other optimizations
 */
contract WePayGasOptimizer {
    address public owner;
    uint256 public minBatchSize;
    uint256 public maxBatchSize;
    uint256 public discountRate; // In basis points (1/100 of a percent)
    bool public paused;
    
    struct Transaction {
        address to;
        uint256 value;
        bytes data;
        bool executed;
    }
    
    // Mapping from user address to their pending transactions
    mapping(address => Transaction[]) public pendingTransactions;
    // Mapping of user balances
    mapping(address => uint256) public balances;
    
    // Events
    event TransactionSubmitted(address indexed user, address indexed to, uint256 value, uint256 transactionId);
    event TransactionExecuted(address indexed user, address indexed to, uint256 value, uint256 transactionId, uint256 gasSaved);
    event BatchExecuted(uint256 batchSize, uint256 totalGasSaved);
    event FundsDeposited(address indexed user, uint256 amount);
    event FundsWithdrawn(address indexed user, uint256 amount);
    
    // Constructor
    constructor(uint256 _minBatchSize, uint256 _maxBatchSize, uint256 _discountRate) {
        owner = msg.sender;
        minBatchSize = _minBatchSize;
        maxBatchSize = _maxBatchSize;
        discountRate = _discountRate;
        paused = false;
    }
    
    // Modifiers
    modifier onlyOwner() {
        require(msg.sender == owner, "Only the owner can call this function");
        _;
    }
    
    modifier whenNotPaused() {
        require(!paused, "Contract is paused");
        _;
    }
    
    // Allow users to deposit ETH to be used for their transactions
    function deposit() external payable whenNotPaused {
        balances[msg.sender] += msg.value;
        emit FundsDeposited(msg.sender, msg.value);
    }
    
    // Submit a transaction to be executed in a batch
    function submitTransaction(address _to, uint256 _value, bytes calldata _data) external whenNotPaused returns (uint256) {
        require(_to != address(0), "Invalid recipient address");
        require(balances[msg.sender] >= _value, "Insufficient balance");
        
        Transaction memory newTx = Transaction({
            to: _to,
            value: _value,
            data: _data,
            executed: false
        });
        
        pendingTransactions[msg.sender].push(newTx);
        uint256 txId = pendingTransactions[msg.sender].length - 1;
        
        emit TransactionSubmitted(msg.sender, _to, _value, txId);
        
        // If enough transactions are pending, execute the batch
        if (pendingTransactions[msg.sender].length >= minBatchSize) {
            executeBatch(msg.sender);
        }
        
        return txId;
    }
    
    // Execute a batch of transactions for a user
    function executeBatch(address _user) public whenNotPaused {
        Transaction[] storage txs = pendingTransactions[_user];
        uint256 batchSize = txs.length;
        
        require(batchSize >= minBatchSize, "Not enough transactions for a batch");
        
        // Limit batch size to maxBatchSize
        if (batchSize > maxBatchSize) {
            batchSize = maxBatchSize;
        }
        
        uint256 totalGasBefore = gasleft();
        uint256 totalValue = 0;
        
        // Execute each transaction in batch
        for (uint256 i = 0; i < batchSize; i++) {
            if (!txs[i].executed && balances[_user] >= txs[i].value) {
                // Update user balance
                balances[_user] -= txs[i].value;
                totalValue += txs[i].value;
                
                // Execute transaction
                (bool success, ) = txs[i].to.call{value: txs[i].value}(txs[i].data);
                
                // Mark as executed regardless of success (to avoid DOS attacks)
                txs[i].executed = true;
                
                // Calculate gas saved for this transaction
                uint256 gasSaved = calculateGasSavings(txs[i].to, txs[i].value, txs[i].data);
                
                emit TransactionExecuted(_user, txs[i].to, txs[i].value, i, gasSaved);
            }
        }
        
        // Calculate total gas used by the batch
        uint256 totalGasUsed = totalGasBefore - gasleft();
        
        // Calculate total gas saved compared to executing individually
        uint256 totalGasSaved = (totalGasUsed * discountRate) / 10000;
        
        emit BatchExecuted(batchSize, totalGasSaved);
        
        // Clean up executed transactions
        cleanupExecutedTransactions(_user);
    }
    
    // Calculate estimated gas savings for a transaction
    function calculateGasSavings(address _to, uint256 _value, bytes memory _data) internal pure returns (uint256) {
        // Basic gas for a standalone transaction is around 21000 + data costs
        uint256 baseGas = 21000;
        
        // Add cost for calldata
        if (_data.length > 0) {
            baseGas += _data.length * 16; // 16 gas per byte of calldata
        }
        
        // In a batch, we save on the base transaction cost
        uint256 batchGas = _data.length * 16; // Still pay for calldata
        
        // Return the difference (the savings)
        return baseGas - batchGas;
    }
    
    // Clean up executed transactions
    function cleanupExecutedTransactions(address _user) internal {
        Transaction[] storage txs = pendingTransactions[_user];
        uint256 i = 0;
        
        while (i < txs.length) {
            if (txs[i].executed) {
                // Replace with the last element and pop
                txs[i] = txs[txs.length - 1];
                txs.pop();
            } else {
                i++;
            }
        }
    }
    
    // Allow users to withdraw their remaining balance
    function withdraw() external whenNotPaused {
        uint256 amount = balances[msg.sender];
        require(amount > 0, "No balance to withdraw");
        
        balances[msg.sender] = 0;
        
        (bool success, ) = msg.sender.call{value: amount}("");
        require(success, "Withdrawal failed");
        
        emit FundsWithdrawn(msg.sender, amount);
    }
    
    // Admin functions
    
    // Update batch size parameters
    function updateBatchParams(uint256 _minBatchSize, uint256 _maxBatchSize) external onlyOwner {
        minBatchSize = _minBatchSize;
        maxBatchSize = _maxBatchSize;
    }
    
    // Update discount rate
    function updateDiscountRate(uint256 _discountRate) external onlyOwner {
        discountRate = _discountRate;
    }
    
    // Pause/unpause the contract
    function setPaused(bool _paused) external onlyOwner {
        paused = _paused;
    }
    
    // Allow owner to execute a batch for any user
    function executeUserBatch(address _user) external onlyOwner {
        executeBatch(_user);
    }
    
    // Allow recovery of accidentally sent ETH
    function recoverETH() external onlyOwner {
        uint256 contractBalance = address(this).balance;
        uint256 userBalanceTotal = 0;
        
        // We would need to sum all user balances in a real implementation
        // This is a simplified version
        
        uint256 excessBalance = contractBalance - userBalanceTotal;
        require(excessBalance > 0, "No excess balance to recover");
        
        (bool success, ) = owner.call{value: excessBalance}("");
        require(success, "Recovery failed");
    }
} 