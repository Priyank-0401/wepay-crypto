<?php
// CORS headers
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Access-Control-Allow-Methods: GET, OPTIONS");
header("Content-Type: application/json");

// Handle preflight OPTIONS request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit(0);
}

require_once '../../config/db_connect.php';
require_once '../utils/web3_utils.php';

// Get userId from request or session
session_start();
$userId = isset($_SESSION['user_id']) ? $_SESSION['user_id'] : null;

// For testing, allow userId to be passed in query string
if (isset($_GET['user_id'])) {
    $userId = intval($_GET['user_id']);
}

if (!$userId) {
    echo json_encode(['success' => false, 'message' => 'User not authenticated']);
    exit;
}

try {
    // Get user's wallet info
    $query = "SELECT id, wallet_address, wallet_balance FROM users WHERE id = $userId";
    $result = $conn->query($query);
    
    if (!$result || $result->num_rows === 0) {
        echo json_encode(['success' => false, 'message' => 'User not found']);
        exit;
    }
    
    $user = $result->fetch_assoc();
    $walletAddress = $user['wallet_address'];
    
    // If user has no wallet address, assign one
    if (empty($walletAddress)) {
        $wallet = assignGanacheWallet();
        if (!$wallet['success']) {
            echo json_encode(['success' => false, 'message' => 'Failed to assign wallet: ' . $wallet['message']]);
            exit;
        }
        
        $walletAddress = $wallet['address'];
        $walletBalance = $wallet['balance'];
        
        // Update user with new wallet
        $update_query = "UPDATE users SET wallet_address = '$walletAddress', wallet_balance = '$walletBalance' WHERE id = $userId";
        $conn->query($update_query);
    } else {
        // Get current balance for existing wallet
        $walletBalance = getWalletBalance($walletAddress);
    }
    
    // Get transactions for this wallet
    $transactions = getWalletTransactions($walletAddress);
    
    echo json_encode([
        'success' => true,
        'wallet' => [
            'address' => $walletAddress,
            'balance' => $walletBalance,
            'transactions' => $transactions
        ]
    ]);
    
} catch (Exception $e) {
    echo json_encode(['success' => false, 'message' => 'Error: ' . $e->getMessage()]);
}

$conn->close();
?>