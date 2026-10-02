<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit(0);
}

require_once __DIR__ . '/db.php';

$raw = file_get_contents('php://input');

if (empty($raw)) {
    http_response_code(400);
    echo json_encode(['success' => false, 'error' => 'No payload received']);
    exit;
}

$decoded = json_decode($raw, true);
if ($decoded === null) {
    http_response_code(400);
    echo json_encode(['success' => false, 'error' => 'Invalid JSON payload']);
    exit;
}

$lastSaved = date('c');
$saved = false;
$method = 'none';

// Primary: Save to MySQL
if (isset($pdo)) {
    $saved = savePortfolioDataToMySQL($pdo, $decoded);
    if ($saved) {
        $method = 'mysql';
    }
}

// Always sync to JSON file as backup
$decoded['settings']['lastSaved'] = $lastSaved;
$jsonPath = __DIR__ . '/data.json';
$jsonSaved = file_put_contents($jsonPath, json_encode($decoded, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES));

if ($jsonSaved !== false && $method === 'none') {
    $saved = true;
    $method = 'json';
} elseif ($jsonSaved !== false) {
    $method .= '+json';
}

if ($saved) {
    echo json_encode([
        'success' => true,
        'lastSaved' => $lastSaved,
        'method' => $method,
        'message' => 'Saved to ' . strtoupper($method)
    ]);
} else {
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'error' => 'Failed to save data. Check MySQL connection and file permissions.'
    ]);
}
