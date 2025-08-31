const express = require('express');
const { login, getProfile, verifyToken } = require('../controllers/authController');
const { auth } = require('../middleware/auth');
const { validateLogin } = require('../middleware/validation');

const router = express.Router();

// POST /api/auth/login
router.post('/login', validateLogin, login);

// GET /api/auth/profile
router.get('/profile', auth, getProfile);

// GET /api/auth/verify
router.get('/verify', auth, verifyToken);

module.exports = router;
