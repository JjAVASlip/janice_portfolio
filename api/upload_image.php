<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'error' => 'Method not allowed']);
    exit;
}

if (!isset($_FILES['image']) || $_FILES['image']['error'] !== UPLOAD_ERR_OK) {
    http_response_code(400);
    echo json_encode(['success' => false, 'error' => 'No image uploaded or upload error']);
    exit;
}

$file = $_FILES['image'];
$allowedTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif', 'image/svg+xml'];

if (!in_array($file['type'], $allowedTypes)) {
    http_response_code(400);
    echo json_encode(['success' => false, 'error' => 'Invalid file format. Please upload JPG, PNG, WEBP, or SVG.']);
    exit;
}

$uploadDir = dirname(__DIR__) . '/uploads/';
if (!is_dir($uploadDir)) {
    mkdir($uploadDir, 0777, true);
}

$extension = pathinfo($file['name'], PATHINFO_EXTENSION);
if (!$extension) $extension = 'jpg';
$newFileName = 'img_' . time() . '_' . bin2hex(random_bytes(4)) . '.' . strtolower($extension);
$destination = $uploadDir . $newFileName;

if (move_uploaded_file($file['tmp_name'], $destination)) {
    $relativePath = 'uploads/' . $newFileName;
    echo json_encode(['success' => true, 'url' => $relativePath, 'fileName' => $newFileName]);
} else {
    http_response_code(500);
    echo json_encode(['success' => false, 'error' => 'Failed to move uploaded file']);
}
