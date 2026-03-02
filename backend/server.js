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

app.listen(PORT, () => {
    console.log(`Server starting on port ${PORT}`);
});
