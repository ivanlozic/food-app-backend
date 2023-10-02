const express = require('express')
const menuController = require('../controllers/menuController')
const orderController = require('../controllers/orderController')
const userController = require('../controllers/userController')

const router = express.Router()

router.get('/api/menu', menuController.getMenu)
router.post('/api/orders', orderController.createOrder)

router.post('/api/login', userController.loginUser)

router.get('/users', userController.getAllUsers)
router.post('/users', userController.createUser)
router.get('/users/:id', userController.getUser)
router.put('/users', userController.updateUser)
router.delete('/users', userController.deleteUser)

module.exports = router