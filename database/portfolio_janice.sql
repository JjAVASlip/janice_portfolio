-- phpMyAdmin SQL Dump
-- Database: `portfolio_janice_db`
-- Project: Janice Mas Bulanon Portfolio

CREATE DATABASE IF NOT EXISTS `portfolio_janice_db` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE `portfolio_janice_db`;

-- --------------------------------------------------------
-- Table structure for table `profile`
-- --------------------------------------------------------

CREATE TABLE IF NOT EXISTS `profile` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `brand_name` varchar(100) NOT NULL,
  `role` varchar(100) NOT NULL,
  `subrole` varchar(150) NOT NULL,
  `education_level` varchar(100) NOT NULL,
  `degree` varchar(255) NOT NULL,
  `college` varchar(255) NOT NULL,
  `college_short` varchar(50) NOT NULL,
  `shs` varchar(255) NOT NULL,
  `shs_strand` varchar(100) NOT NULL,
  `achievements_json` text DEFAULT NULL,
  `headline_line1` varchar(100) NOT NULL,
  `headline_gradient` varchar(100) NOT NULL,
  `headline_line3` varchar(100) NOT NULL,
  `hero_bio` text DEFAULT NULL,
  `about_bio1` text DEFAULT NULL,
  `about_bio2` text DEFAULT NULL,
  `quote` varchar(255) DEFAULT NULL,
  `philosophy` text DEFAULT NULL,
  `contact_text` text DEFAULT NULL,
  `email` varchar(255) NOT NULL,
  `linkedin` varchar(255) DEFAULT NULL,
  `github` varchar(255) DEFAULT NULL,
  `portrait_image` varchar(255) NOT NULL,
  `about_image1` varchar(255) NOT NULL,
  `about_image2` varchar(255) NOT NULL,
  `about_image3` varchar(255) NOT NULL,
  `core_interests_json` text DEFAULT NULL,
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------
-- Table structure for table `projects`
-- --------------------------------------------------------

CREATE TABLE IF NOT EXISTS `projects` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `project_key` varchar(100) NOT NULL UNIQUE,
  `number` varchar(10) NOT NULL,
  `title` varchar(255) NOT NULL,
  `category` varchar(150) NOT NULL,
  `tagline` text DEFAULT NULL,
  `description` text DEFAULT NULL,
  `role` varchar(255) NOT NULL,
  `technologies_json` text DEFAULT NULL,
  `image` varchar(255) NOT NULL,
  `cta` varchar(100) DEFAULT 'VIEW PROJECT',
  `problem` text DEFAULT NULL,
  `approach` text DEFAULT NULL,
  `my_contribution_json` text DEFAULT NULL,
  `team_contribution_json` text DEFAULT NULL,
  `process_steps_json` text DEFAULT NULL,
  `learning` text DEFAULT NULL,
  `sort_order` int(11) NOT NULL DEFAULT 0,
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------
-- Table structure for table `visuals`
-- --------------------------------------------------------

CREATE TABLE IF NOT EXISTS `visuals` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `visual_key` varchar(100) NOT NULL UNIQUE,
  `title` varchar(255) NOT NULL,
  `category` varchar(100) NOT NULL,
  `type` varchar(100) NOT NULL,
  `tag` varchar(100) NOT NULL,
  `tools` varchar(255) NOT NULL,
  `image` varchar(255) NOT NULL,
  `description` text DEFAULT NULL,
  `sort_order` int(11) NOT NULL DEFAULT 0,
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------
-- Table structure for table `skills`
-- --------------------------------------------------------

CREATE TABLE IF NOT EXISTS `skills` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `category_key` varchar(100) NOT NULL UNIQUE,
  `title` varchar(100) NOT NULL,
  `subtitle` varchar(255) NOT NULL,
  `icon` varchar(50) NOT NULL,
  `skills_json` text NOT NULL,
  `sort_order` int(11) NOT NULL DEFAULT 0,
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------
-- Table structure for table `workflow`
-- --------------------------------------------------------

