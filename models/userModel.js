const Sequelize = require('sequelize');
const sequelize = require('../db/dbConfig');

const User = sequelize.define('user', {
  id: {
    type: Sequelize.INTEGER,
    unique: true,
    primaryKey: true,
  },
  firstName: {
    type: Sequelize.STRING,
  },
  lastName: {
    type: Sequelize.STRING,
  },
  email: {
    type: Sequelize.STRING,
    unique: true,
  },
  address: {
    type: Sequelize.STRING,
  },
  phoneNumber: {
    type: Sequelize.INTEGER,
  },
  password: {
    type: Sequelize.STRING,
  },
});

module.exports = User;
