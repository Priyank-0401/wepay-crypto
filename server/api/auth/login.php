<?php
// This is a debugging version of login.php
// Place this in the same directory as your signup.php file

// Enable error reporting
error_reporting(E_ALL);
ini_set('display_errors', 1);

// Start session
session_start();

// Set content type
header('Content-Type: application/json');
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");

// Handle preflight OPTIONS request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit(0);
}

// Get the database connection
require_once '../../config/db_connect.php';
require_once '../utils/web3_utils.php';

// Create a log file
$log_file = __DIR__ . '/login_debug.log';
file_put_contents($log_file, date('Y-m-d H:i:s') . " - Login attempt started\n", FILE_APPEND);

try {
    // Get data from request
    $input = file_get_contents('php://input');
    file_put_contents($log_file, date('Y-m-d H:i:s') . " - Received input: " . $input . "\n", FILE_APPEND);
    
    $data = json_decode($input, true);

    if (!$data) {
        throw new Exception("No data received or invalid JSON");
    }

    if (empty($data['email']) || empty($data['password'])) {
        throw new Exception("Missing required fields");
    }

    $email = $conn->real_escape_string($data['email']);
    
    // Get user from database
    $query = "SELECT * FROM users WHERE email = '$email'";
    file_put_contents($log_file, date('Y-m-d H:i:s') . " - Querying for email: " . $email . "\n", FILE_APPEND);
    
    $result = $conn->query($query);
    
    if (!$result) {
        throw new Exception("Database query error: " . $conn->error);
    }
    
    if ($result->num_rows > 0) {
        $user = $result->fetch_assoc();
        file_put_contents($log_file, date('Y-m-d H:i:s') . " - User found, verifying password\n", FILE_APPEND);
        
        // Verify password
        if (password_verify($data['password'], $user['password'])) {
            // Password is correct
            file_put_contents($log_file, date('Y-m-d H:i:s') . " - Password verified successfully\n", FILE_APPEND);
            
            // Remove password from user data before sending
            unset($user['password']);
            
            // Set session variables
            $_SESSION['user_id'] = $user['id'];
            $_SESSION['user_email'] = $user['email'];
            
            // Check if user has a wallet, if not, assign one
            if (empty($user['wallet_address'])) {
                file_put_contents($log_file, date('Y-m-d H:i:s') . " - User has no wallet, assigning one\n", FILE_APPEND);
                
                $wallet = assignGanacheWallet();
                if ($wallet['success']) {
                    $wallet_address = $conn->real_escape_string($wallet['address']);
                    $wallet_balance = $conn->real_escape_string($wallet['balance']);
                    
                    $update_query = "UPDATE users SET wallet_address = '$wallet_address', wallet_balance = '$wallet_balance' WHERE id = " . $user['id'];
                    $conn->query($update_query);
                    
                    $user['wallet_address'] = $wallet_address;
                    $user['wallet_balance'] = $wallet_balance;
                    
                    file_put_contents($log_file, date('Y-m-d H:i:s') . " - Wallet assigned: $wallet_address\n", FILE_APPEND);
                }
            } else {
                // Update wallet balance
                $current_balance = getWalletBalance($user['wallet_address']);
                $update_query = "UPDATE users SET wallet_balance = '$current_balance' WHERE id = " . $user['id'];
                $conn->query($update_query);
                $user['wallet_balance'] = $current_balance;
            }
            
            // In login.php - Add debug logging
            file_put_contents($log_file, date('Y-m-d H:i:s') . " - User data before sending response: " . json_encode($user) . "\n", FILE_APPEND);
            
            $response = [
                'success' => true, 
                'message' => 'Login successful',
                'user' => [
                    'id' => $user['id'],
                    'name' => $user['name'],
                    'email' => $user['email'],
                    'wallet_address' => $user['wallet_address'] ?? '', // Use null coalescing to prevent undefined
                    'wallet_balance' => $user['wallet_balance'] ?? '0.0000'
                ],
                'token' => bin2hex(random_bytes(16))
            ];
            
            file_put_contents($log_file, date('Y-m-d H:i:s') . " - Response to client: " . json_encode($response) . "\n", FILE_APPEND);
            echo json_encode($response);
        } else {
            // Password is incorrect
            file_put_contents($log_file, date('Y-m-d H:i:s') . " - Password verification failed\n", FILE_APPEND);
            echo json_encode(['success' => false, 'message' => 'Invalid email or password']);
        }
    } else {
        // User not found
        file_put_contents($log_file, date('Y-m-d H:i:s') . " - User not found\n", FILE_APPEND);
        echo json_encode(['success' => false, 'message' => 'Invalid email or password']);
    }
} catch (Exception $e) {
    // Log the error
    file_put_contents($log_file, date('Y-m-d H:i:s') . " - Error: " . $e->getMessage() . "\n", FILE_APPEND);
    
    // Return error response
    echo json_encode([
        'success' => false, 
        'message' => 'Server error: ' . $e->getMessage()
    ]);
}

// Close connection
$conn->close();
file_put_contents($log_file, date('Y-m-d H:i:s') . " - Login process completed\n\n", FILE_APPEND);