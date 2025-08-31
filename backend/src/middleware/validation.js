const { body, validationResult } = require('express-validator');

const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      message: 'Validation failed',
      errors: errors.array()
    });
  }
  next();
};

const validateArtwork = [
  body('title')
    .trim()
    .isLength({ min: 1, max: 200 })
    .withMessage('Title must be between 1 and 200 characters'),
  body('description')
    .trim()
    .isLength({ min: 1, max: 2000 })
    .withMessage('Description must be between 1 and 2000 characters'),
  body('medium')
    .isIn(['Oil Painting', 'Watercolor', 'Acrylic', 'Sketch', 'Digital'])
    .withMessage('Invalid medium'),
  body('genre')
    .isIn(['Oil Painting', 'Watercolor', 'Acrylic', 'Sketch', 'Digital'])
    .withMessage('Invalid genre'),
  body('size')
    .trim()
    .isLength({ min: 1, max: 100 })
    .withMessage('Size must be between 1 and 100 characters'),
  body('year')
    .isInt({ min: 1900, max: new Date().getFullYear() + 1 })
    .withMessage('Year must be between 1900 and next year'),
  body('price')
    .optional()
    .isFloat({ min: 0 })
    .withMessage('Price must be a positive number'),
  body('isForSale')
    .optional()
    .isBoolean()
    .withMessage('isForSale must be a boolean'),
  body('isVisible')
    .optional()
    .isBoolean()
    .withMessage('isVisible must be a boolean'),
  handleValidationErrors
];

const validateCommission = [
  body('customerName')
    .trim()
    .isLength({ min: 1, max: 100 })
    .withMessage('Customer name must be between 1 and 100 characters'),
  body('email')
    .isEmail()
    .normalizeEmail()
    .withMessage('Valid email is required'),
  body('phone')
    .optional()
    .trim()
    .isLength({ max: 20 })
    .withMessage('Phone number must be less than 20 characters'),
  body('size')
    .isIn(['S', 'M', 'L'])
    .withMessage('Size must be S, M, or L'),
  body('medium')
    .isIn(['oil', 'watercolor', 'acrylic', 'digital'])
    .withMessage('Invalid medium'),
  body('numberOfPersons')
    .isInt({ min: 1, max: 10 })
    .withMessage('Number of persons must be between 1 and 10'),
  body('deadline')
    .isISO8601()
    .toDate()
    .custom((value) => {
      if (value <= new Date()) {
        throw new Error('Deadline must be in the future');
      }
      return true;
    })
    .withMessage('Valid future deadline is required'),
  body('description')
    .trim()
    .isLength({ min: 10, max: 2000 })
    .withMessage('Description must be between 10 and 2000 characters'),
  body('shippingAddress.country')
    .optional()
    .trim()
    .isLength({ max: 100 })
    .withMessage('Country must be less than 100 characters'),
  handleValidationErrors
];

const validateLogin = [
  body('email')
    .isEmail()
    .normalizeEmail()
    .withMessage('Valid email is required'),
  body('password')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters'),
  handleValidationErrors
];

const validateSettings = [
  body('ratePerPerson')
    .isFloat({ min: 0 })
    .withMessage('Rate per person must be a positive number'),
  body('sizeMultipliers.S')
    .optional()
    .isFloat({ min: 0.1 })
    .withMessage('Size multiplier S must be at least 0.1'),
  body('sizeMultipliers.M')
    .optional()
    .isFloat({ min: 0.1 })
    .withMessage('Size multiplier M must be at least 0.1'),
  body('sizeMultipliers.L')
    .optional()
    .isFloat({ min: 0.1 })
    .withMessage('Size multiplier L must be at least 0.1'),
  body('contactEmail')
    .optional()
    .isEmail()
    .normalizeEmail()
    .withMessage('Valid contact email is required'),
  handleValidationErrors
];

module.exports = {
  validateArtwork,
  validateCommission,
  validateLogin,
  validateSettings,
  handleValidationErrors
};
