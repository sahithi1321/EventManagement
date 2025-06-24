import mongoose from 'mongoose';
import Booking from './models/Booking.js';

const testConnection = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    // Test insert
    const testBooking = new Booking({
      user: new mongoose.Types.ObjectId(),
      weddingDetails: {
        type: 'Test Wedding',
        venue: 'Test Venue',
        date: new Date()
      },
      payments: [{
        amount: 1000,
        cardNumber: '1234',
        expiryDate: '12/25',
        status: 'completed'
      }]
    });

    const saved = await testBooking.save();
    console.log('Test booking saved:', saved);

    // Verify retrieval
    const found = await Booking.findById(saved._id);
    console.log('Found booking:', found);

    // Clean up
    await Booking.deleteOne({ _id: saved._id });
    console.log('Test data cleaned up');

  } catch (err) {
    console.error('Test failed:', err);
  } finally {
    mongoose.disconnect();
  }
};

testConnection();