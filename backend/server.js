// server.js
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const connectDB = require('./config/db');
const { notFound, errorHandler } = require('./middleware/errorMiddleware');

console.log('[Server] Starting server initialization...');

const app = express();
const PORT = process.env.PORT || 5001;

// Connect to MongoDB
console.log('[Server] Initializing database connection...');
connectDB();

// Middleware
console.log('[Server] Setting up middleware...');
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Enhanced request logger
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.originalUrl}`);
  next();
});

// Basic route for testing
app.get('/', (req, res) => {
  console.log('[Server] Root route accessed');
  res.send('Event Management API is running...');
});

// Import routes
console.log('[Server] Setting up routes...');
try {
  const authRoutes = require('./routes/authRoutes');
  const bookingRoutes = require('./routes/bookings');
  const musicalEventRoutes = require('./routes/musicalEvents');
  const userRoutes = require('./routes/userRoutes'); // Should now work
  const adminRoutes = require('./routes/adminRoutes');
  const paymentRoutes = require('./routes/paymentRoutes');
  
  app.use('/api/auth', authRoutes);
  app.use('/api/bookings', bookingRoutes);
  app.use('/api/events', musicalEventRoutes);
  app.use('/api/users', userRoutes); // Fixed route
  app.use('/api/admin', adminRoutes);
  app.use('/api/payments', paymentRoutes);
  
  console.log('[Server] Routes mounted successfully');
  
} catch (error) {
  console.error('[Server] Error loading routes:', error);
  process.exit(1);
}

// Error handling middleware
console.log('[Server] Setting up error handlers...');
app.use(notFound);
app.use(errorHandler);

// Start server
app.listen(PORT, () => {
  console.log(`[Server] Server running on port ${PORT}`);
});

process.on('unhandledRejection', (err, promise) => {
  console.error(`[Server] Unhandled Rejection at: ${promise}, reason: ${err}`);
});