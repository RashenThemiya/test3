const express = require('express');
const cors = require('cors');
require('dotenv').config();

const { sequelize } = require('./models');
const bookingRoutes = require('./routes/bookingRoutes');
const userRoutes = require('./routes/userRoutes');
const serviceRoutes = require('./routes/serviceRoutes');
const authRoutes = require('./routes/authRoutes'); // ✅ for login/register
const verifyToken = require('./middleware/verifyToken'); // ✅ token check

const app = express();
app.use(cors());
app.use(express.json());

// Public Routes
app.use('/api/auth', authRoutes); // register and login

// Protected Routes (need token)
app.use('/api/bookings', verifyToken, bookingRoutes);
app.use('/api/users', verifyToken, userRoutes);
app.use('/api/services', verifyToken, serviceRoutes);

// Start server after DB sync
sequelize.sync({ alter: true }).then(() => {
  app.listen(process.env.PORT, () => {
    console.log(`✅ Server running on http://localhost:${process.env.PORT}`);
  });
}).catch((err) => {
  console.error('❌ Error starting server:', err);
});
