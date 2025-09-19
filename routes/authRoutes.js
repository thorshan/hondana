const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// Authentication
router.post('/auth', authController);

module.exports = router;