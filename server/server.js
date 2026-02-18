
require('dotenv').config();
const express = require('express');
const cors = require('cors');

const connectDB = require('./config/db');

connectDB();

// Register Models
require('./models/Student');
require('./models/Attempt');

const app = express();


// Middleware
app.use(express.json());
app.use(cors());

// Basic Route
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/attempt', require('./routes/attemptRoutes'));
app.use('/api/progress', require('./routes/progressRoutes'));

app.get('/', (req, res) => {
    res.send('Server is running');
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
