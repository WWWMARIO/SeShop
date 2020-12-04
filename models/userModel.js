var sequelize = require("../db/dbConfig");
var Sequelize = require("sequelize");

var User = sequelize.define("user", {
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
