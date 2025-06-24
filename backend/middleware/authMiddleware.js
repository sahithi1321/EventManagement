// middleware/authMiddleware.js
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { asyncHandler } = require('./errorMiddleware');

const protect = asyncHandler(async (req, res, next) => {
  console.log('Auth middleware triggered');
  
  let token;
  
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    console.log('Token found in authorization header');
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    console.log('No token found');
    return res.status(401).json({ 
      success: false,
      message: 'Not authorized, no token' 
    });
  }

  try {
    console.log('Verifying token...');
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log('Token decoded successfully:', decoded);
    
    console.log('Finding user by ID:', decoded.userId);
    req.user = await User.findById(decoded.userId).select('-password');
    
    if (!req.user) {
      console.log('User not found in database');
      return res.status(401).json({
        success: false,
        message: 'User not found'
      });
    }
    
    console.log('User authenticated:', req.user._id);
    next();
  } catch (error) {
    console.error('Error verifying token:', error);
    
    let message = 'Not authorized, token failed';
    if (error.name === 'TokenExpiredError') {
      message = 'Session expired, please login again';
    } else if (error.name === 'JsonWebTokenError') {
      message = 'Invalid token';
    }
    
    res.status(401).json({ 
      success: false,
      message 
    });
  }
});

// middleware/authMiddleware.js
const admin = asyncHandler(async (req, res, next) => {
  console.log('Admin middleware checking privileges');
  
  // The issue is here - we need to explicitly select the isAdmin field
  const currentUser = await User.findById(req.user._id).select('+isAdmin');
  
  if (!currentUser) {
    console.log('User not found during admin check');
    return res.status(401).json({
      success: false,
      message: 'User not found'
    });
  }

  console.log('User admin status from DB:', currentUser.isAdmin); // Debug log
  
  if (currentUser.isAdmin === true) { // Explicit true check
    console.log(`Admin access granted for user ${currentUser._id}`);
    req.user = currentUser;
    next();
  } else {
    console.log(`Admin access denied for user ${currentUser._id}`);
    return res.status(403).json({
      success: false,
      message: 'Admin privileges required',
      user: {
        id: currentUser._id,
        isAdmin: currentUser.isAdmin,
        email: currentUser.email
      }
    });
  }
});

module.exports = { 
  protect, 
  admin,
  protectAndAdmin: [protect, admin] 
};