// backend/controllers/userController.js
const User = require('../models/User');
const { asyncHandler } = require('../middleware/errorMiddleware');

// @desc    Get all users (admin only)
// @route   GET /api/users/all
// @access  Private/Admin
const getAllUsers = asyncHandler(async (req, res) => {
  const users = await User.find({}).select('-password').sort('-createdAt');
  res.json({
    success: true,
    count: users.length,
    data: users
  });
});

module.exports = {
  getAllUsers
};