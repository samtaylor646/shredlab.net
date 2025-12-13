<?php
/**
 * Update Quote Number API
 * Increments the quote counter when a new quote is saved
 */

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit(0);
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['error' => 'Method not allowed']);
    exit;
}

try {
    $input = file_get_contents('php://input');
    $data = json_decode($input, true);
    
    if (!isset($data['quoteNumber'])) {
        throw new Exception('Quote number is required');
    }
    
    // Extract the numeric part from quote number (e.g., "SL-2025-001" -> 1)
    $quoteNumber = $data['quoteNumber'];
    preg_match('/(\d+)$/', $quoteNumber, $matches);
    
    if (isset($matches[1])) {
        $number = (int)$matches[1];
        
        $counterFile = '../quotes/.quote_counter';
        
        // Ensure quotes directory exists
        $quotesDir = '../quotes/';
        if (!file_exists($quotesDir)) {
            mkdir($quotesDir, 0755, true);
        }
        
        // Read current counter
        $currentCounter = 0;
        if (file_exists($counterFile)) {
            $currentCounter = (int)file_get_contents($counterFile);
        }
        
        // Only update if the new number is higher (prevents going backwards)
        if ($number > $currentCounter) {
            file_put_contents($counterFile, $number);
            echo json_encode([
                'success' => true,
                'newCounter' => $number
            ]);
        } else {
            echo json_encode([
                'success' => true,
                'newCounter' => $currentCounter,
                'message' => 'Counter not updated (existing counter is higher)'
            ]);
        }
    } else {
        throw new Exception('Invalid quote number format');
    }
    
} catch (Exception $e) {
    http_response_code(400);
    echo json_encode([
        'success' => false,
        'error' => $e->getMessage()
    ]);
}
?>