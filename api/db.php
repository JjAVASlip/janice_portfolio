<?php
// Central MySQL Database Connection & Auto-Migrator for phpMyAdmin & InfinityFree

$dbHost = getenv('DB_HOST') ?: 'localhost';
$dbUser = getenv('DB_USER') ?: 'root';
$dbPass = getenv('DB_PASS') !== false ? getenv('DB_PASS') : '';
$dbName = getenv('DB_NAME') ?: 'portfolio_janice_db';

$pdo = null;

try {
    // 1. Direct connection attempt to the database (Works on InfinityFree & Standard Hostings)
    $pdo = new PDO("mysql:host=$dbHost;dbname=$dbName;charset=utf8mb4", $dbUser, $dbPass, [
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC
    ]);
} catch (PDOException $e1) {
    // 2. Localhost fallback: Try creating database if server is reachable (XAMPP localhost)
    try {
        $pdoServer = new PDO("mysql:host=$dbHost;charset=utf8mb4", $dbUser, $dbPass, [
            PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION
        ]);
        $pdoServer->exec("CREATE DATABASE IF NOT EXISTS `$dbName` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci");
        
        $pdo = new PDO("mysql:host=$dbHost;dbname=$dbName;charset=utf8mb4", $dbUser, $dbPass, [
            PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
            PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC
        ]);
    } catch (PDOException $e2) {
        $pdo = null;
    }
}

// Auto-migrate tables if connected and tables don't exist yet
if ($pdo) {
    try {
        $checkTable = $pdo->query("SHOW TABLES LIKE 'profile'")->fetch();
        if (!$checkTable) {
            $sqlFile = dirname(__DIR__) . '/database/portfolio_janice.sql';
            if (file_exists($sqlFile)) {
                $sqlContent = file_get_contents($sqlFile);
                $pdo->exec($sqlContent);
            }
        }
    } catch (Exception $ex) {
        // Table check error ignored
    }
}


/**
 * Fetch full portfolio data object from MySQL database tables
 */
