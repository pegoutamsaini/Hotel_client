require('dotenv').config();
const express = require('express');
const connectDB = require('./config/dbConfig');
const signupRoutes = require('./routes/signup');
const loginRoutes = require('./routes/login');
const cors = require('cors');
const cookieParser = require('cookie-parser'); // Import cookie-parser

// Initialize Express app
const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors({
    origin: 'http://localhost:4200',
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
}));
app.use(express.json());
app.use(cookieParser()); // Use cookie-parser

// Routes
app.use('/api/signup', signupRoutes);
app.use('/api/login', loginRoutes);

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
