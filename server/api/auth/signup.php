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
            // Insert new user
            $insert_query = "INSERT INTO users (name, email, password) VALUES ('$name', '$email', '$password')";
            
            if ($conn->query($insert_query) === TRUE) {
                echo json_encode(['success' => true, 'message' => 'User registered successfully']);
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