const express = require('express')
const router = express.Router()
const userController = require('../controllers/userController')

router.post('/api/login', userController.loginUser)
router.get('/users', userController.getAllUsers)
router.post('/users', userController.createUser)
router.get('/users/:id', userController.getUser)
router.put('/users', userController.updateUser)
router.delete('/users/:email', userController.deleteUser)

module.exports = router
