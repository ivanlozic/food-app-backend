const express = require('express')
const router = express.Router()
const orderController = require('../controllers/orderController')

router.get('/api/orders/:userId', orderController.getOrders)
router.post('/api/orders/:userId', orderController.createOrder)

module.exports = router
