# 🔥 Firebase Integration Setup Guide

Complete guide to integrate Firebase Realtime Database with your ESP32 Weather Station.

---

## 📋 Table of Contents

1. [Create Firebase Project](#1-create-firebase-project)
2. [Get Firebase Credentials](#2-get-firebase-credentials)
3. [Configure ESP32](#3-configure-esp32)
4. [Configure Dashboard](#4-configure-dashboard)
5. [Install Firebase Library](#5-install-firebase-library)
6. [Upload and Test](#6-upload-and-test)
7. [Firebase Database Structure](#7-firebase-database-structure)
8. [Troubleshooting](#8-troubleshooting)

---

## 1. Create Firebase Project

### Step 1.1: Go to Firebase Console
1. Visit: https://console.firebase.google.com/
2. Click **"Add project"** or **"Create a project"**

### Step 1.2: Create New Project
1. **Enter project name**: e.g., `esp32-weather-station`
2. Click **Continue**
3. **Google Analytics**: You can disable this for now (optional)
4. Click **Create project**
5. Wait for project to be created
6. Click **Continue**

---

## 2. Get Firebase Credentials

### Step 2.1: Get Web API Key
1. In Firebase Console, click **⚙️ Settings** (gear icon) → **Project settings**
2. Scroll down to **Your apps** section
3. Click on **Web app** icon `</>`
4. **Register app name**: e.g., `Weather Dashboard`
5. Check **"Also set up Firebase Hosting"** (optional)
6. Click **Register app**
7. You'll see your Firebase configuration - **SAVE THIS!**

Example:
```javascript
const firebaseConfig = {
  apiKey: "AIzaSyXXXXXXXXXXXXXXXXXXXXXXXXXX",
  authDomain: "esp32-weather-station.firebaseapp.com",
  databaseURL: "https://esp32-weather-station.firebaseio.com",
  projectId: "esp32-weather-station",
  storageBucket: "esp32-weather-station.appspot.com",
  messagingSenderId: "123456789012",
  appId: "1:123456789012:web:abcdef123456"
};
```

### Step 2.2: Enable Realtime Database
1. In left sidebar, click **Build** → **Realtime Database**
2. Click **Create Database**
3. Choose location (closest to you): e.g., `us-central1`
4. **Security rules**: Choose **"Start in test mode"** for now
5. Click **Enable**

**Important:** Test mode rules expire in 30 days. See security rules section below.

### Step 2.3: Get Database URL
1. In Realtime Database page, you'll see the database URL at the top:
   ```
   https://esp32-weather-station.firebaseio.com
   ```
2. **SAVE THIS URL!**

---

## 3. Configure ESP32

### Step 3.1: Install Firebase Library
1. Open Arduino IDE
2. Go to **Sketch → Include Library → Manage Libraries**
3. Search for **"Firebase ESP Client"**
4. Install **"Firebase Arduino Client Library for ESP8266 and ESP32"** by **Mobizt**
5. Wait for installation to complete

### Step 3.2: Update ESP32 Code
Open `esp32_weather_firebase.ino` and update these lines:

```cpp
// Line 12-13: WiFi credentials
const char* ssid = "YOUR_WIFI_SSID";        // Your WiFi name
const char* password = "YOUR_WIFI_PASSWORD"; // Your WiFi password

// Line 15-16: Firebase credentials
#define API_KEY "AIzaSyXXXXXXXXXXXXXXXXXXXXXXXXXX"  // From firebaseConfig
#define DATABASE_URL "https://your-project-id.firebaseio.com"  // Your database URL
```

**Example:**
```cpp
const char* ssid = "MyHomeWiFi";
const char* password = "MySecretPassword123";

#define API_KEY "AIzaSyB1hE6xJ_9kL3mN5o7Q8R_stUvWxYz"
#define DATABASE_URL "https://esp32-weather-station.firebaseio.com"
```

### Step 3.3: Upload to ESP32
1. Connect ESP32 via USB
2. Select board: **Tools → Board → ESP32 Dev Module**
3. Select port: **Tools → Port → COMx** or **/dev/ttyUSBx**
4. Click **Upload** (→)
5. Wait for "Done uploading"

### Step 3.4: Verify Connection
1. Open **Serial Monitor** (115200 baud)
2. You should see:
   ```
   WiFi connected!
   IP Address: 192.168.1.XXX
   Firebase signup OK
   HTTP server started
   Temperature: XX.X°C | Humidity: XX.X% | Heat Index: XX.X°C
   Firebase updated successfully
   ```

---

## 4. Configure Dashboard

### Step 4.1: Update Dashboard Configuration
Open `weather-dashboard-firebase.html` and find this section (around line 330):

```javascript
// TODO: Replace with your Firebase config
const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "your-project-id.firebaseapp.com",
    databaseURL: "https://your-project-id.firebaseio.com",
    projectId: "your-project-id",
    storageBucket: "your-project-id.appspot.com",
    messagingSenderId: "YOUR_SENDER_ID",
    appId: "YOUR_APP_ID"
};
```

### Step 4.2: Replace with Your Config
Copy your Firebase config from Step 2.1 and paste it:

```javascript
const firebaseConfig = {
    apiKey: "AIzaSyB1hE6xJ_9kL3mN5o7Q8R_stUvWxYz",
    authDomain: "esp32-weather-station.firebaseapp.com",
    databaseURL: "https://esp32-weather-station.firebaseio.com",
    projectId: "esp32-weather-station",
    storageBucket: "esp32-weather-station.appspot.com",
    messagingSenderId: "123456789012",
    appId: "1:123456789012:web:abcdef123456"
};
```

### Step 4.3: Open Dashboard
1. Save the file
2. Open `weather-dashboard-firebase.html` in your web browser
3. You should see **"🔥 Firebase: Connected"** in green
4. Data should start appearing automatically

---

## 5. Install Firebase Library

### For ESP32 (Arduino IDE)

**Method 1: Library Manager**
1. **Sketch → Include Library → Manage Libraries**
2. Search: **"Firebase ESP Client"**
3. Install: **"Firebase Arduino Client Library for ESP8266 and ESP32"** by Mobizt
4. Version: Latest (6.x or higher)

**Method 2: Manual Installation**
1. Download from: https://github.com/mobizt/Firebase-ESP-Client
2. Extract ZIP file
3. Copy to: `Documents/Arduino/libraries/`
4. Restart Arduino IDE

### Required Dependencies
These are auto-installed with Firebase library:
- ArduinoJson (6.x)
- WiFiClientSecure
- HTTPClient

---

## 6. Upload and Test

### Step 6.1: Upload Code to ESP32
```
1. Connect ESP32 via USB
2. Select Board and Port
3. Click Upload
4. Wait for completion
5. Open Serial Monitor (115200 baud)
```

### Step 6.2: Check Serial Monitor Output
**Expected output:**
```
Connecting to WiFi....
WiFi connected!
IP Address: 192.168.1.100
Firebase signup OK
HTTP server started
Temperature: 28.5°C | Humidity: 65.3% | Heat Index: 30.2°C
Firebase updated successfully
```

### Step 6.3: Verify Firebase Database
1. Go to Firebase Console → Realtime Database
2. You should see data appearing:
```
{
  "weather": {
    "current": {
      "temperature": 28.5,
      "humidity": 65.3,
      "heatIndex": 30.2,
      "timestamp": 1234567890
    },
    "history": {
      "1234567890": {
        "temperature": 28.5,
        "humidity": 65.3,
        "heatIndex": 30.2,
        "timestamp": 1234567890
      }
    }
  },
  "device": {
    "status": "online",
    "uptime": 3600,
    "rssi": -45,
    "ip": "192.168.1.100"
  }
}
```

### Step 6.4: Open Dashboard
1. Open `weather-dashboard-firebase.html` in browser
2. Check for green **"Firebase: Connected"** badge
3. Data should update automatically

---

## 7. Firebase Database Structure

### Database Schema

```json
{
  "weather": {
    "current": {
      "temperature": 28.5,      // Current temperature (°C)
      "humidity": 65.3,         // Current humidity (%)
      "heatIndex": 30.2,        // Calculated heat index
      "timestamp": 1234567890   // Unix timestamp
    },
    "history": {
      "[timestamp1]": {
        "temperature": 28.5,
        "humidity": 65.3,
        "heatIndex": 30.2,
        "timestamp": 1234567890
      },
      "[timestamp2]": {
        "temperature": 27.8,
        "humidity": 64.1,
        "heatIndex": 29.5,
        "timestamp": 1234567950
      }
      // ... last 24 hours of data
    }
  },
  "device": {
    "status": "online",         // Device status
    "uptime": 3600,             // Seconds since boot
    "rssi": -45,                // WiFi signal strength (dBm)
    "ip": "192.168.1.100"       // ESP32 IP address
  }
}
```

### Data Paths

| Path | Description | Update Frequency |
|------|-------------|------------------|
| `/weather/current/*` | Current sensor readings | Every 60 seconds |
| `/weather/history/*` | Historical data points | Every 60 seconds |
| `/device/*` | Device information | Every 60 seconds |

### Data Retention

**Current Setup:**
- History stores **last 24 hours** of data
- Each data point is stored with timestamp as key
- Old data is automatically replaced (by timestamp)

**To change retention:**
```cpp
// In ESP32 code, line 133
database.ref('weather/history').limitToLast(24)  // Change number
```

---

## 8. Troubleshooting

### ❌ Firebase signup failed

**Problem:** Serial Monitor shows `Firebase signup failed`

**Solutions:**
1. **Check API Key:**
   - Verify it's correct in ESP32 code
   - Re-copy from Firebase Console
   - Must be exact (case-sensitive)

2. **Check Database URL:**
   - Format: `https://your-project-id.firebaseio.com`
   - Must include `https://`
   - No trailing slash

3. **Check Internet Connection:**
   - ESP32 must have internet access
   - Test by pinging Google: `ping 8.8.8.8`

4. **Enable Anonymous Auth (if needed):**
   - Firebase Console → Authentication → Sign-in method
   - Enable "Anonymous" provider

---

### ❌ Firebase update failed

**Problem:** Serial Monitor shows `Firebase update failed`

**Solutions:**
1. **Check Database Rules:**
   ```json
   {
     "rules": {
       ".read": true,
       ".write": true
     }
   }
   ```
   - Firebase Console → Realtime Database → Rules
   - Click "Publish" after changing

2. **Check Network:**
   - Ensure stable WiFi connection
   - Check ESP32 signal strength (RSSI)

3. **Increase Timeout:**
   ```cpp
   // Add after Firebase.begin()
   Firebase.setReadTimeout(&fbdo, 1000 * 60);
   Firebase.setwriteSizeLimit(&fbdo, "tiny");
   ```

---

### ❌ Dashboard shows "Firebase: Disconnected"

**Problem:** Dashboard can't connect to Firebase

**Solutions:**
1. **Check Firebase Config:**
   - Verify all credentials are correct
   - Check for typos in project ID
   - Ensure config object is complete

2. **Check Browser Console:**
   - Press F12 → Console tab
   - Look for specific error messages

3. **Check Database Rules:**
   - Must allow read access
   - Test mode: all reads allowed

4. **Clear Browser Cache:**
   - Hard refresh: Ctrl+Shift+R (Windows) or Cmd+Shift+R (Mac)

---

### ❌ No data appearing in dashboard

**Problem:** Dashboard connected but no data shown

**Solutions:**
1. **Verify ESP32 is uploading data:**
   - Check Firebase Console → Realtime Database
   - Should see data in `/weather/current/`

2. **Check data paths:**
   - Dashboard expects specific structure
   - Verify paths match between ESP32 code and dashboard

3. **Check browser console for errors:**
   - F12 → Console tab
   - Look for Firebase errors

---

### ❌ Historical charts empty

**Problem:** Real-time data works but charts empty

**Solutions:**
1. **Wait for data to accumulate:**
   - Charts need at least 2-3 data points
   - Data updates every 60 seconds

2. **Check history path:**
   ```javascript
   // In dashboard, verify this line
   database.ref('weather/history').limitToLast(24)
   ```

3. **Manually add test data:**
   - Firebase Console → Realtime Database
   - Click "+" to add data manually

---

## 🔒 Security Rules (Production)

**⚠️ Important:** Test mode rules expire in 30 days!

### Option 1: Read-Only Access
```json
{
  "rules": {
    "weather": {
      ".read": true,
      ".write": "auth != null"
    },
    "device": {
      ".read": true,
      ".write": "auth != null"
    }
  }
}
```

### Option 2: Authenticated Access
```json
{
  "rules": {
    ".read": "auth != null",
    ".write": "auth != null"
  }
}
```

### Option 3: Public Read, Authenticated Write
```json
{
  "rules": {
    "weather": {
      ".read": true,
      "current": {
        ".write": "auth != null"
      },
      "history": {
        ".write": "auth != null"
      }
    },
    "device": {
      ".read": "auth != null",
      ".write": "auth != null"
    }
  }
}
```

**To update rules:**
1. Firebase Console → Realtime Database → Rules tab
2. Paste new rules
3. Click **Publish**

---

## 💡 Tips & Best Practices

### 1. **Data Update Frequency**
Current: Every 60 seconds

To change:
```cpp
// Line 99 in ESP32 code
const unsigned long firebaseInterval = 60000; // milliseconds
```

**Recommendations:**
- For demo: 10-30 seconds (10000-30000)
- For production: 60-300 seconds (60000-300000)
- Balance: More frequent = more data, higher costs

### 2. **Data Retention**
Current: Last 24 hours (24 data points)

To store more:
```cpp
// Change limitToLast value
database.ref('weather/history').limitToLast(168)  // 1 week
database.ref('weather/history').limitToLast(720)  // 1 month
```

### 3. **Database Backup**
1. Firebase Console → Realtime Database
2. Click **⋮** (three dots) → **Export JSON**
3. Save backup file

### 4. **Monitor Usage**
1. Firebase Console → Usage tab
2. Check:
   - Database reads/writes
   - Storage used
   - Bandwidth

**Free tier limits:**
- 1 GB stored
- 10 GB/month downloaded
- 100 simultaneous connections

### 5. **Optimize Costs**
- Reduce update frequency
- Limit historical data points
- Use Firebase indexes for queries
- Archive old data periodically

---

## 📊 Firebase Dashboard Features

### What the Dashboard Shows:

1. **Real-time Data:**
   - Current temperature
   - Current humidity
   - Heat index
   - System status

2. **Historical Trends:**
   - Temperature chart (last 24 hours)
   - Humidity chart (last 24 hours)
   - Automatic updates

3. **Device Info:**
   - System uptime
   - WiFi signal strength
   - IP address
   - Firebase connection status

4. **Auto-sync:**
   - No refresh needed
   - Updates appear instantly
   - Works across multiple devices

---

## 🎯 Next Steps

Now that Firebase is set up:

1. ✅ **Test the system** - Verify data is flowing
2. ✅ **Set proper security rules** - Protect your database
3. ✅ **Customize update frequency** - Based on your needs
4. ✅ **Add more features:**
   - Email alerts for extreme temps
   - Mobile app
   - Data export
   - Multiple sensors

---

## 📞 Need Help?

**Common Issues:**
- API Key errors → Double-check credentials
- Connection timeouts → Check WiFi strength
- No data in dashboard → Verify database rules

**Resources:**
- Firebase Documentation: https://firebase.google.com/docs
- ESP32 Firebase Library: https://github.com/mobizt/Firebase-ESP-Client
- Arduino Forum: https://forum.arduino.cc

---

**Congratulations! 🎉** Your ESP32 Weather Station now has cloud storage with Firebase!
