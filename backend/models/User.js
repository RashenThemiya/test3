const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const User = sequelize.define('User', {
  username: { type: DataTypes.STRING, unique: true, allowNull: false },
  password_hash: { type: DataTypes.TEXT, allowNull: false },
  role: { type: DataTypes.ENUM('user', 'admin'), defaultValue: 'user' }
});

module.exports = User;
