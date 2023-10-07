const mongoose = require('mongoose');


const orderSchema = new mongoose.Schema({
    FirstName: String,
    LastName: String,
    Address: String,
    Email: String,
    MobilePhone: String,
    order: {
      type: Array,
      default: [],
    },
    totalAmount: Number,
    date: Date,
  });
  

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;