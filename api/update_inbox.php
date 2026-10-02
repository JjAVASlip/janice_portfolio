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
    echo json_encode(['success' => false, 'error' => 'No payload']);
    exit;
}

$payload = json_decode($raw, true);
if (!$payload || empty($payload['id'])) {
    http_response_code(400);
    echo json_encode(['success' => false, 'error' => 'Missing message ID']);
    exit;
}

$msgKey  = $payload['id'];
$isRead  = isset($payload['isRead']) ? ($payload['isRead'] ? 1 : 0) : 1;
$deleted = isset($payload['deleted']) && $payload['deleted'];

$updatedDb   = false;
$updatedJson = false;

if (isset($pdo)) {
    try {
        if ($deleted) {
            $stmt = $pdo->prepare("DELETE FROM `inbox` WHERE `msg_key` = :id");
            $stmt->execute([':id' => $msgKey]);
        } else {
            $stmt = $pdo->prepare("UPDATE `inbox` SET `is_read` = :is_read WHERE `msg_key` = :id");
            $stmt->execute([':is_read' => $isRead, ':id' => $msgKey]);
        }
        $updatedDb = true;
    } catch (PDOException $e) {
        $updatedDb = false;
    }
}

// Sync to JSON
$jsonPath = __DIR__ . '/data.json';
if (file_exists($jsonPath)) {
    $data = json_decode(file_get_contents($jsonPath), true) ?: [];
    if (isset($data['inbox'])) {
        if ($deleted) {
            $data['inbox'] = array_values(array_filter($data['inbox'], fn($m) => $m['id'] !== $msgKey));
        } else {
            foreach ($data['inbox'] as &$m) {
                if ($m['id'] === $msgKey) {
                    $m['isRead'] = (bool)$isRead;
                    break;
                }
            }
        }
        $updatedJson = (file_put_contents($jsonPath, json_encode($data, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES)) !== false);
    }
}

echo json_encode([
    'success' => $updatedDb || $updatedJson,
    'updatedDb' => $updatedDb,
    'updatedJson' => $updatedJson
]);
