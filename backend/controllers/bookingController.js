const Booking = require('../models/Booking');
const MusicalEvent = require('../models/MusicalEvent');
const User = require('../models/User');
const { asyncHandler } = require('../middleware/errorMiddleware');
const mongoose = require('mongoose');

// ==============================================
// DATABASE STORAGE FUNCTIONS (from old version)
// ==============================================

const createBooking = asyncHandler(async (req, res) => {
  console.log('Received booking creation request');
  console.log('Request body:', req.body);

  try {
    const { 
      eventType, eventName, date, venue, location, attendees, 
      specialRequirements, pricePerTicket, totalPrice, advanceAmount, 
      currency, userEmail, userId 
    } = req.body;

    // Validate required fields
    if (!eventType || !eventName || !date || !venue || !pricePerTicket || !totalPrice || !userId) {
      console.error('❌ Missing required fields');
      return res.status(400).json({ message: 'Missing required fields' });
    }

    // Check if event already exists
    let musicalEvent = await MusicalEvent.findOne({ 
      name: eventName,
      date: new Date(date),
      location
    });

    // Create new event if doesn't exist
    if (!musicalEvent) {
      console.log("Event does not exist, creating a new one...");
      musicalEvent = await MusicalEvent.create({
        name: eventName,
        eventType,
        venue,
        date: new Date(date),
        location,
        ticketPrice: pricePerTicket,
        availableSeats: 1000,
        bookingDetails: { seatsBooked: 0 },
        createdBy: userId
      });
    }

    // Check available seats
    if (musicalEvent.availableSeats < attendees) {
      console.warn(`❌ Only ${musicalEvent.availableSeats} seats available`);
      return res.status(400).json({
        success: false,
        error: `Only ${musicalEvent.availableSeats} seats available`
      });
    }

    // Check if user already booked this event
    const existingBooking = await Booking.findOne({
      musicalEvent: musicalEvent._id,
      user: userId
    });

    if (existingBooking) {
      console.warn('❌ User already has a booking for this event');
      return res.status(409).json({
        success: false,
        error: 'You already have a booking for this event'
      });
    }

    // Create booking
    const booking = await Booking.create({
      user: userId,
      userEmail,
      musicalEvent: musicalEvent._id,
      eventType,
      eventName,
      date: new Date(date),
      venue,
      location,
      attendees,
      specialRequirements,
      pricePerTicket,
      totalPrice,
      paymentDetails: {
        amount: totalPrice,
        advanceAmount,
        currency,
        status: 'pending',
        paymentDate: null
      },
      status: 'pending'
    });

    // Update event seat availability
    await MusicalEvent.findByIdAndUpdate(
      musicalEvent._id,
      { 
        $inc: { 
          availableSeats: -attendees,
          'bookingDetails.seatsBooked': attendees 
        }
      }
    );

    // Send simplified response
    res.status(201).json({
      success: true,
      message: 'Booking created successfully',
      bookingId: booking._id,
      eventName,
      venue,
      date: new Date(date).toISOString(),
      attendees,
      totalPrice,
      advanceAmount,
      currency
    });

  } catch (error) {
    console.error('❌ Booking creation error:', error);
    res.status(500).json({
      status: 'error',
      message: error.message || 'Booking creation failed'
    });
  }
});

// ==============================================
// DASHBOARD FUNCTIONS (from new version)
// ==============================================

const getUserBookings = asyncHandler(async (req, res) => {
  try {
    const bookings = await Booking.find({ user: req.user._id })
      .populate('musicalEvent', 'name date venue location')
      .populate('user', 'email')
      .sort('-createdAt')
      .lean();

    const formattedBookings = bookings.map(booking => ({
      _id: booking._id,
      eventName: booking.eventName || booking.musicalEvent?.name,
      date: booking.date,
      venue: booking.venue,
      location: booking.location,
      status: booking.status,
      attendees: booking.attendees,
      totalPrice: booking.totalPrice,
      paymentStatus: booking.paymentDetails?.status,
      time: booking.time || '19:00', // default time if not specified
      userEmail: booking.userEmail || booking.user?.email,
      // Include all fields your frontend expects
    }));

    res.json({
      success: true,
      bookings: formattedBookings // match frontend expectation
    });
  } catch (error) {
    console.error('Error fetching user bookings:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch bookings'
    });
  }
});
const getBooking = asyncHandler(async (req, res) => {
  console.log(`Fetching booking: ${req.params.id} for user: ${req.user._id}`);
  
  try {
    const booking = await Booking.findOne({
      _id: req.params.id,
      user: req.user._id
    }).populate('musicalEvent');

    if (!booking) {
      console.error('❌ Booking not found:', req.params.id);
      return res.status(404).json({
        success: false,
        error: 'Booking not found'
      });
    }

    console.log('✅ Found booking:', booking._id);
    
    res.json({
      success: true,
      data: {
        id: booking._id,
        eventName: booking.eventName,
        date: booking.date,
        venue: booking.venue,
        location: booking.location,
        status: booking.status,
        paymentStatus: booking.paymentDetails.status,
        attendees: booking.attendees,
        totalPrice: booking.totalPrice,
        advanceAmount: booking.paymentDetails.advanceAmount,
        currency: booking.paymentDetails.currency,
        specialRequirements: booking.specialRequirements,
        eventStatus: booking.musicalEvent?.status || 'unknown',
        availableSeats: booking.musicalEvent?.availableSeats || 0
      }
    });
  } catch (error) {
    console.error('❌ Error fetching booking:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch booking'
    });
  }
});

