const Sequelize = require('sequelize');
const logger = require('./logger');

const address = process.env.MYSQL_ADDRESS;
const database = 'game_tracker';
const user = process.env.MYSQL_USER
const password = process.env.MYSQL_PWD;
const dialect = 'mysql';

const sequelize = 
    new Sequelize(`${dialect}://${user}:${password}@${address}/${database}`);

sequelize
    .authenticate()
    .then(() => {
        logger.info('Database connection has been established successfully.');
    })
    .catch(err => {
        logger.info('Unable to connect to the database:', err);
    });

module.exports = {
    sequelize,
    DataTypes: Sequelize.DataTypes
};