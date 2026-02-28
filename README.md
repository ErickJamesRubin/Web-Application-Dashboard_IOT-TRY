# ⚡ ESP32 Weather Station Dashboard

<div align="center">

![Project Status](https://img.shields.io/badge/Status-Active-success)
![License](https://img.shields.io/badge/License-MIT-blue)
![Platform](https://img.shields.io/badge/Platform-ESP32-orange)
![Sensor](https://img.shields.io/badge/Sensor-DHT11-green)
![Database](https://img.shields.io/badge/Database-Firebase-orange)

**A modern, real-time IoT weather monitoring system with a stunning web dashboard and Firebase cloud storage**

[Features](#-features) • [Installation](#-installation) • [Firebase Setup](#-firebase-setup) • [Usage](#-usage) • [Troubleshooting](#-troubleshooting)

</div>

---

## 📋 Table of Contents

- [Overview](#-overview)
- [Features](#-features)
- [Technologies](#-technologies)
- [Hardware Requirements](#-hardware-requirements)
- [Software Requirements](#-software-requirements)
- [Firebase Setup](#-firebase-setup)
- [Installation](#-installation)
- [Wiring Diagram](#-wiring-diagram)
- [Firebase Data Structure](#-firebase-data-structure)
- [API Endpoints](#-api-endpoints)
- [File Structure](#-file-structure)
- [Troubleshooting](#-troubleshooting)
- [Future Enhancements](#-future-enhancements)
- [License](#-license)
- [Acknowledgments](#-acknowledgments)

---

## 🌟 Overview

This project is a comprehensive **IoT Weather Monitoring System** that uses an ESP32 microcontroller and DHT11 sensor to measure temperature and humidity in real-time. Sensor data is sent directly to **Firebase Realtime Database**, and displayed on a professional animated web dashboard with live data visualization and role-based access.

### Key Highlights

- 🎨 **Beautiful UI** — Modern glassmorphism design with smooth animations
- ⚡ **Real-time Updates** — Live sensor data pushed via Firebase every 3 seconds
- 📊 **Data Visualization** — Interactive charts showing temperature and humidity trends
- ☁️ **Cloud Storage** — All sensor readings stored in Firebase Realtime Database
- 🔐 **Role-Based Access** — Admin, Manager, and User roles via Firebase Auth
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
- ✅ Historical data from Firebase
- ✅ WiFi signal strength display
- ✅ System uptime tracking

### Firebase Features
- ✅ Stores every sensor reading with timestamp
- ✅ Role-based user authentication (Firebase Auth)
- ✅ Activity logging per user
- ✅ Email verification via Firebase Auth
- ✅ Query historical data by date range
- ✅ Real-time listeners — dashboard updates instantly on new data

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
- **Firebase Realtime Database** — Cloud data storage
- **Firebase Authentication** — User login and role management
- **HTML5 / CSS3 / JavaScript** — Frontend dashboard
- **Firebase JS SDK** — Dashboard-to-Firebase connection
- **Chart.js** — Data visualization

### Arduino Libraries
- `WiFi.h` — ESP32 WiFi connectivity
- `HTTPClient.h` — Sending data to Firebase REST API
- `DHT.h` — DHT11 sensor interface
- `ArduinoJson.h` — JSON formatting
- `FirebaseESP32.h` *(optional)* — Firebase ESP32 client library

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
- Google Account (for Firebase Console)
- Chrome, Firefox, or Edge (latest)

### Required Arduino Libraries
```
- DHT sensor library (by Adafruit)
- Adafruit Unified Sensor
- ArduinoJson (version 6.x)
- Firebase ESP32 Client (by Mobizt)   ← install via Library Manager
```

---

## 🔥 Firebase Setup

### Step 1: Create a Firebase Project

1. Go to [https://console.firebase.google.com](https://console.firebase.google.com)
2. Click **"Add project"**
3. Enter project name: `esp32-weather-station`
4. Enable or disable Google Analytics (optional)
5. Click **"Create project"**

---

### Step 2: Enable Realtime Database

1. In the Firebase console, go to **Build → Realtime Database**
2. Click **"Create Database"**
3. Choose your region (e.g., `us-central1`)
4. Start in **Test mode** for development:
   ```json
   {
     "rules": {
       ".read": true,
       ".write": true
     }
   }
   ```
   > ⚠️ **Important:** Switch to secure rules before going to production (see Step 6).

---

### Step 3: Enable Firebase Authentication

1. Go to **Build → Authentication**
2. Click **"Get started"**
3. Under **Sign-in method**, enable **Email/Password**
4. Click **Save**

---

### Step 4: Get Firebase Configuration

1. Go to **Project Settings** (gear icon)
2. Under **"Your apps"**, click **"Add app"** → **Web (`</>`)**
3. Register the app with a name (e.g., `weather-dashboard`)
4. Copy the Firebase config object:

```javascript
// Firebase configuration — paste into your dashboard JS
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
  databaseURL: "https://YOUR_PROJECT_ID-default-rtdb.firebaseio.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT_ID.appspot.com",
  messagingSenderId: "YOUR_SENDER_ID",
  appId: "YOUR_APP_ID"
};
```

---

### Step 5: Get Database URL and Secret (for ESP32)

1. Go to **Project Settings → Service Accounts**
2. Click **"Database secrets"** (or use the database URL from Realtime Database)
3. Copy your **Database URL**: `https://YOUR_PROJECT_ID-default-rtdb.firebaseio.com`

In your Arduino sketch, you will use:
```cpp
#define FIREBASE_HOST "YOUR_PROJECT_ID-default-rtdb.firebaseio.com"
#define FIREBASE_AUTH "YOUR_DATABASE_SECRET"
```

---

### Step 6: Set Secure Firebase Rules (Production)

Once ready for production, update your Realtime Database rules:

```json
{
  "rules": {
    "sensor_readings": {
      ".read": "auth != null",
      ".write": "auth != null"
    },
    "users": {
      "$uid": {
        ".read": "$uid === auth.uid || root.child('users').child(auth.uid).child('role').val() === 'admin'",
        ".write": "$uid === auth.uid || root.child('users').child(auth.uid).child('role').val() === 'admin'"
      }
    },
    "activity_logs": {
      ".read": "root.child('users').child(auth.uid).child('role').val() === 'admin'",
      ".write": "auth != null"
    }
  }
}
```

---

### Step 7: Create Default Users in Firebase Auth

1. Go to **Build → Authentication → Users**
2. Click **"Add user"** and create the following:

| Role | Email | Password |
|------|-------|----------|
| Admin | admin@example.com | password123 |
| Manager | manager@example.com | password123 |
| User | user@example.com | password123 |

3. After creating users, store their roles in Realtime Database under `/users/{uid}/role`.

---

## 🔥 Firebase Data Structure

This is how data is organized in your Firebase Realtime Database:

```
esp32-weather-station (root)
│
├── sensor_readings/
│   ├── -NxABC123def/                    ← Auto-generated push key
│   │   ├── temperature: 28.5
│   │   ├── humidity: 65.3
│   │   ├── heat_index: 30.2
│   │   ├── wifi_rssi: -45
│   │   ├── esp32_ip: "192.168.1.101"
│   │   └── recorded_at: 1709041200000   ← Unix timestamp (ms)
│   │
│   └── -NxDEF456ghi/
│       ├── temperature: 29.1
│       ├── humidity: 63.8
│       └── ...
│
├── users/
│   ├── {firebase_uid_1}/
│   │   ├── name: "Administrator"
│   │   ├── email: "admin@example.com"
│   │   ├── role: "admin"
│   │   └── created_at: 1709041200000
│   │
│   ├── {firebase_uid_2}/
│   │   ├── name: "Manager User"
│   │   ├── role: "manager"
│   │   └── ...
│   │
│   └── {firebase_uid_3}/
│       ├── name: "Regular User"
│       ├── role: "user"
│       └── ...
│
├── activity_logs/
│   ├── -NxLOG001/
│   │   ├── user_id: "{firebase_uid}"
│   │   ├── action: "Viewed dashboard"
│   │   ├── module: "dashboard"
│   │   └── timestamp: 1709041200000
│   └── ...
│
└── sensor_alerts/
    ├── -NxALERT001/
    │   ├── reading_key: "-NxABC123def"
    │   ├── alert_type: "high_temp"       ← high_temp | low_temp | high_humidity | low_humidity
    │   ├── value: 39.5
    │   ├── threshold: 35.0
    │   ├── is_resolved: false
    │   └── created_at: 1709041200000
    └── ...
```

### 📋 Node Descriptions

| Node | Purpose |
|------|---------|
| `sensor_readings/` | Stores every temperature & humidity reading pushed from ESP32 |
| `users/` | Stores user profiles and roles linked to Firebase Auth UIDs |
| `activity_logs/` | Tracks user actions for audit trail |
| `sensor_alerts/` | Records when readings exceed defined thresholds |

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
├── assets/
│   └── css/
│       └── style.css
│
├── config/
│   └── firebase-config.js         ← Firebase credentials & init
│
├── includes/
│   └── activity-logger.js         ← Logs user actions to Firebase
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

## 🚀 ESP32 Arduino Setup

### 1️⃣ Install Firebase ESP32 Library

In Arduino IDE go to **Sketch → Include Library → Manage Libraries**, search for:
```
Firebase ESP32 Client by Mobizt
```
Install it.

---

### 2️⃣ Configure WiFi and Firebase in Sketch

```cpp
#include <WiFi.h>
#include <FirebaseESP32.h>
#include <DHT.h>

// WiFi credentials
#define WIFI_SSID     "YOUR_WIFI_SSID"
#define WIFI_PASSWORD "YOUR_WIFI_PASSWORD"

// Firebase credentials
#define FIREBASE_HOST "YOUR_PROJECT_ID-default-rtdb.firebaseio.com"
#define FIREBASE_AUTH "YOUR_DATABASE_SECRET"

// DHT sensor
#define DHTPIN  4
#define DHTTYPE DHT11

DHT dht(DHTPIN, DHTTYPE);
FirebaseData firebaseData;

void setup() {
    Serial.begin(115200);
    dht.begin();

    WiFi.begin(WIFI_SSID, WIFI_PASSWORD);
    while (WiFi.status() != WL_CONNECTED) {
        delay(500);
        Serial.print(".");
    }
    Serial.println("\nWiFi connected: " + WiFi.localIP().toString());

    Firebase.begin(FIREBASE_HOST, FIREBASE_AUTH);
    Firebase.reconnectWiFi(true);
}

void loop() {
    float temp = dht.readTemperature();
    float hum  = dht.readHumidity();
    float hi   = dht.computeHeatIndex(temp, hum, false);

    if (!isnan(temp) && !isnan(hum)) {
        FirebaseJson json;
        json.set("temperature", temp);
        json.set("humidity",    hum);
        json.set("heat_index",  hi);
        json.set("wifi_rssi",   WiFi.RSSI());
        json.set("esp32_ip",    WiFi.localIP().toString());
        json.set("recorded_at", millis());

        if (Firebase.pushJSON(firebaseData, "/sensor_readings", json)) {
            Serial.println("✅ Data sent to Firebase");
        } else {
            Serial.println("❌ Firebase error: " + firebaseData.errorReason());
        }
    }

    delay(3000); // Send every 3 seconds
}
```

---

### 3️⃣ Connect Dashboard to Firebase

In your `config/firebase-config.js`:

```javascript
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.x.x/firebase-app.js";
import { getDatabase, ref, onValue, query, limitToLast }
    from "https://www.gstatic.com/firebasejs/10.x.x/firebase-database.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.x.x/firebase-auth.js";

const firebaseConfig = {
    apiKey:            "YOUR_API_KEY",
    authDomain:        "YOUR_PROJECT_ID.firebaseapp.com",
    databaseURL:       "https://YOUR_PROJECT_ID-default-rtdb.firebaseio.com",
    projectId:         "YOUR_PROJECT_ID",
    storageBucket:     "YOUR_PROJECT_ID.appspot.com",
    messagingSenderId: "YOUR_SENDER_ID",
    appId:             "YOUR_APP_ID"
};

const app  = initializeApp(firebaseConfig);
const db   = getDatabase(app);
const auth = getAuth(app);

// Listen for real-time sensor updates (last 20 readings)
const readingsRef = query(ref(db, 'sensor_readings'), limitToLast(20));

onValue(readingsRef, (snapshot) => {
    const data = snapshot.val();
    // Update dashboard UI with latest data
    console.log("Latest readings:", data);
});
```

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

Firebase Realtime Database exposes a REST API automatically. You can interact with your data directly:

### Read latest sensor readings
```
GET https://YOUR_PROJECT_ID-default-rtdb.firebaseio.com/sensor_readings.json?orderBy="recorded_at"&limitToLast=20
```

### Write a new reading (ESP32 uses this via library)
```
POST https://YOUR_PROJECT_ID-default-rtdb.firebaseio.com/sensor_readings.json
```

**Body:**
```json
{
  "temperature": 28.5,
  "humidity": 65.3,
  "heat_index": 30.2,
  "wifi_rssi": -45,
  "esp32_ip": "192.168.1.101",
  "recorded_at": 1709041200000
}
```

### Read user role
```
GET https://YOUR_PROJECT_ID-default-rtdb.firebaseio.com/users/{uid}/role.json
```

---

## 🐛 Troubleshooting

### ESP32 Issues

| Problem | Solutions |
|---------|-----------|
| ❌ ESP32 won't upload | Hold **BOOT** button while uploading, check USB cable is data-capable, install CP2102/CH340 drivers, select correct COM port and board |
| ❌ Sensor reads "nan" | Check wiring, ensure 3.3V power, add 10kΩ pull-up resistor, verify GPIO pin in code |
| ❌ Won't connect to WiFi | Use 2.4GHz network only, double-check SSID and password in sketch |
| ❌ Firebase push fails | Check `FIREBASE_HOST` and `FIREBASE_AUTH` values, verify database rules allow write |

### Dashboard Issues

| Problem | Solutions |
|---------|-----------|
| ❌ Dashboard shows no data | Check Firebase config values in `firebase-config.js`, verify database rules allow read |
| ❌ Auth errors | Ensure Email/Password sign-in is enabled in Firebase Console |
| ❌ Charts not updating | Check browser console for JS errors, verify `onValue` listener is attached |

### Firebase Issues

| Problem | Solutions |
|---------|-----------|
| ❌ Permission denied | Check database rules — set `.read` and `.write` to `true` in test mode |
| ❌ Data not appearing | Open Firebase Console → Realtime Database and watch for incoming data in real time |
| ❌ Auth not working | Ensure Firebase Auth is enabled and Email/Password provider is turned on |

---

## 🚀 Future Enhancements

- [ ] Firebase Cloud Messaging (push notifications for alerts)
- [ ] Firebase Cloud Functions for automated threshold alerts
- [ ] CSV/Excel data export from Firebase
- [ ] PWA support for offline access
- [ ] Support for multiple ESP32 devices
- [ ] DHT22 / BMP280 / MQ-135 sensor upgrades
- [ ] OLED display for standalone operation
- [ ] Advanced analytics — daily/weekly/monthly reports
- [ ] Firestore migration for complex queries

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

- [Firebase](https://firebase.google.com/) — Realtime Database and Authentication
- [Chart.js](https://www.chartjs.org/) — Data visualization
- [Adafruit DHT Library](https://github.com/adafruit/DHT-sensor-library) — Sensor support
- [ArduinoJson](https://arduinojson.org/) — JSON handling
- [Firebase ESP32 Client by Mobizt](https://github.com/mobizt/Firebase-ESP32) — ESP32 Firebase library
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
4. **Cloud Database Design** — Firebase Realtime Database structure and rules
5. **API Design** — Firebase REST API and real-time listeners
6. **Data Visualization** — Charts and real-time updates

---

<div align="center">

### ⭐ Star this repository if you find it helpful!

**Made with ❤️ for IoT enthusiasts**

[⬆ Back to Top](#-esp32-weather-station-dashboard)

</div>
