// src/API/api.js
import axios from 'axios';

const API = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:5001/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Enhanced request interceptor
API.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, error => {
  return Promise.reject(error);
});

// Enhanced response interceptor with admin error handling
API.interceptors.response.use(response => {
  return response;
}, error => {
  if (error.response) {
    console.error('API Error:', {
      status: error.response.status,
      message: error.response.data?.message || 'No error message',
      url: error.config.url
    });
    
    // Handle admin-specific errors
    if (error.response.status === 401 && 
        error.response.data?.message?.includes('admin')) {
      console.warn('Admin privileges required');
    }
  }
  return Promise.reject(error);
});

// API functions for musical events
export const createMusicalEvent = async (eventData) => {
  try {
    const response = await API.post('/admin/events', eventData);
    return response.data;
  } catch (error) {
    if (error.response?.status === 404) {
      throw new Error("Admin endpoint not found - check backend routes");
    }
    if (error.response?.status === 403) {
      throw new Error("You need admin privileges for this action");
    }
    throw error;
  }
};

// Check for existing bookings
export const checkExistingBooking = async (bookingData) => {
  try {
    const response = await API.post('/bookings/check', bookingData);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to check existing bookings');
  }
};

export const createBooking = async (bookingData) => {
  try {
    console.log("Sending booking data to backend:", bookingData);
    const response = await API.post('/bookings', bookingData);
    console.log("Backend booking response:", response.data);

    if (!response.data.success) {
      throw new Error(response.data.message || 'Booking creation failed');
    }

    return {
      success: true,
      bookingId: response.data.bookingId,
      ...response.data
    };
  } catch (error) {
    console.error("Booking creation error:", error);
    throw new Error(error.response?.data?.message || 'Booking creation failed');
  }
};

export const processPayment = async (paymentData) => {
  try {
    const response = await API.post('/payments/process', paymentData);
    return response.data;
  } catch (error) {
    console.error("Payment processing error:", error);
    throw error;
  }
};
export const getPaymentHistory = async (userId) => {
  try {
    const response = await API.get('/bookings/payments/history');
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to fetch payment history');
  }
};
// User authentication
export const loginUser = async (credentials) => {
  try {
    const response = await API.post('/auth/login', credentials);
    return response.data;
  } catch (error) {
    console.error('Login failed:', error.response?.data || error.message);
    throw error;
  }
};

export const registerUser = async (userData) => {
  try {
    const response = await API.post('/auth/register', userData);
    return response.data;
  } catch (error) {
    console.error('Registration failed:', error.response?.data || error.message);
    throw error;
  }
};



export const getBookingDetails = async (bookingId) => {
  try {
    const response = await API.get(`/bookings/${bookingId}`);
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch booking details');
  }
};

export const confirmBookingPayment = async (bookingId, paymentDetails) => {
  try {
    const response = await API.post(`/bookings/${bookingId}/confirm`, paymentDetails);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Payment confirmation failed');
  }
};

export const getUserBookings = async () => {
  try {
    const response = await API.get('/bookings');
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to fetch user bookings');
  }
};

export const checkBookingAvailability = async (eventId, attendees) => {
  try {
    const response = await API.post('/bookings/availability', { eventId, attendees });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Availability check failed');
  }
};

export const updateBookingStatus = async (bookingId, status) => {
  try {
    const response = await API.patch(`/bookings/${bookingId}/status`, { status });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to update booking status');
  }
};

export const updateBooking = async (bookingId, updateData) => {
  try {
    const response = await API.patch(`/bookings/${bookingId}`, updateData);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to update booking');
  }
};

