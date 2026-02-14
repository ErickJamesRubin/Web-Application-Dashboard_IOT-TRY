# ⚡ ESP32 Weather Station Dashboard

<div align="center">

![Project Status](https://img.shields.io/badge/Status-Active-success)
![License](https://img.shields.io/badge/License-MIT-blue)
![Platform](https://img.shields.io/badge/Platform-ESP32-orange)
![Sensor](https://img.shields.io/badge/Sensor-DHT11-green)

**A modern, real-time IoT weather monitoring system with a stunning web dashboard**

[Features](#-features) • [Demo](#-demo) • [Installation](#-installation) • [Usage](#-usage) • [Troubleshooting](#-troubleshooting)

</div>

---

## 📋 Table of Contents

- [Overview](#-overview)
- [Features](#-features)
- [Demo](#-demo)
- [Technologies](#-technologies)
- [Hardware Requirements](#-hardware-requirements)
- [Software Requirements](#-software-requirements)
- [Installation](#-installation)
- [Wiring Diagram](#-wiring-diagram)
- [Usage](#-usage)
- [File Structure](#-file-structure)
- [API Endpoints](#-api-endpoints)
- [Troubleshooting](#-troubleshooting)
- [Future Enhancements](#-future-enhancements)
- [Contributing](#-contributing)
- [License](#-license)
- [Acknowledgments](#-acknowledgments)

---

## 🌟 Overview

This project is a comprehensive **IoT Weather Monitoring System** that uses an ESP32 microcontroller and DHT11 sensor to measure temperature and humidity in real-time. The system features a professional, animated web dashboard with live data visualization.

### Key Highlights

- 🎨 **Beautiful UI** - Modern glassmorphism design with smooth animations
- ⚡ **Real-time Updates** - Live sensor data every 3 seconds
- 📊 **Data Visualization** - Interactive charts showing temperature and humidity trends
- 📱 **Responsive Design** - Works on desktop, tablet, and mobile devices
- 🌐 **Web-based** - Accessible from any device on the same network
- 🔥 **Cool Effects** - Lightning text effects and glowing animations on hover

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
- ✅ Connection status indicator
- ✅ WiFi signal strength display
- ✅ System uptime tracking

### Visual Features
- ⚡ Lightning text effects on hover
- 🌊 Animated background particles
- 💎 Glassmorphism card design
- 🎭 Smooth transitions and animations
- 🎨 Color-coded sensor indicators
- ✨ Pulsing logo animation

### Technical Features
- 🔄 RESTful API architecture
- 📡 WiFi connectivity
- 🔌 CORS enabled for cross-origin requests
- 📈 Chart.js for data visualization
- 💾 Historical data tracking
- ⏱️ Configurable update intervals

---

## 🎬 Demo

### Dashboard Preview

**Main Interface:**
- Temperature, Humidity, Heat Index, and System Status cards
- Real-time updating values with change indicators
- Smooth animations and hover effects

**Charts Section:**
- Temperature trend line chart
- Humidity trend line chart
- Last 20 data points displayed

**Device Information:**
- Microcontroller type (ESP32)
- Sensor type (DHT11)
- Firmware version
- System uptime
- WiFi signal strength
- IP address

---

## 🛠 Technologies

### Hardware
- **ESP32** - Microcontroller with WiFi capability
- **DHT11** - Temperature and humidity sensor

### Software
- **Arduino IDE** - ESP32 programming
- **HTML5/CSS3** - Frontend structure and styling
- **JavaScript (ES6)** - Dashboard logic
- **Chart.js** - Data visualization
- **C++** - ESP32 firmware

### Libraries
- `WiFi.h` - ESP32 WiFi connectivity
- `WebServer.h` - HTTP server on ESP32
- `DHT.h` - DHT11 sensor interface
- `ArduinoJson.h` - JSON data formatting

---

## 🔧 Hardware Requirements

| Component | Specification | Quantity |
|-----------|--------------|----------|
| ESP32 Development Board | Any ESP32 variant | 1 |
| DHT11 Sensor | Temperature & Humidity | 1 |
| Jumper Wires | Male-to-Female | 3-4 |
| Breadboard (optional) | Standard size | 1 |
| USB Cable | Micro-USB or USB-C | 1 |
| Power Supply | 5V (via USB) | 1 |

### Optional Components
- 10kΩ resistor (if DHT11 doesn't have built-in pull-up)
- Enclosure/case for the project

---

## 💻 Software Requirements

### Development Environment
- **Arduino IDE** (version 1.8.x or 2.x)
- **ESP32 Board Support Package**
- **USB drivers** for ESP32

### Required Arduino Libraries
```
- DHT sensor library (by Adafruit)
- Adafruit Unified Sensor
- ArduinoJson (version 6.x)
```

### Web Browser
- Chrome, Firefox, Safari, or Edge (latest version)
- JavaScript enabled

---

## 📥 Installation

### Step 1: Hardware Setup

#### Wiring Connections

```
DHT11 Pin  →  ESP32 Pin
---------     ---------
VCC (+)    →  3.3V (or 5V)
GND (-)    →  GND
DATA (S)   →  GPIO 4
```

**Wiring Diagram:**
```
     ESP32                    DHT11
  ┌─────────┐              ┌──────┐
  │   3.3V  ├──────────────┤ VCC  │
  │   GND   ├──────────────┤ GND  │
  │  GPIO4  ├──────────────┤ DATA │
  └─────────┘              └──────┘
```

> **Note:** If your DHT11 module doesn't have a built-in pull-up resistor, add a 10kΩ resistor between VCC and DATA pins.

### Step 2: Software Installation

#### 2.1 Install Arduino IDE
1. Download from: https://www.arduino.cc/en/software
2. Install and launch Arduino IDE

#### 2.2 Add ESP32 Board Support
1. Go to **File → Preferences**
2. In "Additional Board Manager URLs", add:
   ```
   https://raw.githubusercontent.com/espressif/arduino-esp32/gh-pages/package_esp32_index.json
   ```
3. Go to **Tools → Board → Boards Manager**
4. Search for "ESP32" and install "**esp32 by Espressif Systems**"

#### 2.3 Install Required Libraries
1. Go to **Sketch → Include Library → Manage Libraries**
2. Install the following:
   - **DHT sensor library** by Adafruit
   - **Adafruit Unified Sensor** by Adafruit
   - **ArduinoJson** by Benoit Blanchon (v6.x)

### Step 3: Configure and Upload ESP32 Code

#### 3.1 Open the Arduino Sketch
1. Open `esp32_weather_server.ino` in Arduino IDE

#### 3.2 Configure WiFi Credentials
```cpp
// Line 7-8: Replace with your WiFi credentials
const char* ssid = "YOUR_WIFI_SSID";        // Your WiFi network name
const char* password = "YOUR_WIFI_PASSWORD"; // Your WiFi password
```

#### 3.3 Configure DHT Pin (Optional)
```cpp
// Line 11: Change if using different GPIO pin
#define DHTPIN 4  // Default is GPIO 4
```

#### 3.4 Upload to ESP32
1. Connect ESP32 to computer via USB
2. Select board: **Tools → Board → ESP32 Dev Module**
3. Select port: **Tools → Port → [Your ESP32 Port]**
4. Click **Upload** button (→)
5. Wait for "Done uploading" message

#### 3.5 Get ESP32 IP Address
1. Open **Serial Monitor**: **Tools → Serial Monitor**
2. Set baud rate to **115200**
3. Press ESP32 reset button
4. Note the IP address displayed:
   ```
   WiFi connected!
   IP Address: 192.168.1.XXX
   HTTP server started
   ```

### Step 4: Setup Dashboard

#### 4.1 Open Dashboard
1. Open `weather-dashboard-live.html` in your web browser

#### 4.2 Connect to ESP32
1. Enter the ESP32 IP address in the connection panel
2. Click **"Connect"** button
3. Status should change to **"Connected"** (green)

#### 4.3 Verify Data Flow
- Temperature and humidity should start updating
- Charts should begin plotting data
- Last update timestamp should refresh every 3 seconds

---

## 🔌 Wiring Diagram

### Visual Connection Guide

```
┌─────────────────────────────────────────────┐
│              ESP32 BOARD                     │
│                                              │
│  [USB]                                       │
│   ║                                          │
│  ╔╩═══════════════════════════════════╗    │
│  ║                                     ║    │
│  ║         ESP32-WROOM                 ║    │
│  ║                                     ║    │
│  ║  3V3 ●───────────┐                 ║    │
│  ║                   │                 ║    │
│  ║  GND ●───────────┼────┐            ║    │
│  ║                   │    │            ║    │
│  ║  GP4 ●───────────┼────┼───┐        ║    │
│  ╚═══════════════════╪════╪═══╪════════╝    │
└────────────────────┬─┼────┼───┼─────────────┘
                     │ │    │   │
                     │ │    │   │
              ┌──────┴─┴────┴───┴──┐
              │    DHT11 MODULE    │
              │  ┌──────────────┐  │
              │  │   ████████   │  │ ← Sensor
              │  └──────────────┘  │
              │                    │
              │  VCC  GND  DATA    │
              └────────────────────┘
```

---

## 🚀 Usage

### Starting the System

1. **Power on ESP32** - Connect to power via USB
2. **Wait for WiFi connection** - Check Serial Monitor
3. **Open Dashboard** - Launch HTML file in browser
4. **Enter IP Address** - Input ESP32's IP
5. **Click Connect** - Start receiving data

### Reading the Dashboard

#### Temperature Card
- Shows current temperature in Celsius
- Displays temperature change from last reading
- Up arrow (↑) indicates increase

#### Humidity Card
- Shows current humidity percentage
- Displays humidity change from last reading
- Down arrow (↓) indicates decrease

#### Heat Index Card
- Calculated comfort level based on temp + humidity
- Shows status: Cool, Comfortable, Hot, Very Hot

#### System Status Card
- Shows "ONLINE" when connected
- Displays last update timestamp

### Accessing the API

You can access sensor data directly via API:

#### Get Sensor Data (JSON)
```
http://[ESP32_IP_ADDRESS]/data
```

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

#### View Simple Web Page
```
http://[ESP32_IP_ADDRESS]/
```

---

## 📁 File Structure

```
esp32-weather-station/
│
├── esp32_weather_server.ino       # ESP32 Arduino sketch
├── weather-dashboard.html         # Demo dashboard (simulated data)
├── weather-dashboard-live.html    # Live dashboard (connects to ESP32)
├── SETUP_GUIDE.md                 # Detailed setup instructions
├── WIRING_DIAGRAM.txt             # Hardware wiring guide
└── README.md                      # This file
```

### File Descriptions

| File | Purpose |
|------|---------|
| `esp32_weather_server.ino` | ESP32 firmware - reads sensor and serves web API |
| `weather-dashboard-live.html` | Main dashboard - connects to real ESP32 |
| `weather-dashboard.html` | Demo version - simulated data for testing |
| `SETUP_GUIDE.md` | Comprehensive setup walkthrough |
| `WIRING_DIAGRAM.txt` | Hardware connection instructions |

---

## 🔌 API Endpoints

### GET `/`
Returns a simple HTML page with current sensor readings.

**Response:** HTML page

---

### GET `/data`
Returns current sensor data in JSON format.

**Response Type:** `application/json`

**Response Example:**
```json
{
  "temperature": 28.5,      // Temperature in Celsius
  "humidity": 65.3,         // Humidity percentage
  "heatIndex": 30.2,        // Calculated heat index
  "status": "online",       // System status
  "uptime": 3600,           // Uptime in seconds
  "rssi": -45,              // WiFi signal strength (dBm)
  "ip": "192.168.1.100"     // ESP32 IP address
}
```

**CORS Headers:** Enabled for cross-origin access

---

## 🐛 Troubleshooting

### ESP32 Issues

#### ❌ ESP32 won't connect to WiFi
**Solutions:**
- ✅ Verify WiFi SSID and password are correct
- ✅ Ensure ESP32 is within WiFi range
- ✅ Use 2.4GHz WiFi (ESP32 doesn't support 5GHz)
- ✅ Check if WiFi network requires special login

#### ❌ Sensor reads "nan" or incorrect values
**Solutions:**
- ✅ Check wiring connections (VCC, GND, DATA)
- ✅ Ensure DHT11 has proper power (3.3V or 5V)
- ✅ Add 10kΩ pull-up resistor if needed
- ✅ Try different GPIO pin and update code
- ✅ Test with known working DHT11 sensor

#### ❌ Upload fails to ESP32
**Solutions:**
- ✅ Press and hold BOOT button while uploading
- ✅ Select correct board: "ESP32 Dev Module"
- ✅ Select correct COM port
- ✅ Install/update USB drivers
- ✅ Try different USB cable

### Dashboard Issues

#### ❌ Dashboard shows "Disconnected"
**Solutions:**
- ✅ Verify ESP32 and computer are on same WiFi network
- ✅ Check if IP address is correct
- ✅ Try accessing `http://[ESP32_IP]/data` in browser directly
- ✅ Check browser console for errors (F12)
- ✅ Disable browser extensions that might block connections

#### ❌ CORS errors in browser console
**Solutions:**
- ✅ Use same device for ESP32 and dashboard
- ✅ Disable CORS in browser (development only):
  ```bash
  # Chrome example
  chrome.exe --disable-web-security --user-data-dir="C:\temp"
  ```
- ✅ Host dashboard on ESP32 itself (advanced)

#### ❌ Charts not updating
**Solutions:**
- ✅ Ensure connection status shows "Connected"
- ✅ Check browser console for JavaScript errors
- ✅ Verify data is being received (check Network tab)
- ✅ Refresh the page
- ✅ Clear browser cache

### Network Issues

#### ❌ Can't access ESP32 from other devices
**Solutions:**
- ✅ Check firewall settings
- ✅ Ensure all devices on same network
- ✅ Verify ESP32 IP hasn't changed (DHCP)
- ✅ Try using static IP for ESP32

---

## 🚀 Future Enhancements

### Planned Features

- [ ] **Database Integration** - Store historical data (MySQL/MongoDB/Firebase)
- [ ] **Mobile App** - Native Android/iOS application
- [ ] **Email/SMS Alerts** - Notifications for extreme conditions
- [ ] **Multiple Sensors** - Support for multiple ESP32 devices
- [ ] **Data Export** - Download data as CSV/Excel
- [ ] **Advanced Analytics** - Daily/weekly/monthly reports
- [ ] **Weather Forecast** - Integration with weather APIs
- [ ] **User Authentication** - Login system for security
- [ ] **Dark/Light Theme** - Theme toggle option
- [ ] **Voice Control** - Integration with Alexa/Google Home

### Hardware Upgrades

- [ ] Add DHT22 sensor (higher accuracy)
- [ ] Include barometric pressure sensor (BMP280)
- [ ] Add light sensor (BH1750)
- [ ] Include air quality sensor (MQ-135)
- [ ] Add display (OLED/LCD) for standalone operation
- [ ] Include buzzer for alarm system

### Software Improvements

- [ ] PWA support for offline functionality
- [ ] WebSocket for real-time updates (instead of polling)
- [ ] Multi-language support
- [ ] Data compression for faster transmission
- [ ] Automatic data backup
- [ ] REST API documentation (Swagger)

---

## 🤝 Contributing

Contributions are welcome! Here's how you can help:

1. **Fork** the repository
2. **Create** a feature branch (`git checkout -b feature/AmazingFeature`)
3. **Commit** your changes (`git commit -m 'Add some AmazingFeature'`)
4. **Push** to the branch (`git push origin feature/AmazingFeature`)
5. **Open** a Pull Request

### Contribution Guidelines

- Follow existing code style
- Comment your code
- Update documentation
- Test thoroughly before submitting
- Include screenshots for UI changes

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
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

---

## 🙏 Acknowledgments

### Libraries & Frameworks
- [Chart.js](https://www.chartjs.org/) - Beautiful charts
- [Adafruit DHT Library](https://github.com/adafruit/DHT-sensor-library) - DHT sensor support
- [ArduinoJson](https://arduinojson.org/) - JSON handling

### Fonts
- [Google Fonts - Orbitron](https://fonts.google.com/specimen/Orbitron) - Futuristic display font
- [Google Fonts - Rajdhani](https://fonts.google.com/specimen/Rajdhani) - Modern sans-serif font

### Inspiration
- Modern IoT dashboard designs
- Glassmorphism design trend
- Smart home automation projects

### Special Thanks
- Espressif for ESP32 development
- Adafruit for sensor libraries
- Arduino community for support

---

## 📞 Contact & Support

- **Author:** [Your Name]
- **Email:** [your.email@example.com]
- **GitHub:** [@yourusername](https://github.com/yourusername)
- **Project Link:** [https://github.com/yourusername/esp32-weather-station](https://github.com/yourusername/esp32-weather-station)

### Get Help
- Open an [Issue](https://github.com/yourusername/esp32-weather-station/issues)
- Check [Discussions](https://github.com/yourusername/esp32-weather-station/discussions)
- Read the [Setup Guide](SETUP_GUIDE.md)

---

## 📸 Screenshots

### Main Dashboard
![Dashboard Overview](screenshots/dashboard-main.png)

### Connection Panel
![Connection](screenshots/connection-panel.png)

### Live Charts
![Charts](screenshots/live-charts.png)

### Device Info
![Device Info](screenshots/device-info.png)

### Mobile View
![Mobile Responsive](screenshots/mobile-view.png)

---

## 🎓 Educational Value

This project demonstrates:

1. **IoT Fundamentals** - Sensor interfacing, WiFi connectivity
2. **Web Development** - HTML, CSS, JavaScript, responsive design
3. **Embedded Systems** - ESP32 programming, real-time systems
4. **API Design** - RESTful architecture, JSON data exchange
5. **Data Visualization** - Charts, real-time updates
6. **Network Programming** - HTTP servers, CORS handling

### Learning Outcomes
- ✅ Understand ESP32 microcontroller programming
- ✅ Learn sensor interfacing and data acquisition
- ✅ Build responsive web interfaces
- ✅ Implement real-time data visualization
- ✅ Create RESTful APIs
- ✅ Handle network communication

---

<div align="center">

### ⭐ Star this repository if you find it helpful!

**Made with ❤️ for IoT enthusiasts**

[⬆ Back to Top](#-esp32-weather-station-dashboard)

</div>
