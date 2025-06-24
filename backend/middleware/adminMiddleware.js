// middleware/adminMiddleware.js
const User = require('../models/User');

console.log('[AdminMiddleware] Initializing admin middleware...');

const adminAuth = async (req, res, next) => {
  try {
    console.log('[AdminMiddleware] Admin authentication check');
    
    if (!req.user || !req.user.userId) {
      console.error('[AdminMiddleware] No user in request');
      return res.status(401).json({ message: 'Authentication required' });
    }

    console.log('[AdminMiddleware] Finding user:', req.user.userId);
    const user = await User.findById(req.user.userId);
    
    if (!user) {
      console.error('[AdminMiddleware] User not found');
      return res.status(401).json({ message: 'User not found' });
    }

    if (!user.isAdmin) {
      console.log(`[AdminMiddleware] Admin access denied for user ${req.user.userId}`);
      return res.status(403).json({ 
        message: 'Admin privileges required',
        user: {
          id: user._id,
          isAdmin: user.isAdmin
        }
      });
    }

    console.log(`[AdminMiddleware] Admin access granted for user ${req.user.userId}`);
    next();
  } catch (error) {
    console.error('[AdminMiddleware] Admin auth error:', error);
    res.status(500).json({ message: 'Server error during admin verification' });
  }
};

console.log('[AdminMiddleware] Middleware exported');

module.exports = adminAuth;