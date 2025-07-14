const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const controller = require('../controllers/serviceController');

router.use(auth);
router.get('/', controller.getServices);
router.post('/', controller.addService);

module.exports = router;
