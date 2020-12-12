const Sequelize = require('sequelize');
const sequelize = require('../db/dbConfig');
const User = require('./userModel');
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

/* Order.associate = (models) => {
  Order.belongsTo(models.user, { foreignKey: 'userId' });
}; */
/* Order.belongsTo(User, { foreignKey: 'userId' });
 */

module.exports = Order;
