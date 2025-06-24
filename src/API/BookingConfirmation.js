// src/components/BookingConfirmation.js
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button, Card, Alert, Row, Col } from 'react-bootstrap';

const BookingConfirmation = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const booking = location.state?.booking;

  if (!booking) {
    return (
      <div className="text-center py-5">
        <Alert variant="danger">Booking details not found</Alert>
        <Button variant="primary" onClick={() => navigate('/')}>
          Go to Home
        </Button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-3xl font-bold text-center mb-8">Booking Confirmed!</h1>
      
      <Card className="mb-6">
        <Card.Body>
          <h2 className="text-2xl font-semibold mb-4">Booking Details</h2>
          
          <Row className="mb-4">
            <Col md={6}>
              <p><strong>Event:</strong> {booking.eventName}</p>
              <p><strong>Venue:</strong> {booking.venue}, {booking.location}</p>
              <p><strong>Date:</strong> {new Date(booking.date).toLocaleString()}</p>
            </Col>
            <Col md={6}>
              <p><strong>Attendees:</strong> {booking.attendees}</p>
              <p><strong>Total Price:</strong> {booking.currency} {booking.totalPrice}</p>
              <p><strong>Status:</strong> <span className="text-green-600">{booking.status}</span></p>
            </Col>
          </Row>
          
          <div className="mt-6">
            <h3 className="text-xl font-semibold mb-2">Payment Details</h3>
            <p><strong>Advance Paid:</strong> {booking.currency} {booking.advanceAmount}</p>
            <p><strong>Payment Status:</strong> {booking.paymentDetails?.status || 'completed'}</p>
          </div>
        </Card.Body>
      </Card>

      <div className="text-center">
        <Button 
          onClick={() => navigate('/dashboard')}
          variant="primary"
          size="lg"
        >
          Go to Dashboard
        </Button>
      </div>
    </div>
  );
};

export default BookingConfirmation;