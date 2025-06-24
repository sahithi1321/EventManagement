const mongoose = require('mongoose');
const Booking = require('./models/Booking');
require('dotenv').config();

const verifyData = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    // Count all bookings
    const count = await Booking.countDocuments();
    console.log(`Total bookings in database: ${count}`);

    // Get the 5 most recent bookings
    const recentBookings = await Booking.find()
      .sort({ createdAt: -1 })
      .limit(5);
    
    console.log("Recent bookings:");
    recentBookings.forEach((booking, i) => {
      console.log(`\nBooking ${i + 1}:`);
      console.log(`- Wedding Type: ${booking.weddingDetails.type}`);
      console.log(`- Venue: ${booking.weddingDetails.venue}`);
      console.log(`- Amount: ${booking.payments[0].amount}`);
      console.log(`- Status: ${booking.paymentStatus}`);
      console.log(`- Created: ${booking.createdAt}`);
    });

  } catch (err) {
    console.error('Verification failed:', err);
  } finally {
    mongoose.disconnect();
  }
};

verifyData();