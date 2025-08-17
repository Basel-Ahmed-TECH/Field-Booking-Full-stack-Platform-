const Field = require('../models/Field');

// @desc    Get all fields
// @route   GET /api/fields
// @access  Public
const getAllFields = async (req, res) => {
  try {
    const { size, surface, location, available, page = 1, limit = 10 } = req.query;
    
    // Build filter object
    const filter = {};
    if (size) filter.size = size;
    if (surface) filter.surface = surface;
    if (location) filter.location = { $regex: location, $options: 'i' };
    if (available !== undefined) filter.isAvailable = available === 'true';
    
    // Pagination
    const skip = (page - 1) * limit;
    
    const fields = await Field.find(filter)
      .select('-__v')
      .skip(skip)
      .limit(parseInt(limit))
      .sort({ createdAt: -1 });
    
    const total = await Field.countDocuments(filter);
    
    res.status(200).json({
      success: true,
      count: fields.length,
      total,
      page: parseInt(page),
      totalPages: Math.ceil(total / limit),
      data: fields
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server Error',
      error: error.message
    });
  }
};

// @desc    Get single field
// @route   GET /api/fields/:id
// @access  Public
const getFieldById = async (req, res) => {
  try {
    const field = await Field.findById(req.params.id).select('-__v');
    
    if (!field) {
      return res.status(404).json({
        success: false,
        message: 'Field not found'
      });
    }
    
    res.status(200).json({
      success: true,
      data: field
    });
  } catch (error) {
    if (error.kind === 'ObjectId') {
      return res.status(400).json({
        success: false,
        message: 'Invalid field ID'
      });
    }
    
    res.status(500).json({
      success: false,
      message: 'Server Error',
      error: error.message
    });
  }
};

// @desc    Create new field
// @route   POST /api/fields
// @access  Private (Admin only)
const createField = async (req, res) => {
  try {
    const field = await Field.create(req.body);
    
    res.status(201).json({
      success: true,
      data: field
    });
  } catch (error) {
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map(val => val.message);
      return res.status(400).json({
        success: false,
        message: 'Validation Error',
        errors: messages
      });
    }
    
    res.status(500).json({
      success: false,
      message: 'Server Error',
      error: error.message
    });
  }
};

// @desc    Update field
// @route   PUT /api/fields/:id
// @access  Private (Admin only)
const updateField = async (req, res) => {
  try {
    const field = await Field.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true
      }
    ).select('-__v');
    
    if (!field) {
      return res.status(404).json({
        success: false,
        message: 'Field not found'
      });
    }
    
    res.status(200).json({
      success: true,
      data: field
    });
  } catch (error) {
    if (error.kind === 'ObjectId') {
      return res.status(400).json({
        success: false,
        message: 'Invalid field ID'
      });
    }
    
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map(val => val.message);
      return res.status(400).json({
        success: false,
        message: 'Validation Error',
        errors: messages
      });
    }
    
    res.status(500).json({
      success: false,
      message: 'Server Error',
      error: error.message
    });
  }
};

// @desc    Delete field
// @route   DELETE /api/fields/:id
// @access  Private (Admin only)
const deleteField = async (req, res) => {
  try {
    const field = await Field.findByIdAndDelete(req.params.id);
    
    if (!field) {
      return res.status(404).json({
        success: false,
        message: 'Field not found'
      });
    }
    
    res.status(200).json({
      success: true,
      message: 'Field deleted successfully'
    });
  } catch (error) {
    if (error.kind === 'ObjectId') {
      return res.status(400).json({
        success: false,
        message: 'Invalid field ID'
      });
    }
    
    res.status(500).json({
      success: false,
      message: 'Server Error',
      error: error.message
    });
  }
};

// @desc    Toggle field availability
// @route   PATCH /api/fields/:id/toggle-availability
// @access  Private (Admin only)
const toggleFieldAvailability = async (req, res) => {
  try {
    const field = await Field.findById(req.params.id);
    
    if (!field) {
      return res.status(404).json({
        success: false,
        message: 'Field not found'
      });
    }
    
    field.isAvailable = !field.isAvailable;
    await field.save();
    
    res.status(200).json({
      success: true,
      data: field,
      message: `Field is now ${field.isAvailable ? 'available' : 'unavailable'}`
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server Error',
      error: error.message
    });
  }
};

// @desc    Toggle maintenance mode
// @route   PATCH /api/fields/:id/toggle-maintenance
// @access  Private (Admin only)
const toggleMaintenanceMode = async (req, res) => {
  try {
    const field = await Field.findById(req.params.id);
    
    if (!field) {
      return res.status(404).json({
        success: false,
        message: 'Field not found'
      });
    }
    
    field.maintenanceMode = !field.maintenanceMode;
    if (field.maintenanceMode) {
      field.isAvailable = false;
    }
    await field.save();
    
    res.status(200).json({
      success: true,
      data: field,
      message: `Field maintenance mode is now ${field.maintenanceMode ? 'enabled' : 'disabled'}`
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server Error',
      error: error.message
    });
  }
};

// @desc    Get fields by location
// @route   GET /api/fields/location/:location
// @access  Public
const getFieldsByLocation = async (req, res) => {
  try {
    const { location } = req.params;
    const fields = await Field.find({
      location: { $regex: location, $options: 'i' },
      isAvailable: true,
      maintenanceMode: false
    }).select('-__v');
    
    res.status(200).json({
      success: true,
      count: fields.length,
      data: fields
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server Error',
      error: error.message
    });
  }
};

// @desc    Get fields by size
// @route   GET /api/fields/size/:size
// @access  Public
const getFieldsBySize = async (req, res) => {
  try {
    const { size } = req.params;
    const fields = await Field.find({
      size: size,
      isAvailable: true,
      maintenanceMode: false
    }).select('-__v');
    
    res.status(200).json({
      success: true,
      count: fields.length,
      data: fields
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server Error',
      error: error.message
    });
  }
};

module.exports = {
  getAllFields,
  getFieldById,
  createField,
  updateField,
  deleteField,
  toggleFieldAvailability,
  toggleMaintenanceMode,
  getFieldsByLocation,
  getFieldsBySize
};
