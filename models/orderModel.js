const Sequelize = require('sequelize');
const sequelize = require('../db/dbConfig');
const OrderItem = require('./orderItemModel');
// const User = require('./userModel');

const Order = sequelize.define('order', {
  /*  id: {
    type: Sequelize.INTEGER,
    unique: true,
    primaryKey: true,
  }, */
  userId: {
    type: Sequelize.INTEGER,
  },
  total: {
    type: Sequelize.FLOAT,
  },
});

Order.hasMany(OrderItem, { foreignKey: 'orderId' });
OrderItem.belongsTo(Order, { foreignKey: 'orderId' });

module.exports = Order;
