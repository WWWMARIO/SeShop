const Sequelize = require('sequelize');
const sequelize = require('../db/dbConfig');

const OrderItem = sequelize.define('orderItem', {
  orderId: {
    type: Sequelize.INTEGER,
  },
  itemId: {
    type: Sequelize.INTEGER,
  },
  amount: {
    type: Sequelize.INTEGER,
  },
});

module.exports = OrderItem;
