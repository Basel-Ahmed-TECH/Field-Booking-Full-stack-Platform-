import express from 'express';
import {
  getAllFields,
  getFieldById,
  createField,
  updateField,
  deleteField,
  toggleFieldAvailability,
  toggleMaintenanceMode,
  getFieldsByLocation,
  getFieldsBySize
} from '../controllers/field.controller.js';

const router = express.Router();

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

export default router;
