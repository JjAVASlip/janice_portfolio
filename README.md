# Janice Mas Bulanon — Immersive Editorial Technology Portfolio

A modern, responsive, database-driven personal portfolio website and admin dashboard built for **Janice Mas Bulanon**, 3rd Year Bachelor of Science in Information Technology (BSIT) candidate at National College of Science and Technology (NCST).

---

## 🌟 Key Features

- **Immersive Editorial Design**: Crafted with Sora & Inter typography, deep navy palette (`#060810`), electric blue and purple lighting, and gold accents.
- **Vue 3 + Tailwind CSS**: Clean, modular Vue 3 single-file component architecture with dynamic reactive store (`js/store.js`).
- **MySQL & phpMyAdmin Integration**: Full MySQL backend (`portfolio_janice_db`) with PDO API endpoints (`get_data.php`, `save_data.php`, `contact.php`, `update_inbox.php`).
- **Modern Admin Dashboard**: Secured content control center for managing projects, visual lab artifacts, skills, bio, workflow stages, and inbox inquiries.
- **Secret 3-Tap Admin Access**: Access the admin login screen by tapping the `JANICE` logo 3 times in the navigation bar or using `Alt + A`.
- **Fully Responsive**: Optimized layout for Mobile, iPad/Tablet, and Desktop screens.

---

## 📁 Project Structure

```
portfolio_janice/
 ├── index.html                  # Main entry page
 ├── install.php                 # One-click database installer
 ├── api/                        # PHP MySQL API endpoints
 │   ├── db.php                  # PDO connection helper & auto-migrator
 │   ├── db_status.php           # Database health check API
 │   ├── get_data.php            # Read portfolio data (MySQL + JSON fallback)
 │   ├── save_data.php           # Save portfolio edits (MySQL + JSON sync)
 │   ├── contact.php             # Save inbox inquiries to MySQL
 │   ├── update_inbox.php        # Inbox read/delete status sync
 │   └── upload_image.php        # File upload handler
 ├── database/
 │   └── portfolio_janice.sql    # MySQL database schema & seed data
 ├── js/
 │   ├── store.js                # Central Vue reactive store
 │   ├── default-data.js         # Default fallback dataset
 │   ├── navigation.js           # Navigation link configuration
 │   ├── main.js                 # App initialization
 │   ├── components/             # Reusable Vue components
 │   │   ├── navbar.js
 │   │   ├── hero-section.js
 │   │   ├── about-section.js
 │   │   ├── project-section.js
 │   │   ├── visual-lab.js
 │   │   ├── skills-section.js
 │   │   ├── workflow-section.js
 │   │   ├── contact-section.js
 │   │   └── footer-section.js
 │   └── views/
 │       └── admin.js            # Admin Dashboard view component
 ├── assets/                     # Portfolio SVG images and design assets
 └── uploads/                    # User uploaded image storage
```

---

## 🛠️ Local Setup Instructions

1. Start **XAMPP** (Apache + MySQL).
2. Clone this repository into `c:\xampp\htdocs\portfolio_janice`:
   ```bash
   git clone <your-repository-url> portfolio_janice
   ```
3. Open your browser and navigate to:
   ```
   http://localhost/portfolio_janice/install.php
   ```
   *This automatically creates the database `portfolio_janice_db` and populates all 7 MySQL tables!*
4. Access your live portfolio at:
   ```
   http://localhost/portfolio_janice/
   ```
5. Access the Admin Dashboard:
   - Tap the `JANICE` brand logo 3 times in the navbar, or
   - Press `Alt + A`, or
   - Go to `http://localhost/portfolio_janice/#admin`
   - Default passcode: **`admin123`**

---

## 💻 Tech Stack

- **Front-End**: Vue.js 3, Tailwind CSS, Sora & Inter Fonts
- **Back-End**: PHP 8.2 (PDO)
- **Database**: MySQL / MariaDB via phpMyAdmin
- **Server**: Apache (XAMPP Localhost)
