const express = require('express');
const {
  getAllArtworks,
  getArtworkById,
  createArtwork,
  updateArtwork,
  deleteArtwork,
  getArtworkStats
} = require('../controllers/artworkController');
const { adminAuth } = require('../middleware/auth');
const { validateArtwork } = require('../middleware/validation');
const { uploadArtworkImages } = require('../middleware/upload');

const router = express.Router();

// Public routes
// GET /api/artworks
router.get('/', getAllArtworks);

// GET /api/artworks/:id
router.get('/:id', getArtworkById);

// Protected routes (admin only)
// POST /api/artworks
router.post('/', adminAuth, uploadArtworkImages, validateArtwork, createArtwork);

// PUT /api/artworks/:id
router.put('/:id', adminAuth, uploadArtworkImages, validateArtwork, updateArtwork);

// DELETE /api/artworks/:id
router.delete('/:id', adminAuth, deleteArtwork);

// GET /api/artworks/admin/stats
router.get('/admin/stats', adminAuth, getArtworkStats);

module.exports = router;
