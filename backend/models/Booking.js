const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const User = require('./User');
const Service = require('./Service');

const Booking = sequelize.define('Booking', {
  customer_name: { type: DataTypes.STRING, allowNull: false },
  address: { type: DataTypes.STRING, allowNull: false },
  date_time: { type: DataTypes.DATE, allowNull: false }
});

User.hasMany(Booking);
Booking.belongsTo(User);

Service.hasMany(Booking);
Booking.belongsTo(Service);

module.exports = Booking;
