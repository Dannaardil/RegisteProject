const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize('register', 'danna', 'Danna1234.', {
    host: 'localhost',
    dialect: 'mysql'
});

const User = sequelize.define('User', {
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
    tableName: 'users', // Ensure this matches your actual table name
    timestamps: false // Set to true if you want Sequelize to handle createdAt and updatedAt fields
});

module.exports = User;
