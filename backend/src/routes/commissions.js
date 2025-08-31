const express = require('express');
const {
  createCommission,
  getAllCommissions,
  getCommissionById,
  updateCommission,
  deleteCommission,
  getPriceCalculation,
  getCommissionStats
} = require('../controllers/commissionController');
const { adminAuth } = require('../middleware/auth');
const { validateCommission } = require('../middleware/validation');
const { uploadReferenceImages } = require('../middleware/upload');

const router = express.Router();

// Public routes
// POST /api/commissions
router.post('/', uploadReferenceImages, validateCommission, createCommission);

// GET /api/commissions/price-calculation
router.get('/price-calculation', getPriceCalculation);

// Protected routes (admin only)
// GET /api/commissions
router.get('/', adminAuth, getAllCommissions);

// GET /api/commissions/stats
router.get('/stats', adminAuth, getCommissionStats);

// GET /api/commissions/:id
router.get('/:id', adminAuth, getCommissionById);

// PUT /api/commissions/:id
router.put('/:id', adminAuth, updateCommission);

// DELETE /api/commissions/:id
router.delete('/:id', adminAuth, deleteCommission);

module.exports = router;
