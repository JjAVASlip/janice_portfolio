<?php
// Auto-installer: Creates database and tables from SQL dump file
$dbHost = 'localhost';
$dbUser = 'root';
$dbPass = '';
$dbName = 'portfolio_janice_db';

echo "<pre style='font-family:monospace; background:#0a0f1e; color:#f5f3ee; padding:24px; min-height:100vh;'>\n";
echo "============================================================\n";
echo "  JANICE PORTFOLIO - DATABASE INSTALLER\n";
echo "  portfolio_janice_db  •  XAMPP MySQL  •  phpMyAdmin\n";
echo "============================================================\n\n";

try {
    // Connect to MySQL Server (no database selected yet)
    $pdo = new PDO("mysql:host=$dbHost;charset=utf8mb4", $dbUser, $dbPass, [
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION
    ]);
    echo "✅ Connected to MySQL Server successfully.\n";

    // Create database
    $pdo->exec("CREATE DATABASE IF NOT EXISTS `$dbName` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci");
    echo "✅ Database `$dbName` created or already exists.\n";

    // Switch to database
    $pdo->exec("USE `$dbName`");
    echo "✅ Switched to database `$dbName`.\n\n";

    // Read and execute SQL dump file
    $sqlFile = __DIR__ . '/database/portfolio_janice.sql';
    if (!file_exists($sqlFile)) {
        throw new Exception("SQL file not found at: $sqlFile");
    }

    $sql = file_get_contents($sqlFile);

    // Split into individual statements (handle multi-line inserts)
    $statements = preg_split('/;\s*\n/', $sql, -1, PREG_SPLIT_NO_EMPTY);

    $created = 0;
    $seeded  = 0;
    $errors  = 0;

    foreach ($statements as $stmt) {
        $stmt = trim($stmt);
        if (empty($stmt) || strpos($stmt, '--') === 0) {
            continue;
        }

        // Skip CREATE DATABASE and USE statements (already handled above)
        if (preg_match('/^(CREATE DATABASE|USE )/i', $stmt)) {
            continue;
        }

        try {
            $pdo->exec($stmt);

            if (preg_match('/CREATE TABLE/i', $stmt)) {
                preg_match('/CREATE TABLE IF NOT EXISTS `([^`]+)`/', $stmt, $m);
                $tableName = $m[1] ?? 'unknown';
                echo "  ✅ Table `$tableName` created successfully.\n";
                $created++;
            } elseif (preg_match('/^INSERT/i', $stmt)) {
                $seeded++;
            }
        } catch (PDOException $e) {
            echo "  ⚠️  Warning: " . $e->getMessage() . "\n";
            $errors++;
        }
    }

    echo "\n";
    echo "============================================================\n";
    echo "  INSTALLATION COMPLETE\n";
    echo "============================================================\n";
    echo "  Tables Created : $created\n";
    echo "  Rows Seeded    : $seeded inserts\n";
    echo "  Warnings       : $errors\n\n";

    // Verify all tables
    echo "VERIFYING TABLES:\n\n";
    $tables = ['profile', 'projects', 'visuals', 'skills', 'workflow', 'inbox', 'settings'];
    foreach ($tables as $table) {
        try {
            $count = $pdo->query("SELECT COUNT(*) FROM `$table`")->fetchColumn();
            echo "  ✅  {$table} — {$count} row(s)\n";
        } catch (PDOException $e) {
            echo "  ❌  {$table} — MISSING or ERROR\n";
        }
    }

    echo "\n";
    echo "============================================================\n";
    echo "  NEXT STEPS\n";
    echo "============================================================\n";
    echo "  1. Open phpMyAdmin: http://localhost/phpmyadmin\n";
    echo "  2. Look for database: portfolio_janice_db\n";
    echo "  3. Open your portfolio: http://localhost/portfolio_janice/\n";
    echo "  4. Click ⚙️ Admin in the navbar to manage content\n";
    echo "  5. Default Passcode: admin123\n\n";
    echo "  You can safely delete this file after setup:\n";
    echo "  /portfolio_janice/install.php\n";
    echo "============================================================\n";

} catch (PDOException $e) {
    echo "❌ FATAL ERROR: " . $e->getMessage() . "\n\n";
    echo "  Make sure:\n";
    echo "  1. XAMPP is running and Apache + MySQL are both started\n";
    echo "  2. MySQL root user has no password (default XAMPP)\n";
    echo "  3. Access this file through Apache: http://localhost/portfolio_janice/install.php\n";
}

echo "</pre>\n";
