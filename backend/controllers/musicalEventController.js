const MusicalEvent = require('../models/MusicalEvent');
const { asyncHandler } = require('../middleware/errorMiddleware');

const createMusicalEvent = asyncHandler(async (req, res) => {
  const { name, venue, date, ticketPrice, availableSeats } = req.body;

  if (!name || !venue || !date || !ticketPrice || !availableSeats) {
    res.status(400);
    throw new Error('Please provide all required fields');
  }

  const event = await MusicalEvent.create({
    name,
    venue,
    date,
    ticketPrice,
    availableSeats,
    bookingDetails: { seatsBooked: 0 },
    createdBy: req.user._id
  });

  res.status(201).json({
    success: true,
    data: event
  });
});

const getMusicalEvents = asyncHandler(async (req, res) => {
  const events = await MusicalEvent.find({});
  res.json({
    success: true,
    count: events.length,
    data: events
  });
});

const getMusicalEventById = asyncHandler(async (req, res) => {
  const event = await MusicalEvent.findById(req.params.id);
  
  if (!event) {
    res.status(404);
    throw new Error('Event not found');
  }

  res.json({
    success: true,
    data: event
  });
});

const updateMusicalEvent = asyncHandler(async (req, res) => {
  const event = await MusicalEvent.findById(req.params.id);

  if (!event) {
    res.status(404);
    throw new Error('Event not found');
  }

  event.name = req.body.name || event.name;
  event.venue = req.body.venue || event.venue;
  event.date = req.body.date || event.date;
  event.ticketPrice = req.body.ticketPrice || event.ticketPrice;
  event.availableSeats = req.body.availableSeats || event.availableSeats;

  const updatedEvent = await event.save();
  res.json({
    success: true,
    data: updatedEvent
  });
});

const deleteMusicalEvent = asyncHandler(async (req, res) => {
  const event = await MusicalEvent.findById(req.params.id);

  if (!event) {
    res.status(404);
    throw new Error('Event not found');
  }

  await event.remove();
  res.json({
    success: true,
    data: {}
  });
});

module.exports = {
  createMusicalEvent,
  getMusicalEvents,
  getMusicalEventById,
  updateMusicalEvent,
  deleteMusicalEvent
};