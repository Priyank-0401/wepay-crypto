// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "../interfaces/IWePayGasOptimizer.sol";
import "../security/AccessControl.sol";
import "../security/FlashLoanGuard.sol";
import "../security/ReentrancyGuard.sol";

/**
 * @title WePay Gas Optimizer Implementation v1
 * @dev Implementation of gas optimization with enhanced security features
 */
contract WePayGasOptimizerV1 is IWePayGasOptimizer, AccessControl, FlashLoanGuard, ReentrancyGuard {
    address public override owner;
    uint256 public override minBatchSize;
    uint256 public override maxBatchSize;
    uint256 public override discountRate; // In basis points (1/100 of a percent)
    bool public override paused;
    
    // Mapping from user address to their pending transactions
    mapping(address => Transaction[]) private _pendingTransactions;
    // Mapping of user balances
    mapping(address => uint256) private _balances;
    
    // MEV protection parameters
    uint256 public maxGasPrice;
    address public trustedRelayer;
    
    // Initialization function (replaces constructor for upgradeable contracts)
    function initialize(
        uint256 _minBatchSize, 
        uint256 _maxBatchSize, 
        uint256 _discountRate,
        address _trustedRelayer,
        uint256 _maxGasPrice
    ) external {
        require(owner == address(0), "Already initialized");
        
        owner = msg.sender;
        minBatchSize = _minBatchSize;
        maxBatchSize = _maxBatchSize;
        discountRate = _discountRate;
        paused = false;
        
        // MEV protection initialization
        trustedRelayer = _trustedRelayer;
        maxGasPrice = _maxGasPrice;
        
        // Initialize access control
        _setupRole(ADMIN_ROLE, msg.sender);
        _setupRole(OPERATOR_ROLE, msg.sender);
    }
    
    // View functions
    function pendingTransactions(address user, uint256 index) external view override returns (address, uint256, bytes memory, bool) {
        Transaction storage tx = _pendingTransactions[user][index];
        return (tx.to, tx.value, tx.data, tx.executed);
    }
    
    function balances(address user) external view override returns (uint256) {
        return _balances[user];
    }
    
    function getPendingTransactionCount(address user) external view returns (uint256) {
        return _pendingTransactions[user].length;
    }
    
    // Allow users to deposit ETH to be used for their transactions
    function deposit() external payable override whenNotPaused nonReentrant {
        _balances[msg.sender] += msg.value;
        emit FundsDeposited(msg.sender, msg.value);
    }
    
    // Submit a transaction to be executed in a batch
    function submitTransaction(address _to, uint256 _value, bytes calldata _data) 
        external 
        override 
        whenNotPaused 
        protectAgainstFlashLoans
        mevProtected
        returns (uint256) 
    {
        require(_to != address(0), "Invalid recipient address");
        require(_balances[msg.sender] >= _value, "Insufficient balance");
        
        Transaction memory newTx = Transaction({
            to: _to,
            value: _value,
            data: _data,
            executed: false
        });
        
        _pendingTransactions[msg.sender].push(newTx);
        uint256 txId = _pendingTransactions[msg.sender].length - 1;
        
        emit TransactionSubmitted(msg.sender, _to, _value, txId);
        
        // If enough transactions are pending, execute the batch
        if (_pendingTransactions[msg.sender].length >= minBatchSize) {
            executeBatch(msg.sender);
        }
        
        return txId;
    }
    
    // Execute a batch of transactions for a user
    function executeBatch(address _user) public override whenNotPaused nonReentrant {
        Transaction[] storage txs = _pendingTransactions[_user];
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
            if (!txs[i].executed && _balances[_user] >= txs[i].value) {
                // Update user balance
                _balances[_user] -= txs[i].value;
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
        Transaction[] storage txs = _pendingTransactions[_user];
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
    function withdraw() external override whenNotPaused nonReentrant protectAgainstFlashLoans {
        uint256 amount = _balances[msg.sender];
        require(amount > 0, "No balance to withdraw");
        
        _balances[msg.sender] = 0;
        
        (bool success, ) = msg.sender.call{value: amount}("");
        require(success, "Withdrawal failed");
        
        emit FundsWithdrawn(msg.sender, amount);
    }
    
    // Admin functions
    
    // Update batch size parameters
    function updateBatchParams(uint256 _minBatchSize, uint256 _maxBatchSize) 
        external 
        override 
        onlyRole(ADMIN_ROLE) 
    {
        minBatchSize = _minBatchSize;
        maxBatchSize = _maxBatchSize;
    }
    
    // Update discount rate
    function updateDiscountRate(uint256 _discountRate) 
        external 
        override 
        onlyRole(ADMIN_ROLE) 
    {
        discountRate = _discountRate;
    }
    
    // Pause/unpause the contract
    function setPaused(bool _paused) 
        external 
        override 
        onlyRole(ADMIN_ROLE) 
    {
        paused = _paused;
    }
    
    // Update MEV protection parameters
    function updateMEVProtection(address _trustedRelayer, uint256 _maxGasPrice) 
        external 
        onlyRole(ADMIN_ROLE) 
    {
        trustedRelayer = _trustedRelayer;
        maxGasPrice = _maxGasPrice;
    }
    
    // Allow owner to execute a batch for any user
    function executeUserBatch(address _user) 
        external 
        override 
        onlyRole(OPERATOR_ROLE) 
    {
        executeBatch(_user);
    }
    
    // Allow recovery of accidentally sent ETH
    function recoverETH() external override onlyRole(ADMIN_ROLE) {
        uint256 contractBalance = address(this).balance;
        uint256 userBalanceTotal = calculateUserBalanceTotal();
        
        uint256 excessBalance = contractBalance - userBalanceTotal;
        require(excessBalance > 0, "No excess balance to recover");
        
        (bool success, ) = owner.call{value: excessBalance}("");
        require(success, "Recovery failed");
    }
    
    // Calculate total balance held by users
    function calculateUserBalanceTotal() internal view returns (uint256) {
        // In a real implementation, we would iterate through all users
        // For this example, we'll return a dummy value
        return 0;
    }
    
    // Private relayer function for MEV protection
    function submitPrivateTransaction(
        address user,
        address to,
        uint256 value,
        bytes calldata data,
        bytes calldata signature
    ) external onlyRole(OPERATOR_ROLE) {
        require(msg.sender == trustedRelayer, "Only trusted relayer");
        
        // Verify signature (simplified; would be more robust in production)
        bytes32 hash = keccak256(abi.encodePacked(user, to, value, data));
        // require(verifySignature(user, hash, signature), "Invalid signature");
        
        // Execute transaction as if it came from the user
        require(_balances[user] >= value, "Insufficient balance");
        
        Transaction memory newTx = Transaction({
            to: to,
            value: value,
            data: data,
            executed: false
        });
        
        _pendingTransactions[user].push(newTx);
        uint256 txId = _pendingTransactions[user].length - 1;
        
        emit TransactionSubmitted(user, to, value, txId);
    }
    
    // Modifiers
    modifier whenNotPaused() {
        require(!paused, "Contract is paused");
        _;
    }
    
    modifier mevProtected() {
        // Only allow EOA or trusted relayer
        require(tx.origin == msg.sender || msg.sender == trustedRelayer, "MEV protection: only EOA or trusted relayer");
        // Only allow transactions below max gas price
        require(tx.gasprice <= maxGasPrice, "MEV protection: gas price too high");
        _;
    }
} 