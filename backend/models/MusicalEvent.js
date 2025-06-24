// models/MusicalEvent.js
const mongoose = require('mongoose');

const musicalEventSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  eventType: {
    type: String,
    required: true
  },
  venue: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  location: {
    type: String,
    required: true
  },
  ticketPrice: {
    type: Number,
    required: true
  },
  availableSeats: {
    type: Number,
    required: true
  },
  bookingDetails: {
    seatsBooked: {
      type: Number,
      default: 0
    }
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
}, { 
  timestamps: true,
  collection: 'events'  // Store in 'events' collection
});

module.exports = mongoose.model('MusicalEvent', musicalEventSchema);