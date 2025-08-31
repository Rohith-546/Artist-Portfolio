// MongoDB initialization script for Docker
db = db.getSiblingDB('artist-portfolio');

// Create initial admin user
db.users.insertOne({
  name: 'Admin User',
  email: 'admin@artistportfolio.com',
  password: '$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewdBPj/RK.s5uXXG', // admin123
  role: 'admin',
  isActive: true,
  createdAt: new Date(),
  updatedAt: new Date()
});

// Create default settings
db.settings.insertOne({
  businessInfo: {
    artistName: 'Your Artist Name',
    email: 'artist@example.com',
    phone: '+1 (555) 123-4567',
    address: '123 Art Street, Creative City, CC 12345',
    bio: 'Professional artist specializing in custom portraits and landscape paintings.',
    socialMedia: {
      instagram: '@youartistname',
      facebook: 'yourartistname',
      twitter: '@yourartistname'
    }
  },
  commissionSettings: {
    isAcceptingCommissions: true,
    ratePerPerson: 150,
    sizeMultipliers: {
      S: 1,
      M: 1.5,
      L: 2
    },
    allowedMediums: ['oil', 'watercolor', 'acrylic', 'digital'],
    maxFiles: 5,
    maxFileSize: 10485760, // 10MB in bytes
    estimatedDeliveryDays: {
      S: 14,
      M: 21,
      L: 30
    }
  },
  paymentInfo: {
    acceptedMethods: ['bank_transfer', 'paypal', 'stripe'],
    depositPercentage: 50,
    currency: 'USD'
  },
  createdAt: new Date(),
  updatedAt: new Date()
});

// Create sample artworks
db.artworks.insertMany([
  {
    title: 'Sunset Landscape',
    description: 'A beautiful landscape painting capturing the golden hour.',
    medium: 'oil',
    size: 'M',
    dimensions: '16x20 inches',
    price: 450,
    isAvailable: true,
    isFeatured: true,
    category: 'landscape',
    tags: ['sunset', 'nature', 'golden hour'],
    images: {
      main: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800',
      thumbnails: ['https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400']
    },
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    title: 'Portrait Study',
    description: 'A detailed portrait showcasing realistic features and lighting.',
    medium: 'acrylic',
    size: 'L',
    dimensions: '24x30 inches',
    price: 750,
    isAvailable: true,
    isFeatured: true,
    category: 'portrait',
    tags: ['portrait', 'realistic', 'people'],
    images: {
      main: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800',
      thumbnails: ['https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400']
    },
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    title: 'Abstract Expression',
    description: 'An abstract piece exploring color and emotion.',
    medium: 'acrylic',
    size: 'S',
    dimensions: '12x16 inches',
    price: 275,
    isAvailable: true,
    isFeatured: false,
    category: 'abstract',
    tags: ['abstract', 'colorful', 'modern'],
    images: {
      main: 'https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=800',
      thumbnails: ['https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=400']
    },
    createdAt: new Date(),
    updatedAt: new Date()
  }
]);

print('Database initialized successfully!');
