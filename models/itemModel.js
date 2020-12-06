const Sequelize = require('sequelize');
const sequelize = require('../db/dbConfig');

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
});

module.exports = Item;
