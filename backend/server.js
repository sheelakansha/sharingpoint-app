const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Basic test route
app.get('/api/status', (req, res) => {
    res.json({ status: 'Backend is running!', timestamp: new Date() });
});

// Login endpoint
app.post('/api/login', (req, res) => {
    const { email, password } = req.body;

    // TODO: Replace with actual database authentication
    if (email && password) {
        res.json({ success: true, message: 'Login successful', token: 'dummy-token-123' });
    } else {
        res.status(400).json({ success: false, message: 'Email and password are required' });
    }
});

// Signup endpoint
app.post('/api/signup', (req, res) => {
    const { fullName, email, password } = req.body;

    // TODO: Replace with actual database user creation
    if (fullName && email && password) {
        res.status(201).json({ success: true, message: 'User created successfully', token: 'dummy-token-123' });
    } else {
        res.status(400).json({ success: false, message: 'Full Name, Email, and Password are required' });
    }
});

app.listen(PORT, () => {
    console.log(`Server starting on port ${PORT}`);
});
