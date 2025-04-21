// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "../security/AccessControl.sol";

/**
 * @title WePay Layer 2 Executor
 * @dev Enables batch execution on Layer 2 scaling solutions
 * Supports Optimism, Arbitrum, and other EVM-compatible L2s
 */
contract WePayLayer2Executor is AccessControl {
    // Events
    event L2BridgeRegistered(address indexed bridge, string name);
    event BatchSentToL2(address indexed l2Target, bytes batchData, uint256 value);
    event L2TransactionReceived(address indexed from, bytes response);
    
    // Bridge contract addresses for different L2 solutions
    mapping(string => address) public l2Bridges;
    
    constructor() {
        _setupRole(ADMIN_ROLE, msg.sender);
        _setupRole(OPERATOR_ROLE, msg.sender);
    }
    
    /**
     * @dev Generic interface for L2 bridge contracts
     */
    interface IL2Bridge {
        function sendToL2(address target, bytes calldata data) external payable returns (bytes32);
    }
    
    /**
     * @dev Registers a bridge contract for a specific L2 solution
     * @param bridgeName Name identifier for the L2 solution (e.g., "optimism", "arbitrum")
     * @param bridgeAddress Address of the bridge contract
     */
    function registerL2Bridge(string calldata bridgeName, address bridgeAddress) external onlyRole(ADMIN_ROLE) {
        require(bridgeAddress != address(0), "Invalid bridge address");
        l2Bridges[bridgeName] = bridgeAddress;
        emit L2BridgeRegistered(bridgeAddress, bridgeName);
    }
    
    /**
     * @dev Executes a batch of transactions on a Layer 2 network
     * @param l2Name Name of the L2 solution to use
     * @param l2Target Address on L2 that will receive the transaction
     * @param targets Array of contract addresses to call on L2
     * @param values Array of ETH values to send with each call
     * @param datas Array of call data for each transaction
     */
    function executeBatchOnL2(
        string calldata l2Name,
        address l2Target,
        address[] calldata targets,
        uint256[] calldata values,
        bytes[] calldata datas
    ) external payable onlyRole(OPERATOR_ROLE) {
        address bridge = l2Bridges[l2Name];
        require(bridge != address(0), "L2 bridge not configured");
        require(targets.length == values.length && targets.length == datas.length, "Array lengths mismatch");
        
        // Encode the entire batch as a single transaction
        bytes memory batchData = abi.encode(targets, values, datas);
        
        // Send to L2 via the bridge
        IL2Bridge(bridge).sendToL2{value: msg.value}(l2Target, batchData);
        
        emit BatchSentToL2(l2Target, batchData, msg.value);
    }
    
    /**
     * @dev Callback function to receive response from L2
     * Only callable by registered L2 bridges
     * @param l2Name Name of the L2 solution
     * @param from Original sender on L2
     * @param response Response data from L2
     */
    function receiveFromL2(
        string calldata l2Name,
        address from,
        bytes calldata response
    ) external {
        require(l2Bridges[l2Name] == msg.sender, "Caller is not a registered bridge");
        
        // Process the response (this would depend on the specific use case)
        emit L2TransactionReceived(from, response);
    }
    
    /**
     * @dev Estimates gas savings from executing on L2 vs L1
     * @param l2Name Name of the L2 solution
     * @param dataSize Size of the transaction data in bytes
     * @return Estimated gas savings in wei
     */
    function estimateL2GasSavings(string calldata l2Name, uint256 dataSize) external view returns (uint256) {
        // Different L2s have different gas savings profiles
        // These are simplified estimates
        if (keccak256(bytes(l2Name)) == keccak256(bytes("optimism"))) {
            // Optimism has very low L2 execution costs but higher L1 data costs
            return dataSize * 16 * 9 / 10; // ~90% savings on execution, still pay for data
        } else if (keccak256(bytes(l2Name)) == keccak256(bytes("arbitrum"))) {
            // Arbitrum has moderate L2 execution costs
            return dataSize * 16 * 8 / 10; // ~80% savings
        } else if (keccak256(bytes(l2Name)) == keccak256(bytes("polygon"))) {
            // Polygon (not technically L2 but a sidechain)
            return dataSize * 16 * 95 / 100; // ~95% savings
        }
        
        // Default estimate for unknown L2
        return dataSize * 16 * 7 / 10; // ~70% savings
    }
    
    /**
     * @dev Required to receive ETH when bridging from L2
     */
    receive() external payable {}
} 