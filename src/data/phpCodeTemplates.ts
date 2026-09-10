export interface PhpFile {
  filename: string;
  path: string;
  description: string;
  code: string;
}

export const PHP_PROJECT_FILES: PhpFile[] = [
  {
    filename: 'database.sql',
    path: 'database.sql',
    description: 'MySQL schema with tables for idols, categories, customers, orders, order_items, payments, and sample records.',
    code: `-- Eco Ganesh Database Schema for MySQL 8 (XAMPP)
CREATE DATABASE IF NOT EXISTS \`ecoganesh_db\` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE \`ecoganesh_db\`;

-- 1. Categories Table
CREATE TABLE IF NOT EXISTS \`categories\` (
  \`id\` INT AUTO_INCREMENT PRIMARY KEY,
  \`slug\` VARCHAR(50) NOT NULL UNIQUE,
  \`name\` VARCHAR(100) NOT NULL,
  \`description\` TEXT,
  \`created_at\` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB;

INSERT INTO \`categories\` (\`slug\`, \`name\`, \`description\`) VALUES
('clay', 'Clay Idols (Shadu Mati)', '100% natural riverbed shadu mud idols'),
('small', 'Small Ganpati', 'Idols up to 12 inches for compact home mandirs'),
('premium', 'Premium Ganpati', 'Majestic 18-36 inch sculptures with ornate detailing'),
('seed', 'Seed Ganpati', 'Plantable tree Ganpati embedded with Tulsi & Marigold seeds'),
('paper', 'Paper Mache', 'Ultra-lightweight biodegradable paper pulp idols');

-- 2. Idols (Products) Table
CREATE TABLE IF NOT EXISTS \`idols\` (
  \`id\` INT AUTO_INCREMENT PRIMARY KEY,
  \`name\` VARCHAR(150) NOT NULL,
  \`category_id\` INT NOT NULL,
  \`size\` VARCHAR(50) NOT NULL,
  \`height\` VARCHAR(50) NOT NULL,
  \`weight\` VARCHAR(50) NOT NULL,
  \`price\` DECIMAL(10, 2) NOT NULL,
  \`material\` VARCHAR(150) NOT NULL,
  \`stock\` INT DEFAULT 10,
  \`rating\` DECIMAL(2,1) DEFAULT 5.0,
  \`description\` TEXT NOT NULL,
  \`image_url\` VARCHAR(255) NOT NULL,
  \`visarjan_time\` VARCHAR(100) DEFAULT '45 mins in water bucket',
  \`is_featured\` TINYINT(1) DEFAULT 0,
  \`created_at\` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (\`category_id\`) REFERENCES \`categories\`(\`id\`) ON DELETE CASCADE
) ENGINE=InnoDB;

INSERT INTO \`idols\` (\`name\`, \`category_id\`, \`size\`, \`height\`, \`weight\`, \`price\`, \`material\`, \`stock\`, \`description\`, \`image_url\`, \`is_featured\`) VALUES
('Bal Ganesh', 2, '12 Inch', '30 cm', '3.2 kg', 8000.00, '100% Pure Shadu Clay', 14, 'Charming Bal Ganesh handcrafted in riverbed Shadu Mati with turmeric colors.', 'assets/images/bal_ganesh.jpg', 1),
('Royal Ganpati', 3, '18 Inch', '45 cm', '6.8 kg', 12000.00, 'Pure Shadu Mati & Edible Mica', 8, 'Royal Ganpati in regal posture with intricate carved Mukut and dhoti.', 'assets/images/royal_ganpati.jpg', 1),
('Traditional Ganpati', 1, '24 Inch', '60 cm', '11.5 kg', 18000.00, 'Riverbed Shadu with Geru Ochre', 5, 'Grand 2-foot traditional idol sculpted in authentic Konkan artisan style.', 'assets/images/traditional_ganpati.jpg', 1),
('Plantable Seed Ganpati (Tulsi)', 4, '10 Inch', '25 cm', '2.4 kg', 4500.00, 'Red Soil & Organic Seeds', 22, 'Grows into Holy Tulsi plant after home visarjan in a pot.', 'assets/images/seed_ganpati.jpg', 1);

-- 3. Customers Table
CREATE TABLE IF NOT EXISTS \`customers\` (
  \`id\` INT AUTO_INCREMENT PRIMARY KEY,
  \`name\` VARCHAR(100) NOT NULL,
  \`email\` VARCHAR(120) NOT NULL UNIQUE,
  \`password_hash\` VARCHAR(255) NOT NULL,
  \`phone\` VARCHAR(20) NOT NULL,
  \`city\` VARCHAR(100) NOT NULL,
  \`address\` TEXT,
  \`created_at\` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB;

-- 4. Orders Table
CREATE TABLE IF NOT EXISTS \`orders\` (
  \`id\` INT AUTO_INCREMENT PRIMARY KEY,
  \`order_number\` VARCHAR(50) NOT NULL UNIQUE,
  \`customer_name\` VARCHAR(100) NOT NULL,
  \`customer_phone\` VARCHAR(20) NOT NULL,
  \`customer_email\` VARCHAR(120),
  \`address\` TEXT NOT NULL,
  \`city\` VARCHAR(100) NOT NULL,
  \`pincode\` VARCHAR(10) NOT NULL,
  \`payment_method\` VARCHAR(50) NOT NULL,
  \`payment_status\` ENUM('Pending', 'Paid', 'Cash on Delivery') DEFAULT 'Pending',
  \`order_status\` ENUM('Pending', 'Confirmed', 'Dispatched', 'Delivered') DEFAULT 'Pending',
  \`total_amount\` DECIMAL(10,2) NOT NULL,
  \`created_at\` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB;

-- 5. Order Items Table
CREATE TABLE IF NOT EXISTS \`order_items\` (
  \`id\` INT AUTO_INCREMENT PRIMARY KEY,
  \`order_id\` INT NOT NULL,
  \`idol_id\` INT NOT NULL,
  \`quantity\` INT NOT NULL,
  \`unit_price\` DECIMAL(10,2) NOT NULL,
  FOREIGN KEY (\`order_id\`) REFERENCES \`orders\`(\`id\`) ON DELETE CASCADE,
  FOREIGN KEY (\`idol_id\`) REFERENCES \`idols\`(\`id\`) ON DELETE CASCADE
) ENGINE=InnoDB;

-- 6. Payments Table
CREATE TABLE IF NOT EXISTS \`payments\` (
  \`id\` INT AUTO_INCREMENT PRIMARY KEY,
  \`order_id\` INT NOT NULL,
  \`transaction_id\` VARCHAR(100) NOT NULL,
  \`amount\` DECIMAL(10,2) NOT NULL,
  \`payment_method\` VARCHAR(50) NOT NULL,
  \`status\` ENUM('Completed', 'Pending', 'Failed') DEFAULT 'Completed',
  \`created_at\` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (\`order_id\`) REFERENCES \`orders\`(\`id\`) ON DELETE CASCADE
) ENGINE=InnoDB;
`
  },
  {
    filename: 'db_connect.php',
    path: 'config/db_connect.php',
    description: 'PHP 8 PDO MySQL database connection script configured for standard XAMPP server.',
    code: `<?php
// config/db_connect.php
// PHP 8 Database Connection for XAMPP

declare(strict_types=1);

$host = 'localhost';
$db   = 'ecoganesh_db';
$user = 'root';
$pass = ''; // Default XAMPP MySQL password is empty
$charset = 'utf8mb4';

$dsn = "mysql:host=$host;dbname=$db;charset=$charset";
$options = [
    PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
    PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
    PDO::ATTR_EMULATE_PREPARES   => false,
];

try {
    $pdo = new PDO($dsn, $user, $pass, $options);
} catch (PDOException $e) {
    throw new PDOException("Database connection error: " . $e->getMessage(), (int)$e->getCode());
}
`
  },
  {
    filename: 'index.php',
    path: 'index.php',
    description: 'Home page in PHP 8 fetching featured idols, hero banner, customer reviews, and domain branding.',
    code: `<?php
// index.php - Eco Ganesh Homepage (PHP 8 & HTML5)
require_once __DIR__ . '/config/db_connect.php';

// Fetch featured idols
$stmt = $pdo->prepare("SELECT * FROM idols WHERE is_featured = 1 ORDER BY id ASC LIMIT 4");
$stmt->execute();
$featuredIdols = $stmt->fetchAll();
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Eco Ganesh - Eco-Friendly Ganpati Idol Selling Website</title>
    <link rel="stylesheet" href="assets/css/style.css">
</head>
<body>
    <header class="header">
        <div class="logo">🌿 Eco Ganesh</div>
        <nav class="nav">
            <a href="index.php">Home</a>
            <a href="about.php">About Us</a>
            <a href="products.php">Products</a>
            <a href="contact.php">Contact</a>
            <a href="cart.php">Cart</a>
            <a href="login.php">Login</a>
        </nav>
    </header>

    <section class="hero-banner">
        <h1>Celebrate Auspicious & 100% Eco-Friendly Ganesh Chaturthi</h1>
        <p>Pure Shadu Mati, Natural Turmeric Colors, and Seed Ganpati that bloom into holy Tulsi.</p>
        <a href="products.php" class="btn-primary">Explore Clay Idols</a>
    </section>

    <section class="featured-idols container">
        <h2>Featured Eco-Friendly Ganpati Idols</h2>
        <div class="product-grid">
            <?php foreach ($featuredIdols as $idol): ?>
                <div class="product-card">
                    <img src="<?= htmlspecialchars($idol['image_url']) ?>" alt="<?= htmlspecialchars($idol['name']) ?>">
                    <h3><?= htmlspecialchars($idol['name']) ?></h3>
                    <p class="size">Size: <?= htmlspecialchars($idol['size']) ?></p>
                    <p class="material">Material: <?= htmlspecialchars($idol['material']) ?></p>
                    <p class="price">₹<?= number_format((float)$idol['price']) ?></p>
                    <a href="product_details.php?id=<?= $idol['id'] ?>" class="btn-secondary">View Details</a>
                </div>
            <?php endforeach; ?>
        </div>
    </section>
</body>
</html>
`
  },
  {
    filename: 'products.php',
    path: 'products.php',
    description: 'Products catalog page with category filtering and stock display in PHP 8.',
    code: `<?php
// products.php - Products Catalog
require_once __DIR__ . '/config/db_connect.php';

$categoryFilter = $_GET['category'] ?? null;

if ($categoryFilter) {
    $stmt = $pdo->prepare("SELECT i.*, c.name AS category_name FROM idols i JOIN categories c ON i.category_id = c.id WHERE c.slug = ? ORDER BY i.price ASC");
    $stmt->execute([$categoryFilter]);
} else {
    $stmt = $pdo->prepare("SELECT i.*, c.name AS category_name FROM idols i JOIN categories c ON i.category_id = c.id ORDER BY i.price ASC");
    $stmt->execute();
}
$products = $stmt->fetchAll();
?>
<!-- Products Catalog UI -->
`
  },
  {
    filename: 'admin_dashboard.php',
    path: 'admin/admin_dashboard.php',
    description: 'PHP 8 Admin Panel with metrics, Add/Update/Delete Idol, Orders management, and Payments.',
    code: `<?php
// admin/admin_dashboard.php - PHP 8 Admin Panel
session_start();
require_once __DIR__ . '/../config/db_connect.php';

// Check admin authentication
// Metrics
$totalSales = $pdo->query("SELECT COALESCE(SUM(total_amount), 0) FROM orders WHERE payment_status = 'Paid'")->fetchColumn();
$totalOrders = $pdo->query("SELECT COUNT(*) FROM orders")->fetchColumn();
$totalIdols = $pdo->query("SELECT COUNT(*) FROM idols")->fetchColumn();
$totalCustomers = $pdo->query("SELECT COUNT(*) FROM customers")->fetchColumn();

// Fetch orders
$orders = $pdo->query("SELECT * FROM orders ORDER BY created_at DESC LIMIT 10")->fetchAll();
?>
`
  }
];
