const Sequelize = require('sequelize');

const dbConfig = {
  dbName: 'mmicetic',
  user: 'mmicetic',
  password: 'mario',
  host: 'ucka.veleri.hr',
  dialect: 'mysql',
};

const sequelize = new Sequelize(
  dbConfig.dbName,
  dbConfig.user,
  dbConfig.password,
  {
    host: dbConfig.host,
    dialect: dbConfig.dialect,

    pool: {
      max: 5,
      min: 0,
      idle: 10000,
    },
  }
);

module.exports = sequelize;
