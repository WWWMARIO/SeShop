const Sequelize = require('sequelize');
const sequelize = require('../db/dbConfig');

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

module.exports = Order;