const updateBooking = asyncHandler(async (req, res) => {
  const { date, venue, attendees, specialRequirements } = req.body;
  
  console.log(`Updating booking: ${req.params.id} for user: ${req.user._id}`);
  console.log('Update data:', req.body);

  try {
    const booking = await Booking.findOne({
      _id: req.params.id,
      user: req.user._id
    }).populate('musicalEvent');

    if (!booking) {
      console.error('❌ Booking not found:', req.params.id);
      return res.status(404).json({
        success: false,
        error: 'Booking not found'
      });
    }

    if (booking.status === 'confirmed') {
      console.warn('❌ Attempt to modify confirmed booking');
      return res.status(400).json({
        success: false,
        error: 'Confirmed bookings cannot be modified'
      });
    }

    // Validate seat availability if attendees are being updated
    if (attendees && booking.musicalEvent) {
      const seatsNeeded = attendees - booking.attendees;
      if (seatsNeeded > 0 && booking.musicalEvent.availableSeats < seatsNeeded) {
        console.error('❌ Not enough seats for update');
        return res.status(400).json({
          success: false,
          error: `Only ${booking.musicalEvent.availableSeats} additional seats available`
        });
      }
    }

    // Update booking
    if (date) booking.date = new Date(date);
    if (venue) booking.venue = venue;
    if (attendees) {
      // Update available seats if attendees count changes
      if (booking.musicalEvent) {
        const seatDifference = attendees - booking.attendees;
        booking.musicalEvent.availableSeats -= seatDifference;
        booking.musicalEvent.bookingDetails.seatsBooked += seatDifference;
        await booking.musicalEvent.save();
      }
      booking.attendees = attendees;
    }
    if (specialRequirements) booking.specialRequirements = specialRequirements;

    await booking.save();

    console.log('✅ Booking updated successfully:', booking._id);
    
    res.json({
      success: true,
      message: 'Booking updated successfully',
      data: booking
    });
  } catch (error) {
    console.error('❌ Booking update error:', error);
    res.status(500).json({
      success: false,
      error: error.message || 'Failed to update booking'
    });
  }
});

const cancelBooking = asyncHandler(async (req, res) => {
  console.log(`Canceling booking: ${req.params.id} for user: ${req.user._id}`);
  
  try {
    const booking = await Booking.findOne({
      _id: req.params.id,
      user: req.user._id
    }).populate('musicalEvent');

    if (!booking) {
      console.error('❌ Booking not found:', req.params.id);
      return res.status(404).json({
        success: false,
        error: 'Booking not found'
      });
    }

    if (booking.status === 'cancelled') {
      console.warn('❌ Booking already cancelled');
      return res.status(400).json({
        success: false,
        error: 'Booking is already cancelled'
      });
    }

    // Calculate refund amount (85% of advance)
    const refundAmount = Math.floor(booking.paymentDetails.advanceAmount * 0.85);

    // Update booking status
    booking.status = 'cancelled';
    booking.paymentDetails.status = 'refunded';
    booking.paymentDetails.refundAmount = refundAmount;
    booking.paymentDetails.refundDate = new Date();
    booking.cancellationDate = new Date();
    
    // Update event seat availability
    if (booking.musicalEvent) {
      booking.musicalEvent.availableSeats += booking.attendees;
      booking.musicalEvent.bookingDetails.seatsBooked -= booking.attendees;
      
      // Check if we need to make the event available again
      const activeBookings = await Booking.countDocuments({ 
        musicalEvent: booking.musicalEvent._id,
        status: { $ne: 'cancelled' }
      });
      
      if (activeBookings === 0) {
        booking.musicalEvent.status = 'available';
      }
      
      await booking.musicalEvent.save();
    }

    await booking.save();

    console.log('✅ Booking cancelled successfully:', booking._id);
    
    res.json({
      success: true,
      message: `Booking cancelled successfully. ${refundAmount} ${booking.paymentDetails.currency} will be refunded (85% of advance payment).`,
      data: {
        bookingId: booking._id,
        status: booking.status,
        refundAmount,
        currency: booking.paymentDetails.currency,
        eventStatus: booking.musicalEvent?.status || 'unknown'
      }
    });
  } catch (error) {
    console.error('❌ Booking cancellation error:', error);
    res.status(500).json({
      success: false,
      error: error.message || 'Failed to cancel booking'
    });
  }
});

