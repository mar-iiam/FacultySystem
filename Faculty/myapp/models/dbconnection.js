const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('LMSDatabase', 'root', '', {
  host: 'localhost',
  dialect: 'mysql' // Choose the database dialect you are using
});

module.exports = sequelize;