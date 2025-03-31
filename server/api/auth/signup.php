<?php
// Add CORS headers
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");

// Handle preflight OPTIONS request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit(0);
}

// Debug - log errors to a file
ini_set('display_errors', 1);
ini_set('error_log', 'php_error.log');

try {
    require_once '../../config/db_connect.php';
    require_once '../utils/web3_utils.php'; // Include the web3 utilities

    // Get data from request
    $data = json_decode(file_get_contents('php://input'), true);

    if (isset($data['name']) && isset($data['email']) && isset($data['password'])) {
        $name = $conn->real_escape_string($data['name']);
        $email = $conn->real_escape_string($data['email']);
        $password = password_hash($data['password'], PASSWORD_BCRYPT);
        
        // Check if email already exists
        $check_query = "SELECT * FROM users WHERE email = '$email'";
        $result = $conn->query($check_query);
        
        if ($result->num_rows > 0) {
            echo json_encode(['success' => false, 'message' => 'Email already registered']);
        } else {
            // Assign a wallet from Ganache
            $wallet = assignGanacheWallet();
            
            if (!$wallet['success']) {
                echo json_encode(['success' => false, 'message' => 'Failed to assign ETH wallet: ' . $wallet['message']]);
                exit;
            }
            
            $wallet_address = $conn->real_escape_string($wallet['address']);
            $wallet_balance = $conn->real_escape_string($wallet['balance']);
            
            // Insert new user with wallet address
            $insert_query = "INSERT INTO users (name, email, password, wallet_address, wallet_balance) 
                            VALUES ('$name', '$email', '$password', '$wallet_address', '$wallet_balance')";
            
            if ($conn->query($insert_query) === TRUE) {
                // Return success with wallet info
                echo json_encode([
                    'success' => true, 
                    'message' => 'User registered successfully',
                    'wallet' => [
                        'address' => $wallet_address,
                        'balance' => $wallet_balance
                    ]
                ]);
            } else {
                echo json_encode(['success' => false, 'message' => 'Database error: ' . $conn->error]);
            }
        }
    } else {
        echo json_encode(['success' => false, 'message' => 'Missing required fields']);
    }

    $conn->close();
} catch (Exception $e) {
    error_log('Error in signup.php: ' . $e->getMessage());
    echo json_encode(['success' => false, 'message' => 'Server error: ' . $e->getMessage()]);
}
?>