const getUserPayments = asyncHandler(async (req, res) => {
  console.log(`Fetching payment history for user: ${req.user._id}`);
  
  try {
    const payments = await Booking.find({ 
      user: req.user._id,
      'paymentDetails.status': { $in: ['completed', 'refunded'] }
    })
    .select('eventName date venue attendees paymentDetails status')
    .sort('-paymentDetails.paymentDate');

    console.log(`Found ${payments.length} payment records`);
    
    res.json({
      success: true,
      count: payments.length,
      data: payments.map(payment => ({
        id: payment._id,
        eventName: payment.eventName,
        date: payment.date,
        venue: payment.venue,
        attendees: payment.attendees,
        amount: payment.paymentDetails.amount,
        currency: payment.paymentDetails.currency,
        status: payment.status,
        paymentStatus: payment.paymentDetails.status,
        paymentDate: payment.paymentDetails.paymentDate,
        refundAmount: payment.paymentDetails.refundAmount
      }))
    });
  } catch (error) {
    console.error('❌ Error fetching payment history:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch payment history'
    });
  }
});

const checkBookingAvailability = asyncHandler(async (req, res) => {
  const { eventType, date, location } = req.body;
  
  console.log('Checking booking availability for:', { eventType, date, location });

  try {
    // Find existing booking for this event type and location
    const existingBooking = await Booking.findOne({
      eventType,
      location,
      date: { $gte: new Date(date) },
      status: { $ne: 'cancelled' }
    }).sort({ date: 1 });

    if (existingBooking) {
      // Calculate next available date (1 week after existing booking)
      const nextAvailableDate = new Date(existingBooking.date);
      nextAvailableDate.setDate(nextAvailableDate.getDate() + 7);
      
      console.log('⏳ Event already booked. Next available:', nextAvailableDate);
      
      return res.json({
        exists: true,
        nextAvailableDate,
        message: `This event is already booked. Next available booking opens at ${nextAvailableDate.toLocaleString()}`
      });
    }

    console.log('✅ Event is available for booking');
    
    res.json({
      exists: false,
      nextAvailableDate: null
    });
  } catch (error) {
    console.error('❌ Booking check error:', error);
    res.status(500).json({
      success: false,
      error: 'Error checking booking availability'
    });
  }
});

const processPayment = asyncHandler(async (req, res) => {
  const { bookingId } = req.params;
  const { paymentDetails } = req.body;

  console.log(`Processing payment for booking: ${bookingId}`);

  try {
    const booking = await Booking.findById(bookingId).populate('musicalEvent');
    if (!booking) {
      console.error('❌ Booking not found:', bookingId);
      return res.status(404).json({
        success: false,
        error: 'Booking not found'
      });
    }

    if (booking.status !== 'pending') {
      console.warn('❌ Booking already processed:', booking.status);
      return res.status(400).json({
        success: false,
        error: `Booking is already ${booking.status}`
      });
    }

    // Process payment
    booking.paymentDetails = {
      ...booking.paymentDetails,
      status: 'completed',
      paymentDate: new Date(),
      ...paymentDetails
    };
    booking.status = 'confirmed';
    
    await booking.save();

    // Update event status if needed
    if (booking.musicalEvent) {
      booking.musicalEvent.status = 'booked';
      await booking.musicalEvent.save();
    }

    console.log('✅ Payment processed successfully for booking:', bookingId);
    
    res.json({
      success: true,
      message: 'Payment processed successfully',
      data: {
        bookingId: booking._id,
        status: booking.status,
        paymentStatus: booking.paymentDetails.status,
        eventStatus: booking.musicalEvent?.status || 'unknown'
      }
    });
  } catch (error) {
    console.error('❌ Payment processing error:', error);
    res.status(500).json({
      success: false,
      error: error.message || 'Payment processing failed'
    });
  }
});

const getOrganizerBookings = asyncHandler(async (req, res) => {
  console.log('Fetching all bookings for organizer dashboard');
  
  try {
    const bookings = await Booking.find({})
      .populate('user', 'firstName lastName email')
      .populate('musicalEvent')
      .sort('-createdAt');

    console.log(`Found ${bookings.length} bookings for organizer`);
    
    res.json({
      success: true,
      count: bookings.length,
      data: bookings.map(booking => ({
        id: booking._id,
        eventName: booking.eventName,
        date: booking.date,
        venue: booking.venue,
        location: booking.location,
        status: booking.status,
        paymentStatus: booking.paymentDetails.status,
        attendees: booking.attendees,
        totalPrice: booking.totalPrice,
        userName: booking.user ? `${booking.user.firstName} ${booking.user.lastName}` : 'Unknown',
        userEmail: booking.user?.email || 'N/A',
        eventStatus: booking.musicalEvent?.status || 'unknown',
        created: booking.createdAt,
        lastUpdated: booking.updatedAt
      }))
    });
  } catch (error) {
    console.error('❌ Organizer bookings error:', error);
    res.status(500).json({
      success: false,
      error: 'Error fetching organizer bookings'
    });
  }
});


module.exports = {
  createBooking,  // From old version (simple storage)
  getUserBookings,  // From new version (dashboard)
  getBooking,
  updateBooking,
  cancelBooking,
  processPayment,
  getUserPayments,
  checkBookingAvailability,
  getOrganizerBookings
};