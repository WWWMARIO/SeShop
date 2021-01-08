const Sequelize = require('sequelize');
const sequelize = require('../db/dbConfig');
// const Item = require('./itemModel');

const Contact = sequelize.define('contact', {
  id: {
    type: Sequelize.INTEGER,
    unique: true,
    primaryKey: true,
    autoIncrement: true,
  },
  email: {
    type: Sequelize.STRING,
  },
  message: {
    type: Sequelize.STRING,
  },
});

module.exports = Contact;
