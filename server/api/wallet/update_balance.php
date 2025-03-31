<?php
// Add CORS headers
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");

// Handle preflight OPTIONS request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit(0);
}

try {
    require_once '../../config/db_connect.php';

    // Get data from request
    $data = json_decode(file_get_contents('php://input'), true);

    if (isset($data['user_id']) && isset($data['wallet_address']) && isset($data['balance'])) {
        $user_id = $conn->real_escape_string($data['user_id']);
        $wallet_address = $conn->real_escape_string($data['wallet_address']);
        $balance = $conn->real_escape_string($data['balance']);
        
        // Update wallet balance in database
        $update_query = "UPDATE users SET wallet_balance = '$balance' 
                         WHERE id = '$user_id' AND wallet_address = '$wallet_address'";
        
        if ($conn->query($update_query) === TRUE) {
            echo json_encode(['success' => true, 'message' => 'Wallet balance updated']);
        } else {
            echo json_encode(['success' => false, 'message' => 'Database error: ' . $conn->error]);
        }
    } else {
        echo json_encode(['success' => false, 'message' => 'Missing required fields']);
    }

    $conn->close();
} catch (Exception $e) {
    echo json_encode(['success' => false, 'message' => 'Server error: ' . $e->getMessage()]);
}
?>
