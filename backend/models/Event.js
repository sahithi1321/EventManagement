const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  name: { type: String, required: true },
  eventType: { type: String, required: true },
  venue: { type: String, required: true },
  date: { type: Date, required: true },
  location: { type: String, required: true },
  pricePerTicket: { type: Number, required: true },
  totalPrice: { type: Number, required: true },
  currency: { type: String, required: true },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  status: { 
    type: String, 
    enum: ['pending', 'booked', 'cancelled', 'completed'], 
    default: 'pending' 
  },
  attendees: { type: Number, default: 0 },
  specialRequirements: { type: String },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Event', eventSchema);