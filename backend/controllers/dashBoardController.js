const MusicalEvent = require('../models/MusicalEvent');
const Booking = require('../models/Booking');

exports.getDashboardStats = async (req, res) => {
  try {
    // Recent events (last 5)
    const recentEvents = await MusicalEvent.find()
      .sort({ createdAt: -1 })
      .limit(5);
    
    // Recent payments (last 5)
    const recentPayments = await Booking.find()
      .sort({ 'paymentDetails.paymentDate': -1 })
      .limit(5);
    
    // Total revenue
    const totalRevenue = await Booking.aggregate([
      { $match: { 'paymentDetails.status': 'confirmed' } },
      { $group: { _id: null, total: { $sum: '$paymentDetails.amountPaid' } } }
    ]);
    
    // Events count by type
    const eventsByType = await Booking.aggregate([
      { $group: { _id: '$eventType', count: { $sum: 1 } } }
    ]);
    
    res.json({
      recentEvents,
      recentPayments,
      totalRevenue: totalRevenue.length ? totalRevenue[0].total : 0,
      eventsByType
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};