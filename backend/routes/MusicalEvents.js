const express = require('express');
const router = express.Router();
const { protect, admin } = require('../middleware/authMiddleware');
const {
  createMusicalEvent,
  getMusicalEvents,
  getMusicalEventById,
  updateMusicalEvent,
  deleteMusicalEvent
} = require('../controllers/musicalEventController');

router.route('/')
  .post(protect, admin, createMusicalEvent)
  .get(getMusicalEvents);

router.route('/:id')
  .get(getMusicalEventById)
  .put(protect, admin, updateMusicalEvent)
  .delete(protect, admin, deleteMusicalEvent);

  // routes/MusicalEvents.js (additional routes)
router.get('/all', protect, admin, async (req, res) => {
  try {
    const events = await MusicalEvent.find({})
      .sort('-createdAt');
    res.json({
      success: true,
      count: events.length,
      data: events
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to fetch all events'
    });
  }
});

module.exports = router;