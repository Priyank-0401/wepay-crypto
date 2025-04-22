<?php
// server/api/requests/create_request.php
// Endpoint to create a new ETH request

// Make sure there are no whitespace or other characters before the opening <?php tag
// or after the closing PHP tag that could cause output before headers are sent

// Prevent any error output that would break JSON response
error_reporting(E_ALL);
ini_set('display_errors', 0);

// Set headers
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

// Allow preflight CORS requests
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Validate request method
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'message' => 'Method not allowed. Use POST.']);
    exit();
}

// Start output buffering to catch any unexpected output
ob_start();

try {
    // Connect to database
    require_once '../../config/db_connect.php';

    try {
        $db = new PDO("mysql:host=$servername;dbname=$dbname", $username, $password);
        $db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    } catch (PDOException $e) {
        // Clear any output buffer
        ob_end_clean();
        http_response_code(500);
        echo json_encode(['success' => false, 'message' => 'Database connection error: ' . $e->getMessage()]);
        exit();
    }

    // Get JSON data from request body
    $rawInput = file_get_contents('php://input');
    $data = json_decode($rawInput, true);

    // Debug logging
    error_log("Received data: " . $rawInput);
    error_log("Parsed data: " . print_r($data, true));

    // Validate required fields
    if (!isset($data['requester_address']) || !isset($data['request_from_address']) || !isset($data['amount'])) {
        // Clear any output buffer
        ob_end_clean();
        http_response_code(400);
        echo json_encode(['success' => false, 'message' => 'Missing required fields: requester_address, request_from_address, amount']);
        exit();
    }

    $requesterAddress = $data['requester_address'];
    $requestFromAddress = $data['request_from_address'];
    $amount = $data['amount'];
    $note = isset($data['note']) ? $data['note'] : '';

    // Validate addresses - make this less strict, as addresses might have checksums
    if (!preg_match('/^0x[a-fA-F0-9]{40}$/', $requesterAddress) || !preg_match('/^0x[a-fA-F0-9]{40}$/', $requestFromAddress)) {
        // Clear any output buffer
        ob_end_clean();
        http_response_code(400);
        echo json_encode(['success' => false, 'message' => 'Invalid ETH address format']);
        exit();
    }

    // Validate amount
    if (!is_numeric($amount) || floatval($amount) <= 0) {
        // Clear any output buffer
        ob_end_clean();
        http_response_code(400);
        echo json_encode(['success' => false, 'message' => 'Amount must be a positive number']);
        exit();
    }

    try {
        // Check if the eth_requests table exists
        $checkTableQuery = "SHOW TABLES LIKE 'eth_requests'";
        $checkTableStmt = $db->prepare($checkTableQuery);
        $checkTableStmt->execute();
        
        if ($checkTableStmt->rowCount() === 0) {
            // Table doesn't exist, create it
            $createTableQuery = "CREATE TABLE eth_requests (
                id INT AUTO_INCREMENT PRIMARY KEY,
                requester_address VARCHAR(42) NOT NULL,
                request_from_address VARCHAR(42) NOT NULL,
                amount VARCHAR(30) NOT NULL,
                note TEXT,
                status ENUM('pending', 'processing', 'completed', 'declined') NOT NULL DEFAULT 'pending',
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
            )";
            $db->exec($createTableQuery);
        }
        
        // Insert the request into the database
        $query = "INSERT INTO eth_requests (requester_address, request_from_address, amount, note, status) 
                VALUES (:requester_address, :request_from_address, :amount, :note, 'pending')";
        $stmt = $db->prepare($query);
        $stmt->bindParam(':requester_address', $requesterAddress);
        $stmt->bindParam(':request_from_address', $requestFromAddress);
        $stmt->bindParam(':amount', $amount);
        $stmt->bindParam(':note', $note);
        $stmt->execute();
        
        $requestId = $db->lastInsertId();
        
        // Clear any output buffer
        ob_end_clean();
        
        // Return successful response
        echo json_encode([
            'success' => true,
            'message' => 'ETH request created successfully',
            'request_id' => $requestId,
            'request' => [
                'id' => $requestId,
                'requester_address' => $requesterAddress,
                'request_from_address' => $requestFromAddress,
                'amount' => $amount,
                'note' => $note,
                'status' => 'pending',
                'created_at' => date('Y-m-d H:i:s')
            ]
        ]);
        
    } catch (PDOException $e) {
        // Clear any output buffer
        ob_end_clean();
        http_response_code(500);
        echo json_encode(['success' => false, 'message' => 'Database error: ' . $e->getMessage()]);
        exit();
    }
} catch (Exception $e) {
    // Clear any output buffer
    ob_end_clean();
    http_response_code(500);
    echo json_encode(['success' => false, 'message' => 'Server error: ' . $e->getMessage()]);
    exit();
}
// Do not include a closing PHP tag to prevent accidental whitespace after it 