<?php
/**
 * Get Last Quote Number API
 * Returns the last used quote number for auto-incrementing
 */

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit(0);
}

if ($_SERVER['REQUEST_METHOD'] !== 'GET') {
    http_response_code(405);
    echo json_encode(['error' => 'Method not allowed']);
    exit;
}

try {
    $counterFile = '../quotes/.quote_counter';
    
    // Create counter file if it doesn't exist
    if (!file_exists($counterFile)) {
        // Initialize with 0
        file_put_contents($counterFile, '0');
        echo json_encode(['lastNumber' => 0]);
        exit;
    }
    
    // Read current counter
    $lastNumber = (int)file_get_contents($counterFile);
    
    echo json_encode(['lastNumber' => $lastNumber]);
    
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode([
        'error' => $e->getMessage(),
        'lastNumber' => 0
    ]);
}
?>