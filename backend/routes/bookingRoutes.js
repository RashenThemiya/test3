const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const controller = require('../controllers/bookingController');

router.use(auth);
router.get('/', controller.getUserBookings);
router.post('/', controller.addBooking);
router.put('/:id', controller.updateBooking);
router.delete('/:id', controller.deleteBooking);

module.exports = router;
