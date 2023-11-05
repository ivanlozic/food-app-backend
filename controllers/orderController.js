const Order = require('../models/orderModel')

const createOrder = async (req, res) => {
  try {
    const highestOrderId = await Order.findOne({})
      .sort({ reservationId: -1 })
      .select('reservationId')

    let newReservationId = 1

    if (highestOrderId && !isNaN(highestOrderId.reservationId)) {
      newReservationId = highestOrderId.reservationId + 1
    }

    console.log(newReservationId)

    const newOrder = new Order({
      reservationId: newReservationId,
      ...req.body
    })

    await newOrder.save()

    res.status(201).json({
      status: 'success',
      data: {
        order: newOrder
      }
    })
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: 'Failed to create the order.'
    })
    console.log(error)
  }
}

const getOrders = async (req, res) => {
  const userId = req.params.userId

  try {
    const orders = await Order.find({ UserId: userId })

    if (orders.length === 0) {
      res.status(200).json({
        status: 'success',
        data: {
          orders: []
        }
      })
    } else {
      res.status(200).json({
        status: 'success',
        data: {
          orders: orders
        }
      })
    }
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: 'Failed to retrieve orders.'
    })
  }
}

module.exports = {
  createOrder,
  getOrders
}