CREATE TABLE IF NOT EXISTS `workflow` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `number` varchar(10) NOT NULL,
  `title` varchar(100) NOT NULL,
  `phase` varchar(150) NOT NULL,
  `tagline` varchar(255) NOT NULL,
  `headline` varchar(255) NOT NULL,
  `detailed_desc` text NOT NULL,
  `deliverables_json` text NOT NULL,
  `personal_focus` text NOT NULL,
  `sort_order` int(11) NOT NULL DEFAULT 0,
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------
-- Table structure for table `inbox`
-- --------------------------------------------------------

CREATE TABLE IF NOT EXISTS `inbox` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `msg_key` varchar(100) NOT NULL UNIQUE,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `subject` varchar(255) NOT NULL,
  `message` text NOT NULL,
  `is_read` tinyint(1) NOT NULL DEFAULT 0,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------
-- Table structure for table `settings`
-- --------------------------------------------------------

CREATE TABLE IF NOT EXISTS `settings` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `admin_passcode` varchar(255) NOT NULL DEFAULT 'admin123',
  `site_title` varchar(255) NOT NULL DEFAULT 'Janice Mas Bulanon | BSIT Candidate Portfolio',
  `allow_inquiries` tinyint(1) NOT NULL DEFAULT 1,
  `last_saved` varchar(100) DEFAULT NULL,
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------
-- Seed Initial Records
-- --------------------------------------------------------

INSERT INTO `settings` (`id`, `admin_passcode`, `site_title`, `allow_inquiries`, `last_saved`)
VALUES (1, 'admin123', 'Janice Mas Bulanon | BSIT Candidate Portfolio', 1, NOW())
ON DUPLICATE KEY UPDATE `id`=`id`;

INSERT INTO `profile` (`id`, `name`, `brand_name`, `role`, `subrole`, `education_level`, `degree`, `college`, `college_short`, `shs`, `shs_strand`, `achievements_json`, `headline_line1`, `headline_gradient`, `headline_line3`, `hero_bio`, `about_bio1`, `about_bio2`, `quote`, `philosophy`, `contact_text`, `email`, `linkedin`, `github`, `portrait_image`, `about_image1`, `about_image2`, `about_image3`, `core_interests_json`)
VALUES (1, 
  'Janice Mas Bulanon', 
  'JANICE', 
  'BSIT CANDIDATE', 
  'ASPIRING SYSTEMS ANALYST', 
  '3rd Year Student', 
  'Bachelor of Science in Information Technology', 
  'National College of Science and Technology', 
  'NCST', 
  'Pamplona National School of Fisheries', 
  'STEM Graduate', 
  '[\"STEM Graduate with Honors\", \"Consistent Honor Student\"]', 
  'MAKING', 
  'COMPLEX', 
  'SYSTEMS CLEAR', 
  'I\'m a 3rd year BSIT student exploring systems, workflows, design, and technology to turn ideas into practical digital solutions.', 
  'I\'m a 3rd year Bachelor of Science in Information Technology student at National College of Science and Technology. I\'m currently exploring different areas of IT while developing a growing interest in systems analysis, process design, quality assurance, documentation, UI/UX, and web technologies.', 
  'Rather than claiming to know everything, my goal is to understand how systems work from end to end—identifying what is missing, organizing logical workflows, refining user interfaces, and turning collaborative concepts into dependable digital solutions.', 
  'Progress, not perfection.', 
  'Understanding why a system exists before deciding how it should be built.', 
  'I\'m always open to learning, collaboration, academic projects, and opportunities to grow in the IT field. Feel free to reach out for inquiries or discussion.', 
  'janice.bulanon@ncst.edu.ph', 
  'https://linkedin.com', 
  'https://github.com', 
  'assets/images/janice-portrait.jpg', 
  'assets/images/about-01.jpg', 
  'assets/images/about-02.jpg', 
  'assets/images/about-03.jpg', 
  '[\"Systems Analysis\", \"Process & Workflow Design\", \"Quality Assurance & Review\", \"Documentation\", \"UI/UX Planning\", \"Web Technologies\", \"Problem Analysis\", \"Project Organization\"]'
) ON DUPLICATE KEY UPDATE `id`=`id`;

