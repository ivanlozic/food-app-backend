const Order = require('../models/orderModel'); 

// ...

const createOrder = async (req, res) => {
  try {
    const newOrder = new Order(req.body);

    await newOrder.save();

    res.status(201).json({
      status: 'success',
      data: {
        order: newOrder,
      },
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: 'Failed to create the order.',
    });
  }
};

const getOrders = async (req, res) => {
  try {
    const orders = await Order.find();

    res.status(200).json({
      status: 'success',
      data: {
        orders: orders,
      },
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: 'Failed to retrieve orders.',
    });
  }
};

// ...

module.exports = {
  createOrder,
  getOrders,
};