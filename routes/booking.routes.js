import express from 'express';
import { createBooking, myBookings, updateBooking, deleteBooking } from '../controllers/booking.controller.js';
import { protect } from '../middlewares/auth.middleware.js';

const router = express.Router();

router.post('/', protect, createBooking);
router.get('/', protect, myBookings);
router.put('/:id', protect, updateBooking);
router.delete('/:id', protect, deleteBooking);

export default router;


