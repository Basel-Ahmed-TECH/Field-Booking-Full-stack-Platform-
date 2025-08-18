import mongoose from 'mongoose';
import dayjs from 'dayjs';

const bookingSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  field: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Field',
    required: true
  },
  from: {
    type: Date,
    required: true,
    validate: {
      validator: (value) => dayjs(value).isValid(),
      message: 'Invalid from date'
    }
  },
  to: {
    type: Date,
    required: true,
    validate: {
      validator: function (value) {
        return dayjs(value).isAfter(this.from);
      },
      message: 'End date must be after start date'
    }
  },
  depositPaid: {
    type: Boolean,
    default: false
  }
}, { timestamps: true });

bookingSchema.index({ field: 1, from: 1, to: 1 });

export default mongoose.model('Booking', bookingSchema);


