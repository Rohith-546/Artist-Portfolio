const Artwork = require('../models/Artwork');
const { deleteImage } = require('../config/cloudinary');

const getAllArtworks = async (req, res) => {
  try {
    const { medium, genre, year, isVisible, page = 1, limit = 12 } = req.query;
    const query = {};

    // Build query filters
    if (medium && medium !== 'All') query.medium = medium;
    if (genre && genre !== 'All') query.genre = genre;
    if (year) query.year = parseInt(year);
    
    // For public requests, only show visible artworks
    if (req.user) {
      if (isVisible !== undefined) query.isVisible = isVisible === 'true';
    } else {
      query.isVisible = true;
    }

    // Pagination
    const pageNum = parseInt(page);
    const limitNum = parseInt(limit);
    const skip = (pageNum - 1) * limitNum;

    const artworks = await Artwork.find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limitNum)
      .lean();

    const total = await Artwork.countDocuments(query);

    res.json({
      artworks,
      pagination: {
        current: pageNum,
        pages: Math.ceil(total / limitNum),
        total,
        hasNext: pageNum < Math.ceil(total / limitNum),
        hasPrev: pageNum > 1
      }
    });
  } catch (error) {
    console.error('Get artworks error:', error);
    res.status(500).json({ message: 'Server error getting artworks' });
  }
};

const getArtworkById = async (req, res) => {
  try {
    const { id } = req.params;
    
    const query = { _id: id };
    // For public requests, only show visible artworks
    if (!req.user) {
      query.isVisible = true;
    }

    const artwork = await Artwork.findOne(query);
    
    if (!artwork) {
      return res.status(404).json({ message: 'Artwork not found' });
    }

    res.json(artwork);
  } catch (error) {
    console.error('Get artwork by ID error:', error);
    res.status(500).json({ message: 'Server error getting artwork' });
  }
};

const createArtwork = async (req, res) => {
  try {
    const artworkData = req.body;
    
    const artwork = new Artwork(artworkData);
    await artwork.save();

    res.status(201).json({
      message: 'Artwork created successfully',
      artwork
    });
  } catch (error) {
    console.error('Create artwork error:', error);
    res.status(500).json({ message: 'Server error creating artwork' });
  }
};

const updateArtwork = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    const artwork = await Artwork.findByIdAndUpdate(
      id,
      updateData,
      { new: true, runValidators: true }
    );

    if (!artwork) {
      return res.status(404).json({ message: 'Artwork not found' });
    }

    res.json({
      message: 'Artwork updated successfully',
      artwork
    });
  } catch (error) {
    console.error('Update artwork error:', error);
    res.status(500).json({ message: 'Server error updating artwork' });
  }
};

const deleteArtwork = async (req, res) => {
  try {
    const { id } = req.params;

    const artwork = await Artwork.findById(id);
    if (!artwork) {
      return res.status(404).json({ message: 'Artwork not found' });
    }

    // Delete images from Cloudinary
    for (const image of artwork.images) {
      if (image.publicId) {
        try {
          await deleteImage(image.publicId);
        } catch (error) {
          console.error('Error deleting image from Cloudinary:', error);
        }
      }
    }

    await Artwork.findByIdAndDelete(id);

    res.json({ message: 'Artwork deleted successfully' });
  } catch (error) {
    console.error('Delete artwork error:', error);
    res.status(500).json({ message: 'Server error deleting artwork' });
  }
};

const getArtworkStats = async (req, res) => {
  try {
    const totalArtworks = await Artwork.countDocuments({ isVisible: true });
    const totalHidden = await Artwork.countDocuments({ isVisible: false });
    const forSale = await Artwork.countDocuments({ isForSale: true, isVisible: true });
    
    const mediumStats = await Artwork.aggregate([
      { $match: { isVisible: true } },
      { $group: { _id: '$medium', count: { $sum: 1 } } },
      { $sort: { count: -1 } }
    ]);

    const yearStats = await Artwork.aggregate([
      { $match: { isVisible: true } },
      { $group: { _id: '$year', count: { $sum: 1 } } },
      { $sort: { _id: -1 } },
      { $limit: 10 }
    ]);

    res.json({
      totalArtworks,
      totalHidden,
      forSale,
      mediumStats,
      yearStats
    });
  } catch (error) {
    console.error('Get artwork stats error:', error);
    res.status(500).json({ message: 'Server error getting artwork stats' });
  }
};

module.exports = {
  getAllArtworks,
  getArtworkById,
  createArtwork,
  updateArtwork,
  deleteArtwork,
  getArtworkStats
};
