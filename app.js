const express = require('express');
require('dotenv').config();
const { Sequelize } = require('sequelize');
const userRoutes = require('./server/routes/userRoutes');
const path = require('path');

// Initialize Express app
const app = express();
const PORT = process.env.PORT || 5000;

// Sequelize setup
const sequelize = new Sequelize('register', 'danna', 'Danna1234.', {
    host: 'localhost',
    dialect: 'mysql',
    logging: true// Set to true if you want to see SQL queries in the console
});

// Test the database connection
sequelize.authenticate()
    .then(() => console.log('MySQL connected'))
    .catch(err => console.error('MySQL connection error:', err));

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.use('/api/users', userRoutes);

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on port http://localhost:${PORT}`);
});
