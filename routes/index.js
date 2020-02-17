const express = require('express');
const routes = express.Router();
const secureRoutes = express.Router();
const { auth } = require('../controllers');
 
routes.post('/login', auth.login);
routes.post('/signup', auth.signup);
secureRoutes.get('/test', auth.test);

module.exports = {
    routes,
    secureRoutes
};