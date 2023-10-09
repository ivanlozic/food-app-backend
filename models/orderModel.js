const mongoose = require('mongoose')

const orderSchema = new mongoose.Schema({
  reservationId: Number,
  UserId: mongoose.Schema.Types.Mixed,
  FirstName: String,
  LastName: String,
  Address: String,
  Email: String,
  MobilePhone: String,
  order: {
    type: Array,
    default: []
  },
  city: String,
  country: String,
  totalAmount: Number,
  date: Date
})

const Order = mongoose.model('Order', orderSchema)

module.exports = Order
