// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

/**
 * @title WePay Gas Optimizer Interface
 * @dev Interface for the gas optimization contract to enable upgradability
 */
interface IWePayGasOptimizer {
    struct Transaction {
        address to;
        uint256 value;
        bytes data;
        bool executed;
    }
    
    // View functions
    function owner() external view returns (address);
    function minBatchSize() external view returns (uint256);
    function maxBatchSize() external view returns (uint256);
    function discountRate() external view returns (uint256);
    function paused() external view returns (bool);
    function pendingTransactions(address user, uint256 index) external view returns (address, uint256, bytes memory, bool);
    function balances(address user) external view returns (uint256);
    
    // Main functionality
    function deposit() external payable;
    function submitTransaction(address _to, uint256 _value, bytes calldata _data) external returns (uint256);
    function executeBatch(address _user) external;
    function withdraw() external;
    
    // Admin functions
    function updateBatchParams(uint256 _minBatchSize, uint256 _maxBatchSize) external;
    function updateDiscountRate(uint256 _discountRate) external;
    function setPaused(bool _paused) external;
    function executeUserBatch(address _user) external;
    function recoverETH() external;
    
    // Events
    event TransactionSubmitted(address indexed user, address indexed to, uint256 value, uint256 transactionId);
    event TransactionExecuted(address indexed user, address indexed to, uint256 value, uint256 transactionId, uint256 gasSaved);
    event BatchExecuted(uint256 batchSize, uint256 totalGasSaved);
    event FundsDeposited(address indexed user, uint256 amount);
    event FundsWithdrawn(address indexed user, uint256 amount);
} 