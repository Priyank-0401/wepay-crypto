<?php
/**
 * Web3 Utilities for Ganache Integration
 * This file handles Ethereum wallet operations with Ganache
 */

/**
 * Assigns a Ganache wallet to a user by retrieving available accounts from the Ganache instance
 * @return array Success status and wallet details
 */
function assignGanacheWallet() {
    try {
        // Get database connection
        global $conn;
        
        // Ganache RPC URL
        $ganacheUrl = 'http://127.0.0.1:7545';
        
        // First, get all accounts from Ganache
        $ch = curl_init();
        curl_setopt($ch, CURLOPT_URL, $ganacheUrl);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
        curl_setopt($ch, CURLOPT_POST, 1);
        curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode([
            'jsonrpc' => '2.0',
            'method' => 'eth_accounts', // Method to get all accounts
            'params' => [],
            'id' => 1
        ]));
        curl_setopt($ch, CURLOPT_HTTPHEADER, ['Content-Type: application/json']);
        
        $response = curl_exec($ch);
        $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
        curl_close($ch);
        
        if ($httpCode != 200 || !$response) {
            error_log("Ganache connection error. HTTP code: $httpCode, Response: $response");
            return [
                'success' => false,
                'message' => 'Failed to connect to Ganache'
            ];
        }
        
        $responseData = json_decode($response, true);
        if (!isset($responseData['result']) || empty($responseData['result'])) {
            error_log("No accounts returned from Ganache");
            return [
                'success' => false,
                'message' => 'No accounts available in Ganache'
            ];
        }
        
        $ganacheAccounts = $responseData['result'];
        
        // Fetch accounts that are already assigned to users
        $query = "SELECT wallet_address FROM users";
        $result = $conn->query($query);
        
        $assignedWallets = [];
        if ($result && $result->num_rows > 0) {
            while ($row = $result->fetch_assoc()) {
                $assignedWallets[] = strtolower($row['wallet_address']);
            }
        }
        
        // Find an available wallet (not yet assigned to a user)
        $availableWallet = null;
        foreach ($ganacheAccounts as $account) {
            if (!in_array(strtolower($account), $assignedWallets)) {
                $availableWallet = $account;
                break;
            }
        }
        
        if (!$availableWallet) {
            error_log("All Ganache accounts are already assigned to users");
            return [
                'success' => false,
                'message' => 'No available wallets left in Ganache'
            ];
        }
        
        // Get the balance of the selected account
        $ch = curl_init();
        curl_setopt($ch, CURLOPT_URL, $ganacheUrl);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
        curl_setopt($ch, CURLOPT_POST, 1);
        curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode([
            'jsonrpc' => '2.0',
            'method' => 'eth_getBalance',
            'params' => [$availableWallet, 'latest'],
            'id' => 1
        ]));
        curl_setopt($ch, CURLOPT_HTTPHEADER, ['Content-Type: application/json']);
        
        $response = curl_exec($ch);
        curl_close($ch);
        
        $balanceInEth = '0.0000'; // Default in case of failure
        
        if ($response) {
            $balanceData = json_decode($response, true);
            if (isset($balanceData['result'])) {
                // Convert the hex balance to decimal, then to ETH
                $balanceInWei = hexdec($balanceData['result']);
                $balanceInEth = number_format($balanceInWei / 1000000000000000000, 4, '.', '');
            }
        }
        
        return [
            'success' => true,
            'address' => $availableWallet,
            'balance' => $balanceInEth
        ];
    } catch (Exception $e) {
        error_log("Error in assignGanacheWallet: " . $e->getMessage());
        return [
            'success' => false,
            'message' => $e->getMessage()
        ];
    }
}

/**
 * Get ETH balance for a wallet address
 */
function getWalletBalance($address) {
    try {
        $ganacheUrl = 'http://127.0.0.1:7545';
        
        $ch = curl_init($ganacheUrl);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_HTTPHEADER, array('Content-Type: application/json'));
        curl_setopt($ch, CURLOPT_POST, true);
        curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode([
            'jsonrpc' => '2.0',
            'method' => 'eth_getBalance',
            'params' => [$address, 'latest'],
            'id' => 1
        ]));
        
        $response = curl_exec($ch);
        curl_close($ch);
        
        if (!$response) {
            error_log("Failed to get balance from Ganache");
            return "0";
        }
        
        $data = json_decode($response, true);
        
        if (!isset($data['result'])) {
            error_log("Failed to get balance, invalid response: " . print_r($data, true));
            return "0";
        }
        
        // Convert hex balance to decimal wei, then to ETH
        $balanceWei = hexdec($data['result']);
        $balanceEth = $balanceWei / 1e18;
        
        return number_format($balanceEth, 4);
        
    } catch (Exception $e) {
        error_log("Error in getWalletBalance: " . $e->getMessage());
        return "0";
    }
}

/**
 * Get transactions for a specific wallet address
 * Note: Ganache doesn't provide a direct method to get transaction history
 * In a real app, you'd use a blockchain explorer API or track transactions in your database
 */
function getWalletTransactions($address) {
    // For demo purposes, return mock data
    $mockTransactions = [
        [
            'id' => '0x' . bin2hex(random_bytes(32)),
            'from' => $address,
            'to' => '0x71C7656EC7ab88b098defB751B7401B5f6d8976F',
            'value' => '50000000000000000', // 0.05 ETH in wei
            'date' => date('Y-m-d', strtotime('-2 days')),
            'gas' => '21000',
            'gasPrice' => '20000000000', // 20 Gwei
            'status' => 'confirmed',
            'confirmations' => 12,
            'type' => 'Transfer'
        ],
        [
            'id' => '0x' . bin2hex(random_bytes(32)),
            'from' => '0x2932b7A2355D6fecc4b5c0B6BD44cC31df247a2e',
            'to' => $address,
            'value' => '800000000000000000', // 0.8 ETH in wei
            'date' => date('Y-m-d', strtotime('-4 days')),
            'gas' => '21000',
            'gasPrice' => '18000000000', // 18 Gwei
            'status' => 'confirmed',
            'confirmations' => 24,
            'type' => 'Receive'
        ]
    ];
    
    return $mockTransactions;
}

// You might also need a function to check if Ganache is running
function isGanacheRunning() {
    $ganacheUrl = 'http://127.0.0.1:7545';
    $ch = curl_init($ganacheUrl);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_CONNECTTIMEOUT, 5);
    curl_exec($ch);
    $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    curl_close($ch);
    return $httpCode == 200;
}
?>
