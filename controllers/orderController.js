const { readJsonFile, writeJsonFile } = require('../utills/fileUtils');

const createOrder = async (req, res) => {
  try {
    const dataPath = `${__dirname}/db`;
    const ordersFilePath = `${dataPath}/orders.json`;

    const orders = await readJsonFile(ordersFilePath);
    const newId = orders.length > 0 ? orders[orders.length - 1].id + 1 : 1;
    const newOrder = { id: newId, ...req.body };

    orders.push(newOrder);
    await writeJsonFile(ordersFilePath, orders);

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
    const dataPath = `${__dirname}/db`;
    const ordersFilePath = `${dataPath}/orders.json`;

    const orders = await readJsonFile(ordersFilePath);

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

module.exports = {
  createOrder,
  getOrders,
};
