// routes/adminRoutes.js
const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const { protect, admin } = require('../middleware/authMiddleware');

console.log('[AdminRoutes] Initializing admin routes...');

// Apply middlewares to specific routes instead of all routes
router.post('/events', protect, admin, adminController.createEvent);
router.get('/events', protect, admin, adminController.getAllEvents);

console.log('[AdminRoutes] Routes configured:');
console.log('[AdminRoutes] - POST /events');
console.log('[AdminRoutes] - GET /events');

module.exports = router;