const express = require('express');
const router = express.Router();
const {
  getAllFields,
  getFieldById,
  createField,
  updateField,
  deleteField,
  toggleFieldAvailability,
  toggleMaintenanceMode,
  getFieldsByLocation,
  getFieldsBySize
} = require('../controllers/field.controller');

// Public routes
router.get('/', getAllFields);
router.get('/location/:location', getFieldsByLocation);
router.get('/size/:size', getFieldsBySize);
router.get('/:id', getFieldById);

// Admin only routes (will be protected by auth middleware)
router.post('/', createField);
router.put('/:id', updateField);
router.delete('/:id', deleteField);
router.patch('/:id/toggle-availability', toggleFieldAvailability);
router.patch('/:id/toggle-maintenance', toggleMaintenanceMode);

module.exports = router;
