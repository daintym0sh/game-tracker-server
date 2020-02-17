const express = require('express');
const router = express.Router();
const { authentication } = require('../controllers');
 
router.get('/authentication', authentication.getUserById);
 
module.exports = router;