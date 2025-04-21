// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

/**
 * @title WePay Access Control
 * @dev Manages role-based permissions for contract functions
 */
contract AccessControl {
    // Role definitions
    bytes32 public constant ADMIN_ROLE = keccak256("ADMIN_ROLE");
    bytes32 public constant OPERATOR_ROLE = keccak256("OPERATOR_ROLE");
    bytes32 public constant UPGRADER_ROLE = keccak256("UPGRADER_ROLE");
    
    // Role => Account => HasRole
    mapping(bytes32 => mapping(address => bool)) private _roles;
    
    // Events
    event RoleGranted(bytes32 indexed role, address indexed account, address indexed sender);
    event RoleRevoked(bytes32 indexed role, address indexed account, address indexed sender);
    
    // Modifiers
    modifier onlyRole(bytes32 role) {
        require(_roles[role][msg.sender], "AccessControl: account does not have role");
        _;
    }
    
    // Role management functions
    function hasRole(bytes32 role, address account) public view returns (bool) {
        return _roles[role][account];
    }
    
    function grantRole(bytes32 role, address account) public onlyRole(ADMIN_ROLE) {
        if (!hasRole(role, account)) {
            _roles[role][account] = true;
            emit RoleGranted(role, account, msg.sender);
        }
    }
    
    function revokeRole(bytes32 role, address account) public onlyRole(ADMIN_ROLE) {
        if (hasRole(role, account)) {
            _roles[role][account] = false;
            emit RoleRevoked(role, account, msg.sender);
        }
    }
    
    // Used in initialization
    function _setupRole(bytes32 role, address account) internal {
        _roles[role][account] = true;
        emit RoleGranted(role, account, address(0));
    }
} 