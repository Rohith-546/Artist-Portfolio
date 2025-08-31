// Mock artwork data for the gallery
export const mockArtworks = [
  {
    id: 1,
    title: "Sunset Horizon",
    description: "A breathtaking landscape capturing the golden hour as the sun sets over rolling hills. This piece explores the interplay of warm oranges and deep purples that dance across the evening sky.",
    medium: "Oil on Canvas",
    size: "L", // Large
    dimensions: "24x30 inches",
    price: 850,
    isAvailable: true,
    isFeatured: true,
    category: "landscape",
    tags: ["sunset", "landscape", "nature", "golden hour", "hills"],
    images: {
      main: "/paintings/1.avif",
      thumbnails: ["/paintings/1.avif"],
      fallback: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80"
    },
    yearCreated: 2024,
    inspiration: "Inspired by the peaceful evenings spent in the countryside, this painting captures the serene beauty of nature's daily transition from day to night.",
    technique: "Classical oil painting techniques with palette knife work for texture in the sky and smooth blending for the distant hills.",
    createdAt: new Date('2024-06-15'),
    updatedAt: new Date('2024-06-15')
  },
  {
    id: 2,
    title: "Ocean Dreams",
    description: "A mesmerizing seascape that captures the rhythmic dance of waves against the shore. The interplay of turquoise and deep blue creates a sense of infinite depth and tranquility.",
    medium: "Acrylic on Canvas",
    size: "M", // Medium
    dimensions: "18x24 inches",
    price: 650,
    isAvailable: true,
    isFeatured: true,
    category: "seascape",
    tags: ["ocean", "waves", "seascape", "blue", "water", "peaceful"],
    images: {
      main: "/paintings/2.avif",
      thumbnails: ["/paintings/2.avif"],
      fallback: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&q=80"
    },
    yearCreated: 2024,
    inspiration: "Created after a memorable trip to the Pacific coast, this piece aims to recreate the meditative feeling of watching endless waves roll onto the beach.",
    technique: "Layered acrylic technique with wet-on-wet blending for the water movement and dry brush technique for foam details.",
    createdAt: new Date('2024-07-20'),
    updatedAt: new Date('2024-07-20')
  },
  {
    id: 3,
    title: "Urban Symphony",
    description: "A vibrant cityscape that celebrates the energy and rhythm of urban life. Bold colors and dynamic brushstrokes convey the constant movement and pulse of the metropolitan environment.",
    medium: "Mixed Media",
    size: "L", // Large
    dimensions: "30x40 inches",
    price: 1200,
    isAvailable: true,
    isFeatured: false,
    category: "cityscape",
    tags: ["city", "urban", "buildings", "modern", "colorful", "abstract"],
    images: {
      main: "/paintings/3.avif",
      thumbnails: ["/paintings/3.avif"],
      fallback: "https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=800&q=80"
    },
    yearCreated: 2024,
    inspiration: "The bustling energy of downtown during rush hour, with its blend of architecture, lights, and human activity creating a symphony of urban life.",
    technique: "Mixed media approach combining acrylic paint, charcoal, and digital elements to create texture and depth that mirrors the complexity of city life.",
    createdAt: new Date('2024-08-10'),
    updatedAt: new Date('2024-08-10')
  }
];

// Helper function to get artwork by ID
export const getArtworkById = (id) => {
  return mockArtworks.find(artwork => artwork.id === parseInt(id));
};

// Helper function to get featured artworks
export const getFeaturedArtworks = () => {
  return mockArtworks.filter(artwork => artwork.isFeatured);
};

// Helper function to get artworks by category
export const getArtworksByCategory = (category) => {
  return mockArtworks.filter(artwork => artwork.category === category);
};

// Helper function to get available artworks
export const getAvailableArtworks = () => {
  return mockArtworks.filter(artwork => artwork.isAvailable);
};
