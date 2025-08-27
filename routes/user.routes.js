import express from 'express';
import { createBooking, getAvailability, myBookings } from '../controllers/booking.controller.js';
import { getFields } from '../controllers/admin.controller.js';
import { protect } from '../middlewares/auth.middleware.js';

const router = express.Router();

// Get current user profile
router.get('/profile', protect, (req, res) => {
  try {
    // User data is already attached by the protect middleware (excluding password)
    res.json({
      success: true,
      user: req.user
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to get user profile'
    });
  }
});

router.get('/availability', getAvailability);
router.get('/fields', getFields);
router.post('/bookings', protect, createBooking);
router.get('/bookings', protect, myBookings);

export default router;


