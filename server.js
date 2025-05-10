const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;

// Middleware
app.use(bodyParser.json());

// Telegram Bot Config
const BOT_TOKEN = '7940931721:AAFK8sU28WSosUCe6iibvxWunZKJocWsAO0';
const CHAT_ID = '6449608820';

// Endpoint to receive IP
app.post('/log-ip', async (req, res) => {
    const { ip } = req.body;
    
    try {
        // Send IP to Telegram
        await axios.post(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
            chat_id: CHAT_ID,
            text: `📌 New Visitor IP: ${ip}\n🌐 User-Agent: ${req.headers['user-agent']}`
        });
        
        res.status(200).send('IP logged successfully');
    } catch (error) {
        console.error('Error sending to Telegram:', error);
        res.status(500).send('Failed to log IP');
    }
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});