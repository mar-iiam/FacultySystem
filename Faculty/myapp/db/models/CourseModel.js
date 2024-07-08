const { Model, DataTypes } = require('sequelize');
const sequelize = require('../dbconnection');
const User = require('./UserModel')

class Course extends Model {}

Course.init({
  ID: {
    type: DataTypes.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },
  courseName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  courseCode: {
    type: DataTypes.STRING,
    unique: true,  
  },
  courseHours: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  courseDay: {
    type: DataTypes.STRING,
    allowNull: false,
  }, 
  courseTime: {
    type: DataTypes.TIME,
    allowNull: false,
  },

  teacherID: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
        model: User,
        key: 'ID',
      },
  },
}, {
  sequelize,
  modelName: 'Course',
});

Course.belongsTo(User, { foreignKey: 'teacherID' });
User.hasMany(Course, { foreignKey: 'teacherID' }); 

module.exports = Course;
