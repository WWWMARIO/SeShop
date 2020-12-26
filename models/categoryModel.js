const Sequelize = require('sequelize');
const sequelize = require('../db/dbConfig');
const Item = require('./itemModel');
// const Item = require('./itemModel');

const Category = sequelize.define('category', {
  id: {
    type: Sequelize.INTEGER,
    unique: true,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: Sequelize.STRING,
    unique: true
  }
});

Category.hasMany(Item, { foreignKey: 'categoryId' });
Item.belongsTo(Category, { foreignKey: 'categoryId' });

module.exports = Category;
