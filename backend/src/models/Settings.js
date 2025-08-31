const mongoose = require('mongoose');

const settingsSchema = new mongoose.Schema({
  ratePerPerson: {
    type: Number,
    required: true,
    min: 0,
    default: 100
  },
  sizeMultipliers: {
    S: {
      type: Number,
      default: 1,
      min: 0.1
    },
    M: {
      type: Number,
      default: 1.5,
      min: 0.1
    },
    L: {
      type: Number,
      default: 2,
      min: 0.1
    }
  },
  contactEmail: {
    type: String,
    required: true,
    trim: true,
    lowercase: true
  },
  businessName: {
    type: String,
    default: 'Artist Portfolio'
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

settingsSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

// Ensure only one settings document exists
settingsSchema.statics.getInstance = async function() {
  let settings = await this.findOne();
  if (!settings) {
    settings = await this.create({
      ratePerPerson: 100,
      sizeMultipliers: { S: 1, M: 1.5, L: 2 },
      contactEmail: process.env.ARTIST_EMAIL || 'artist@example.com'
    });
  }
  return settings;
};

module.exports = mongoose.model('Settings', settingsSchema);
