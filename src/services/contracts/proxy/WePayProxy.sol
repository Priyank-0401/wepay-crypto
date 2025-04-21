// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "../security/AccessControl.sol";

/**
 * @title WePay Transparent Proxy
 * @dev Proxy contract that forwards calls to an implementation contract,
 * allowing contract logic to be upgraded without affecting storage or address
 */
contract WePayProxy is AccessControl {
    // Storage slot with the address of the current implementation
    bytes32 private constant IMPLEMENTATION_SLOT = keccak256("wepay.proxy.implementation");
    
    // Events
    event Upgraded(address indexed implementation);
    
    /**
     * @dev Constructor that sets up the initial implementation and admin roles
     * @param _implementation Address of the initial implementation contract
     */
    constructor(address _implementation) {
        require(_implementation != address(0), "Invalid implementation address");
        
        // Set implementation address
        _setImplementation(_implementation);
        
        // Set up admin role for the deployer
        _setupRole(ADMIN_ROLE, msg.sender);
        _setupRole(UPGRADER_ROLE, msg.sender);
    }
    
    /**
     * @dev Upgrades the implementation contract address
     * @param _newImplementation Address of the new implementation
     */
    function upgradeTo(address _newImplementation) external onlyRole(UPGRADER_ROLE) {
        require(_newImplementation != address(0), "Invalid implementation address");
        require(_newImplementation != _getImplementation(), "Same implementation");
        
        _setImplementation(_newImplementation);
        emit Upgraded(_newImplementation);
    }
    
    /**
     * @dev Returns the current implementation address
     * @return Current implementation address
     */
    function implementation() external view returns (address) {
        return _getImplementation();
    }
    
    /**
     * @dev Sets the implementation address in the dedicated storage slot
     * @param _implementation Address of the implementation
     */
    function _setImplementation(address _implementation) private {
        bytes32 slot = IMPLEMENTATION_SLOT;
        
        assembly {
            sstore(slot, _implementation)
        }
    }
    
    /**
     * @dev Gets the implementation address from the dedicated storage slot
     * @return Implementation address
     */
    function _getImplementation() private view returns (address implementation_) {
        bytes32 slot = IMPLEMENTATION_SLOT;
        
        assembly {
            implementation_ := sload(slot)
        }
    }
    
    /**
     * @dev Fallback function that delegates calls to the implementation contract
     */
    fallback() external payable {
        _delegate(_getImplementation());
    }
    
    /**
     * @dev Receive function to accept ETH
     */
    receive() external payable {
        _delegate(_getImplementation());
    }
    
    /**
     * @dev Delegates the current call to the implementation
     * @param _implementation Address of the implementation to delegate to
     */
    function _delegate(address _implementation) private {
        assembly {
            // Copy msg.data. We take full control of memory in this inline assembly
            // block because it will not return to Solidity code. We overwrite the
            // Solidity scratch pad at memory position 0.
            calldatacopy(0, 0, calldatasize())
            
            // Call the implementation.
            // out and outsize are 0 because we don't know the size yet.
            let result := delegatecall(gas(), _implementation, 0, calldatasize(), 0, 0)
            
            // Copy the returned data.
            returndatacopy(0, 0, returndatasize())
            
            switch result
            // delegatecall returns 0 on error.
            case 0 { revert(0, returndatasize()) }
            default { return(0, returndatasize()) }
        }
    }
} 