INSERT INTO `projects` (`project_key`, `number`, `title`, `category`, `tagline`, `description`, `role`, `technologies_json`, `image`, `cta`, `problem`, `approach`, `my_contribution_json`, `team_contribution_json`, `process_steps_json`, `learning`, `sort_order`) VALUES
('studyquest', '01', 'STUDYQUEST', 'COMPROG 1 PROJECT', 'A gamified academic quest and study tracking application aimed at breaking down coursework into actionable milestones.', 'An academic study companion designed to gamify daily study sessions, organize subject modules, and reward completed learning milestones with an intuitive progression system.', 'Logic Planning • Flow Design & Testing', '[\"Java\", \"Logic Formulation\", \"UI Wireframing\", \"Flowcharting\"]', 'assets/images/studyquest.jpg', 'VIEW PROJECT', 'Students often struggle to track daily study milestones across multiple subjects, leading to cramming and lack of structured revision routines.', 'Designed a quest-based architecture where assignments and topics are converted into discrete missions with checkpoints and progress badges.', '[\"Mapped core logic flowcharts and quest completion conditions\", \"Designed modular wireframe concepts for student dashboard\", \"Conducted logic testing for task status transitions and score calculation\", \"Documented system requirements and feature specifications\"]', '[\"Collaborated with team on Java core classes and data structure implementation\", \"Paired on user feedback collection and test scenario verification\"]', '[{\"title\":\"Needs Analysis\",\"desc\":\"Identified pain points in student homework and study routines.\"},{\"title\":\"Logic Modeling\",\"desc\":\"Created step-by-step flowchart for quests and leveling rules.\"},{\"title\":\"Validation & QA\",\"desc\":\"Tested edge cases for deadline tracking and state resets.\"}]', 'Gained solid foundational skills in turning functional requirements into logical algorithms and structuring dependable flowcharts.', 1),
('ihelpu', '02', 'IHELP U', 'WEBTECH 2 PROJECT', 'A responsive community service and assistance request portal connecting users with structured help categories.', 'A responsive web platform designed to streamline community service inquiries, submit categorized assistance tickets, and track resolution statuses with clear visual feedback.', 'Front-End UI Structuring • Process Flow • Form Validation', '[\"HTML5\", \"CSS3\", \"JavaScript\", \"Bootstrap\", \"UI Design\"]', 'assets/images/ihelpu.jpg', 'VIEW PROJECT', 'Manual requests for assistance often get lost or delayed due to lack of standard categorization and unstructured submission channels.', 'Created clean, responsive intake forms with dynamic validation, accessible category filters, and clear status trackers.', '[\"Structured front-end HTML/CSS layout and responsive grid components\", \"Organized form validation rules to prevent incomplete ticket submissions\", \"Planned user interface navigation hierarchy and visual consistency\", \"Documented user flows for submitting and checking service tickets\"]', '[\"Collaborated on back-end service routing logic and data persistence\", \"Participated in cross-browser UI testing and responsive checks\"]', '[{\"title\":\"UI Wireframing\",\"desc\":\"Sketched user intake journeys and form validation hierarchy.\"},{\"title\":\"Front-End Build\",\"desc\":\"Implemented accessible HTML5 forms with Bootstrap styling.\"},{\"title\":\"Usability Testing\",\"desc\":\"Checked responsiveness across mobile and desktop devices.\"}]', 'Strengthened practical proficiency in modern CSS layout techniques, client-side input validation, and user-centered interface structuring.', 2),
('oop-project', '03', 'OOP PROJECT', 'OBJECT-ORIENTED PROGRAMMING', 'An object-oriented management system modeling real-world entities through structured classes and data encapsulation.', 'A software system developed to demonstrate core object-oriented principles (Encapsulation, Inheritance, Polymorphism, Abstraction) for structured entity management and records processing.', 'Class Diagramming • Requirements Review • QA Testing', '[\"Java\", \"OOP Principles\", \"Data Structures\", \"UML Modeling\"]', 'assets/images/oop-project.jpg', 'VIEW PROJECT', 'Managing complex entity relationships with procedural code results in brittle architectures that are difficult to debug and maintain.', 'Designed structured UML class diagrams with clear class hierarchies, inheritance trees, and getter/setter validation barriers.', '[\"Mapped UML Class Diagrams and entity relationship hierarchies\", \"Defined functional requirements and test case matrices for methods\", \"Reviewed class encapsulation to safeguard object state integrity\", \"Compiled clear technical documentation and method summaries\"]', '[\"Collaborated with group members on Java controller logic and file I/O\", \"Coordinated bug triage and shared code review sessions\"]', '[{\"title\":\"UML Modeling\",\"desc\":\"Designed class blueprints with inheritance and encapsulation.\"},{\"title\":\"Class Implementation\",\"desc\":\"Built robust data structures with strict attribute access.\"},{\"title\":\"Unit QA\",\"desc\":\"Executed test cases for polymorphic behaviors and exceptions.\"}]', 'Understood the critical importance of clean modular architecture, accurate class diagrams, and robust error handling in software engineering.', 3),
('sarismart', '04', 'SARISMART', 'SYSTEM INTEGRATION ARCHITECTURE', 'A branch-based Point-of-Sale and Human Resource Management System designed to integrate store operations and HR processes.', 'A comprehensive academic capstone-level system integration project designed to unify multi-branch inventory tracking, point-of-sale transactions, and employee management into a single cohesive architecture.', 'System Analysis • Process Organization • Documentation • UI/UX Planning • System Review', '[\"PHP\", \"MySQL\", \"HTML\", \"CSS\", \"JavaScript\"]', 'assets/images/sarismart.jpg', 'VIEW CASE STUDY', 'Small-to-medium retail businesses often operate POS transactions and staff scheduling on disconnected spreadsheets, resulting in inventory discrepancies and scheduling conflicts.', 'Integrated relational schema with centralized inventory tables, branch-specific shift logs, and role-based access control for cashiers, managers, and HR administrators.', '[\"Conducted detailed Systems Analysis and mapped Data Flow Diagrams (DFD Levels 0 & 1)\", \"Designed Entity Relationship Diagrams (ERD) with relational constraints and foreign keys\", \"Planned user experience and wireframes for POS terminal and HR administrative dashboards\", \"Authored comprehensive system documentation, user manuals, and process flowcharts\", \"Led Quality Assurance reviews, functional testing matrices, and usability checks\"]', '[\"Collaborated with developers on PHP database connection scripts and SQL queries\", \"Coordinated sprint milestones, task assignments, and review checkpoints\"]', '[{\"title\":\"System Analysis\",\"desc\":\"Mapped business processes, DFDs, and normalized MySQL schemas.\"},{\"title\":\"UI/UX Blueprinting\",\"desc\":\"Designed intuitive POS cashier and HR management dashboards.\"},{\"title\":\"QA & Review\",\"desc\":\"Ran comprehensive functional tests and documented edge cases.\"}]', 'Solidified my passion for Systems Analysis and Process Organization—seeing how clear diagrams, structured workflows, and thorough QA ensure complex systems run seamlessly.', 4)
ON DUPLICATE KEY UPDATE `title`=VALUES(`title`);

