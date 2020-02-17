const express = require('express');
const router = express.Router();
const { authentication: auth } = require('../controllers');
 
router.get('/login', auth.login);
router.post('/signup', auth.signup)
 
module.exports = router;