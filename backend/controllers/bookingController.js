const { Booking, Service } = require('../models');

exports.getUserBookings = async (req, res) => {
  const bookings = await Booking.findAll({
    where: { UserId: req.user.id },
    include: [Service]
  });
  res.json(bookings);
};

exports.addBooking = async (req, res) => {
  const { customer_name, address, date_time, service_id } = req.body;
  const booking = await Booking.create({
    customer_name,
    address,
    date_time,
    ServiceId: service_id,
    UserId: req.user.id
  });
  res.status(201).json(booking);
};

exports.updateBooking = async (req, res) => {
  const booking = await Booking.findByPk(req.params.id);
  if (booking.UserId !== req.user.id && req.user.role !== 'admin') {
    return res.status(403).json({ error: 'Unauthorized' });
  }
  await booking.update(req.body);
  res.json(booking);
};

exports.deleteBooking = async (req, res) => {
  const booking = await Booking.findByPk(req.params.id);
  if (booking.UserId !== req.user.id && req.user.role !== 'admin') {
    return res.status(403).json({ error: 'Unauthorized' });
  }
  await booking.destroy();
  res.status(204).send();
};
