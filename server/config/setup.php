<?php
// server/config/setup.php
// Database setup script

// Include database configuration
require_once 'database.php';

// Connect to the database
try {
    $db = new PDO("mysql:host=$host;dbname=$dbname", $username, $password);
    $db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    
    // Create eth_requests table if it doesn't exist
    $createRequestsTable = "CREATE TABLE IF NOT EXISTS eth_requests (
        id INT AUTO_INCREMENT PRIMARY KEY,
        request_from_address VARCHAR(42) NOT NULL,
        request_to_address VARCHAR(42) NOT NULL,
        amount DECIMAL(20, 8) NOT NULL,
        status VARCHAR(20) DEFAULT 'pending',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    )";
    
    $db->exec($createRequestsTable);
    echo "Database setup completed successfully.\n";
    
} catch (PDOException $e) {
    echo "Database setup error: " . $e->getMessage() . "\n";
} 