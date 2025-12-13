<?php
/**
 * Delete Quote API
 * Deletes a specific quote file
 */

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: DELETE, POST');
header('Access-Control-Allow-Headers: Content-Type');

// Handle preflight requests
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit(0);
}

if ($_SERVER['REQUEST_METHOD'] !== 'DELETE' && $_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['error' => 'Method not allowed']);
    exit;
}

try {
    // Get quote name from query parameter or POST body
    if ($_SERVER['REQUEST_METHOD'] === 'DELETE') {
        $quoteName = $_GET['name'] ?? '';
    } else {
        $input = file_get_contents('php://input');
        $data = json_decode($input, true);
        $quoteName = $data['name'] ?? '';
    }
    
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
    
    // Delete the file
    $result = unlink($filename);
    
    if ($result === false) {
        throw new Exception('Failed to delete quote file');
    }
    
    echo json_encode([
        'success' => true,
        'message' => 'Quote deleted successfully',
        'filename' => $quoteName
    ]);
    
} catch (Exception $e) {
    http_response_code(400);
    echo json_encode([
        'success' => false,
        'error' => $e->getMessage()
    ]);
}
?>