const express = require('express');
const router = express.Router();
const { protect, admin } = require('../middleware/authMiddleware');
const User = require('../models/User');
const userController = require('../controllers/userController');

// @desc    Update user profile
// @route   PUT /api/users/update
// @access  Private
router.put('/update', protect, async (req, res) => {
  try {
    const { updates } = req.body;
    const userId = req.user._id;

    if (!updates || typeof updates !== 'object') {
      return res.status(400).json({ 
        success: false,
        message: 'Invalid update data' 
      });
    }

    const restrictedFields = ['password', 'role', 'isAdmin', 'email', '_id'];
    restrictedFields.forEach(field => {
      if (updates[field]) delete updates[field];
    });

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { $set: updates },
      { new: true, runValidators: true }
    ).select('-password -__v');

    if (!updatedUser) {
      return res.status(404).json({ 
        success: false,
        message: 'User not found' 
      });
    }

    res.json({ 
      success: true,
      message: 'Profile updated successfully',
      updatedUser 
    });
  } catch (error) {
    console.error('Update error:', error);
    res.status(500).json({ 
      success: false,
      message: error.message || 'Server error' 
    });
  }
});

// Admin route to get all users
router.get('/all', protect, admin, userController.getAllUsers);

module.exports = router;