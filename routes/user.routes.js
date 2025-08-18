import express from 'express';
import { createBooking, getAvailability, myBookings } from '../controllers/booking.controller.js';
import { getFields } from '../controllers/admin.controller.js';
import { protect } from '../middlewares/auth.middleware.js';

const router = express.Router();

router.get('/availability', getAvailability);
router.get('/fields', getFields);
router.post('/bookings', protect, createBooking);
router.get('/bookings', protect, myBookings);

export default router;


