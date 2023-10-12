const mongoose = require('mongoose')
const secretKey = 'your-secret-key'
const jwt = require('jsonwebtoken')


const userSchema = new mongoose.Schema({
  id: {
    type: mongoose.Schema.Types.Mixed,
    required: true
  },
  Firstname: {
    type: String,
    required: true
  },
  Lastname: {
    type: String,
    required: true
  },
  Email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  Password: {
    type: String,
    required: true,
    minlength: 8
  },
  ConfirmPassword: {
    type: String,
    required: true,
    validate: {
      validator: function (el) {
        return el === this.password
      },
      message: 'Passwords are not the same!'
    }
  },
  MobilePhone: {
    type: Number,
    required: true
  },
  Address: {
    type: String, 
    required: true
  },
  City: {
    type: String, 
    required: true
  },
  Country: {
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
