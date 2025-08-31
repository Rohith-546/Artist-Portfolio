const express = require('express');
const {
  getSettings,
  updateSettings,
  getPublicSettings
} = require('../controllers/settingsController');
const { adminAuth } = require('../middleware/auth');
const { validateSettings } = require('../middleware/validation');

const router = express.Router();

// Public routes
// GET /api/settings/public
router.get('/public', getPublicSettings);

// Protected routes (admin only)
// GET /api/settings
router.get('/', adminAuth, getSettings);

// PUT /api/settings
router.put('/', adminAuth, validateSettings, updateSettings);

module.exports = router;
