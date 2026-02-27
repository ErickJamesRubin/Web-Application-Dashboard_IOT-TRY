⚡ ESP32 Weather Station Dashboard
<div align="center">
Show Image
Show Image
Show Image
Show Image
Show Image
A modern, real-time IoT weather monitoring system with a stunning web dashboard and persistent database storage
</div>

📋 Table of Contents

Overview
Features
Technologies
Hardware Requirements
Software Requirements
Database Setup
Installation
Wiring Diagram
API Endpoints
File Structure
Troubleshooting
Future Enhancements
License


🌟 Overview
This project is a comprehensive IoT Weather Monitoring System that uses an ESP32 microcontroller and DHT11 sensor to measure temperature and humidity in real-time. Sensor data is sent to a PHP backend, stored in a MySQL database, and displayed on a professional animated web dashboard with live data visualization and role-based access.
Key Highlights

🎨 Beautiful UI — Modern glassmorphism design with smooth animations
⚡ Real-time Updates — Live sensor data every 3 seconds
📊 Data Visualization — Interactive charts showing temperature and humidity trends
💾 Database Logging — All sensor readings stored in MySQL via PHP PDO
🔐 Role-Based Access — Admin, Manager, and User roles
📱 Responsive Design — Works on desktop, tablet, and mobile


✨ Features
Dashboard Features

✅ Real-time temperature display (°C)
✅ Real-time humidity display (%)
✅ Heat index calculation
✅ Comfort level indicator
✅ System status monitoring
✅ Live updating line charts
✅ Device information panel
✅ Historical data from database
✅ WiFi signal strength display
✅ System uptime tracking

Database Features

✅ Stores every sensor reading with timestamp
✅ Role-based user authentication
✅ Activity logging per user
✅ Email verification support
✅ Query historical data by date range


🛠 Technologies
Hardware

ESP32 — Microcontroller with WiFi capability
DHT11 — Temperature and humidity sensor

Software

Arduino IDE — ESP32 programming
PHP 8.0+ with PDO — Backend API and database layer
MySQL / MariaDB — Data storage
HTML5 / CSS3 / JavaScript — Frontend dashboard
Chart.js — Data visualization
Apache (XAMPP/WAMP or Hostinger) — Web server

Arduino Libraries

WiFi.h — ESP32 WiFi connectivity
HTTPClient.h — Sending data to PHP API
DHT.h — DHT11 sensor interface
ArduinoJson.h — JSON formatting


🔧 Hardware Requirements
ComponentSpecificationQuantityESP32 Development BoardAny ESP32 variant1DHT11 SensorTemperature & Humidity1Jumper WiresMale-to-Female3–4Breadboard (optional)Standard size1USB CableMicro-USB or USB-C1

💻 Software Requirements

Arduino IDE (1.8.x or 2.x)
ESP32 Board Support Package
USB Drivers (CP2102 or CH340)
XAMPP / WAMP (for localhost) or Hostinger (for deployment)
phpMyAdmin
FileZilla (for FTP deployment)
Chrome, Firefox, or Edge (latest)


🗄️ Database Setup
📐 Database Schema
sql-- ============================================================
-- ESP32 Weather Station — Database Schema
-- Database: esp32_weather_db
-- ============================================================

CREATE DATABASE IF NOT EXISTS esp32_weather_db
    CHARACTER SET utf8mb4
    COLLATE utf8mb4_unicode_ci;

USE esp32_weather_db;

-- ------------------------------------------------------------
-- TABLE: users
-- Stores registered users with roles and verification status
-- ------------------------------------------------------------
CREATE TABLE users (
    id          INT AUTO_INCREMENT PRIMARY KEY,
    name        VARCHAR(100)                        NOT NULL,
    email       VARCHAR(150)                        NOT NULL UNIQUE,
    password    VARCHAR(255)                        NOT NULL,  -- bcrypt hashed
    role        ENUM('admin', 'manager', 'user')    NOT NULL DEFAULT 'user',
    is_verified TINYINT(1)                          NOT NULL DEFAULT 0,
    verify_token VARCHAR(255)                       DEFAULT NULL,
    created_at  TIMESTAMP                           DEFAULT CURRENT_TIMESTAMP,
    updated_at  TIMESTAMP                           DEFAULT CURRENT_TIMESTAMP
                                                    ON UPDATE CURRENT_TIMESTAMP
);

