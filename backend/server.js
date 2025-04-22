const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;

// Middleware to parse form data
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files (frontend lives in parent directory)
app.use(express.static(path.join(__dirname, '../')));

// POST route to handle email submissions
app.post('https://turquoise.onrender.com/subscribe', (req, res) => {
    const email = req.body.email;

    if (email) {
        const filePath = path.join(__dirname, 'subscribers.txt');
        fs.appendFile(filePath, email + '\n', (err) => {
            if (err) {
                console.error('Error saving email:', err);
                return res.status(500).send('Internal Server Error');
            }
            res.send('Thank you for subscribing!');
        });
    } else {
        res.status(400).send('Email is required');
    }
});

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
