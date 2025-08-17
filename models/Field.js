const mongoose = require('mongoose');

const fieldSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Field name is required'],
    trim: true,
    maxlength: [100, 'Field name cannot exceed 100 characters']
  },
  description: {
    type: String,
    required: [true, 'Field description is required'],
    maxlength: [500, 'Description cannot exceed 500 characters']
  },
  location: {
    type: String,
    required: [true, 'Field location is required'],
    trim: true
  },
  size: {
    type: String,
    required: [true, 'Field size is required'],
    enum: ['5-a-side', '7-a-side', '11-a-side', 'Training']
  },
  surface: {
    type: String,
    required: [true, 'Field surface type is required'],
    enum: ['Grass', 'Artificial Grass', 'Turf', 'Indoor']
  },
  pricePerHour: {
    type: Number,
    required: [true, 'Price per hour is required'],
    min: [0, 'Price cannot be negative']
  },
  amenities: [{
    type: String,
    enum: ['Lighting', 'Parking', 'Changing Rooms', 'Showers', 'Equipment', 'Refreshments', 'WiFi']
  }],
  images: [{
    type: String
  }],
  isAvailable: {
    type: Boolean,
    default: true
  },
  maintenanceMode: {
    type: Boolean,
    default: false
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
  },
  maxPlayers: {
    type: Number,
    required: [true, 'Maximum players capacity is required'],
    min: [1, 'Maximum players must be at least 1']
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

module.exports = mongoose.model('Field', fieldSchema);
