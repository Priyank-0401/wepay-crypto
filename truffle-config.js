/**
 * Truffle configuration for WePay Crypto project
 */

module.exports = {
  networks: {
    development: {
      host: "127.0.0.1",     // Localhost (default: none)
      port: 7545,            // Ganache GUI default port (use 8545 for ganache-cli)
      network_id: "*",       // Any network (default: none)
    },
  },

  // Set default mocha options here, use special reporters, etc.
  mocha: {
    timeout: 100000
  },

  // Configure your compilers
  compilers: {
    solc: {
      version: "0.8.0",      // Match your contract's solidity version
      settings: {
        optimizer: {
          enabled: true,
          runs: 200
        },
      }
    }
  }
}; 