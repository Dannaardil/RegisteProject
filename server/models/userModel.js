const { Sequelize, DataTypes } = require('sequelize');
const mongoose = require('mongoose');

// MySQL Sequelize setup
const sequelize = new Sequelize('register', 'danna', 'Danna1234.', {
    host: 'localhost',
    dialect: 'mysql'
});

// Define Sequelize User model (for MySQL)
const UserMySQL = sequelize.define('User', {
    id_mongo:{
        type: DataTypes.STRING,
        allowNull: false

    }, 
  
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    surname: {
        type: DataTypes.STRING,
        allowNull: false
    },
    age: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    }
}, {
    tableName: 'users',
    timestamps: false // Use true if you want createdAt and updatedAt fields
});

// MongoDB Mongoose setup
const userSchema = new mongoose.Schema({
      
    name: { type: String, required: true },
    surname: { type: String, required: true },
    age: { type: Number, required: true },
    email: { type: String, required: true, unique: true }
});

// Define Mongoose User model (for MongoDB)
const UserMongoDB = mongoose.model('User', userSchema, "Users-1");

// Initialize both connections
async function initializeDatabases() {
    try {
        // Connect to MySQL (via Sequelize)
        await sequelize.authenticate();
        console.log('MySQL connection has been established successfully.');

        // Sync MySQL schema (optional)

        // Connect to MongoDB (via Mongoose)
        await mongoose.connect('mongodb://administrador:admin123@viaduct.proxy.rlwy.net:47991/D_CineCampus', {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('MongoDB connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the databases:', error);
    }
}

// Call the function to initialize both databases
initializeDatabases();

// Export models for use in other files
module.exports = { UserMySQL, UserMongoDB };