function fetchPortfolioDataFromMySQL($pdo) {
    if (!$pdo) return null;

    $data = [];

    // Profile
    $stmt = $pdo->query("SELECT * FROM `profile` WHERE `id` = 1 LIMIT 1");
    $prof = $stmt->fetch();
    if ($prof) {
        $data['profile'] = [
            'name' => $prof['name'],
            'brandName' => $prof['brand_name'],
            'role' => $prof['role'],
            'subrole' => $prof['subrole'],
            'educationLevel' => $prof['education_level'],
            'degree' => $prof['degree'],
            'college' => $prof['college'],
            'collegeShort' => $prof['college_short'],
            'shs' => $prof['shs'],
            'shsStrand' => $prof['shs_strand'],
            'achievements' => json_decode($prof['achievements_json'] ?: '[]', true),
            'headlineLine1' => $prof['headline_line1'],
            'headlineGradient' => $prof['headline_gradient'],
            'headlineLine3' => $prof['headline_line3'],
            'heroBio' => $prof['hero_bio'],
            'aboutBio1' => $prof['about_bio1'],
            'aboutBio2' => $prof['about_bio2'],
            'quote' => $prof['quote'],
            'philosophy' => $prof['philosophy'],
            'contactText' => $prof['contact_text'],
            'email' => $prof['email'],
            'linkedin' => $prof['linkedin'],
            'github' => $prof['github'],
            'portraitImage' => $prof['portrait_image'],
            'aboutImage1' => $prof['about_image1'],
            'aboutImage2' => $prof['about_image2'],
            'aboutImage3' => $prof['about_image3'],
            'coreInterests' => json_decode($prof['core_interests_json'] ?: '[]', true)
        ];
    }

    // Projects
    $stmt = $pdo->query("SELECT * FROM `projects` ORDER BY `sort_order` ASC, `id` ASC");
    $projects = [];
    while ($row = $stmt->fetch()) {
        $projects[] = [
            'id' => $row['project_key'],
            'number' => $row['number'],
            'title' => $row['title'],
            'category' => $row['category'],
            'tagline' => $row['tagline'],
            'description' => $row['description'],
            'role' => $row['role'],
            'technologies' => json_decode($row['technologies_json'] ?: '[]', true),
            'image' => $row['image'],
            'cta' => $row['cta'],
            'problem' => $row['problem'],
            'approach' => $row['approach'],
            'myContributionList' => json_decode($row['my_contribution_json'] ?: '[]', true),
            'teamContributionList' => json_decode($row['team_contribution_json'] ?: '[]', true),
            'processSteps' => json_decode($row['process_steps_json'] ?: '[]', true),
            'learning' => $row['learning']
        ];
    }
    $data['projects'] = $projects;

    // Visuals
    $stmt = $pdo->query("SELECT * FROM `visuals` ORDER BY `sort_order` ASC, `id` ASC");
    $visuals = [];
    while ($row = $stmt->fetch()) {
        $visuals[] = [
            'id' => $row['visual_key'],
            'title' => $row['title'],
            'category' => $row['category'],
            'type' => $row['type'],
            'tag' => $row['tag'],
            'tools' => $row['tools'],
            'image' => $row['image'],
            'description' => $row['description']
        ];
    }
    $data['visuals'] = $visuals;

    // Skills
    $stmt = $pdo->query("SELECT * FROM `skills` ORDER BY `sort_order` ASC, `id` ASC");
    $skills = [];
    while ($row = $stmt->fetch()) {
        $skills[] = [
            'id' => $row['category_key'],
            'title' => $row['title'],
            'subtitle' => $row['subtitle'],
            'icon' => $row['icon'],
            'skills' => json_decode($row['skills_json'] ?: '[]', true)
        ];
    }
    $data['skills'] = $skills;

    // Workflow
    $stmt = $pdo->query("SELECT * FROM `workflow` ORDER BY `sort_order` ASC, `id` ASC");
    $workflow = [];
    while ($row = $stmt->fetch()) {
        $workflow[] = [
            'number' => $row['number'],
            'title' => $row['title'],
            'phase' => $row['phase'],
            'tagline' => $row['tagline'],
            'headline' => $row['headline'],
            'detailedDesc' => $row['detailed_desc'],
            'deliverables' => json_decode($row['deliverables_json'] ?: '[]', true),
            'personalFocus' => $row['personal_focus']
        ];
    }
    $data['workflow'] = $workflow;

    // Inbox
    $stmt = $pdo->query("SELECT * FROM `inbox` ORDER BY `created_at` DESC");
    $inbox = [];
    while ($row = $stmt->fetch()) {
        $inbox[] = [
            'id' => $row['msg_key'],
            'name' => $row['name'],
            'email' => $row['email'],
            'subject' => $row['subject'],
            'message' => $row['message'],
            'isRead' => (bool)$row['is_read'],
            'date' => date('Y-m-d H:i', strtotime($row['created_at']))
        ];
    }
    $data['inbox'] = $inbox;

    // Settings
    $stmt = $pdo->query("SELECT * FROM `settings` WHERE `id` = 1 LIMIT 1");
    $set = $stmt->fetch();
    $data['settings'] = [
        'adminPasscode' => $set['admin_passcode'] ?? 'admin123',
        'siteTitle' => $set['site_title'] ?? 'Janice Mas Bulanon | BSIT Candidate Portfolio',
        'allowInquiries' => isset($set['allow_inquiries']) ? (bool)$set['allow_inquiries'] : true,
        'lastSaved' => $set['last_saved'] ?? date('c'),
        'databaseConnected' => true,
        'databaseName' => 'portfolio_janice_db'
    ];

    return $data;
}

/**
 * Save full portfolio data object into MySQL database tables
 */
