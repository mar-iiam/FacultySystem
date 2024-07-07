const sequelize = require('./dbconnection');
sequelize.authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });


sequelize.sync({ alter: true })
  .then(() => {
    console.log('Database & tables checked and created/altered if necessary!');
  })
  .catch(error => {
    console.error('Unable to create/alter tables:', error);
  });
