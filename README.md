# ⚡ ESP32 Weather Station Dashboard

<div align="center">

![Project Status](https://img.shields.io/badge/Status-Active-success)
![License](https://img.shields.io/badge/License-MIT-blue)
![Platform](https://img.shields.io/badge/Platform-ESP32-orange)
![Sensor](https://img.shields.io/badge/Sensor-DHT11-green)
![Database](https://img.shields.io/badge/Database-MySQL-blue)

**A modern, real-time IoT weather monitoring system with a stunning web dashboard and persistent database storage**

[Features](#-features) • [Installation](#-installation) • [Database Setup](#️-database-setup) • [Usage](#-usage) • [Troubleshooting](#-troubleshooting)

</div>

---

## 📋 Table of Contents

- [Overview](#-overview)
- [Features](#-features)
- [Technologies](#-technologies)
- [Hardware Requirements](#-hardware-requirements)
- [Software Requirements](#-software-requirements)
- [Database Setup](#️-database-setup)
- [Installation](#-installation)
- [Wiring Diagram](#-wiring-diagram)
- [API Endpoints](#-api-endpoints)
- [File Structure](#-file-structure)
- [Troubleshooting](#-troubleshooting)
- [Future Enhancements](#-future-enhancements)
- [License](#-license)
- [Acknowledgments](#-acknowledgments)

---

## 🌟 Overview

This project is a comprehensive **IoT Weather Monitoring System** that uses an ESP32 microcontroller and DHT11 sensor to measure temperature and humidity in real-time. Sensor data is sent to a PHP backend, stored in a MySQL database, and displayed on a professional animated web dashboard with live data visualization and role-based access.

### Key Highlights

- 🎨 **Beautiful UI** — Modern glassmorphism design with smooth animations
- ⚡ **Real-time Updates** — Live sensor data every 3 seconds
- 📊 **Data Visualization** — Interactive charts showing temperature and humidity trends
- 💾 **Database Logging** — All sensor readings stored in MySQL via PHP PDO
- 🔐 **Role-Based Access** — Admin, Manager, and User roles
- 📱 **Responsive Design** — Works on desktop, tablet, and mobile

---

## ✨ Features

### Dashboard Features
- ✅ Real-time temperature display (°C)
- ✅ Real-time humidity display (%)
- ✅ Heat index calculation
- ✅ Comfort level indicator
- ✅ System status monitoring
- ✅ Live updating line charts
- ✅ Device information panel
- ✅ Historical data from database
- ✅ WiFi signal strength display
- ✅ System uptime tracking

### Database Features
- ✅ Stores every sensor reading with timestamp
- ✅ Role-based user authentication
- ✅ Activity logging per user
- ✅ Email verification support
- ✅ Query historical data by date range

### Visual Features
- ⚡ Lightning text effects on hover
- 🌊 Animated background particles
- 💎 Glassmorphism card design
- 🎭 Smooth transitions and animations
- 🎨 Color-coded sensor indicators
- ✨ Pulsing logo animation

---

## 🛠 Technologies

### Hardware
- **ESP32** — Microcontroller with WiFi capability
- **DHT11** — Temperature and humidity sensor

### Software
- **Arduino IDE** — ESP32 programming
- **PHP 8.0+ with PDO** — Backend API and database layer
- **MySQL / MariaDB** — Data storage
- **HTML5 / CSS3 / JavaScript** — Frontend dashboard
- **Chart.js** — Data visualization
- **Apache (XAMPP/WAMP or Hostinger)** — Web server

### Arduino Libraries
- `WiFi.h` — ESP32 WiFi connectivity
- `HTTPClient.h` — Sending data to PHP API
- `WebServer.h` — HTTP server on ESP32
- `DHT.h` — DHT11 sensor interface
- `ArduinoJson.h` — JSON formatting

---

## 🔧 Hardware Requirements

| Component | Specification | Quantity |
|-----------|--------------|----------|
| ESP32 Development Board | Any ESP32 variant | 1 |
| DHT11 Sensor | Temperature & Humidity | 1 |
| Jumper Wires | Male-to-Female | 3–4 |
| Breadboard (optional) | Standard size | 1 |
| USB Cable | Micro-USB or USB-C | 1 |
| Power Supply | 5V (via USB) | 1 |

### Optional Components
- 10kΩ resistor (if DHT11 doesn't have built-in pull-up)
- Enclosure/case for the project

---

## 💻 Software Requirements

- Arduino IDE (1.8.x or 2.x)
- ESP32 Board Support Package
- USB Drivers (CP2102 or CH340)
- XAMPP / WAMP (for localhost) or Hostinger (for deployment)
- phpMyAdmin
- FileZilla (for FTP deployment)
- Chrome, Firefox, or Edge (latest)

### Required Arduino Libraries
```
- DHT sensor library (by Adafruit)
- Adafruit Unified Sensor
- ArduinoJson (version 6.x)
```

---

## 🗄️ Database Setup

### 📐 Database Schema

```sql
-- ============================================================
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
    id           INT AUTO_INCREMENT PRIMARY KEY,
    name         VARCHAR(100)                        NOT NULL,
    email        VARCHAR(150)                        NOT NULL UNIQUE,
    password     VARCHAR(255)                        NOT NULL,  -- bcrypt hashed
    role         ENUM('admin', 'manager', 'user')    NOT NULL DEFAULT 'user',
    is_verified  TINYINT(1)                          NOT NULL DEFAULT 0,
    verify_token VARCHAR(255)                        DEFAULT NULL,
    created_at   TIMESTAMP                           DEFAULT CURRENT_TIMESTAMP,
    updated_at   TIMESTAMP                           DEFAULT CURRENT_TIMESTAMP
                                                     ON UPDATE CURRENT_TIMESTAMP
);

-- ------------------------------------------------------------
-- TABLE: sensor_readings
-- Stores every temperature and humidity reading from ESP32
-- ------------------------------------------------------------
CREATE TABLE sensor_readings (
    id          INT AUTO_INCREMENT PRIMARY KEY,
    temperature DECIMAL(5,2)  NOT NULL,          -- e.g. 28.50 °C
    humidity    DECIMAL(5,2)  NOT NULL,          -- e.g. 65.30 %
    heat_index  DECIMAL(5,2)  DEFAULT NULL,      -- calculated value
    wifi_rssi   INT           DEFAULT NULL,      -- WiFi signal strength (dBm)
    esp32_ip    VARCHAR(45)   DEFAULT NULL,      -- ESP32 IP address
    recorded_at TIMESTAMP     DEFAULT CURRENT_TIMESTAMP
);

-- ------------------------------------------------------------
-- TABLE: activity_logs
-- Tracks user actions for audit trail
-- ------------------------------------------------------------
CREATE TABLE activity_logs (
    id         INT AUTO_INCREMENT PRIMARY KEY,
    user_id    INT           NOT NULL,
    action     VARCHAR(255)  NOT NULL,           -- e.g. "Viewed dashboard"
    module     VARCHAR(100)  DEFAULT NULL,       -- e.g. "dashboard", "users"
    ip_address VARCHAR(45)   DEFAULT NULL,
    created_at TIMESTAMP     DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- ------------------------------------------------------------
-- TABLE: sensor_alerts (optional but recommended)
-- Logs when readings exceed safe thresholds
-- ------------------------------------------------------------
CREATE TABLE sensor_alerts (
    id          INT AUTO_INCREMENT PRIMARY KEY,
    reading_id  INT           NOT NULL,
    alert_type  ENUM('high_temp', 'low_temp', 'high_humidity', 'low_humidity') NOT NULL,
    value       DECIMAL(5,2)  NOT NULL,
    threshold   DECIMAL(5,2)  NOT NULL,
    is_resolved TINYINT(1)    DEFAULT 0,
    created_at  TIMESTAMP     DEFAULT CURRENT_TIMESTAMP,
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

## 📂 File Structure

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
│   └── schema.sql                 ← Full database schema (this file)
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

### 1️⃣ Copy Project

Place project folder inside:
```
C:/xampp/htdocs/app
```

### 2️⃣ Create Database

Open phpMyAdmin at `http://localhost/phpmyadmin`, create a database named `esp32_weather_db`, then import:
```
app/db/schema.sql
```

### 3️⃣ Configure Database Connection

Edit `app/config/config.php`:

```php
<?php
$host     = 'localhost';
$dbname   = 'esp32_weather_db';
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
```

### 4️⃣ Set Base URL

```php
define('BASE_URL', 'http://localhost/app');
```

### 5️⃣ Configure ESP32 to POST Data

The ESP32 sends data to:
```
http://YOUR_PC_LOCAL_IP/app/api/sensor-data.php
```

**Arduino sketch snippet:**

```cpp
#include <HTTPClient.h>

const char* serverURL = "http://192.168.1.100/app/api/sensor-data.php";

void sendData(float temp, float hum, float heatIdx) {
    HTTPClient http;
    http.begin(serverURL);
    http.addHeader("Content-Type", "application/json");

    String payload = "{\"temperature\":" + String(temp) +
                     ",\"humidity\":"    + String(hum) +
                     ",\"heat_index\":"  + String(heatIdx) +
                     ",\"rssi\":"        + String(WiFi.RSSI()) +
                     ",\"ip\":\""        + WiFi.localIP().toString() + "\"}";

    int responseCode = http.POST(payload);
    http.end();
}
```

**`sensor-data.php` — receives and stores the reading:**

```php
<?php
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

### 6️⃣ Default Accounts

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
```

> **Note:** Add a 10kΩ pull-up resistor between VCC and DATA if your DHT11 has no built-in one.

---

## 🔌 API Endpoints

### `POST /api/sensor-data.php`
ESP32 sends sensor readings to this endpoint.

**Request Body:**
```json
{
  "temperature": 28.5,
  "humidity": 65.3,
  "heat_index": 30.2,
  "rssi": -45,
  "ip": "192.168.1.101"
}
```

**Response:**
```json
{ "status": "success" }
```

---

### `GET /api/get-readings.php`
Dashboard fetches the latest or historical readings.

**Response:**
```json
{
  "latest": {
    "temperature": 28.5,
    "humidity": 65.3,
    "heat_index": 30.2,
    "recorded_at": "2026-02-27 14:35:00"
  },
  "history": [ "..." ]
}
```

---

### `GET /data` *(ESP32 built-in endpoint)*
Returns current sensor data directly from the ESP32.

**Response:**
```json
{
  "temperature": 28.5,
  "humidity": 65.3,
  "heatIndex": 30.2,
  "status": "online",
  "uptime": 3600,
  "rssi": -45,
  "ip": "192.168.1.100"
}
```

---

## 🐛 Troubleshooting

### ESP32 Issues

| Problem | Solutions |
|---------|-----------|
| ❌ ESP32 won't upload | Hold **BOOT** button while uploading, check USB cable is data-capable, install CP2102/CH340 drivers, select correct COM port and board |
| ❌ Sensor reads "nan" | Check wiring, ensure 3.3V power, add 10kΩ pull-up resistor, verify GPIO pin in code |
| ❌ Won't connect to WiFi | Use 2.4GHz network only, double-check SSID and password in sketch |

### Dashboard Issues

| Problem | Solutions |
|---------|-----------|
| ❌ Dashboard shows "Disconnected" | Confirm ESP32 and PC are on same network, verify IP address, try `http://[ESP32_IP]/data` directly in browser |
| ❌ CORS errors in browser | Ensure CORS headers are sent from PHP API |
| ❌ Charts not updating | Check connection status, refresh page, clear browser cache |

### Database Issues

| Problem | Solutions |
|---------|-----------|
| ❌ Data not saving | Confirm Apache and MySQL are running in XAMPP, check `config.php` credentials, verify endpoint URL in ESP32 sketch |
| ❌ Connection failed | Ensure `esp32_weather_db` database exists and schema has been imported |

---

## 🚀 Future Enhancements

- [ ] Firebase / cloud database integration
- [ ] Email/SMS alerts for extreme readings
- [ ] CSV/Excel data export
- [ ] WebSocket for true real-time updates (replacing polling)
- [ ] PWA support for offline access
- [ ] Support for multiple ESP32 devices
- [ ] DHT22 / BMP280 / MQ-135 sensor upgrades
- [ ] OLED display for standalone operation
- [ ] REST API documentation (Swagger)
- [ ] Advanced analytics — daily/weekly/monthly reports

---

## 🤝 Contributing

1. **Fork** the repository
2. **Create** a feature branch (`git checkout -b feature/AmazingFeature`)
3. **Commit** your changes (`git commit -m 'Add some AmazingFeature'`)
4. **Push** to the branch (`git push origin feature/AmazingFeature`)
5. **Open** a Pull Request

---

## 📄 License

This project is licensed under the **MIT License**.

```
MIT License

Copyright (c) 2026 [Your Name]

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
```

---

## 🙏 Acknowledgments

- [Chart.js](https://www.chartjs.org/) — Data visualization
- [Adafruit DHT Library](https://github.com/adafruit/DHT-sensor-library) — Sensor support
- [ArduinoJson](https://arduinojson.org/) — JSON handling
- Espressif for the ESP32 platform
- Arduino community for continued support

---

## 📞 Contact & Support

- **Author:** [Your Name]
- **Email:** [your.email@example.com]
- **GitHub:** [@yourusername](https://github.com/yourusername)
- **Project Link:** [https://github.com/yourusername/esp32-weather-station](https://github.com/yourusername/esp32-weather-station)

---

## 🎓 Educational Value

This project demonstrates:

1. **IoT Fundamentals** — Sensor interfacing and WiFi connectivity
2. **Web Development** — HTML, CSS, JavaScript, responsive design
3. **Embedded Systems** — ESP32 programming and real-time systems
4. **Database Design** — MySQL schema design, PDO, role-based access
5. **API Design** — RESTful architecture and JSON data exchange
6. **Data Visualization** — Charts and real-time updates

---

<div align="center">

### ⭐ Star this repository if you find it helpful!

**Made with ❤️ for IoT enthusiasts**

[⬆ Back to Top](#-esp32-weather-station-dashboard)

</div>
