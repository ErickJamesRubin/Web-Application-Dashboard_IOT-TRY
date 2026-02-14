// Generate particles
        const particlesContainer = document.getElementById('particles');
        for (let i = 0; i < 50; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            particle.style.left = Math.random() * 100 + '%';
            particle.style.top = Math.random() * 100 + '%';
            particle.style.animationDelay = Math.random() * 20 + 's';
            particlesContainer.appendChild(particle);
        }

        // Simulate sensor data
        let currentTemp = 28;
        let currentHumidity = 65;
        let tempHistory = [];
        let humidityHistory = [];
        let timeLabels = [];
        let uptimeSeconds = 0;

        // Initialize historical data
        for (let i = 24; i >= 0; i--) {
            const hour = new Date();
            hour.setHours(hour.getHours() - i);
            timeLabels.push(hour.getHours() + ':00');
            tempHistory.push(25 + Math.random() * 6);
            humidityHistory.push(60 + Math.random() * 15);
        }

        // Temperature Chart
        const tempCtx = document.getElementById('tempChart').getContext('2d');
        const tempChart = new Chart(tempCtx, {
            type: 'line',
            data: {
                labels: timeLabels,
                datasets: [{
                    label: 'Temperature (°C)',
                    data: tempHistory,
                    borderColor: '#ff6b6b',
                    backgroundColor: 'rgba(255, 107, 107, 0.1)',
                    borderWidth: 3,
                    fill: true,
                    tension: 0.4,
                    pointRadius: 0,
                    pointHoverRadius: 6
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: true,
                plugins: {
                    legend: {
                        display: false
                    }
                },
                scales: {
                    y: {
                        beginAtZero: false,
                        grid: {
                            color: 'rgba(255, 255, 255, 0.05)'
                        },
                        ticks: {
                            color: '#94a3b8'
                        }
                    },
                    x: {
                        grid: {
                            color: 'rgba(255, 255, 255, 0.05)'
                        },
                        ticks: {
                            color: '#94a3b8'
                        }
                    }
                }
            }
        });

        // Humidity Chart
        const humidityCtx = document.getElementById('humidityChart').getContext('2d');
        const humidityChart = new Chart(humidityCtx, {
            type: 'line',
            data: {
                labels: timeLabels,
                datasets: [{
                    label: 'Humidity (%)',
                    data: humidityHistory,
                    borderColor: '#4facfe',
                    backgroundColor: 'rgba(79, 172, 254, 0.1)',
                    borderWidth: 3,
                    fill: true,
                    tension: 0.4,
                    pointRadius: 0,
                    pointHoverRadius: 6
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: true,
                plugins: {
                    legend: {
                        display: false
                    }
                },
                scales: {
                    y: {
                        beginAtZero: false,
                        grid: {
                            color: 'rgba(255, 255, 255, 0.05)'
                        },
                        ticks: {
                            color: '#94a3b8'
                        }
                    },
                    x: {
                        grid: {
                            color: 'rgba(255, 255, 255, 0.05)'
                        },
                        ticks: {
                            color: '#94a3b8'
                        }
                    }
                }
            }
        });

        // Update sensor readings
        function updateSensorData() {
            // Simulate slight variations
            currentTemp = 25 + Math.random() * 6;
            currentHumidity = 60 + Math.random() * 15;

            document.getElementById('temperature').textContent = currentTemp.toFixed(1);
            document.getElementById('humidity').textContent = currentHumidity.toFixed(1);
            
            // Calculate heat index (simplified formula)
            const heatIndex = currentTemp + (0.2 * currentHumidity);
            document.getElementById('heatIndex').textContent = heatIndex.toFixed(1);

            // Determine comfort level
            let comfortLevel = 'Comfortable';
            if (heatIndex > 32) comfortLevel = 'Very Hot';
            else if (heatIndex > 29) comfortLevel = 'Hot';
            else if (heatIndex < 20) comfortLevel = 'Cool';
            document.getElementById('comfort-level').textContent = comfortLevel;

            // Update change indicators
            document.getElementById('temp-change').textContent = '+' + (Math.random() * 2).toFixed(1) + '°C';
            document.getElementById('humidity-change').textContent = '-' + (Math.random() * 3).toFixed(1) + '%';

            // Update timestamp
            const now = new Date();
            document.getElementById('lastUpdate').textContent = now.toLocaleTimeString();

            // Update charts
            tempHistory.shift();
            tempHistory.push(currentTemp);
            humidityHistory.shift();
            humidityHistory.push(currentHumidity);

            const newLabel = now.getHours() + ':' + String(now.getMinutes()).padStart(2, '0');
            timeLabels.shift();
            timeLabels.push(newLabel);

            tempChart.update();
            humidityChart.update();
        }

        // Update uptime
        function updateUptime() {
            uptimeSeconds++;
            const hours = Math.floor(uptimeSeconds / 3600);
            const minutes = Math.floor((uptimeSeconds % 3600) / 60);
            const seconds = uptimeSeconds % 60;
            document.getElementById('uptime').textContent = 
                `${hours}h ${minutes}m ${seconds}s`;
        }

        // Initial update
        updateSensorData();

        // Update every 3 seconds
        setInterval(updateSensorData, 3000);
        setInterval(updateUptime, 1000);