/**
 * Deployment script for WePay Gas Optimizer contracts
 */
const WePayGasOptimizer = artifacts.require("WePayGasOptimizer");
const WePayGasOptimizerV1 = artifacts.require("WePayGasOptimizerV1");
const AccessControl = artifacts.require("AccessControl");
const FlashLoanGuard = artifacts.require("FlashLoanGuard");
const ReentrancyGuard = artifacts.require("ReentrancyGuard");

module.exports = async function (deployer, network, accounts) {
  // Deploy supporting contracts first
  await deployer.deploy(AccessControl);
  await deployer.deploy(FlashLoanGuard);
  await deployer.deploy(ReentrancyGuard);
  
  // Deploy the basic gas optimizer with initial parameters
  await deployer.deploy(
    WePayGasOptimizer, 
    3,    // minBatchSize
    10,   // maxBatchSize
    500   // discountRate (5%)
  );
  
  // Deploy the V1 implementation
  await deployer.deploy(WePayGasOptimizerV1);
  
  // Get the deployed V1 instance
  const optimizerV1 = await WePayGasOptimizerV1.deployed();
  
  // Initialize the contract with parameters
  await optimizerV1.initialize(
    3,                // minBatchSize
    10,               // maxBatchSize
    500,              // discountRate (5%)
    accounts[0],      // trustedRelayer (using deployer as trusted relayer)
    5000000000        // maxGasPrice (5 Gwei)
  );
  
  console.log("WePayGasOptimizer deployed at:", WePayGasOptimizer.address);
  console.log("WePayGasOptimizerV1 deployed at:", WePayGasOptimizerV1.address);
}; 