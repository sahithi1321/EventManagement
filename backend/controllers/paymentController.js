const { asyncHandler } = require('../middleware/errorMiddleware');
const Booking = require('../models/Booking');
const User = require('../models/User');

const processPayment = asyncHandler(async (req, res) => {
  const { bookingId, amount, currency, paymentMethod, cardDetails } = req.body;

  try {
    // 1. Find the booking
    const booking = await Booking.findById(bookingId);
    if (!booking) {
      res.status(404);
      throw new Error('Booking not found');
    }

    // 2. Verify the user owns the booking
    if (booking.user.toString() !== req.user._id.toString()) {
      res.status(401);
      throw new Error('Not authorized to process this payment');
    }

    // 3. Update payment details (mock implementation)
    booking.paymentDetails = {
      amount,
      currency,
      advanceAmount: amount,
      status: 'completed',
      paymentDate: new Date(),
      cardLastFour: cardDetails.last4,
      cardBrand: cardDetails.brand,
      expiry: cardDetails.expiry
    };

    booking.status = 'confirmed';

    // 4. Save the updated booking
    const updatedBooking = await booking.save();

    res.status(200).json({
      success: true,
      booking: updatedBooking,
      payment: {
        bookingId: updatedBooking._id,
        amount,
        currency,
        status: 'completed',
        paymentDate: new Date(),
        paymentMethod,
        userEmail: req.user.email,
        eventName: updatedBooking.eventName
      }
    });
  } catch (error) {
    console.error('Payment processing error:', error);
    res.status(500).json({
      success: false,
      error: error.message || 'Payment processing failed'
    });
  }
});

const cancelBooking = asyncHandler(async (req, res) => {
  const { bookingId } = req.params;

  try {
    const booking = await Booking.findById(bookingId);
    
    if (!booking) {
      return res.status(404).json({
        success: false,
        error: 'Booking not found'
      });
    }

    // Calculate refund amount (85% of advance)
    const refundAmount = Math.floor(booking.advanceAmount * 0.85);

    // Update booking status
    booking.status = 'cancelled';
    booking.paymentDetails.status = 'refunded';
    booking.paymentDetails.refundAmount = refundAmount;
    booking.paymentDetails.refundDate = new Date();
    await booking.save();

    // Update event seat availability
    await MusicalEvent.findByIdAndUpdate(
      booking.musicalEvent,
      { 
        $inc: { 
          availableSeats: booking.attendees,
          'bookingDetails.seatsBooked': -booking.attendees
        }
      }
    );

    res.json({
      success: true,
      message: `Booking cancelled successfully. ${refundAmount} ${booking.currency} will be refunded (85% of advance payment).`,
      booking
    });

  } catch (error) {
    console.error('Booking cancellation error:', error);
    res.status(500).json({
      success: false,
      error: error.message || 'Booking cancellation failed'
    });
  }
});
// @desc    Get all payments for a user
// @route   GET /api/payments/all
// @access  Private
const getPaymentHistory = asyncHandler(async (req, res) => {
  try {
    const bookings = await Booking.find({ 
      user: req.user._id,
      'paymentDetails.status': { $exists: true }
    }).sort({ 'paymentDetails.paymentDate': -1 });

    if (!bookings || bookings.length === 0) {
      return res.status(404).json({
        success: false,
        error: 'No payment history found'
      });
    }

    res.status(200).json({
      success: true,
      count: bookings.length,
      payments: bookings.map(booking => ({
        id: booking._id,
        event: booking.eventName,
        date: booking.date,
        amount: booking.paymentDetails.amount,
        status: booking.paymentDetails.status,
        paymentDate: booking.paymentDetails.paymentDate
      }))
    });
  } catch (error) {
    console.error('Payment history error:', error);
    res.status(500).json({
      success: false,
      error: error.message || 'Error fetching payment history'
    });
  }
});


const getOrganizerPayments = asyncHandler(async (req, res) => {
  try {
    const payments = await Booking.find({ 
      'paymentDetails.status': { $exists: true }
    })
    .sort({ 'paymentDetails.paymentDate': -1 })
    .populate('user', 'firstName lastName email');

    res.status(200).json({
      success: true,
      count: payments.length,
      payments: payments.map(payment => ({
        id: payment._id,
        event: payment.eventName,
        user: payment.user ? `${payment.user.firstName} ${payment.user.lastName}` : 'Unknown',
        email: payment.user?.email || 'N/A',
        date: payment.date,
        amount: payment.paymentDetails.amount,
        status: payment.paymentDetails.status,
        paymentDate: payment.paymentDetails.paymentDate
      }))
    });
  } catch (error) {
    console.error('Organizer payments error:', error);
    res.status(500).json({
      success: false,
      error: 'Error fetching organizer payments'
    });
  }
});

module.exports = {
  processPayment,
  cancelBooking,
  getPaymentHistory,
  getOrganizerPayments
};