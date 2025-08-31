const multer = require('multer');
const path = require('path');
const fs = require('fs');
const { uploadImage } = require('../config/cloudinary');

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = 'uploads/temp';
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const fileFilter = (req, file, cb) => {
  const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Invalid file type. Only JPEG, PNG, and WebP images are allowed.'), false);
  }
};

const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB limit
    files: 5 // Maximum 5 files
  }
});

// Middleware for reference image uploads (for commissions)
const uploadReferenceImages = async (req, res, next) => {
  const uploadMultiple = upload.array('referenceImages', 5);
  
  uploadMultiple(req, res, async (err) => {
    if (err) {
      return res.status(400).json({ message: err.message });
    }

    if (req.files && req.files.length > 0) {
      try {
        const uploadedImages = [];
        
        for (const file of req.files) {
          const result = await uploadImage(file, 'commissions/references');
          uploadedImages.push({
            url: result.url,
            publicId: result.publicId,
            originalName: file.originalname
          });
          
          // Clean up temp file
          fs.unlinkSync(file.path);
        }
        
        req.uploadedImages = uploadedImages;
      } catch (error) {
        console.error('Image upload error:', error);
        return res.status(500).json({ message: 'Error uploading images' });
      }
    }
    
    next();
  });
};

// Middleware for artwork image uploads
const uploadArtworkImages = async (req, res, next) => {
  const uploadMultiple = upload.array('images', 10);
  
  uploadMultiple(req, res, async (err) => {
    if (err) {
      return res.status(400).json({ message: err.message });
    }

    if (req.files && req.files.length > 0) {
      try {
        const uploadedImages = [];
        
        for (const file of req.files) {
          const result = await uploadImage(file, 'artworks');
          uploadedImages.push({
            url: result.url,
            publicId: result.publicId,
            altText: req.body.altText || ''
          });
          
          // Clean up temp file
          fs.unlinkSync(file.path);
        }
        
        req.uploadedImages = uploadedImages;
      } catch (error) {
        console.error('Image upload error:', error);
        return res.status(500).json({ message: 'Error uploading images' });
      }
    }
    
    next();
  });
};

module.exports = {
  uploadReferenceImages,
  uploadArtworkImages
};