INSERT INTO `visuals` (`visual_key`, `title`, `category`, `type`, `tag`, `tools`, `image`, `description`, `sort_order`) VALUES
('vis-01', 'SariSmart POS & HR Process Flowchart', 'SYSTEMS & FLOWS', 'Flowchart / Architecture', 'WORKFLOW', 'Draw.io / Lucidchart', 'assets/images/visual-01.jpg', 'Complete branch transaction routing from cashier barcode scan, invoice generation, to daily inventory sync and HR shift reconciliation.', 1),
('vis-02', 'Relational Entity Schema (ERD)', 'SYSTEMS & FLOWS', 'Database Diagram', 'DATA MODEL', 'MySQL Workbench', 'assets/images/visual-02.jpg', 'Multi-table relational schema covering user roles, employee profiles, inventory items, suppliers, transactions, and audit trail logs.', 2),
('vis-03', 'iHelp U Assistance App UI Screen Suite', 'UI/UX & FIGMA', 'Figma High-Fidelity', 'UI DESIGN', 'Figma / Auto-Layout', 'assets/images/visual-03.jpg', 'High-fidelity mobile and desktop responsive wireframe mockups showcasing clean ticket submission pipelines and category filter navigation.', 3),
('vis-04', 'StudyQuest Wireframe & Journey Map', 'UI/UX & FIGMA', 'Wireframes / UX', 'WIREFRAMES', 'Figma / Paper Prototyping', 'assets/images/visual-04.jpg', 'User journey sketches and low-fidelity wireframes translating gamified study milestones into a minimal, student-friendly interface.', 4),
('vis-05', 'Quality Assurance Functional Test Matrix', 'QA & TESTING', 'QA Documentation', 'QUALITY ASSURANCE', 'Excel / Test Case Matrix', 'assets/images/visual-05.jpg', 'Structured QA checklist testing input boundary conditions, POS inventory deductions, password hashing verification, and responsive viewport checks.', 5),
('vis-06', 'Data Flow Diagram (DFD Level 0 & Level 1)', 'SYSTEMS & FLOWS', 'DFD Diagram', 'SYSTEM ANALYSIS', 'Systems Analysis Methods', 'assets/images/visual-06.jpg', 'Context and level-1 data flow diagrams illustrating data store boundaries, external entities, and information exchange protocols.', 6)
ON DUPLICATE KEY UPDATE `title`=VALUES(`title`);

