<?php
// server/api/requests/update_request.php
// Endpoint to update an ETH request status

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

// Connect to database
require_once '../../config/database.php';

try {
    $db = new PDO("mysql:host=$host;dbname=$dbname", $username, $password);
    $db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(['success' => false, 'message' => 'Database connection error: ' . $e->getMessage()]);
    exit();
}

// Get JSON data from request body
$data = json_decode(file_get_contents('php://input'), true);

// Validate required fields
if (!isset($data['request_id']) || !isset($data['status'])) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'Missing required fields: request_id and status']);
    exit();
}

$requestId = $data['request_id'];
$status = $data['status'];

// Validate status value
$validStatuses = ['pending', 'processing', 'completed', 'declined'];
if (!in_array($status, $validStatuses)) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'Invalid status value. Must be one of: ' . implode(', ', $validStatuses)]);
    exit();
}

try {
    // Update request status
    $query = "UPDATE eth_requests SET status = :status, updated_at = NOW() WHERE id = :request_id";
    $stmt = $db->prepare($query);
    $stmt->bindParam(':status', $status);
    $stmt->bindParam(':request_id', $requestId);
    $stmt->execute();
    
    // Check if any rows were affected
    if ($stmt->rowCount() === 0) {
        http_response_code(404);
        echo json_encode(['success' => false, 'message' => 'Request not found or no changes made']);
        exit();
    }
    
    // Return successful response
    echo json_encode([
        'success' => true,
        'message' => 'Request status updated successfully',
        'request_id' => $requestId,
        'status' => $status
    ]);
    
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(['success' => false, 'message' => 'Database error: ' . $e->getMessage()]);
    exit();
} 