/**
 * Standard Truffle initial migration file
 */
const Migrations = artifacts.require("Migrations");

module.exports = function (deployer) {
  deployer.deploy(Migrations);
}; 