-- ------------------------------------------------------------
-- TABLE: sensor_readings
-- Stores every temperature and humidity reading from ESP32
-- ------------------------------------------------------------
CREATE TABLE sensor_readings (
    id           INT AUTO_INCREMENT PRIMARY KEY,
    temperature  DECIMAL(5,2)   NOT NULL,           -- e.g. 28.50 °C
    humidity     DECIMAL(5,2)   NOT NULL,           -- e.g. 65.30 %
    heat_index   DECIMAL(5,2)   DEFAULT NULL,       -- calculated value
    wifi_rssi    INT            DEFAULT NULL,       -- WiFi signal strength (dBm)
    esp32_ip     VARCHAR(45)    DEFAULT NULL,       -- ESP32 IP address
    recorded_at  TIMESTAMP      DEFAULT CURRENT_TIMESTAMP
);

-- ------------------------------------------------------------
-- TABLE: activity_logs
-- Tracks user actions for audit trail
-- ------------------------------------------------------------
CREATE TABLE activity_logs (
    id          INT AUTO_INCREMENT PRIMARY KEY,
    user_id     INT            NOT NULL,
    action      VARCHAR(255)   NOT NULL,            -- e.g. "Viewed dashboard"
    module      VARCHAR(100)   DEFAULT NULL,        -- e.g. "dashboard", "users"
    ip_address  VARCHAR(45)    DEFAULT NULL,
    created_at  TIMESTAMP      DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- ------------------------------------------------------------
-- TABLE: sensor_alerts (optional but recommended)
-- Logs when readings exceed safe thresholds
-- ------------------------------------------------------------
CREATE TABLE sensor_alerts (
    id           INT AUTO_INCREMENT PRIMARY KEY,
    reading_id   INT            NOT NULL,
    alert_type   ENUM('high_temp', 'low_temp', 'high_humidity', 'low_humidity') NOT NULL,
    value        DECIMAL(5,2)   NOT NULL,
    threshold    DECIMAL(5,2)   NOT NULL,
    is_resolved  TINYINT(1)     DEFAULT 0,
    created_at   TIMESTAMP      DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (reading_id) REFERENCES sensor_readings(id) ON DELETE CASCADE
);

-- ------------------------------------------------------------
-- DEFAULT USERS (passwords are bcrypt of 'password123')
-- ------------------------------------------------------------
INSERT INTO users (name, email, password, role, is_verified) VALUES
('Administrator', 'admin@example.com',
 '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'admin', 1),
('Manager User', 'manager@example.com',
 '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'manager', 1),
('Regular User', 'user@example.com',
 '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'user', 1);
```

### 🗂️ Schema Overview

| Table | Purpose |
|-------|---------|
| `users` | Stores all registered users with roles and email verification |
| `sensor_readings` | Logs every temperature & humidity reading from ESP32 |
| `activity_logs` | Tracks what each user does in the system |
| `sensor_alerts` | Records when sensor values exceed defined thresholds |

---

## 📂 Project Structure
```
app/
│
├── admin/
│   └── dashboard.php              ← Admin-only dashboard
│
├── auth/
│   ├── signout.php
│   └── verify-email.php
│
├── manager/
│   └── dashboard.php              ← Manager dashboard
│
├── user/
│   └── dashboard.php              ← User dashboard
│
├── users/
│   ├── dashboard.php
│   ├── user-create.php
│   ├── user-delete.php
│   ├── user-update.php
│   └── user-view.php
│
├── api/
│   ├── sensor-data.php            ← ESP32 POSTs readings here
│   └── get-readings.php           ← Dashboard fetches data here
│
├── assets/
│   └── css/
│       └── style.css
│
├── config/
│   ├── config.php                 ← DB credentials & BASE_URL
│   └── functions.php
│
├── db/
│   └── schema.sql                 ← Full database schema
│
├── includes/
│   └── activity-logger.php
│
├── tests/
│   ├── test-access.php
│   ├── test-login.php
│   └── test-mail.php
│
├── weather-dashboard-live.html    ← Main live dashboard
├── weather-dashboard.html         ← Demo/simulated dashboard
└── index.php                      ← Login page
```

---

## 🚀 Localhost Setup (XAMPP / WAMP)

**1️⃣ Copy Project**

Place project folder inside:
```
C:/xampp/htdocs/app
```

**2️⃣ Create Database**

Open phpMyAdmin at `http://localhost/phpmyadmin`, create a database named `esp32_weather_db`, then import:
```
app/db/schema.sql
3️⃣ Configure Database Connection
Edit app/config/config.php:
php<?php
$host   = 'localhost';
$dbname = 'esp32_weather_db';
$username = 'root';
$password = '';

try {
    $pdo = new PDO(
        "mysql:host=$host;dbname=$dbname;charset=utf8mb4",
        $username,
        $password,
        [PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION]
    );
} catch (PDOException $e) {
    die('Database connection failed: ' . $e->getMessage());
}
?>
4️⃣ Set Base URL
phpdefine('BASE_URL', 'http://localhost/app');
```

**5️⃣ ESP32 API Endpoint**

The ESP32 will POST data to:
```
http://YOUR_PC_IP/app/api/sensor-data.php
Example ESP32 Arduino code snippet:
cpp#include <HTTPClient.h>

const char* serverURL = "http://192.168.1.100/app/api/sensor-data.php";

void sendData(float temp, float hum, float heatIdx) {
    HTTPClient http;
    http.begin(serverURL);
    http.addHeader("Content-Type", "application/json");

    String payload = "{\"temperature\":" + String(temp) +
                     ",\"humidity\":" + String(hum) +
                     ",\"heat_index\":" + String(heatIdx) +
                     ",\"rssi\":" + String(WiFi.RSSI()) +
                     ",\"ip\":\"" + WiFi.localIP().toString() + "\"}";

    int responseCode = http.POST(payload);
    http.end();
}
sensor-data.php then receives and stores the reading:
php<?php
require '../config/config.php';

$data = json_decode(file_get_contents('php://input'), true);

$stmt = $pdo->prepare("
    INSERT INTO sensor_readings
    (temperature, humidity, heat_index, wifi_rssi, esp32_ip)
    VALUES (?, ?, ?, ?, ?)
");

$stmt->execute([
    $data['temperature'],
    $data['humidity'],
    $data['heat_index'],
    $data['rssi'],
    $data['ip']
]);

echo json_encode(['status' => 'success']);
?>
```

**6️⃣ Default Accounts**

| Role | Email | Password |
|------|-------|----------|
| Admin | admin@example.com | password123 |
| Manager | manager@example.com | password123 |
| User | user@example.com | password123 |

---

## 🔌 Wiring Diagram
```
DHT11 Pin  →  ESP32 Pin
---------     ---------
VCC (+)    →  3.3V
GND (-)    →  GND
DATA (S)   →  GPIO 4

     ESP32                    DHT11
  ┌─────────┐              ┌──────┐
  │   3.3V  ├──────────────┤ VCC  │
  │   GND   ├──────────────┤ GND  │
  │  GPIO4  ├──────────────┤ DATA │
  └─────────┘              └──────┘

Note: Add a 10kΩ pull-up resistor between VCC and DATA if your DHT11 has no built-in one.


🔌 API Endpoints
POST /api/sensor-data.php
ESP32 sends sensor readings to this endpoint.
Request Body:
json{
  "temperature": 28.5,
  "humidity": 65.3,
  "heat_index": 30.2,
  "rssi": -45,
  "ip": "192.168.1.101"
}
GET /api/get-readings.php
Dashboard fetches the latest or historical readings.
Response:
json{
  "latest": {
    "temperature": 28.5,
    "humidity": 65.3,
    "heat_index": 30.2,
    "recorded_at": "2026-02-27 14:35:00"
  },
  "history": [...]
}

🐛 Troubleshooting
ESP32 won't upload — Hold BOOT button while uploading, check USB cable is data-capable, install CP2102/CH340 drivers, select correct COM port and board.
Sensor reads "nan" — Check wiring, ensure 3.3V power, add 10kΩ pull-up resistor, verify correct GPIO pin in code.
ESP32 won't connect to WiFi — Use 2.4GHz network only, double-check SSID and password in the sketch.
Dashboard shows disconnected — Confirm ESP32 and PC are on the same network, verify IP address, try accessing http://[ESP32_IP]/data directly in browser.
Database not receiving data — Confirm Apache and MySQL are running in XAMPP, check config.php credentials, verify sensor-data.php endpoint URL in ESP32 sketch.

🚀 Future Enhancements

 Firebase / cloud database integration
 Email/SMS alerts for extreme readings
 CSV/Excel data export
 WebSocket for true real-time updates (replacing polling)
 PWA support for offline access
 Support for multiple ESP32 devices
 DHT22 / BMP280 / MQ-135 sensor upgrades
 OLED display for standalone operation


📄 License
This project is licensed under the MIT License — see the LICENSE file for details.

🙏 Acknowledgments

Chart.js — Data visualization
Adafruit DHT Library — Sensor support
ArduinoJson — JSON handling
Espressif for the ESP32 platform
Arduino community for continued support


<div align="center">
Made with ❤️ for IoT enthusiasts
⭐ Star this repository if you find it helpful!
</div>
