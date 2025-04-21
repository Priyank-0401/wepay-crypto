// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "../security/AccessControl.sol";

/**
 * @title WePay Cross-Chain Executor
 * @dev Enables transaction execution across different blockchain networks
 */
contract WePayCrossChainExecutor is AccessControl {
    // Events
    event BridgeRegistered(uint256 indexed chainId, address indexed bridge);
    event CrossChainTransactionSent(uint256 indexed destChainId, address indexed recipient, bytes data, uint256 value);
    event CrossChainTransactionReceived(uint256 indexed sourceChainId, address indexed sender, bytes data);
    
    // Chain ID => Bridge contract address
    mapping(uint256 => address) public bridges;
    
    constructor() {
        _setupRole(ADMIN_ROLE, msg.sender);
        _setupRole(OPERATOR_ROLE, msg.sender);
    }
    
    /**
     * @dev Interface for a generic chain bridge
     */
    interface IChainBridge {
        function sendMessage(uint256 destChainId, address recipient, bytes calldata message) external payable;
    }
    
    /**
     * @dev Registers a bridge contract for a specific chain
     * @param chainId ID of the destination chain
     * @param bridge Address of the bridge contract on this chain
     */
    function registerBridge(uint256 chainId, address bridge) external onlyRole(ADMIN_ROLE) {
        require(bridge != address(0), "Invalid bridge address");
        bridges[chainId] = bridge;
        emit BridgeRegistered(chainId, bridge);
    }
    
    /**
     * @dev Sends a transaction to be executed on another chain
     * @param destChainId ID of the destination chain
     * @param recipient Address that will receive the transaction on the destination chain
     * @param data Function data to be executed
     */
    function sendCrossChainTransaction(
        uint256 destChainId,
        address recipient,
        bytes calldata data
    ) external payable {
        address bridge = bridges[destChainId];
        require(bridge != address(0), "Bridge not configured for chain");
        
        // Encode transaction data
        bytes memory message = abi.encode(
            msg.sender,  // Original sender
            recipient,   // Recipient on destination chain
            data,        // Call data
            msg.value    // Value to send
        );
        
        // Call the bridge contract
        IChainBridge(bridge).sendMessage{value: msg.value}(destChainId, recipient, message);
        
        emit CrossChainTransactionSent(destChainId, recipient, data, msg.value);
    }
    
    /**
     * @dev Callback function that receives messages from other chains
     * Only callable by a registered bridge
     * @param sourceChainId Chain ID where the transaction originated
     * @param sender Original sender on the source chain
     * @param message Encoded transaction data
     */
    function receiveCrossChainTransaction(
        uint256 sourceChainId,
        address sender,
        bytes calldata message
    ) external {
        // Verify caller is a registered bridge
        require(bridges[sourceChainId] == msg.sender, "Caller is not a registered bridge");
        
        // Decode message
        (address originalSender, address recipient, bytes memory data, uint256 value) = 
            abi.decode(message, (address, address, bytes, uint256));
        
        // Execute the transaction
        (bool success, ) = recipient.call{value: value}(data);
        require(success, "Cross-chain transaction execution failed");
        
        emit CrossChainTransactionReceived(sourceChainId, originalSender, data);
    }
    
    /**
     * @dev Required to receive ETH when executing transactions
     */
    receive() external payable {}
} 