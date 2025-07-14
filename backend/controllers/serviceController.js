const { Service } = require('../models');

exports.getServices = async (req, res) => {
  const services = await Service.findAll();
  res.json(services);
};

exports.addService = async (req, res) => {
  if (req.user.role !== 'admin') return res.status(403).json({ error: 'Only admin can add services' });
  const { name } = req.body;
  const service = await Service.create({ name });
  res.status(201).json(service);
};
