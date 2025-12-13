<?php
/**
 * Save Quote API
 * Saves a quote as a JSON file in the quotes directory
 */

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');

// Handle preflight requests
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit(0);
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['error' => 'Method not allowed']);
    exit;
}

try {
    // Get JSON data from request body
    $input = file_get_contents('php://input');
    $data = json_decode($input, true);
    
    if (!$data) {
        throw new Exception('Invalid JSON data');
    }
    
    // Validate required fields
    if (empty($data['quoteName'])) {
        throw new Exception('Quote name is required');
    }
    
    // Sanitize filename (remove special characters, spaces become dashes)
    $quoteName = preg_replace('/[^a-z0-9-_]/i', '-', strtolower($data['quoteName']));
    $quoteName = preg_replace('/-+/', '-', $quoteName); // Remove multiple dashes
    $quoteName = trim($quoteName, '-'); // Remove leading/trailing dashes
    
    // Ensure quotes directory exists
    $quotesDir = '../quotes/';
    if (!file_exists($quotesDir)) {
        mkdir($quotesDir, 0755, true);
    }
    
    $filename = $quotesDir . $quoteName . '.json';
    
    // Add metadata
    $data['modifiedDate'] = date('c');
    
    // If file doesn't exist, set created date
    if (!file_exists($filename)) {
        $data['createdDate'] = date('c');
    } else {
        // Preserve original created date
        $existingData = json_decode(file_get_contents($filename), true);
        $data['createdDate'] = $existingData['createdDate'] ?? date('c');
    }
    
    // Save file with pretty print
    $result = file_put_contents($filename, json_encode($data, JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES));
    
    if ($result === false) {
        throw new Exception('Failed to write file');
    }
    
    echo json_encode([
        'success' => true,
        'filename' => $quoteName,
        'message' => 'Quote saved successfully',
        'path' => $filename
    ]);
    
} catch (Exception $e) {
    http_response_code(400);
    echo json_encode([
        'success' => false,
        'error' => $e->getMessage()
    ]);
}
?>