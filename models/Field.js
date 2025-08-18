import mongoose from 'mongoose';

const fieldSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Field name is required'],
    trim: true,
    maxlength: [100, 'Field name cannot exceed 100 characters']
  },
  location: {
    type: String,
    required: [true, 'Field location is required'],
    trim: true
  },
  pricePerHour: {
    type: Number,
    required: [true, 'Price per hour is required'],
    min: [0, 'Price cannot be negative']
  },
  images: [{
    type: String
  }],
  isAvailable: {
    type: Boolean,
    default: true
  },

  openingHours: {
    open: {
      type: String,
      default: '06:00'
    },
    close: {
      type: String,
      default: '22:00'
    }
  }
}, {
  timestamps: true
});

// Index for better query performance
fieldSchema.index({ location: 1, size: 1, isAvailable: 1 });

// Virtual for field status
fieldSchema.virtual('status').get(function() {
  if (this.maintenanceMode) return 'Maintenance';
  if (!this.isAvailable) return 'Unavailable';
  return 'Available';
});

// Ensure virtual fields are serialized
fieldSchema.set('toJSON', { virtuals: true });
fieldSchema.set('toObject', { virtuals: true });

export default mongoose.model('Field', fieldSchema);
