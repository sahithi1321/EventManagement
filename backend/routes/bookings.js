const express = require('express');
const router = express.Router();
const { protect, admin } = require('../middleware/authMiddleware');
const bookingController = require('../controllers/bookingController');

// Basic booking routes
router.route('/')
  .post(protect, bookingController.createBooking)
  .get(protect, bookingController.getUserBookings);

// Individual booking routes
router.route('/:id')
  .get(protect, bookingController.getBooking)
  .put(protect, bookingController.updateBooking)
  .delete(protect, bookingController.cancelBooking);

// Payment related routes
router.post('/:id/payments', protect, bookingController.processPayment); // This route needs processPayment
router.get('/payments/history', protect, bookingController.getUserPayments);

// Admin routes
router.get('/admin/all', protect, admin, bookingController.getOrganizerBookings);

module.exports = router;