var express = require('express');
var router = express.Router();
const fs = require('fs'); // Ensure fs is imported
const sequelize = require('../db/dbconnection'); // Import the sequelize instance
const User = require('../db/models/UserModel'); // Ensure the correct path to the User model

router.post('/add_teacher', function(req, res, next) {
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const email=req.body.email;
  const NID= req.body.NID;
  const password=req.body.password;
  const roleID = req.body.roleID;
  const photo = req.body.photo;
  
  console.log(firstName)
  sequelize.sync({ alter: true })
    .then(() => {
      console.log('Database & tables checked and created/altered if necessary!');
      const image =fs.readFileSync(photo)
      //'/home/marim/mariiam/Web/back/nodejs/FacuiltySystem/Faculty/myapp/public/images/1706911101940.jpg'
      return User.create({
        firstName: firstName,
        lastName: lastName,
        email: email,
        NID: NID,
        password : password,
        roleID: roleID,
        photo: image
      });
    })
    .then(user => { // Updated variable name from teacher to user
      console.log('User created:', user.toJSON());
      res.send('User created successfully');
    })
    .catch(error => {
      console.error('Unable to create/alter tables or user:', error);
      res.status(500).send('Error creating user');
    });
});


module.exports = router;
