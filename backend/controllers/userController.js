const { User } = require('../models');

exports.getAllUsers = async (req, res) => {
  if (req.user.role !== 'admin') return res.status(403).json({ error: 'Only admin' });
  const users = await User.findAll();
  res.json(users);
};
