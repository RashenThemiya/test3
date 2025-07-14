const { User } = require('../models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const SECRET = process.env.JWT_SECRET || 'your_jwt_secret_key';

exports.register = async (req, res) => {
  const { username, password, role } = req.body;

  const existingUser = await User.findOne({ where: { username } });
  if (existingUser) return res.status(400).json({ error: 'Username already taken' });

  const password_hash = await bcrypt.hash(password, 10);
  const user = await User.create({ username, password_hash, role });

  res.status(201).json({ message: 'User registered successfully' });
};

exports.login = async (req, res) => {
  const { username, password } = req.body;

  const user = await User.findOne({ where: { username } });
  if (!user) return res.status(404).json({ error: 'User not found' });

  const isMatch = await bcrypt.compare(password, user.password_hash);
  if (!isMatch) return res.status(401).json({ error: 'Invalid credentials' });

  const token = jwt.sign(
    { id: user.id, role: user.role },
    SECRET,
    { expiresIn: '2h' }
  );

  res.json({ token });
};
