// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "../security/AccessControl.sol";

/**
 * @title WePay Timelock Controller
 * @dev Contract module that adds a timelock mechanism to function calls
 * Critical operations must be scheduled and can only be executed after a delay
 */
contract WePayTimelock is AccessControl {
    uint256 public delay = 2 days;
    uint256 public constant GRACE_PERIOD = 14 days;
    
    mapping(bytes32 => bool) public queuedTransactions;
    
    // Events
    event TransactionQueued(bytes32 indexed txHash, address indexed target, uint256 value, string signature, bytes data, uint256 eta);
    event TransactionExecuted(bytes32 indexed txHash, address indexed target, uint256 value, string signature, bytes data, uint256 eta);
    event TransactionCanceled(bytes32 indexed txHash);
    event DelayUpdated(uint256 newDelay);
    
    constructor() {
        _setupRole(ADMIN_ROLE, msg.sender);
    }
    
    /**
     * @dev Updates the delay period
     * @param newDelay New delay in seconds
     */
    function updateDelay(uint256 newDelay) external onlyRole(ADMIN_ROLE) {
        require(newDelay >= 1 days, "Delay must be at least 1 day");
        require(newDelay <= 30 days, "Delay cannot exceed 30 days");
        delay = newDelay;
        emit DelayUpdated(newDelay);
    }
    
    /**
     * @dev Queues a transaction for future execution
     * @param target Address of the contract to call
     * @param value Amount of ETH to send
     * @param signature Function signature to call
     * @param data Function data to send
     * @param eta Timestamp after which the transaction can be executed
     * @return Hash of the queued transaction
     */
    function queueTransaction(
        address target,
        uint256 value,
        string memory signature,
        bytes memory data,
        uint256 eta
    ) external onlyRole(ADMIN_ROLE) returns (bytes32) {
        require(eta >= block.timestamp + delay, "Execution date must satisfy delay");
        
        bytes32 txHash = keccak256(abi.encode(target, value, signature, data, eta));
        queuedTransactions[txHash] = true;
        
        emit TransactionQueued(txHash, target, value, signature, data, eta);
        return txHash;
    }
    
    /**
     * @dev Cancels a queued transaction
     * @param target Address of the contract to call
     * @param value Amount of ETH to send
     * @param signature Function signature to call
     * @param data Function data to send
     * @param eta Timestamp after which the transaction can be executed
     */
    function cancelTransaction(
        address target,
        uint256 value,
        string memory signature,
        bytes memory data,
        uint256 eta
    ) external onlyRole(ADMIN_ROLE) {
        bytes32 txHash = keccak256(abi.encode(target, value, signature, data, eta));
        queuedTransactions[txHash] = false;
        
        emit TransactionCanceled(txHash);
    }
    
    /**
     * @dev Executes a queued transaction after the timelock period has passed
     * @param target Address of the contract to call
     * @param value Amount of ETH to send
     * @param signature Function signature to call
     * @param data Function data to send
     * @param eta Timestamp after which the transaction can be executed
     * @return Data returned by the function call
     */
    function executeTransaction(
        address target,
        uint256 value,
        string memory signature,
        bytes memory data,
        uint256 eta
    ) external payable onlyRole(ADMIN_ROLE) returns (bytes memory) {
        bytes32 txHash = keccak256(abi.encode(target, value, signature, data, eta));
        require(queuedTransactions[txHash], "Transaction not queued");
        require(block.timestamp >= eta, "Timelock not expired");
        require(block.timestamp <= eta + GRACE_PERIOD, "Transaction expired");
        
        queuedTransactions[txHash] = false;
        
        bytes memory callData;
        if (bytes(signature).length == 0) {
            callData = data;
        } else {
            callData = abi.encodePacked(bytes4(keccak256(bytes(signature))), data);
        }
        
        (bool success, bytes memory returnData) = target.call{value: value}(callData);
        require(success, "Transaction execution reverted");
        
        emit TransactionExecuted(txHash, target, value, signature, data, eta);
        
        return returnData;
    }
} 