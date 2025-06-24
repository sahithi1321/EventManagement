import React, { useState } from 'react';
import axios from 'axios';
import './EventFormStyles.css';

const EventBookingForm = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    contactPerson: '',
    mobile: '',
    eventType: '',
    venue: '',
    package: '',
    eventDate: '',
    theme: '',
    estimatedGuests: '',
    specialRequests: ''
  });

  const [packageDetails, setPackageDetails] = useState(null);
  const [estimatedAmount, setEstimatedAmount] = useState(0);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const eventTypes = [
    'Anniversary',
    'Baby Shower',
    'House Warming',
    'Birthday',
    'Family Reunion',
    'Festive Gathering',
    'Retirement',
    'Cultural Event'
  ];

  const venues = {
    'Anniversary': ['Grand Ballroom', 'Beach Resort', 'Garden Pavilion'],
    'Baby Shower': ['Residence', 'Community Hall', 'Restaurant Private Room'],
    'House Warming': ['Residence', 'Banquet Hall'],
    'Birthday': ['Residence', 'Party Lounge', 'Rooftop Venue'],
    default: ['Residence', 'Hotel Ballroom', 'Community Center']
  };

  const packages = {
    'Anniversary': {
      'Beginner': { price: 50000, includes: ['Basic decoration', '3-hour event', 'Photographer'] },
      'Silver': { price: 80000, includes: ['Premium decoration', '5-hour event', 'Photographer+Video'] },
      'Premium': { price: 120000, includes: ['Luxury decoration', 'Full day', 'Professional photo/video'] }
    },
    'Baby Shower': {
      'Basic': { price: 30000, includes: ['Simple decor', '2-hour event'] },
      'Deluxe': { price: 50000, includes: ['Themed decor', '4-hour event', 'Photographer'] }
    },
    'House Warming': {
      'Standard': { price: 25000, includes: ['Basic setup'] },
      'Premium': { price: 45000, includes: ['Full decor', 'Catering setup'] }
    },
    'Birthday': {
      'Kids': { price: 35000, includes: ['Themed decor', 'Entertainer'] },
      'Adult': { price: 60000, includes: ['Elegant decor', 'DJ'] }
    },
    default: {
      'Standard': { price: 40000, includes: ['Basic setup'] }
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    if (name === 'eventType') {
      setFormData(prev => ({ ...prev, venue: '', package: '' }));
      setPackageDetails(null);
      setEstimatedAmount(0);
    }
    
    if (name === 'package') {
      const selectedPackage = packages[formData.eventType]?.[value] || packages.default[value];
      setPackageDetails(selectedPackage);
      setEstimatedAmount(selectedPackage?.price || 0);
    }
  };

  const validateMobile = (mobile) => {
    return /^\d{10}$/.test(mobile);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    if (!validateMobile(formData.mobile)) {
      return setError('Mobile number must be 10 digits');
    }
    
    if (!formData.eventDate) {
      return setError('Please select event date');
    }

    try {
      setLoading(true);
      const response = await axios.post('/api/events/book', {
        ...formData,
        estimatedAmount
      });
      
      console.log("Booking successful:", response.data);
      alert('Event booked successfully!');
      
    } catch (err) {
      console.error("Booking error:", err);
      setError(err.response?.data?.message || "Booking failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="event-form-container">
      <h2>Event Booking Form</h2>
      
      {error && <div className="error-message">{error}</div>}

      <form onSubmit={handleSubmit}>
        {/* Personal Information */}
        <div className="form-section">
          <h3>Personal Information</h3>
          <div className="form-group">
            <label>First Name</label>
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              required
            />
          </div>
          
          <div className="form-group">
            <label>Last Name</label>
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              required
            />
          </div>
          
          <div className="form-group">
            <label>Contact Person Name</label>
            <input
              type="text"
              name="contactPerson"
              value={formData.contactPerson}
              onChange={handleChange}
              required
            />
          </div>
          
          <div className="form-group">
            <label>Mobile Number (10 digits)</label>
            <input
              type="tel"
              name="mobile"
              value={formData.mobile}
              onChange={handleChange}
              pattern="\d{10}"
              required
            />
          </div>
        </div>

        {/* Event Details */}
        <div className="form-section">
          <h3>Event Details</h3>
          
          <div className="form-group">
            <label>Event Type</label>
            <select
              name="eventType"
              value={formData.eventType}
              onChange={handleChange}
              required
            >
              <option value="">Select Event Type</option>
              {eventTypes.map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </div>
          
          {formData.eventType && (
            <div className="form-group">
              <label>Venue</label>
              <select
                name="venue"
                value={formData.venue}
                onChange={handleChange}
                required
              >
                <option value="">Select Venue</option>
                {(venues[formData.eventType] || venues.default).map(venue => (
                  <option key={venue} value={venue}>{venue}</option>
                ))}
              </select>
            </div>
          )}
          
          {formData.venue && (
            <div className="form-group">
              <label>Package</label>
              <select
                name="package"
                value={formData.package}
                onChange={handleChange}
                required
              >
                <option value="">Select Package</option>
                {Object.keys(packages[formData.eventType] || packages.default).map(pkg => (
                  <option key={pkg} value={pkg}>{pkg}</option>
                ))}
              </select>
            </div>
          )}
          
          {packageDetails && (
            <div className="package-details">
              <h4>Package Includes:</h4>
              <ul>
                {packageDetails.includes.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
              <p className="price">Price: ₹{packageDetails.price.toLocaleString()}</p>
            </div>
          )}
          
          <div className="form-group">
            <label>Event Date</label>
            <input
              type="date"
              name="eventDate"
              value={formData.eventDate}
              onChange={handleChange}
              min={new Date().toISOString().split('T')[0]}
              required
            />
          </div>
          
          <div className="form-group">
            <label>Event Theme</label>
            <input
              type="text"
              name="theme"
              value={formData.theme}
              onChange={handleChange}
            />
          </div>
          
          <div className="form-group">
            <label>Estimated Number of Guests</label>
            <input
              type="number"
              name="estimatedGuests"
              value={formData.estimatedGuests}
              onChange={handleChange}
              min="1"
            />
          </div>
          
          <div className="form-group">
            <label>Special Requests</label>
            <textarea
              name="specialRequests"
              value={formData.specialRequests}
              onChange={handleChange}
              rows="3"
            />
          </div>
        </div>

        {/* Payment Summary */}
        <div className="payment-summary">
          <h3>Payment Summary</h3>
          <div className="summary-item">
            <span>Package Price:</span>
            <span>₹{estimatedAmount.toLocaleString()}</span>
          </div>
          <div className="summary-item total">
            <span>Estimated Total:</span>
            <span>₹{estimatedAmount.toLocaleString()}</span>
          </div>
        </div>

        <button type="submit" className="submit-btn" disabled={loading}>
          {loading ? 'Processing...' : 'Book Event'}
        </button>
      </form>
    </div>
  );
};

export default EventBookingForm;