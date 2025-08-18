import Booking from '../models/Booking.js';
import dayjs from 'dayjs';

export const createBooking = async (req, res) => {
  try {
    const { field, from, to, depositPaid } = req.body;
    if (!field || !from || !to) return res.status(400).json({ message: 'field, from and to are required' });
    const booking = await Booking.create({ user: req.user?._id || req.body.user, field, from, to, depositPaid });
    res.status(201).json(booking);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

export const myBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ user: req.user?._id }).populate('field', 'name location');
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const updateBooking = async (req, res) => {
  try {
    const booking = await Booking.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!booking) return res.status(404).json({ message: 'Booking not found' });
    res.json(booking);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

export const deleteBooking = async (req, res) => {
  try {
    const booking = await Booking.findByIdAndDelete(req.params.id);
    if (!booking) return res.status(404).json({ message: 'Booking not found' });
    res.json({ message: 'Booking deleted successfully' });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

export const getAvailability = async (req, res) => {
  try {
    const { fieldId, field_id, date } = req.query;
    const effectiveFieldId = fieldId || field_id;
    if (!effectiveFieldId || !date) return res.status(400).json({ message: 'fieldId and date are required' });
    const dayStart = dayjs(date).startOf('day');
    const dayEnd = dayjs(date).endOf('day');
    const bookings = await Booking.find({
      field: effectiveFieldId,
      from: { $lt: dayEnd.toDate() },
      to: { $gt: dayStart.toDate() }
    }).select('from to');
    res.json({ bookings });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


