var Sequelize = require("sequelize");

/* var dbConfig = {
  dbName: "seminar",
  user: "root",
  password: "",
  host: "localhost",
  dialect: "mysql",
}; */

var dbConfig = {
  dbName: "mmicetic",
  user: "mmicetic",
  password: "mario",
  host: "ucka.veleri.hr",
  dialect: "mysql",
};

var sequelize = new Sequelize(
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
