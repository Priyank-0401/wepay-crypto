<?php
require_once 'db_connect.php';

// Create users table if it doesn't exist
$create_table_query = "
CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)";

if ($conn->query($create_table_query) === TRUE) {
    echo "Users table created successfully";
} else {
    echo "Error creating users table: " . $conn->error;
}

$conn->close();
?>