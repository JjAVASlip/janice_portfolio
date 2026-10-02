<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');

require_once __DIR__ . '/db.php';

$status = [
    'database' => [
        'connected' => false,
        'name' => null,
        'host' => 'localhost',
        'tables' => []
    ],
    'json_file' => [
        'exists' => file_exists(__DIR__ . '/data.json'),
        'size_kb' => null
    ],
    'uploads_dir' => [
        'exists' => is_dir(dirname(__DIR__) . '/uploads'),
        'writable' => is_writable(dirname(__DIR__) . '/uploads')
    ]
];

// Check MySQL Tables
if (isset($pdo)) {
    $status['database']['connected'] = true;
    $status['database']['name'] = 'portfolio_janice_db';

    $tables = ['profile', 'projects', 'visuals', 'skills', 'workflow', 'inbox', 'settings'];
    foreach ($tables as $table) {
        try {
            $count = $pdo->query("SELECT COUNT(*) FROM `$table`")->fetchColumn();
            $status['database']['tables'][$table] = ['exists' => true, 'rows' => (int)$count];
        } catch (PDOException $e) {
            $status['database']['tables'][$table] = ['exists' => false, 'rows' => 0];
        }
    }
}

// JSON File Size
if ($status['json_file']['exists']) {
    $bytes = filesize(__DIR__ . '/data.json');
    $status['json_file']['size_kb'] = round($bytes / 1024, 2);
}

// Uploads directory info
if ($status['uploads_dir']['exists']) {
    $files = glob(dirname(__DIR__) . '/uploads/*');
    $status['uploads_dir']['file_count'] = count($files);
}

$status['timestamp'] = date('c');
$status['php_version'] = phpversion();
$status['mysql_version'] = isset($pdo) ? $pdo->query('SELECT VERSION()')->fetchColumn() : null;

echo json_encode($status, JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES);
