const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
require('dotenv').config();

const User = require('../models/User');
const Artwork = require('../models/Artwork');
const Settings = require('../models/Settings');

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/artist-portfolio';

const sampleArtworks = [
  {
    title: "Sunset Dreams",
    description: "A vibrant oil painting capturing the golden hour over rolling hills. The warm colors blend seamlessly to create a dreamy atmosphere that evokes feelings of peace and tranquility.",
    medium: "Oil Painting",
    genre: "Oil Painting",
    size: "24x36 inches",
    year: 2023,
    price: 850,
    isForSale: true,
    images: [
      {
        url: "https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=800",
        altText: "Sunset Dreams oil painting showing golden hour landscape"
      }
    ],
    isVisible: true,
    tags: ["landscape", "sunset", "nature", "peaceful"]
  },
  {
    title: "Urban Symphony",
    description: "An acrylic masterpiece depicting the energy and chaos of city life through bold strokes and vibrant colors. This piece represents the harmony found within urban complexity.",
    medium: "Acrylic",
    genre: "Acrylic",
    size: "30x40 inches",
    year: 2023,
    price: 1200,
    isForSale: true,
    images: [
      {
        url: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800",
        altText: "Urban Symphony acrylic painting of city life"
      }
    ],
    isVisible: true,
    tags: ["urban", "city", "energy", "abstract"]
  },
  {
    title: "Watercolor Whispers",
    description: "Delicate watercolor flowers dancing across the canvas. The translucent layers create depth and movement, capturing the ephemeral beauty of spring blossoms.",
    medium: "Watercolor",
    genre: "Watercolor",
    size: "16x20 inches",
    year: 2024,
    price: 650,
    isForSale: true,
    images: [
      {
        url: "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=800",
        altText: "Watercolor Whispers painting with delicate flowers"
      }
    ],
    isVisible: true,
    tags: ["flowers", "delicate", "spring", "botanical"]
  },
  {
    title: "Digital Cosmos",
    description: "A stunning digital artwork exploring the mysteries of space and time. Created using cutting-edge digital techniques to visualize the cosmic dance of celestial bodies.",
    medium: "Digital",
    genre: "Digital",
    size: "Print - Various sizes available",
    year: 2024,
    price: 300,
    isForSale: true,
    images: [
      {
        url: "https://images.unsplash.com/photo-1502134249126-9f3755a50d78?w=800",
        altText: "Digital Cosmos artwork showing space and celestial bodies"
      }
    ],
    isVisible: true,
    tags: ["space", "digital", "cosmos", "futuristic"]
  },
  {
    title: "Charcoal Portrait Study",
    description: "An intimate charcoal sketch capturing the essence of human emotion. The careful play of light and shadow reveals the depth of character and soul.",
    medium: "Sketch",
    genre: "Sketch",
    size: "18x24 inches",
    year: 2023,
    isForSale: false,
    images: [
      {
        url: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800",
        altText: "Charcoal Portrait Study showing detailed human features"
      }
    ],
    isVisible: true,
    tags: ["portrait", "charcoal", "emotion", "study"]
  },
  {
    title: "Ocean Depths",
    description: "A powerful oil painting of crashing waves against rocky shores. The dynamic movement and rich blues capture the raw power and beauty of the ocean.",
    medium: "Oil Painting",
    genre: "Oil Painting",
    size: "36x48 inches",
    year: 2022,
    price: 1500,
    isForSale: true,
    images: [
      {
        url: "https://images.unsplash.com/photo-1505142468610-359e7d316be0?w=800",
        altText: "Ocean Depths oil painting with crashing waves"
      }
    ],
    isVisible: true,
    tags: ["ocean", "waves", "seascape", "power"]
  },
  {
    title: "Abstract Emotions",
    description: "A vibrant acrylic exploration of human feelings through color and form. Each brushstroke represents a different emotion, creating a symphony of visual sensation.",
    medium: "Acrylic",
    genre: "Acrylic",
    size: "24x30 inches",
    year: 2024,
    price: 900,
    isForSale: true,
    images: [
      {
        url: "https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=800",
        altText: "Abstract Emotions acrylic painting with vibrant colors"
      }
    ],
    isVisible: true,
    tags: ["abstract", "emotions", "colorful", "expressive"]
  },
  {
    title: "Mountain Mist",
    description: "A serene watercolor landscape depicting misty mountains at dawn. The soft washes of color create an ethereal quality that transports viewers to peaceful heights.",
    medium: "Watercolor",
    genre: "Watercolor",
    size: "20x24 inches",
    year: 2023,
    price: 750,
    isForSale: true,
    images: [
      {
        url: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800",
        altText: "Mountain Mist watercolor painting of misty peaks"
      }
    ],
    isVisible: true,
    tags: ["mountains", "mist", "landscape", "serene"]
  }
];

const seedDatabase = async () => {
  try {
    console.log('Connecting to MongoDB...');
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB');

    // Clear existing data
    console.log('Clearing existing data...');
    await User.deleteMany({});
    await Artwork.deleteMany({});
    await Settings.deleteMany({});

    // Create default admin user
    console.log('Creating admin user...');
    const hashedPassword = await bcrypt.hash('admin123', 12);
    const adminUser = new User({
      username: 'admin',
      email: 'admin@artistportfolio.com',
      password: hashedPassword,
      role: 'artist'
    });
    await adminUser.save();
    console.log('Admin user created - Email: admin@artistportfolio.com, Password: admin123');

    // Create default settings
    console.log('Creating default settings...');
    const settings = new Settings({
      ratePerPerson: 150,
      sizeMultipliers: {
        S: 1,
        M: 1.5,
        L: 2
      },
      contactEmail: 'admin@artistportfolio.com',
      businessName: 'Artist Portfolio & Custom Commissions'
    });
    await settings.save();
    console.log('Default settings created');

    // Create sample artworks
    console.log('Creating sample artworks...');
    for (const artworkData of sampleArtworks) {
      const artwork = new Artwork(artworkData);
      await artwork.save();
    }
    console.log(`${sampleArtworks.length} sample artworks created`);

    console.log('Database seeded successfully!');
    console.log('\nLogin credentials:');
    console.log('Email: admin@artistportfolio.com');
    console.log('Password: admin123');
    
  } catch (error) {
    console.error('Error seeding database:', error);
  } finally {
    await mongoose.disconnect();
    console.log('Disconnected from MongoDB');
  }
};

// Run the seed script
if (require.main === module) {
  seedDatabase();
}

module.exports = seedDatabase;
