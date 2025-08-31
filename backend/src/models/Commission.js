const mongoose = require('mongoose');

const commissionSchema = new mongoose.Schema({
  // Customer Information
  customerName: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true
  },
  phone: {
    type: String,
    trim: true
  },
  
  // Commission Details
  size: {
    type: String,
    required: true,
    enum: ['S', 'M', 'L']
  },
  medium: {
    type: String,
    required: true,
    enum: ['oil', 'watercolor', 'acrylic', 'digital']
  },
  numberOfPersons: {
    type: Number,
    required: true,
    min: 1,
    max: 10
  },
  deadline: {
    type: Date,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  
  // Reference Images
  referenceImages: [{
    url: String,
    publicId: String,
    originalName: String
  }],
  
  // Shipping Information
  shippingAddress: {
    street: String,
    city: String,
    state: String,
    zipCode: String,
    country: String
  },
  
  // Pricing
  totalPrice: {
    type: Number,
    required: true,
    min: 0
  },
  ratePerPerson: {
    type: Number,
    required: true
  },
  sizeMultiplier: {
    type: Number,
    required: true,
    default: 1
  },
  
  // Status and Management
  status: {
    type: String,
    enum: ['New', 'In Progress', 'Completed', 'Shipped'],
    default: 'New'
  },
  internalNotes: {
    type: String
  },
  
  // Timestamps
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

commissionSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

commissionSchema.index({ status: 1, createdAt: -1 });
commissionSchema.index({ email: 1 });

module.exports = mongoose.model('Commission', commissionSchema);
