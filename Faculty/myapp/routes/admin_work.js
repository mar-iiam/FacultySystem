const express = require('express');
const router = express.Router();
const fs = require('fs').promises; // Use promises-based fs module
const sequelize = require('../db/dbconnection');
const User = require('../db/models/UserModel');
const Course = require('../db/models/CourseModel');
const Exam = require('../db/models/ExamModel');

// Utility function to initialize the database
async function initializeDatabase() {
  try {
    await sequelize.sync({ alter: true });
    console.log('Database & tables checked and created/altered if necessary!');
  } catch (error) {
    console.error('Error initializing database:', error);
    throw new Error('Database initialization failed');
  }
}

// Utility function to read the photo file
async function readPhotoFile(photoPath) {
  try {
    return await fs.readFile(photoPath);
  } catch (error) {
    console.error('Error reading photo file:', error);
    throw new Error('Reading photo file failed');
  }
}

// Route to add a teacher
router.post('/add_teacher', async (req, res) => {
  const { firstName, lastName, email, NID, password, photo } = req.body;

  try {
    console.log(`Creating user: ${firstName} ${lastName}`);
    await initializeDatabase();
    const image = await readPhotoFile(photo);

    const user = await User.create({
      firstName,
      lastName,
      email,
      NID,
      password,
      roleID: 2,
      photo: image,
    });

    console.log('User created:', user.toJSON());
    res.status(201).send('User created successfully');
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).send('User email already exists');
  }
});

// Route to add a student
router.post('/add_student', async (req, res) => {
  const { firstName, lastName, email, NID, password, photo } = req.body;

  try {
    console.log(`Creating user: ${firstName} ${lastName}`);
    await initializeDatabase();
    const image = await readPhotoFile(photo);

    const user = await User.create({
      firstName,
      lastName,
      email,
      NID,
      password,
      roleID: 3,
      photo: image,
    });

    console.log('User created:', user.toJSON());
    res.status(201).send('User created successfully');
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).send('User email already exists');
  }
});

// Route to add a new course
router.post('/add_course', async (req, res) => {
  const { courseName, courseCode, courseHours, courseDay, courseTime } = req.body;

  try {
    console.log(`Creating course: ${courseName} ${courseCode}`);
    await initializeDatabase();

    const course = await Course.create({
      courseName,
      courseCode,
      courseHours,
      courseDay,
      courseTime,
    });

    console.log('Course created:', course.toJSON());
    res.status(201).send('Course created successfully');
  } catch (error) {
    console.error('Error creating course:', error);
    res.status(500).send('Course code already exists');
  }
});

// Route to add a new exam for a course
router.post('/add_exam', async (req, res) => {
  const { ExamDate, ExamTime, CourseID } = req.body;

  try {
    console.log(`Creating exam: ${ExamDate} ${ExamTime}`);
    await initializeDatabase();

    const exam = await Exam.create({
      ExamDate,
      ExamTime,
      CourseID,
    });

    console.log('Exam created:', exam.toJSON());
    res.status(201).send('Exam created successfully');
  } catch (error) {
    console.error('Error creating exam:', error);
    res.status(500).send('Something went wrong');
  }
});

// Route to assign a teacher to a course
router.patch('/assign_teacher', async (req, res) => {
  const { teacherId, CourseID } = req.body;

  try {
    console.log("Assigning teacher to course");
    await initializeDatabase();
    const course = await Course.findByPk(CourseID);

    if (!course) {
      return res.status(404).json({ error: 'Course not found' });
    }

    course.teacherID = teacherId;
    await course.save();

    console.log('Teacher assigned:', course.toJSON());
    res.status(200).send('Teacher assigned successfully');
  } catch (error) {
    console.error('Error assigning teacher:', error);
    res.status(500).send('Something went wrong');
  }
});

module.exports = router;
