// src/components/MusicalForm.js
import React, { useState } from 'react';
import { Form, Button, Alert, Row, Col, Card , Spinner} from 'react-bootstrap';
import { useAuth } from '../UserAuth/AuthContext';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useNavigate } from 'react-router-dom';
import { createBooking } from '../API/api';


const MusicalForm = ({ eventDetails, onCancel }) => {
  const navigate = useNavigate();
  const eventTypes = [
    { id: 'album-release', name: 'Album Release', price: { IN: 300, US: 15, FR: 12, IT: 10 } },
    { id: 'band-performance', name: 'Band Performance', price: { IN: 500, US: 25, FR: 20, IT: 18 } },
    { id: 'bollywood-dance', name: 'Bollywood Dance', price: { IN: 400, US: 20, FR: 16, IT: 15 } },
    { id: 'classical-dance', name: 'Classical Dance', price: { IN: 350, US: 18, FR: 15, IT: 14 } },
    { id: 'classical-music', name: 'Classical Music', price: { IN: 300, US: 17, FR: 14, IT: 13 } },
    { id: 'concert', name: 'Concert', price: { IN: 800, US: 40, FR: 35, IT: 30 } },
    { id: 'dj-night', name: 'DJ Night', price: { IN: 600, US: 30, FR: 25, IT: 22 } },
    { id: 'kpop-event', name: 'Kpop Event', price: { IN: 700, US: 35, FR: 30, IT: 27 } },
    { id: 'music-festival', name: 'Music Festival', price: { IN: 1000, US: 50, FR: 45, IT: 40 } },
    { id: 'orchestra', name: 'Orchestra', price: { IN: 500, US: 28, FR: 24, IT: 22 } }
  ];

  const locations = [
    { code: 'IN', name: '🇮🇳 India (INR)' },
    { code: 'US', name: '🇺🇸 US (USD)' },
    { code: 'FR', name: '🇫🇷 France (EUR)' },
    { code: 'IT', name: '🇮🇹 Italy (EUR)' }
  ];

  const [formData, setFormData] = useState({
    eventType: eventDetails?.eventType || 'album-release',
    date: null,
    venue: '',
    location: 'IN',
    attendees: 1,
    specialRequirements: '',
    termsAccepted: false
  });

  const [error, setError] = useState('');
  const [validated, setValidated] = useState(false);
  const { currentUser } = useAuth();
  const [loading, setLoading] = useState(false);

  const today = new Date();
  const oneMonthFromNow = new Date();
  oneMonthFromNow.setMonth(today.getMonth() + 1);

  const selectedEvent = eventTypes.find(e => e.id === formData.eventType) || eventTypes[0];
  const pricePerTicket = selectedEvent.price[formData.location];
  const totalPrice = pricePerTicket * formData.attendees;
  const advanceAmount = Math.round(totalPrice * 0.3);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleDateChange = (date) => {
    setFormData(prev => ({
      ...prev,
      date: date
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    
    if (!form.checkValidity() || !formData.date || !formData.termsAccepted) {
      e.stopPropagation();
      setValidated(true);
      return;
    }

    setError('');
    setLoading(true);

    if (!currentUser) {
      setError('Please login to book this event');
      setLoading(false);
      return;
    }
 try {
    const bookingPayload = {
      eventType: formData.eventType,
      date: formData.date.toISOString(),
      venue: formData.venue,
      location: formData.location,
      attendees: formData.attendees,
      specialRequirements: formData.specialRequirements,
      eventName: selectedEvent.name,
      pricePerTicket,
      totalPrice,
      advanceAmount,
      currency: formData.location === 'IN' ? 'INR' : 
               formData.location === 'US' ? 'USD' : 'EUR',
      userEmail: currentUser.email,
      userId: currentUser.id || currentUser._id,
      status: 'pending', // Add status field
      createdAt: new Date().toISOString() // Add creation timestamp
    };

    // Store in localStorage before API call (optimistic update)
    const userBookings = JSON.parse(localStorage.getItem('userBookings')) || [];
    userBookings.push(bookingPayload);
    localStorage.setItem('userBookings', JSON.stringify(userBookings));

    const response = await createBooking(bookingPayload);
    
    if (response.success) {
      navigate('/payments', { 
        state: { 
          bookingId: response.bookingId,
          formData: bookingPayload
        } 
      });
    } else {
      // If API fails, remove from localStorage
      const updatedBookings = userBookings.filter(
        b => b.date !== bookingPayload.date || b.eventName !== bookingPayload.eventName
      );
      localStorage.setItem('userBookings', JSON.stringify(updatedBookings));
      throw new Error(response.message || 'Booking failed');
    }
  } catch (error) {
    console.error('Booking creation failed:', error);
    setError(error.message || 'Failed to create booking. Please try again.');
  } finally {
    setLoading(false);
  }
};
  return (
    <Form noValidate validated={validated} onSubmit={handleSubmit}>
      {error && <Alert variant="danger" onClose={() => setError('')} dismissible>{error}</Alert>}

      <Row className="mb-4">
        <Col md={6}>
          <Form.Group className="mb-3">
            <Form.Label>Event Type <span className="text-danger">*</span></Form.Label>
            <Form.Select
              name="eventType"
              value={formData.eventType}
              onChange={handleChange}
              required
            >
              {eventTypes.map(event => (
                <option key={event.id} value={event.id}>{event.name}</option>
              ))}
            </Form.Select>
          </Form.Group>
        </Col>
        <Col md={6}>
          <Form.Group className="mb-3">
            <Form.Label>Event Date <span className="text-danger">*</span></Form.Label>
            <DatePicker
              selected={formData.date}
              onChange={handleDateChange}
              minDate={oneMonthFromNow}
              maxDate={new Date(oneMonthFromNow.getTime() + 7 * 24 * 60 * 60 * 1000)}
              dateFormat="MMMM d, yyyy"
              className="form-control"
              required
              isInvalid={validated && !formData.date}
              placeholderText={`Select date (available from ${oneMonthFromNow.toLocaleDateString()})`}
            />
            <Form.Control.Feedback type="invalid">
              Please select a valid date (must be exactly one month from now)
            </Form.Control.Feedback>
          </Form.Group>
        </Col>
      </Row>

      <Row className="mb-4">
        <Col md={6}>
          <Form.Group className="mb-3">
            <Form.Label>Location <span className="text-danger">*</span></Form.Label>
            <Form.Select
              name="location"
              value={formData.location}
              onChange={handleChange}
              required
            >
              {locations.map(loc => (
                <option key={loc.code} value={loc.code}>{loc.name}</option>
              ))}
            </Form.Select>
          </Form.Group>
        </Col>
        <Col md={6}>
          <Form.Group className="mb-3">
            <Form.Label>Venue <span className="text-danger">*</span></Form.Label>
            <Form.Control
              type="text"
              name="venue"
              value={formData.venue}
              onChange={handleChange}
              required
              minLength={3}
            />
            <Form.Control.Feedback type="invalid">
              Please provide a valid venue (minimum 3 characters)
            </Form.Control.Feedback>
          </Form.Group>
        </Col>
      </Row>

      <Form.Group className="mb-3">
        <Form.Label>Number of Attendees <span className="text-danger">*</span></Form.Label>
        <Form.Control
          type="number"
          name="attendees"
          value={formData.attendees}
          onChange={handleChange}
          required
          min="1"
          max="1000"
        />
        <Form.Control.Feedback type="invalid">
          Please enter a number between 1 and 1000
        </Form.Control.Feedback>
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Special Requirements</Form.Label>
        <Form.Control
          as="textarea"
          rows={3}
          name="specialRequirements"
          value={formData.specialRequirements}
          onChange={handleChange}
          placeholder="Any special equipment, timing requirements, or other notes..."
        />
      </Form.Group>

      <Card className="mb-4">
        <Card.Body>
          <h5>Pricing Summary</h5>
          <div className="d-flex justify-content-between">
            <span>Price per ticket:</span>
            <span>
              {formData.location === 'IN' ? '₹' :
                formData.location === 'US' ? '$' : '€'}
              {pricePerTicket}
            </span>
          </div>
          <div className="d-flex justify-content-between">
            <span>Number of tickets:</span>
            <span>{formData.attendees}</span>
          </div>
          <div className="d-flex justify-content-between fw-bold">
            <span>Total price:</span>
            <span>
              {formData.location === 'IN' ? '₹' :
                formData.location === 'US' ? '$' : '€'}
              {totalPrice}
            </span>
          </div>
          <div className="d-flex justify-content-between text-primary fw-bold">
            <span>Advance to pay (30%):</span>
            <span>
              {formData.location === 'IN' ? '₹' :
                formData.location === 'US' ? '$' : '€'}
              {advanceAmount}
            </span>
          </div>
        </Card.Body>
      </Card>

      <Form.Group className="mb-4">
        <Form.Check
          type="checkbox"
          id="terms-checkbox"
          label={
            <span>
              I agree to the <a href="/terms" target="_blank" rel="noopener noreferrer">Terms and Conditions</a>
            </span>
          }
          name="termsAccepted"
          checked={formData.termsAccepted}
          onChange={handleChange}
          isInvalid={validated && !formData.termsAccepted}
          feedback="You must accept the terms and conditions"
          feedbackType="invalid"
        />
      </Form.Group>

      <div className="d-flex justify-content-between">
        <Button
          variant="outline-secondary"
          onClick={onCancel}
          size="lg"
          disabled={loading}
        >
          Cancel
        </Button>
        <Button
          variant="primary"
          type="submit"
          disabled={!currentUser || loading}
          size="lg"
        >
          {loading ? (
            <>
              <Spinner
                as="span"
                animation="border"
                size="sm"
                role="status"
                aria-hidden="true"
              />
              {' Processing...'}
            </>
          ) : currentUser ? (
            'Book Now'
          ) : (
            'Login to Book'
          )}
        </Button>
      </div>
    </Form>
  );
};

export default MusicalForm;