// routes/authRoutes.js
const express = require('express');
const router = express.Router();

//  Import controller
const { login } = require('../controllers/authController');

//  Route: POST /api/auth/login
router.post('/login', login);

module.exports = router;