INSERT INTO `skills` (`category_key`, `title`, `subtitle`, `icon`, `skills_json`, `sort_order`) VALUES
('sk-systems', 'SYSTEMS', 'Process & Requirements Structuring', '📊', '[{\"name\":\"Requirements Analysis\",\"status\":\"FAMILIAR\"},{\"name\":\"Process Mapping\",\"status\":\"FAMILIAR\"},{\"name\":\"System Planning\",\"status\":\"LEARNING\"},{\"name\":\"Workflow Design\",\"status\":\"FAMILIAR\"}]', 1),
('sk-quality', 'QUALITY', 'Review & Reliability Assurance', '🔍', '[{\"name\":\"System Review\",\"status\":\"FAMILIAR\"},{\"name\":\"Functional Testing\",\"status\":\"FAMILIAR\"},{\"name\":\"Bug Identification\",\"status\":\"LEARNING\"},{\"name\":\"Usability Checking\",\"status\":\"FAMILIAR\"}]', 2),
('sk-design', 'DESIGN', 'Interface & User Experience', '🎨', '[{\"name\":\"UI/UX Planning\",\"status\":\"FAMILIAR\"},{\"name\":\"Figma\",\"status\":\"LEARNING\"},{\"name\":\"Wireframing\",\"status\":\"FAMILIAR\"},{\"name\":\"Visual Organization\",\"status\":\"FAMILIAR\"}]', 3),
('sk-technology', 'TECHNOLOGY', 'Web Tools & Core Platforms', '💻', '[{\"name\":\"HTML & CSS\",\"status\":\"FAMILIAR\"},{\"name\":\"JavaScript & PHP\",\"status\":\"LEARNING\"},{\"name\":\"MySQL Database\",\"status\":\"FAMILIAR\"},{\"name\":\"Vue.js & Tailwind\",\"status\":\"LEARNING\"},{\"name\":\"Git & GitHub\",\"status\":\"LEARNING\"},{\"name\":\"Cisco Packet Tracer\",\"status\":\"EXPLORING\"}]', 4)
ON DUPLICATE KEY UPDATE `title`=VALUES(`title`);

