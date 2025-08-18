import express from 'express';
import { protect, adminOnly } from '../middlewares/auth.middleware.js';
import {
  getUsers,
  createUser,
  updateUser,
  deleteUser,
  getBookings,
  deleteBooking,
  getFields,
  createField,
  updateField,
  deleteField
} from '../controllers/admin.controller.js';
import { createBooking, updateBooking } from '../controllers/booking.controller.js';

const router = express.Router();
router.use(protect, adminOnly);

router.get('/users', getUsers);
router.post('/users', createUser);
router.put('/users/:id', updateUser);
router.delete('/users/:id', deleteUser);

router.get('/bookings', getBookings);
router.post('/bookings', createBooking);
router.put('/bookings/:id', updateBooking);
router.delete('/bookings/:id', deleteBooking);

router.get('/fields', getFields);
router.post('/fields', createField);
router.put('/fields/:id', updateField);
router.delete('/fields/:id', deleteField);

export default router;


