const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const { 
  processPayment,
  cancelBooking,
  getPaymentHistory
} = require('../controllers/paymentController');

// Process payment
router.post('/process', protect, processPayment);

// Get all payment history for user
router.get('/all', protect, getPaymentHistory);

// Cancel booking and process refund
router.delete('/:bookingId/cancel', protect, cancelBooking);

module.exports = router;