import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const MyEvents = () => {
  const location = useLocation();
  const [events, setEvents] = useState([]);

  // Load events from API and check for new event from payment
  useEffect(() => {
    const loadEvents = async () => {
      try {
        // First load existing events
        const response = await fetch('/api/users/events', {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        });
        const data = await response.json();
        
        // Check if we have a new event from payment redirect
        if (location.state?.newEvent) {
          setEvents([location.state.newEvent, ...data.events]);
        } else {
          setEvents(data.events);
        }
      } catch (err) {
        console.error('Error loading events:', err);
      }
    };

    loadEvents();
  }, [location.state]);

  return (
    <div className="my-events-container">
      <h1>My Events</h1>
      
      {location.state?.paymentReceipt && (
        <div className="payment-success-alert">
          <h3>Payment Successful!</h3>
          <p>Booking ID: {location.state.paymentReceipt.bookingId}</p>
          <p>Amount: ₹{location.state.paymentReceipt.amount}</p>
          <p>Status: {location.state.paymentReceipt.status}</p>
        </div>
      )}

      <div className="events-list">
        {events.map((event, index) => (
          <div key={index} className="event-card">
            <h3>{event.eventType}</h3>
            <p>Date: {new Date(event.date).toLocaleDateString()}</p>
            <p>Venue: {event.venue}</p>
            <p>Package: {event.package.name}</p>
            <p>Amount: ₹{event.amount}</p>
            <p>Status: {event.status}</p>
            
            {event.bookingDetails && (
              <div className="booking-details">
                <h4>Booking Details:</h4>
                <pre>{JSON.stringify(event.bookingDetails, null, 2)}</pre>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyEvents;