const User = require('../user')
const path = require('path')
const fs = require('fs')

function readUsersFromFile() {
  const filePath = path.join(__dirname, '../data/users.json')
  const fileContents = fs.readFileSync(filePath, 'utf-8')
  return JSON.parse(fileContents)
}

function writeUsersToFile(users) {
  const filePath = path.join(__dirname, '../data/users.json')
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
exports.getUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'This route is not yet defined!'
  })
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
  res.status(500).json({
    status: 'error',
    message: 'This route is not yet defined!'
  })
}
exports.deleteUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'This route is not yet defined!'
  })
}
