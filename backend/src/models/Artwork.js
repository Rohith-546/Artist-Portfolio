const mongoose = require('mongoose');

const artworkSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  medium: {
    type: String,
    required: true,
    enum: ['Oil Painting', 'Watercolor', 'Acrylic', 'Sketch', 'Digital']
  },
  genre: {
    type: String,
    required: true,
    enum: ['Oil Painting', 'Watercolor', 'Acrylic', 'Sketch', 'Digital']
  },
  size: {
    type: String,
    required: true
  },
  year: {
    type: Number,
    required: true,
    min: 1900,
    max: new Date().getFullYear() + 1
  },
  price: {
    type: Number,
    min: 0
  },
  isForSale: {
    type: Boolean,
    default: false
  },
  images: [{
    url: {
      type: String,
      required: true
    },
    publicId: String,
    altText: String
  }],
  isVisible: {
    type: Boolean,
    default: true
  },
  tags: [String],
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

artworkSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

artworkSchema.index({ medium: 1, genre: 1, year: 1, isVisible: 1 });

module.exports = mongoose.model('Artwork', artworkSchema);
