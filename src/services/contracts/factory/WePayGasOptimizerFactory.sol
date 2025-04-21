// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "../implementation/WePayGasOptimizerV1.sol";
import "../proxy/WePayProxy.sol";
import "../governance/WePayGovernance.sol";
import "../governance/Timelock.sol";
import "../extensions/CrossChainExecutor.sol";
import "../extensions/Layer2Executor.sol";

/**
 * @title WePay Gas Optimizer Factory
 * @dev Deploys and connects all components of the WePay gas optimization system
 */
contract WePayGasOptimizerFactory {
    // Events
    event SystemDeployed(
        address indexed proxy,
        address indexed implementation,
        address indexed governance,
        address timelock,
        address crossChainExecutor,
        address layer2Executor
    );
    
    /**
     * @dev Deploys the entire WePay gas optimization system
     * @param _minBatchSize Minimum batch size for transaction batching
     * @param _maxBatchSize Maximum batch size for transaction batching
     * @param _discountRate Discount rate in basis points
     * @param _governanceToken Address of the governance token
     * @param _trustedRelayer Address of the trusted relayer for MEV protection
     * @param _maxGasPrice Maximum gas price for MEV protection
     * @return Address of the proxy contract that users interact with
     */
    function deploySystem(
        uint256 _minBatchSize,
        uint256 _maxBatchSize,
        uint256 _discountRate,
        address _governanceToken,
        address _trustedRelayer,
        uint256 _maxGasPrice
    ) external returns (address) {
        // 1. Deploy implementation contract
        WePayGasOptimizerV1 implementation = new WePayGasOptimizerV1();
        
        // 2. Deploy proxy contract pointing to implementation
        WePayProxy proxy = new WePayProxy(address(implementation));
        
        // 3. Deploy governance contracts
        WePayGovernance governance = new WePayGovernance(_governanceToken);
        WePayTimelock timelock = new WePayTimelock();
        
        // 4. Deploy extension contracts
        CrossChainExecutor crossChainExecutor = new CrossChainExecutor();
        Layer2Executor layer2Executor = new Layer2Executor();
        
        // 5. Initialize the implementation through the proxy
        bytes memory initData = abi.encodeWithSelector(
            WePayGasOptimizerV1.initialize.selector,
            _minBatchSize,
            _maxBatchSize,
            _discountRate,
            _trustedRelayer,
            _maxGasPrice
        );
        
        (bool success, ) = address(proxy).call(initData);
        require(success, "Initialization failed");
        
        // 6. Set up access control permissions
        // Get the implementation via proxy (for type safety)
        WePayGasOptimizerV1 proxyImpl = WePayGasOptimizerV1(address(proxy));
        
        // Get ADMIN_ROLE from the implementation
        bytes32 ADMIN_ROLE = proxyImpl.ADMIN_ROLE();
        bytes32 OPERATOR_ROLE = proxyImpl.OPERATOR_ROLE();
        
        // Grant roles to governance timelock
        proxyImpl.grantRole(ADMIN_ROLE, address(timelock));
        proxyImpl.grantRole(OPERATOR_ROLE, address(timelock));
        crossChainExecutor.grantRole(ADMIN_ROLE, address(timelock));
        layer2Executor.grantRole(ADMIN_ROLE, address(timelock));
        
        // Grant operator roles to extension contracts (for automation)
        proxyImpl.grantRole(OPERATOR_ROLE, address(crossChainExecutor));
        proxyImpl.grantRole(OPERATOR_ROLE, address(layer2Executor));
        
        // Grant roles to deployer for initial setup
        crossChainExecutor.grantRole(OPERATOR_ROLE, msg.sender);
        layer2Executor.grantRole(OPERATOR_ROLE, msg.sender);
        
        emit SystemDeployed(
            address(proxy),
            address(implementation),
            address(governance),
            address(timelock),
            address(crossChainExecutor),
            address(layer2Executor)
        );
        
        return address(proxy);
    }
} 