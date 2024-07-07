const express = require('express');
const router = express.Router();
const fs = require('fs').promises; // Use promises-based fs module
const sequelize = require('../db/dbconnection');
const User = require('../db/models/UserModel');

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
  const { firstName, lastName, email, NID, password, roleID, photo } = req.body;

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
      roleID,
      photo: image,
    });

    console.log('User created:', user.toJSON());
    res.status(201).send('User created successfully');
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).send('Error creating user');
  }
});

module.exports = router;