function savePortfolioDataToMySQL($pdo, $data) {
    if (!$pdo || empty($data)) return false;

    $pdo->beginTransaction();

    try {
        // 1. Profile
        if (!empty($data['profile'])) {
            $p = $data['profile'];
            $stmt = $pdo->prepare("INSERT INTO `profile` 
                (`id`, `name`, `brand_name`, `role`, `subrole`, `education_level`, `degree`, `college`, `college_short`, `shs`, `shs_strand`, `achievements_json`, `headline_line1`, `headline_gradient`, `headline_line3`, `hero_bio`, `about_bio1`, `about_bio2`, `quote`, `philosophy`, `contact_text`, `email`, `linkedin`, `github`, `portrait_image`, `about_image1`, `about_image2`, `about_image3`, `core_interests_json`) 
                VALUES (1, :name, :brand_name, :role, :subrole, :education_level, :degree, :college, :college_short, :shs, :shs_strand, :achievements_json, :headline_line1, :headline_gradient, :headline_line3, :hero_bio, :about_bio1, :about_bio2, :quote, :philosophy, :contact_text, :email, :linkedin, :github, :portrait_image, :about_image1, :about_image2, :about_image3, :core_interests_json)
                ON DUPLICATE KEY UPDATE 
                `name`=VALUES(`name`), `brand_name`=VALUES(`brand_name`), `role`=VALUES(`role`), `subrole`=VALUES(`subrole`), `education_level`=VALUES(`education_level`), `degree`=VALUES(`degree`), `college`=VALUES(`college`), `college_short`=VALUES(`college_short`), `shs`=VALUES(`shs`), `shs_strand`=VALUES(`shs_strand`), `achievements_json`=VALUES(`achievements_json`), `headline_line1`=VALUES(`headline_line1`), `headline_gradient`=VALUES(`headline_gradient`), `headline_line3`=VALUES(`headline_line3`), `hero_bio`=VALUES(`hero_bio`), `about_bio1`=VALUES(`about_bio1`), `about_bio2`=VALUES(`about_bio2`), `quote`=VALUES(`quote`), `philosophy`=VALUES(`philosophy`), `contact_text`=VALUES(`contact_text`), `email`=VALUES(`email`), `linkedin`=VALUES(`linkedin`), `github`=VALUES(`github`), `portrait_image`=VALUES(`portrait_image`), `about_image1`=VALUES(`about_image1`), `about_image2`=VALUES(`about_image2`), `about_image3`=VALUES(`about_image3`), `core_interests_json`=VALUES(`core_interests_json`)");

            $stmt->execute([
                ':name' => $p['name'] ?? '',
                ':brand_name' => $p['brandName'] ?? 'JANICE',
                ':role' => $p['role'] ?? '',
                ':subrole' => $p['subrole'] ?? '',
                ':education_level' => $p['educationLevel'] ?? '',
                ':degree' => $p['degree'] ?? '',
                ':college' => $p['college'] ?? '',
                ':college_short' => $p['collegeShort'] ?? '',
                ':shs' => $p['shs'] ?? '',
                ':shs_strand' => $p['shsStrand'] ?? '',
                ':achievements_json' => json_encode($p['achievements'] ?? []),
                ':headline_line1' => $p['headlineLine1'] ?? '',
                ':headline_gradient' => $p['headlineGradient'] ?? '',
                ':headline_line3' => $p['headlineLine3'] ?? '',
                ':hero_bio' => $p['heroBio'] ?? '',
                ':about_bio1' => $p['aboutBio1'] ?? '',
                ':about_bio2' => $p['aboutBio2'] ?? '',
                ':quote' => $p['quote'] ?? '',
                ':philosophy' => $p['philosophy'] ?? '',
                ':contact_text' => $p['contactText'] ?? '',
                ':email' => $p['email'] ?? '',
                ':linkedin' => $p['linkedin'] ?? '',
                ':github' => $p['github'] ?? '',
                ':portrait_image' => $p['portraitImage'] ?? '',
                ':about_image1' => $p['aboutImage1'] ?? '',
                ':about_image2' => $p['aboutImage2'] ?? '',
                ':about_image3' => $p['aboutImage3'] ?? '',
                ':core_interests_json' => json_encode($p['coreInterests'] ?? [])
            ]);
        }

        // 2. Projects (Full replace/sync)
        if (isset($data['projects']) && is_array($data['projects'])) {
            $pdo->exec("DELETE FROM `projects`");
            $stmt = $pdo->prepare("INSERT INTO `projects` 
                (`project_key`, `number`, `title`, `category`, `tagline`, `description`, `role`, `technologies_json`, `image`, `cta`, `problem`, `approach`, `my_contribution_json`, `team_contribution_json`, `process_steps_json`, `learning`, `sort_order`) 
                VALUES (:project_key, :number, :title, :category, :tagline, :description, :role, :technologies_json, :image, :cta, :problem, :approach, :my_contribution_json, :team_contribution_json, :process_steps_json, :learning, :sort_order)");

            foreach ($data['projects'] as $idx => $proj) {
                $stmt->execute([
                    ':project_key' => $proj['id'] ?? ('proj-' . ($idx + 1)),
                    ':number' => $proj['number'] ?? str_pad($idx + 1, 2, '0', STR_PAD_LEFT),
                    ':title' => $proj['title'] ?? '',
                    ':category' => $proj['category'] ?? '',
                    ':tagline' => $proj['tagline'] ?? '',
                    ':description' => $proj['description'] ?? '',
                    ':role' => $proj['role'] ?? '',
                    ':technologies_json' => json_encode($proj['technologies'] ?? []),
                    ':image' => $proj['image'] ?? '',
                    ':cta' => $proj['cta'] ?? 'VIEW PROJECT',
                    ':problem' => $proj['problem'] ?? '',
                    ':approach' => $proj['approach'] ?? '',
                    ':my_contribution_json' => json_encode($proj['myContributionList'] ?? []),
                    ':team_contribution_json' => json_encode($proj['teamContributionList'] ?? []),
                    ':process_steps_json' => json_encode($proj['processSteps'] ?? []),
                    ':learning' => $proj['learning'] ?? '',
                    ':sort_order' => $idx + 1
                ]);
            }
        }

        // 3. Visuals (Full replace/sync)
        if (isset($data['visuals']) && is_array($data['visuals'])) {
            $pdo->exec("DELETE FROM `visuals`");
            $stmt = $pdo->prepare("INSERT INTO `visuals` 
                (`visual_key`, `title`, `category`, `type`, `tag`, `tools`, `image`, `description`, `sort_order`) 
                VALUES (:visual_key, :title, :category, :type, :tag, :tools, :image, :description, :sort_order)");

            foreach ($data['visuals'] as $idx => $vis) {
                $stmt->execute([
                    ':visual_key' => $vis['id'] ?? ('vis-' . ($idx + 1)),
                    ':title' => $vis['title'] ?? '',
                    ':category' => $vis['category'] ?? '',
                    ':type' => $vis['type'] ?? '',
                    ':tag' => $vis['tag'] ?? '',
                    ':tools' => $vis['tools'] ?? '',
                    ':image' => $vis['image'] ?? '',
                    ':description' => $vis['description'] ?? '',
                    ':sort_order' => $idx + 1
                ]);
            }
        }

        // 4. Skills (Full replace/sync)
        if (isset($data['skills']) && is_array($data['skills'])) {
            $pdo->exec("DELETE FROM `skills`");
            $stmt = $pdo->prepare("INSERT INTO `skills` 
                (`category_key`, `title`, `subtitle`, `icon`, `skills_json`, `sort_order`) 
                VALUES (:category_key, :title, :subtitle, :icon, :skills_json, :sort_order)");

            foreach ($data['skills'] as $idx => $cat) {
                $stmt->execute([
                    ':category_key' => $cat['id'] ?? ('sk-' . ($idx + 1)),
                    ':title' => $cat['title'] ?? '',
                    ':subtitle' => $cat['subtitle'] ?? '',
                    ':icon' => $cat['icon'] ?? '⚡',
                    ':skills_json' => json_encode($cat['skills'] ?? []),
                    ':sort_order' => $idx + 1
                ]);
            }
        }

        // 5. Workflow (Full replace/sync)
        if (isset($data['workflow']) && is_array($data['workflow'])) {
            $pdo->exec("DELETE FROM `workflow`");
            $stmt = $pdo->prepare("INSERT INTO `workflow` 
                (`number`, `title`, `phase`, `tagline`, `headline`, `detailed_desc`, `deliverables_json`, `personal_focus`, `sort_order`) 
                VALUES (:number, :title, :phase, :tagline, :headline, :detailed_desc, :deliverables_json, :personal_focus, :sort_order)");

            foreach ($data['workflow'] as $idx => $step) {
                $stmt->execute([
                    ':number' => $step['number'] ?? str_pad($idx + 1, 2, '0', STR_PAD_LEFT),
                    ':title' => $step['title'] ?? '',
                    ':phase' => $step['phase'] ?? '',
                    ':tagline' => $step['tagline'] ?? '',
                    ':headline' => $step['headline'] ?? '',
                    ':detailed_desc' => $step['detailedDesc'] ?? '',
                    ':deliverables_json' => json_encode($step['deliverables'] ?? []),
                    ':personal_focus' => $step['personalFocus'] ?? '',
                    ':sort_order' => $idx + 1
                ]);
            }
        }

        // 6. Inbox status update / sync
        if (isset($data['inbox']) && is_array($data['inbox'])) {
            $existingKeys = [];
            $stmt = $pdo->prepare("INSERT INTO `inbox` 
                (`msg_key`, `name`, `email`, `subject`, `message`, `is_read`, `created_at`) 
                VALUES (:msg_key, :name, :email, :subject, :message, :is_read, :created_at)
                ON DUPLICATE KEY UPDATE `is_read`=VALUES(`is_read`)");

            foreach ($data['inbox'] as $msg) {
                $existingKeys[] = $msg['id'];
                $stmt->execute([
                    ':msg_key' => $msg['id'],
                    ':name' => $msg['name'],
                    ':email' => $msg['email'],
                    ':subject' => $msg['subject'],
                    ':message' => $msg['message'],
                    ':is_read' => $msg['isRead'] ? 1 : 0,
                    ':created_at' => !empty($msg['date']) ? date('Y-m-d H:i:s', strtotime($msg['date'])) : date('Y-m-d H:i:s')
                ]);
            }

            // Remove deleted inbox items from DB
            if (!empty($existingKeys)) {
                $inClause = implode("','", array_map('addslashes', $existingKeys));
                $pdo->exec("DELETE FROM `inbox` WHERE `msg_key` NOT IN ('$inClause')");
            } else {
                $pdo->exec("DELETE FROM `inbox`");
            }
        }

        // 7. Settings
        $lastSaved = date('c');
        $passcode = $data['settings']['adminPasscode'] ?? 'admin123';
        $siteTitle = $data['settings']['siteTitle'] ?? 'Janice Mas Bulanon | BSIT Candidate Portfolio';
        $allowInquiries = isset($data['settings']['allowInquiries']) ? ($data['settings']['allowInquiries'] ? 1 : 0) : 1;

        $stmt = $pdo->prepare("INSERT INTO `settings` (`id`, `admin_passcode`, `site_title`, `allow_inquiries`, `last_saved`) 
            VALUES (1, :passcode, :title, :allow_inquiries, :last_saved) 
            ON DUPLICATE KEY UPDATE `admin_passcode`=VALUES(`admin_passcode`), `site_title`=VALUES(`site_title`), `allow_inquiries`=VALUES(`allow_inquiries`), `last_saved`=VALUES(`last_saved`)");
        $stmt->execute([
            ':passcode' => $passcode,
            ':title' => $siteTitle,
            ':allow_inquiries' => $allowInquiries,
            ':last_saved' => $lastSaved
        ]);

        $pdo->commit();
        return true;
    } catch (Exception $e) {
        $pdo->rollBack();
        return false;
    }
}