export const getAllBookings = async () => {
  try {
    const response = await API.get('/bookings/all');
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

export const getAllPayments = async () => {
  try {
    const response = await API.get('/payments/all');
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

export const getAllEvents = async () => {
  try {
    const response = await API.get('/events/all');
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

// Get all users (admin only)
export const getAllUsers = async () => {
  try {
    const response = await API.get('/users/all');
    return response.data;
  } catch (error) {
    if (error.response?.status === 403) {
      throw new Error('Admin access required to view users');
    }
    throw error.response?.data || error;
  }
};

// Complete booking flow
export const completeBookingWithRetry = async (bookingData, paymentMethod = 'card') => {
  const MAX_RETRIES = 2;
  let attempt = 0;
  let lastError = null;

  while (attempt <= MAX_RETRIES) {
    try {
      console.log(`Booking attempt ${attempt + 1} for event:`, bookingData.eventId);
      
      const availability = await checkBookingAvailability(
        bookingData.eventId, 
        bookingData.attendeeCount
      );
      
      if (!availability.available) {
        throw new Error(availability.message || 'Event no longer available');
      }

      const bookingPayload = {
        eventId: bookingData.eventId,
        userId: bookingData.userId,
        attendeeCount: bookingData.attendeeCount,
        paymentMethod,
        amount: bookingData.totalPrice,
        currency: bookingData.currency || 'INR'
      };

      const bookingResponse = await createBooking(bookingPayload);
      console.log('Booking created:', bookingResponse._id);

      if (bookingData.totalPrice > 0) {
        const paymentResponse = await processPayment({
          bookingId: bookingResponse._id,
          amount: bookingData.totalPrice,
          currency: bookingData.currency || 'INR',
          paymentMethod
        });
        console.log('Payment processed:', paymentResponse.status);
      }

      const confirmedBooking = await confirmBookingPayment(
        bookingResponse._id, 
        { status: 'confirmed' }
      );

      return {
        success: true,
        booking: confirmedBooking,
        message: 'Booking completed successfully'
      };

    } catch (error) {
      attempt++;
      lastError = error;
      console.error(`Booking attempt ${attempt} failed:`, error.message);
      
      if (error.response?.status === 409) {
        throw new Error('You already have a booking for this event');
      }
      
      if (attempt <= MAX_RETRIES) {
        await new Promise(resolve => setTimeout(resolve, 1000 * attempt));
        continue;
      }
    }
  }

  console.error('All booking attempts failed. Last error:', lastError);
  throw lastError;
};

export const handleBookingCreation = async (bookingData) => {
  try {
    console.log("Creating booking with data:", bookingData);
    
    // Create booking
    const bookingResponse = await API.post('/bookings', bookingData);
    const booking = bookingResponse.data;
    
    if (!booking._id) {
      console.error("Booking creation succeeded but no ID returned");
      throw new Error('Booking created but ID missing');
    }
    
    console.log("Booking created successfully:", booking._id);
    return booking;
    
  } catch (error) {
    console.error("Booking creation error:", error);
    throw new Error(error.response?.data?.message || 'Booking creation failed');
  }
};

// Function to process payment
export const processBookingPayment = async (bookingId, paymentData) => {
  try {
    console.log(`Processing payment for booking: ${bookingId}`);
    const response = await API.post(`/bookings/${bookingId}/process-payment`, paymentData);
    return response.data;
  } catch (error) {
    console.error("Payment processing error:", error);
    throw new Error(error.response?.data?.message || 'Payment processing failed');
  }
};

export const completeBooking = async (bookingData, navigate) => {
  try {
    // Step 1: Create booking
    const booking = await handleBookingCreation(bookingData);
    
    // Step 2: Navigate to payment page
    if (navigate) {
      navigate(`/payment/${booking._id}`, { state: { booking } });
    }
    
    return booking;
    
  } catch (error) {
    console.error("Complete booking error:", error);
    alert(`Booking failed: ${error.message}`);
    throw error;
  }
};
export const cancelBooking = async (bookingId) => {
  try {
    const response = await API.delete(`/bookings/${bookingId}`);
    return response.data;
  } catch (error) {
    console.error("Booking cancellation error:", error);
    throw new Error(error.response?.data?.message || 'Failed to cancel booking');
  }
};

export const getOrganizerBookings = async () => {
  try {
    const response = await API.get('/bookings/all'); // Changed from api to API
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const getOrganizerPayments = async () => {
  try {
    const response = await API.get('/payments/all'); // Changed from api to API
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

