const User = require('../models/userModel')
const fs = require('fs')
const bcrypt = require('bcrypt')
const { v4: uuidv4, v4 } = require('uuid')

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find()
    res.json(users)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}
exports.getUser = async (req, res) => {
  const userId = req.params.id

  try {
    const user = await User.findById(userId)

    if (!user) {
      return res.status(404).json({
        status: 'error',
        message: 'User not found'
      })
    }

    res.status(200).json({
      status: 'success',
      data: user
    })
  } catch (error) {
    console.error(error)
    res.status(500).json({
      status: 'error',
      message: 'Internal server error'
    })
  }
}

exports.createUser = async (req, res) => {
  const {
    name,
    surname,
    email,
    password,
    confirmPassword,
    phoneNumber,
    address,
    city,
    country
  } = req.body

  try {
    const existingUser = await User.findOne({ email })

    if (existingUser) {
      return res
        .status(400)
        .json({ message: 'User with this email already exists' })
    }

    const newUser = new User({
      id: uuidv4(),
      name,
      surname,
      email,
      password,
      confirmPassword,
      phoneNumber,
      address,
      city,
      country
    })

    await newUser.save()

    res.status(201).json({
      status: 'success',
      data: newUser
    })
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: err.message })
  }
}

exports.updateUser = async (req, res) => {
  const { id, email, password, newPassword, confirmPassword, ...updateData } =
    req.body

  try {
    const user = await User.findOne({ email })

    if (!user) {
      return res.status(404).json({
        status: 'error',
        message: 'User not found'
      })
    }
    if (user.password !== password) {
      return res.status(401).json({
        status: 'error',
        message: 'Invalid password'
      })
    }

    Object.assign(user, updateData)

    if (newPassword) {
      user.password = newPassword
      user.confirmPassword = confirmPassword
    }

    await user.save()

    res.status(200).json({
      status: 'success',
      data: user
    })
  } catch (error) {
    console.error(error)
    res.status(500).json({
      status: 'error',
      message: 'An error occurred while updating the user'
    })
  }
}
exports.deleteUser = async (req, res) => {
  const { email, password } = req.body

  try {
    const user = await User.findOne({ email })

    if (!user) {
      return res.status(404).json({
        status: 'error',
        message: 'User not found'
      })
    }
    if (user.password !== password) {
      return res.status(401).json({
        status: 'error',
        message: 'Invalid password'
      })
    }

    await user.remove()

    res.status(200).json({
      status: 'success',
      message: 'User deleted successfully'
    })
  } catch (error) {
    console.error(error)
    res.status(500).json({
      status: 'error',
      message: 'An error occurred while deleting the user'
    })
  }
}

exports.loginUser = async (req, res) => {
  const { email, password } = req.body

  try {
    const user = await User.findOne({ email })

    if (!user) {
      return res.status(401).json({ message: 'Email not found' })
    }

    const isPasswordValid = await (password === user.password)

    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid password' })
    }

    const token = user.generateAuthToken()

    res.json({ token, user })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'An error occurred during login' })
  }
}
