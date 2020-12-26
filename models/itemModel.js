const Sequelize = require('sequelize');
const sequelize = require('../db/dbConfig');
const OrderItem = require('./orderItemModel');

const Item = sequelize.define('item', {
  /*  id: {
    type: Sequelize.INTEGER,
    unique: true,
    primaryKey: true,
  }, */
  name: {
    type: Sequelize.STRING,
    unique: true,
  },
  price: {
    type: Sequelize.FLOAT,
  },
  description: {
    type: Sequelize.STRING,
  },
  picture: {
    type: Sequelize.STRING,
  },
  categoryId: {
    type: Sequelize.INTEGER,
  },

});

Item.hasMany(OrderItem, { foreignKey: 'itemId' });
OrderItem.belongsTo(Item, { foreignKey: 'itemId' });

module.exports = Item;
