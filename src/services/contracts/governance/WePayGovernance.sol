// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "../security/AccessControl.sol";

/**
 * @title WePay Governance
 * @dev Enables decentralized governance through token voting
 */
contract WePayGovernance is AccessControl {
    // Governance token interface
    interface IWePayToken {
        function balanceOf(address account) external view returns (uint256);
        function totalSupply() external view returns (uint256);
    }
    
    // Proposal status
    enum ProposalState { Pending, Active, Defeated, Succeeded, Executed, Expired }
    
    // Proposal struct
    struct Proposal {
        address proposer;          // Address that created the proposal
        address target;            // Contract to call when executed
        bytes data;                // Call data for the target
        uint256 value;             // ETH value to send
        uint256 votesFor;          // Total votes for the proposal
        uint256 votesAgainst;      // Total votes against the proposal
        uint256 startBlock;        // Block when voting begins
        uint256 endBlock;          // Block when voting ends
        bool executed;             // Whether the proposal has been executed
        mapping(address => Receipt) receipts; // Voting receipts
    }
    
    // Voting receipt
    struct Receipt {
        bool hasVoted;             // Whether the user has voted
        bool support;              // Whether the user voted for or against
        uint256 votes;             // Number of votes cast
    }
    
    // Public proposal data for external viewing
    struct ProposalView {
        address proposer;
        address target;
        uint256 value;
        uint256 votesFor;
        uint256 votesAgainst;
        uint256 startBlock;
        uint256 endBlock;
        bool executed;
    }
    
    // Constants
    uint256 public constant PROPOSAL_THRESHOLD = 100 ether;  // 100 tokens to create proposal
    uint256 public constant VOTING_PERIOD = 40320;           // ~1 week with 15s blocks
    uint256 public constant VOTING_DELAY = 13760;            // ~2 days with 15s blocks
    uint256 public constant EXECUTION_DELAY = 13760;         // ~2 days with 15s blocks
    uint256 public constant QUORUM = 400 ether;              // 400 tokens minimum participation
    
    // State variables
    IWePayToken public governanceToken;
    uint256 public proposalCount;
    mapping(uint256 => Proposal) private proposals;
    
    // Events
    event ProposalCreated(uint256 indexed proposalId, address indexed proposer, address target, bytes data, uint256 startBlock, uint256 endBlock);
    event VoteCast(address indexed voter, uint256 indexed proposalId, bool support, uint256 votes);
    event ProposalExecuted(uint256 indexed proposalId);
    event ProposalCanceled(uint256 indexed proposalId);
    
    /**
     * @dev Constructor sets up the governance token
     * @param _token Address of the governance token
     */
    constructor(address _token) {
        require(_token != address(0), "Invalid token address");
        governanceToken = IWePayToken(_token);
        _setupRole(ADMIN_ROLE, msg.sender);
    }
    
    /**
     * @dev Creates a new governance proposal
     * @param target Contract to call when executed
     * @param value ETH value to send
     * @param data Call data for the target
     * @return Proposal ID
     */
    function createProposal(address target, uint256 value, bytes calldata data) external returns (uint256) {
        require(governanceToken.balanceOf(msg.sender) >= PROPOSAL_THRESHOLD, "Below proposal threshold");
        require(target != address(0), "Invalid target address");
        
        uint256 startBlock = block.number + VOTING_DELAY;
        uint256 endBlock = startBlock + VOTING_PERIOD;
        
        proposalCount++;
        uint256 proposalId = proposalCount;
        
        Proposal storage proposal = proposals[proposalId];
        proposal.proposer = msg.sender;
        proposal.target = target;
        proposal.data = data;
        proposal.value = value;
        proposal.startBlock = startBlock;
        proposal.endBlock = endBlock;
        
        emit ProposalCreated(proposalId, msg.sender, target, data, startBlock, endBlock);
        
        return proposalId;
    }
    
    /**
     * @dev Casts a vote on a proposal
     * @param proposalId ID of the proposal
     * @param support Whether to vote for or against
     */
    function castVote(uint256 proposalId, bool support) external {
        require(state(proposalId) == ProposalState.Active, "Proposal not active");
        Proposal storage proposal = proposals[proposalId];
        Receipt storage receipt = proposal.receipts[msg.sender];
        
        require(!receipt.hasVoted, "Already voted");
        
        uint256 votes = governanceToken.balanceOf(msg.sender);
        require(votes > 0, "No voting power");
        
        // Record the vote
        receipt.hasVoted = true;
        receipt.support = support;
        receipt.votes = votes;
        
        // Update proposal vote counts
        if (support) {
            proposal.votesFor += votes;
        } else {
            proposal.votesAgainst += votes;
        }
        
        emit VoteCast(msg.sender, proposalId, support, votes);
    }
    
    /**
     * @dev Executes a successful proposal
     * @param proposalId ID of the proposal
     */
    function executeProposal(uint256 proposalId) external payable {
        require(state(proposalId) == ProposalState.Succeeded, "Proposal not successful");
        Proposal storage proposal = proposals[proposalId];
        
        proposal.executed = true;
        
        // Execute the proposal
        (bool success, ) = proposal.target.call{value: proposal.value}(proposal.data);
        require(success, "Proposal execution failed");
        
        emit ProposalExecuted(proposalId);
    }
    
    /**
     * @dev Cancels a proposal (only proposer or admin)
     * @param proposalId ID of the proposal
     */
    function cancelProposal(uint256 proposalId) external {
        Proposal storage proposal = proposals[proposalId];
        
        require(
            proposal.proposer == msg.sender || hasRole(ADMIN_ROLE, msg.sender),
            "Only proposer or admin"
        );
        require(state(proposalId) == ProposalState.Pending || state(proposalId) == ProposalState.Active, "Cannot cancel");
        
        // Mark as expired to cancel
        proposal.endBlock = block.number;
        
        emit ProposalCanceled(proposalId);
    }
    
    /**
     * @dev Gets the current state of a proposal
     * @param proposalId ID of the proposal
     * @return Current state of the proposal
     */
    function state(uint256 proposalId) public view returns (ProposalState) {
        require(proposalId > 0 && proposalId <= proposalCount, "Invalid proposal id");
        Proposal storage proposal = proposals[proposalId];
        
        if (proposal.executed) {
            return ProposalState.Executed;
        }
        
        if (block.number <= proposal.startBlock) {
            return ProposalState.Pending;
        }
        
        if (block.number <= proposal.endBlock) {
            return ProposalState.Active;
        }
        
        // Check if proposal succeeded by comparing votes and meeting quorum
        if (proposal.votesFor > proposal.votesAgainst && (proposal.votesFor + proposal.votesAgainst) >= QUORUM) {
            return ProposalState.Succeeded;
        }
        
        return ProposalState.Defeated;
    }
    
    /**
     * @dev Gets proposal data in a readable format
     * @param proposalId ID of the proposal
     * @return Proposal data
     */
    function getProposal(uint256 proposalId) external view returns (ProposalView memory) {
        require(proposalId > 0 && proposalId <= proposalCount, "Invalid proposal id");
        Proposal storage proposal = proposals[proposalId];
        
        return ProposalView({
            proposer: proposal.proposer,
            target: proposal.target,
            value: proposal.value,
            votesFor: proposal.votesFor,
            votesAgainst: proposal.votesAgainst,
            startBlock: proposal.startBlock,
            endBlock: proposal.endBlock,
            executed: proposal.executed
        });
    }
    
    /**
     * @dev Checks if an account has voted on a proposal
     * @param proposalId ID of the proposal
     * @param account Address to check
     * @return Whether the account has voted, their support, and vote count
     */
    function getReceipt(uint256 proposalId, address account) external view returns (bool, bool, uint256) {
        Receipt storage receipt = proposals[proposalId].receipts[account];
        return (receipt.hasVoted, receipt.support, receipt.votes);
    }
    
    /**
     * @dev Required to receive ETH when executing proposals
     */
    receive() external payable {}
} 