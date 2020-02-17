const user = require('./user.db');
const Sequelize = require('sequelize');

const connect = () => {
    const address = process.env.MYSQL_ADDRESS;
    const database = 'game_tracker';
    const user = process.env.MYSQL_USER
    const password = process.env.MYSQL_PWD;
    const dialect = 'mysql';

    const databaseConnection = 
        new Sequelize(`${dialect}://${user}:${password}@${address}/${database}`);

    databaseConnection
      .authenticate()
      .then(() => {
        console.log('Database connection has been established successfully.');
      })
      .catch(err => {
        console.error('Unable to connect to the database:', err);
      });
};

module.exports =
{
    connect,
    user
};