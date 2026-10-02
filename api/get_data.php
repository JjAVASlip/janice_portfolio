<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');

require_once __DIR__ . '/db.php';

$result = null;

// Try MySQL first
if (isset($pdo)) {
    $result = fetchPortfolioDataFromMySQL($pdo);
}

// Fallback to JSON file if MySQL unavailable
if (!$result) {
    $jsonPath = __DIR__ . '/data.json';
    if (file_exists($jsonPath)) {
        $result = json_decode(file_get_contents($jsonPath), true);
        if ($result) {
            $result['settings']['databaseConnected'] = false;
            $result['settings']['databaseName'] = 'JSON Fallback';
        }
    }
}

if ($result) {
    echo json_encode($result, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
} else {
    http_response_code(500);
    echo json_encode(['error' => 'No data source available. Check MySQL or data.json.']);
}
