// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

/**
 * @title Flash Loan Guard
 * @dev Provides protection against flash loan attacks by preventing multiple operations in the same block
 */
contract FlashLoanGuard {
    // User => Last operation block number
    mapping(address => uint256) private _lastOperationBlock;
    
    /**
     * @dev Ensures that a user cannot perform multiple operations in the same block
     * This prevents flash loan attacks where funds are borrowed, manipulated, and returned
     * all within a single block/transaction
     */
    modifier protectAgainstFlashLoans() {
        // Skip check for first operation by a user
        if (_lastOperationBlock[msg.sender] != 0) {
            require(_lastOperationBlock[msg.sender] < block.number, "FlashLoanGuard: multiple operations in same block");
        }
        
        // Update last operation block
        _lastOperationBlock[msg.sender] = block.number;
        
        _;
    }
    
    /**
     * @dev Returns the last block number in which the user performed an operation
     * @param user Address of the user
     * @return Last operation block number
     */
    function getLastOperationBlock(address user) public view returns (uint256) {
        return _lastOperationBlock[user];
    }
} 