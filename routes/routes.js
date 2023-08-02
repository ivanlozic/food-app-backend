const express = require('express');
const menuController = require('../controllers/menuController');
const orderController = require('../controllers/orderController');

const router = express.Router();

router.get('/api/menu', menuController.getMenu);
router.post('/api/orders', orderController.createOrder);

module.exports = router;
