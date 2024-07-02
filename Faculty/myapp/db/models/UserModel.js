// models/Teacher.js
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../dbconnection');

class User extends Model {}

User.init({
  ID :{
    type : DataTypes.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true
  },
  firstName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  lastName: {
    type: DataTypes.STRING
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  NID: {
    type: DataTypes.INTEGER, 
    allowNull: false
  },
  password: {
    type : DataTypes.STRING,
    allowNull:false
  },
  roleID :
  {
    type : DataTypes.INTEGER,
    allowNull : false
  },
  photo: {  // Add this field to store the photo as binary data
    type: DataTypes.BLOB,
    allowNull: true
  } 
}, {
  sequelize,
  modelName: 'User'
});

module.exports = User;
