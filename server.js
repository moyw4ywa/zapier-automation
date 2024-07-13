const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const path = require('path');

const app = express();
const port = 3000;

// Middleware to parse JSON
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Serve the sign-up page
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Endpoint for user signups
app.post('/signup', (req, res) => {
    const { email } = req.body;

    // URL provided by Zapier for webhooks
    const zapierWebhookUrl = "https://hooks.zapier.com/hooks/catch/19332064/23penfq/"; // Replace with your Zapier webhook URL

    axios.post(zapierWebhookUrl, { email })
        .then(response => {
            console.log('Data sent to Zapier:', response.data);
            res.status(200).send('User signup data sent to Zapier');
        })
        .catch(error => {
            console.error('Error sending data to Zapier:', error);
            res.status(500).send('Error sending data to Zapier');
        });
});

// Start the server
app.listen(port, () => {
    console.log(`App running on http://localhost:${port}`);
});
