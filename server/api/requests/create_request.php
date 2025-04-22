<?php
header("Access-Control-Allow-Origin: *"); // Allow requests from any origin (for development)
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

include_once '../utils/db_connect.php'; // Placeholder for DB connection if needed later
include_once '../utils/response.php'; // Placeholder for response utility

// Get posted data
$data = json_decode(file_get_contents("php://input"));

// Basic Validation
if (
    !empty($data->requester_address) && // The person making the request (current user)
    !empty($data->request_from_address) && // The person the request is sent to
    !empty($data->amount) &&
    is_numeric($data->amount) &&
    $data->amount > 0
) {
    // Sanitize input (example)
    $requester_address = htmlspecialchars(strip_tags($data->requester_address));
    $request_from_address = htmlspecialchars(strip_tags($data->request_from_address));
    $amount = htmlspecialchars(strip_tags($data->amount));
    $note = isset($data->note) ? htmlspecialchars(strip_tags($data->note)) : '';

    // --- TODO: Database Interaction --- 
    // Here you would typically insert the request into a database table.
    // For now, we just simulate success.
    $is_successful = true; 
    // Example DB interaction (commented out):
    /*
    $conn = connect_db(); // Assume this function exists in db_connect.php
    $query = "INSERT INTO money_requests (requester_address, request_from_address, amount, note, status, created_at) 
              VALUES (:requester, :request_from, :amount, :note, 'pending', NOW())";
    $stmt = $conn->prepare($query);
    
    $stmt->bindParam(':requester', $requester_address);
    $stmt->bindParam(':request_from', $request_from_address);
    $stmt->bindParam(':amount', $amount);
    $stmt->bindParam(':note', $note);
    
    if ($stmt->execute()) {
        $is_successful = true;
    } else {
        $is_successful = false;
    }
    */
    // --- End TODO ---

    if ($is_successful) {
        http_response_code(201); // Created
        echo json_encode(array("success" => true, "message" => "Money request created successfully."));
    } else {
        http_response_code(503); // Service Unavailable (e.g., DB error)
        echo json_encode(array("success" => false, "message" => "Unable to create money request."));
    }
} else {
    // Data is incomplete
    http_response_code(400); // Bad Request
    echo json_encode(array("success" => false, "message" => "Unable to create money request. Data is incomplete or invalid."));
}
?> 