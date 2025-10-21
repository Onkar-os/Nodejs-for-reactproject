const express = require('express');
const router = express.Router();
const { loginUser, registerUser } = require('../Controller/LoginController');

// Register new user
router.post('/register', registerUser);

// Login user
router.post('/login', loginUser);

module.exports = router;
