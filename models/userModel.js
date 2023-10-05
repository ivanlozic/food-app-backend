const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const secretKey = 'your-secret-key'
const jwt = require('jsonwebtoken')


const userSchema = new mongoose.Schema({
  id: {
    type: Number
  },
  name: {
    type: String,
    required: true
  },
  surname: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true,
    minlength: 8
  },
  passwordConfirm: {
    type: String,
    required: true,
    validate: {
      validator: function (el) {
        return el === this.password
      },
      message: 'Passwords are not the same!'
    }
  },
  phone: {
    type: Number,
    required: true
  }
})

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    return next()
  }
  try {
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)
    next()
  } catch (error) {
    return next(error)
  }
})

userSchema.methods.generateAuthToken = function () {
  const token = jwt.sign({ userId: this._id }, `${secretKey}`, {
    expiresIn: '1h'
  })
  return token
}

const User = mongoose.model('User', userSchema)

module.exports = User
