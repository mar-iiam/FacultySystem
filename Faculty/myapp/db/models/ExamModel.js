const { Model, DataTypes } = require('sequelize');
const sequelize = require('../dbconnection');
const Course = require('./CourseModel')

class Exam extends Model {}

Exam.init({
  ID: {
    type: DataTypes.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },
  ExamDate: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },
  ExamTime: {
    type: DataTypes.TIME,
    allowNull: false,
  },
  CourseID: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
        model: Course,
        key: 'ID',
      },
  },
}, {
  sequelize,
  modelName: 'Exam',
});

Exam.belongsTo(Course, { foreignKey: 'CourseID' });
Course.hasMany(Exam, { foreignKey: 'CourseID' }); 

module.exports = Exam;
