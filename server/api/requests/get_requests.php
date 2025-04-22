<?php
// server/api/requests/get_requests.php
// Endpoint to get ETH requests for a specific address

// Prevent any error output that would break JSON response
error_reporting(E_ALL);
ini_set('display_errors', 0);

// Set headers
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

// Allow preflight CORS requests
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Validate request method
if ($_SERVER['REQUEST_METHOD'] !== 'GET') {
    http_response_code(405);
    echo json_encode(['success' => false, 'message' => 'Method not allowed. Use GET.']);
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
        ob_end_clean();
        http_response_code(500);
        echo json_encode(['success' => false, 'message' => 'Database connection error: ' . $e->getMessage()]);
        exit();
    }

    // Get address from query parameter
    $address = isset($_GET['to_address']) ? trim($_GET['to_address']) : null;

    // Validate address
    if (!$address) {
        ob_end_clean();
        http_response_code(400);
        echo json_encode(['success' => false, 'message' => 'Address parameter is required']);
        exit();
    }

    try {
        // Check if table exists
        $checkTableQuery = "SHOW TABLES LIKE 'eth_requests'";
        $checkTableStmt = $db->prepare($checkTableQuery);
        $checkTableStmt->execute();
        
        if ($checkTableStmt->rowCount() === 0) {
            // Table doesn't exist, return empty array
            ob_end_clean();
            echo json_encode([
                'success' => true,
                'requests' => []
            ]);
            exit();
        }
    
        // Prepare SQL query - get requests where this address is the recipient (request_from_address)
        $query = "SELECT * FROM eth_requests WHERE request_from_address = :address ORDER BY created_at DESC";
        $stmt = $db->prepare($query);
        $stmt->bindParam(':address', $address);
        $stmt->execute();
        
        $requests = $stmt->fetchAll(PDO::FETCH_ASSOC);
        
        // Clear any output buffer before sending response
        ob_end_clean();
        
        // Return successful response
        echo json_encode([
            'success' => true,
            'requests' => $requests
        ]);
        
    } catch (PDOException $e) {
        ob_end_clean();
        http_response_code(500);
        echo json_encode(['success' => false, 'message' => 'Database error: ' . $e->getMessage()]);
        exit();
    }
} catch (Exception $e) {
    ob_end_clean();
    http_response_code(500);
    echo json_encode(['success' => false, 'message' => 'Server error: ' . $e->getMessage()]);
    exit();
} 