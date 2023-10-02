const User = require('../models/userModel')
const path = require('path')
const fs = require('fs')
const { v4: uuidv4 } = require('uuid')
const jwt = require('jsonwebtoken')

const secretKey = 'your-secret-key'

function readUsersFromFile() {
  const filePath = path.join(__dirname, '../db/users.json')
  const fileContents = fs.readFileSync(filePath, 'utf-8')
  return JSON.parse(fileContents)
}

function writeUsersToFile(users) {
  const filePath = path.join(__dirname, '../db/users.json')
  try {
    fs.writeFileSync(filePath, JSON.stringify(users, null, 2), 'utf-8')
    console.log('User data successfully written to file.')
  } catch (err) {
    console.error('Error writing user data to file:', err)
  }
}
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find()
    res.json(users)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}
exports.getUser = async (req, res) => {
  try {
    const userId = req.params.id
    const users = readUsersFromFile()
    const user = await users.find((u) => u.id === userId)

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
    res.status(500).json({
      status: 'error',
      message: 'Internal server error'
    })
  }
}
exports.createUser = (req, res) => {
  const { name, surname, email, password, phone } = req.body

  try {
    const users = readUsersFromFile()

    const existingUser = users.find((user) => user.email === email)
    if (existingUser) {
      return res
        .status(400)
        .json({ message: 'User with this email already exists' })
    }

    const newUser = {
      id: uuidv4(),
      name,
      surname,
      email,
      password,
      phone
    }

    users.push(newUser)

    writeUsersToFile(users)

    res.status(201).json({
      status: 'success',
      data: newUser
    })
  } catch (err) {
    console.log(req.body)
    res.status(500).json({ message: err.message })
  }
}
exports.updateUser = (req, res) => {
  const { email, password, newPassword, confirmPassword, ...updateData } =
    req.body

  try {
    const users = readUsersFromFile()

    const existingUserIndex = users.findIndex((user) => user.email === email)

    if (existingUserIndex === -1) {
      return res.status(404).json({
        status: 'error',
        message: 'User not found'
      })
    }
    const existingUser = users[existingUserIndex]

    Object.assign(existingUser, updateData)

    if (newPassword && newPassword !== confirmPassword) {
      return res.status(400).json({
        status: 'error',
        message: 'New passwords do not match'
      })
    }

    if (newPassword) {
      existingUser.password = newPassword
    }

    writeUsersToFile(users)

    res.status(200).json({
      status: 'success',
      data: existingUser
    })
  } catch (error) {
    console.error(error)
    res.status(500).json({
      status: 'error',
      message: 'An error occurred while updating the user'
    })
  }
}
exports.deleteUser = (req, res) => {
  const { email, password } =
    req.body

  try {
    const users = readUsersFromFile()

    const userIndex = users.findIndex((user) => user.email === email)


    if (userIndex === -1) {
      return res.status(404).json({
        status: 'error',
        message: 'User not found'
      })
    }

    const user = users[userIndex];

    if (user.password !== password) {
      return res.status(401).json({
        status: 'error',
        message: 'Invalid password'
      });
    }
    users.splice(userIndex, 1)
    writeUsersToFile(users)

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

exports.loginUser = (req, res) => {
  const { email, password } = req.body
  const users = readUsersFromFile()
  const user = users.find((u) => u.email === email)

  if (!user) {
    return res.status(401).json({ message: 'Email not found' })
  }

  if (user.password !== password) {
    return res.status(401).json({ message: 'Invalid password' })
  }

  const token = jwt.sign({ userId: user.id }, secretKey, { expiresIn: '1h' })

  res.json({ token, id: user.id })
}
