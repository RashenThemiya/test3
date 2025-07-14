const sequelize = require('../config/db');
const Booking = require('./Booking');
const User = require('./User');
const Service = require('./Service');

module.exports = { sequelize, Booking, User, Service };
