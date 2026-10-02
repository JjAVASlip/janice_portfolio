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
    echo json_encode(['success' => false, 'error' => 'No message payload']);
    exit;
}

$msg = json_decode($raw, true);
if (!$msg || empty($msg['name']) || empty($msg['email']) || empty($msg['message'])) {
    http_response_code(400);
    echo json_encode(['success' => false, 'error' => 'Please fill out all required fields']);
    exit;
}

$name    = htmlspecialchars(trim($msg['name']));
$email   = htmlspecialchars(trim($msg['email']));
$subject = htmlspecialchars(trim($msg['subject'] ?? 'Portfolio Inquiry'));
$message = htmlspecialchars(trim($msg['message']));
$msgKey  = 'msg-' . time() . '-' . bin2hex(random_bytes(4));

$savedToDb   = false;
$savedToJson = false;

// Primary: Insert into MySQL inbox table
if (isset($pdo)) {
    try {
        $stmt = $pdo->prepare("INSERT INTO `inbox` 
            (`msg_key`, `name`, `email`, `subject`, `message`, `is_read`, `created_at`) 
            VALUES (:msg_key, :name, :email, :subject, :message, 0, NOW())");
        $stmt->execute([
            ':msg_key' => $msgKey,
            ':name'    => $name,
            ':email'   => $email,
            ':subject' => $subject,
            ':message' => $message
        ]);
        $savedToDb = true;
    } catch (PDOException $e) {
        $savedToDb = false;
    }
}

// Fallback: Also write to JSON data file
$jsonPath = __DIR__ . '/data.json';
if (file_exists($jsonPath)) {
    $currentData = json_decode(file_get_contents($jsonPath), true) ?: [];
    if (!isset($currentData['inbox'])) {
        $currentData['inbox'] = [];
    }

    $newMessage = [
        'id'      => $msgKey,
        'name'    => $name,
        'email'   => $email,
        'subject' => $subject,
        'message' => $message,
        'date'    => date('Y-m-d H:i'),
        'isRead'  => false
    ];

    array_unshift($currentData['inbox'], $newMessage);
    $savedToJson = (file_put_contents($jsonPath, json_encode($currentData, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES)) !== false);
}

if ($savedToDb || $savedToJson) {
    echo json_encode([
        'success'    => true,
        'message'    => 'Message received successfully!',
        'savedToDb'  => $savedToDb,
        'savedToJson'=> $savedToJson
    ]);
} else {
    http_response_code(500);
    echo json_encode(['success' => false, 'error' => 'Could not save your message. Please try again.']);
}
