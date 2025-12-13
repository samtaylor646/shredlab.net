<?php
/**
 * Load Quote API
 * Retrieves a specific quote by filename
 */

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET');
header('Access-Control-Allow-Headers: Content-Type');

// Handle preflight requests
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit(0);
}

if ($_SERVER['REQUEST_METHOD'] !== 'GET') {
    http_response_code(405);
    echo json_encode(['error' => 'Method not allowed']);
    exit;
}

try {
    // Get quote name from query parameter
    $quoteName = $_GET['name'] ?? '';
    
    if (empty($quoteName)) {
        throw new Exception('Quote name is required');
    }
    
    // Sanitize filename
    $quoteName = preg_replace('/[^a-z0-9-_]/i', '-', $quoteName);
    $filename = "../quotes/{$quoteName}.json";
    
    // Check if file exists
    if (!file_exists($filename)) {
        http_response_code(404);
        echo json_encode(['error' => 'Quote not found']);
        exit;
    }
    
    // Read and return the file contents
    $content = file_get_contents($filename);
    
    if ($content === false) {
        throw new Exception('Failed to read quote file');
    }
    
    // Validate JSON
    $data = json_decode($content, true);
    if (json_last_error() !== JSON_ERROR_NONE) {
        throw new Exception('Invalid JSON in quote file');
    }
    
    // Return the quote data
    echo $content;
    
} catch (Exception $e) {
    http_response_code(400);
    echo json_encode([
        'error' => $e->getMessage()
    ]);
}
?>