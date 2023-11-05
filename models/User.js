const mongoose = require('mongoose')
const secretKey = 'your-secret-key'
const jwt = require('jsonwebtoken')


const userSchema = new mongoose.Schema({
  id: {
    type: mongoose.Schema.Types.Mixed,
    required: true
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
  confirmPassword: {
    type: String,
    required: true,
    validate: {
      validator: function (el) {
        return el === this.password
      },
      message: 'Passwords are not the same!'
    }
  },
  phoneNumber: {
    type: Number,
    required: true
  },
  address: {
    type: String, 
    required: true
  },
  city: {
    type: String, 
    required: true
  },
  country: {
    type: String,
    required: true
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