INSERT INTO `workflow` (`number`, `title`, `phase`, `tagline`, `headline`, `detailed_desc`, `deliverables_json`, `personal_focus`, `sort_order`) VALUES
('01', 'PLAN', 'ORIENTATION & DISCOVERY', 'Understand the problem and define the goal.', 'Grounding the Project in Real Objectives', 'Every project begins by clearly defining the core problem statement, identifying user pain points, aligning scope boundaries, and establishing achievable academic or client objectives.', '[\"Problem Statement Definition\", \"Project Scope & Objective Document\", \"Initial Resource & Timeline Schedule\", \"Stakeholder Needs Checklist\"]', 'Ensuring that our team does not rush into code before agreeing on the underlying objective.', 1),
('02', 'ANALYZE', 'REQUIREMENTS & ARCHITECTURE', 'Identify requirements, workflows, and missing pieces.', 'Mapping System Relationships & Logic Flows', 'Examining input and output dependencies, identifying edge cases, mapping Data Flow Diagrams (DFDs), Entity-Relationship Schemas (ERDs), and structuring requirement matrices.', '[\"Functional & Non-Functional Requirements\", \"Data Flow Diagrams (Level 0 & 1)\", \"Relational Entity Schema (ERD)\", \"User Role Permission Maps\"]', 'My favorite stage: finding gaps in the logic and transforming vague thoughts into structured charts.', 2),
('03', 'DESIGN', 'UI/UX & WIREFRAMING', 'Organize the process, interface, and system structure.', 'Creating Intuitive Human-Centered Layouts', 'Translating analyzed requirements into user-friendly layouts, wireframes, and design components. Establishing visual hierarchy, consistent typography, and seamless form input journeys.', '[\"Low-Fidelity Paper & Digital Wireframes\", \"Figma Interactive UI Screens\", \"Component Color & Style Rules\", \"Form Validation Error Feedback Specs\"]', 'Making complex data entry clean, predictable, and approachable for non-technical users.', 3),
('04', 'DEVELOP', 'IMPLEMENTATION & COORDINATION', 'Turn the plan into a working digital solution.', 'Building Robust Code Grounded in Design', 'Constructing front-end interfaces and connecting database queries based strictly on the approved blueprints, adhering to clean coding standards, and preserving version control on Git.', '[\"Modular Front-End UI Components\", \"Structured Database Queries & Schema\", \"Version Control Branch Management\", \"Progress Checkpoint Reviews\"]', 'Ensuring code structure matches the planned diagrams and maintaining organized documentation.', 4),
('05', 'TEST', 'QUALITY ASSURANCE & POLISH', 'Review functionality, usability, and quality.', 'Validating Reliability & User Usability', 'Executing comprehensive functional test matrices, verifying boundary inputs, auditing responsive viewports, tracking bugs, and polishing edge cases before final presentation.', '[\"Functional Test Case Matrices\", \"Bug Identification & Resolution Log\", \"Cross-Device Usability Verification\", \"Final Project Documentation & Manual\"]', 'Thoroughly checking details and edge cases to deliver an application that functions without surprises.', 5)
ON DUPLICATE KEY UPDATE `title`=VALUES(`title`);

INSERT INTO `inbox` (`msg_key`, `name`, `email`, `subject`, `message`, `is_read`, `created_at`) VALUES
('msg-01', 'Prof. Garcia (NCST Panel)', 'r.garcia@ncst.edu.ph', 'Systems Analysis Defense Review', 'Hello Janice, your SariSmart POS workflow and ERD documentation looks very well structured. Good job on the test case matrices.', 1, '2026-10-01 14:15:00'),
('msg-02', 'Alex Rivera', 'alex.rivera@techcollaborators.com', 'Inquiry for Capstone Collaboration', 'Hi Janice, I saw your portfolio and your UI/UX wireframes for iHelp U. Would you be interested in participating as our QA and systems lead?', 0, '2026-10-02 08:30:00')
ON DUPLICATE KEY UPDATE `id`=`id`;
