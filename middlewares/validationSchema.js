import { body, validationResult } from 'express-validator';

// Field validation rules
const fieldValidationRules = [
  body('name')
    .trim()
    .isLength({ min: 2, max: 100 })
    .withMessage('Field name must be between 2 and 100 characters'),
  
  body('description')
    .trim()
    .isLength({ min: 10, max: 500 })
    .withMessage('Description must be between 10 and 500 characters'),
  
  body('location')
    .trim()
    .isLength({ min: 3, max: 200 })
    .withMessage('Location must be between 3 and 200 characters'),
  
  body('size')
    .isIn(['5-a-side', '7-a-side', '11-a-side', 'Training'])
    .withMessage('Size must be one of: 5-a-side, 7-a-side, 11-a-side, Training'),
  
  body('surface')
    .isIn(['Grass', 'Artificial Grass', 'Turf', 'Indoor'])
    .withMessage('Surface must be one of: Grass, Artificial Grass, Turf, Indoor'),
  
  body('pricePerHour')
    .isFloat({ min: 0 })
    .withMessage('Price per hour must be a positive number'),
  
  body('amenities')
    .optional()
    .isArray()
    .withMessage('Amenities must be an array'),
  
  body('amenities.*')
    .optional()
    .isIn(['Lighting', 'Parking', 'Changing Rooms', 'Showers', 'Equipment', 'Refreshments', 'WiFi'])
    .withMessage('Invalid amenity type'),
  
  body('maxPlayers')
    .isInt({ min: 1 })
    .withMessage('Maximum players must be a positive integer'),
  
  body('openingHours.open')
    .optional()
    .matches(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/)
    .withMessage('Opening time must be in HH:MM format'),
  
  body('openingHours.close')
    .optional()
    .matches(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/)
    .withMessage('Closing time must be in HH:MM format')
];

// Update field validation rules (all fields optional)
const updateFieldValidationRules = [
  body('name')
    .optional()
    .trim()
    .isLength({ min: 2, max: 100 })
    .withMessage('Field name must be between 2 and 100 characters'),
  
  body('description')
    .optional()
    .trim()
    .isLength({ min: 10, max: 500 })
    .withMessage('Description must be between 10 and 500 characters'),
  
  body('location')
    .optional()
    .trim()
    .isLength({ min: 3, max: 200 })
    .withMessage('Location must be between 3 and 200 characters'),
  
  body('size')
    .optional()
    .isIn(['5-a-side', '7-a-side', '11-a-side', 'Training'])
    .withMessage('Size must be one of: 5-a-side, 7-a-side, 11-a-side, Training'),
  
  body('surface')
    .optional()
    .isIn(['Grass', 'Artificial Grass', 'Turf', 'Indoor'])
    .withMessage('Surface must be one of: Grass, Artificial Grass, Turf, Indoor'),
  
  body('pricePerHour')
    .optional()
    .isFloat({ min: 0 })
    .withMessage('Price per hour must be a positive number'),
  
  body('amenities')
    .optional()
    .isArray()
    .withMessage('Amenities must be an array'),
  
  body('amenities.*')
    .optional()
    .isIn(['Lighting', 'Parking', 'Changing Rooms', 'Showers', 'Equipment', 'Refreshments', 'WiFi'])
    .withMessage('Invalid amenity type'),
  
  body('maxPlayers')
    .optional()
    .isInt({ min: 1 })
    .withMessage('Maximum players must be a positive integer'),
  
  body('openingHours.open')
    .optional()
    .matches(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/)
    .withMessage('Opening time must be in HH:MM format'),
  
  body('openingHours.close')
    .optional()
    .matches(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/)
    .withMessage('Closing time must be in HH:MM format')
];

// Validation result handler
const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      message: 'Validation Error',
      errors: errors.array().map(error => ({
        field: error.path,
        message: error.msg,
        value: error.value
      }))
    });
  }
  next();
};

export {
  fieldValidationRules,
  updateFieldValidationRules,
  handleValidationErrors
};
