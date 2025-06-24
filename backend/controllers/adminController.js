// controllers/adminController.js
const Event = require('../models/Event');

console.log('[AdminController] Initializing admin controller...');

const createEvent = async (req, res) => {
  try {
    console.log('[AdminController] Create event request received');
    console.log('[AdminController] Request body:', req.body);
    console.log('[AdminController] Authenticated user:', req.user);
    
    if (!req.user) {
      console.error('[AdminController] No user in request');
      return res.status(401).json({ message: 'Authentication required' });
    }

    const event = new Event({
      ...req.body,
      createdBy: req.user._id
    });

    console.log('[AdminController] Event to be created:', event);
    const createdEvent = await event.save();
    
    console.log('[AdminController] Event created successfully:', createdEvent);
    res.status(201).json(createdEvent);
  } catch (error) {
    console.error('[AdminController] Event creation error:', error);
    res.status(400).json({
      message: 'Event creation failed',
      error: error.message
    });
  }
};

const getAllEvents = async (req, res) => {
  try {
    console.log('[AdminController] Fetching all events for admin');
    const events = await Event.find({}).populate('createdBy', 'name email');
    
    console.log(`[AdminController] Found ${events.length} events`);
    res.json(events);
  } catch (error) {
    console.error('[AdminController] Event fetch error:', error);
    res.status(500).json({
      message: 'Failed to fetch events',
      error: error.message
    });
  }
};

console.log('[AdminController] Methods exported:');
console.log('[AdminController] - createEvent');
console.log('[AdminController] - getAllEvents');

module.exports = {
  createEvent,
  getAllEvents
};