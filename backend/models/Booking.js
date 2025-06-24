const mongoose = require('mongoose');

const paymentDetailsSchema = new mongoose.Schema({
  amount: { type: Number, required: true },
  currency: { type: String, required: true },
  advanceAmount: { type: Number, required: true },
  status: { 
    type: String, 
    enum: ['pending', 'completed', 'refunded'], 
    default: 'pending' 
  },
  paymentDate: { type: Date },
  cardLastFour: { type: String },
  expiry: { type: String }
}, { _id: false });

const bookingSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  userEmail: { type: String, required: true },
  musicalEvent: { type: mongoose.Schema.Types.ObjectId, ref: 'MusicalEvent', required: true },
  eventType: { type: String, required: true },
  eventName: { type: String, required: true },
  date: { type: Date, required: true },
  venue: { type: String, required: true },
  location: { type: String, required: true },
  attendees: { type: Number, required: true },
  specialRequirements: { type: String },
  pricePerTicket: { type: Number, required: true },
  totalPrice: { type: Number, required: true },
  paymentDetails: paymentDetailsSchema,
  status: { 
    type: String, 
    enum: ['pending', 'confirmed', 'cancelled'], 
    default: 'pending' 
  }
}, { timestamps: true });

// Virtual for booking ID
bookingSchema.virtual('bookingId').get(function() {
  return this._id.toString();
});

// Ensure virtuals are included in responses
bookingSchema.set('toJSON', {
  virtuals: true,
  transform: (doc, ret) => {
    ret.id = ret._id.toString();
    delete ret._id;
    delete ret.__v;
    return ret;
  }
});

module.exports = mongoose.model('Booking', bookingSchema);