<?php
/**
 * List Quotes API
 * Returns a list of all saved quotes with metadata
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
    $quotesDir = '../quotes/';
    
    // Check if directory exists
    if (!file_exists($quotesDir)) {
        echo json_encode([]);
        exit;
    }
    
    // Get all JSON files
    $files = glob($quotesDir . '*.json');
    
    if ($files === false) {
        throw new Exception('Failed to read quotes directory');
    }
    
    $quotes = [];
    
    foreach ($files as $file) {
        try {
            $name = basename($file, '.json');
            $content = file_get_contents($file);
            $data = json_decode($content, true);
            
            if ($data && json_last_error() === JSON_ERROR_NONE) {
                $quotes[] = [
                    'name' => $name,
                    'displayName' => $data['quoteName'] ?? $name,
                    'created' => $data['createdDate'] ?? date('c', filectime($file)),
                    'modified' => $data['modifiedDate'] ?? date('c', filemtime($file)),
                    'version' => $data['version'] ?? '1.0'
                ];
            }
        } catch (Exception $e) {
            // Skip invalid files
            continue;
        }
    }
    
    // Sort by modified date (newest first)
    usort($quotes, function($a, $b) {
        return strtotime($b['modified']) - strtotime($a['modified']);
    });
    
    echo json_encode($quotes);
    
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode([
        'error' => $e->getMessage()
    ]);
}
?>