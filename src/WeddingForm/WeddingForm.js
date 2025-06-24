
   import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './WeddingForm.css';
import { useAuth } from '../UserAuth/AuthContext';

const WeddingForm = () => {
    // Initialize form data with all required fields
    const [formData, setFormData] = useState({
      brideName: '',
      groomName: '',
      contactPerson: '',
      mobile: '',
      weddingType: '',
      venue: '',
      package: '',
      weddingDate: '',
      attendees: '',
      accommodation: '',
      theme: '',
      food: '',
      agreed: false
    });

    const [selectedAdditional, setSelectedAdditional] = useState([]);
    const [packageDetails, setPackageDetails] = useState([]);
    const [minDate, setMinDate] = useState('');
    const [maxDate, setMaxDate] = useState('');

    const weddingTypes = {
      'Luxury Wedding': {
        venues: ['The Ritz-Carlton, Maldives', 'Beverly Hills, Los Angeles', 'Versailles Palace, France'],
        packages: {
          'The Ritz-Carlton, Maldives': {
            'Beginner Package': 1000000,
            'Silver Package': 2500000,
            'Premium Package': 4000000
          },
          'Beverly Hills, Los Angeles': {
            'Beginner Package': 1200000,
            'Silver Package': 3000000,
            'Premium Package': 5000000
          },
          'Versailles Palace, France': {
            'Beginner Package': 1500000,
            'Silver Package': 3500000,
            'Premium Package': 5500000
          }
        },
        events: {
          'Beginner Package': [
            'Welcome Ceremony',
            'Pre-Wedding Photoshoot',
            'Dinner Reception',
            'Basic Floral Decorations',
            'Onsite Wedding Planner Support'
          ],
          'Silver Package': [
            'Exclusive Welcome Ceremony with Local Entertainment',
            'Luxury Photoshoot with Drone Views',
            'Cocktail Evening with Custom Drinks Menu',
            'Wedding Day Celebration with Floral Aisle',
            'Gala Dinner Reception with International Cuisine'
          ],
          'Premium Package': [
            'Fireworks Welcome for Guests',
            'Private Island Photoshoot',
            'Cocktail Evening with Live Music Performance',
            'Grand Wedding Ceremony with Designer Floral Decor',
            'Gourmet Chef Cuisine Reception'
          ]
        }
      },
      'Beach Wedding': {
        venues: ['Goa, India', 'Kerala, India', 'Andaman Islands, India'],
        packages: {
          'Goa, India': {
            'Beginner Package': 500000,
            'Silver Package': 1200000,
            'Premium Package': 2000000
          },
          'Kerala, India': {
            'Beginner Package': 600000,
            'Silver Package': 1300000,
            'Premium Package': 2200000
          },
          'Andaman Islands, India': {
            'Beginner Package': 700000,
            'Silver Package': 1400000,
            'Premium Package': 2500000
          }
        },
        events: {
          'Beginner Package': [
            'Welcome Ceremony',
            'Pre-Wedding Photoshoot by the Beach',
            'Beachside Wedding Ceremony',
            'Reception with Light Music'
          ],
          'Silver Package': [
            'Exclusive Welcome Ceremony with Local Performance',
            'Pre-Wedding Photoshoot with Drone Coverage',
            'Mehndi & Sangeet with Live Music',
            'Themed Dinner Reception'
          ],
          'Premium Package': [
            'Grand Welcome Ceremony with Fireworks',
            'Full-Day Luxury Photoshoot by the Ocean',
            'Mehndi & Sangeet with Celebrity Performers',
            'Lavish Beachside Wedding Ceremony'
          ]
        }
      },
      'Destination Wedding': {
        venues: ['Italy, Tuscany vineyards', 'France, Château in Loire Valley', 'Greece, Santorini'],
        packages: {
          'Italy, Tuscany vineyards': {
            'Beginner Package': 1800000,
            'Silver Package': 4500000,
            'Premium Package': 9000000
          },
          'France, Château in Loire Valley': {
            'Beginner Package': 2050000,
            'Silver Package': 3000000,
            'Premium Package': 3500000
          },
          'Greece, Santorini': {
            'Beginner Package': 1500000,
            'Silver Package': 3500000,
            'Premium Package': 6000000
          }
        },
        events: {
          'Beginner Package': [
            'Haldi Ceremony in Tuscan Gardens (if applicable)',
            'Mehendi Ceremony overlooking vineyards or Venice canals',
            'Wedding Ceremony in historic villa or chapel',
            'Photography & Videography'
          ],
          'Silver Package': [
            'Rehearsal Dinner at Amalfi Coast or lakeside',
            'Cocktail Reception with aperitivos and live jazz',
            'Baraat on Gondolas through Venetian canals'
          ],
          'Premium Package': [
            'Destination Helicopter Entry',
            'Custom Designer Décor inspired by Italian art',
            'Michelin-Starred Catering'
          ]
        }
      },
      'Temple Wedding': {
        venues: ['Meenakshi Temple, Tamil Nadu', 'Jagannath Temple, Odisha', 'Golden Temple, Punjab'],
        packages: {
          'Meenakshi Temple, Tamil Nadu': {
            'Beginner Package': 300000,
            'Silver Package': 700000,
            'Premium Package': 1500000
          },
          'Jagannath Temple, Odisha': {
            'Beginner Package': 350000,
            'Silver Package': 800000,
            'Premium Package': 1700000
          },
          'Golden Temple, Punjab': {
            'Beginner Package': 400000,
            'Silver Package': 900000,
            'Premium Package': 2000000
          }
        },
        events: {
          'Beginner Package': [
            'Puja & Rituals in the Temple',
            'Simple Mandap Setup for Wedding',
            'Photography & Videography',
            'Basic Floral Décor'
          ],
          'Silver Package': [
            'Grand Puja with Temple Priests',
            'Traditional Music & Dance Performances',
            'Decorated Mandap in Temple Courtyard',
            'Wedding Feast with Regional Specialties'
          ],
          'Premium Package': [
            'Exclusive Temple Booking',
            'Luxury Décor with Fresh Flowers',
            'Live Traditional Orchestra',
            'Customized Gourmet Catering'
          ]
        }
      },
      'Palace Wedding': {
        venues: ['Umaid Bhawan Palace, Jodhpur', 'Lake Palace, Udaipur', 'Falaknuma Palace, Hyderabad'],
        packages: {
          'Umaid Bhawan Palace, Jodhpur': {
            'Beginner Package': 1500000,
            'Silver Package': 3500000,
            'Premium Package': 5500000
          },
          'Lake Palace, Udaipur': {
            'Beginner Package': 1800000,
            'Silver Package': 4000000,
            'Premium Package': 6000000
          },
          'Falaknuma Palace, Hyderabad': {
            'Beginner Package': 2000000,
            'Silver Package': 4500000,
            'Premium Package': 7000000
          }
        },
        events: {
          'Beginner Package': [
            'Wedding Ceremony in Palace Hall',
            'Basic Décor with Fresh Flowers',
            'Photography & Videography',
            'Traditional Dinner Reception'
          ],
          'Silver Package': [
            'Royal Welcome with Folk Performances',
            'Mandap Setup in Palace Courtyard',
            'Mehendi & Sangeet with Live Music',
            'Wedding Feast with Regional and Global Cuisines'
          ],
          'Premium Package': [
            'Exclusive Palace Booking for the Day',
            'Designer Décor with Luxury Elements',
            'Live Celebrity Performances',
            'Grand Fireworks Show'
          ]
        }
      },
      'Traditional Wedding': {
        venues: ['Village Courtyard in Rajasthan', 'Ancient Heritage Sites in Hampi', 'Banquet Halls in Kolkata'],
        packages: {
          'Village Courtyard in Rajasthan': {
            'Beginner Package': 500000,
            'Silver Package': 1200000,
            'Premium Package': 2000000
          },
          'Ancient Heritage Sites in Hampi': {
            'Beginner Package': 600000,
            'Silver Package': 1300000,
            'Premium Package': 2500000
          },
          'Banquet Halls in Kolkata': {
            'Beginner Package': 400000,
            'Silver Package': 1000000,
            'Premium Package': 1800000
          }
        },
        events: {
          'Beginner Package': [
            'Haldi Ceremony in Traditional Setting',
            'Wedding in Rustic Mandap',
            'Basic Food Catering with Regional Dishes',
            'Photography & Videography'
          ],
          'Silver Package': [
            'Sangeet with Live Folk Music Performances',
            'Designer Mandap Décor',
            'Grand Dinner Reception with Traditional Menu',
            'Drone Coverage for Photography'
          ],
          'Premium Package': [
            'Full-Day Wedding Celebrations',
            'Celebrity Performances for Sangeet',
            'Luxury Mandap Setup with Themed Decor',
            'Customized Global Cuisine Menu'
          ]
        }
      }
    };
    

    const additionalEventsList = [
      { name: 'Extra Photography Session', price: 50000 },
      { name: 'Videography Package', price: 75000 },
      { name: 'Additional Floral Arrangements', price: 100000 },
      { name: 'Live Band Performance', price: 150000 },
      { name: 'Fireworks Display', price: 200000 },
      { name: 'Luxury Car Service', price: 80000 },
      { name: 'Spa Services for Guests', price: 120000 },
      { name: 'Custom Wedding Cake', price: 60000 },
      { name: 'Themed Decor Extensions', price: 90000 },
      { name: 'Additional Security Staff', price: 40000 }
    ];

    
    const { currentUser } = useAuth();
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    // Set min and max dates when component mounts
    useEffect(() => {
        const today = new Date();
        const oneMonthLater = new Date();
        oneMonthLater.setMonth(today.getMonth() + 1);
        
        // Format dates as YYYY-MM-DD for the date input
        const formatDate = (date) => {
            const year = date.getFullYear();
            const month = String(date.getMonth() + 1).padStart(2, '0');
            const day = String(date.getDate()).padStart(2, '0');
            return `${year}-${month}-${day}`;
        };
        
        setMinDate(formatDate(oneMonthLater));
        
        // Set max date to 2 years from now
        const twoYearsLater = new Date();
        twoYearsLater.setFullYear(today.getFullYear() + 2);
        setMaxDate(formatDate(twoYearsLater));
    }, []);

    const handlePaymentSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        
        try {
            if (!isFormValid()) {
                throw new Error('Please complete all required fields and agree to the terms');
            }

            // Calculate amounts
            const packageCost = weddingTypes[formData.weddingType]?.packages?.[formData.venue]?.[formData.package] || 0;
            const additionalCost = selectedAdditional.reduce((sum, event) => sum + event.price, 0);
            const totalAmount = (packageCost + additionalCost) * 1.15;
            const advanceAmount = totalAmount * 0.4;

            // Prepare payment data
            const paymentData = {
                user: {
                    id: currentUser.id,
                    email: currentUser.email,
                    name: currentUser.displayName || formData.contactPerson
                },
                contactInfo: {
                    contactPerson: formData.contactPerson,
                    mobile: formData.mobile
                },
                coupleInfo: {
                    brideName: formData.brideName,
                    groomName: formData.groomName
                },
                weddingDetails: {
                    type: formData.weddingType,
                    venue: formData.venue,
                    date: formData.weddingDate,
                    attendees: formData.attendees,
                    theme: formData.theme,
                    foodPreference: formData.food,
                    accommodation: formData.accommodation
                },
                packageInfo: {
                    name: formData.package,
                    cost: packageCost,
                    includedEvents: weddingTypes[formData.weddingType]?.events?.[formData.package] || []
                },
                additionalServices: selectedAdditional,
                paymentInfo: {
                    totalAmount,
                    advanceAmount,
                    remainingAmount: totalAmount - advanceAmount,
                    description: `Advance payment for ${formData.weddingType} wedding at ${formData.venue}`,
                    currency: 'INR'
                }
            };

            navigate('/payments', { 
                state: { 
                    bookingData: paymentData,
                    paymentDetails: {
                        amount: advanceAmount,
                        description: paymentData.paymentInfo.description
                    }
                } 
            });

        } catch (error) {
            console.error('Payment submission error:', error);
            alert(error.message);
        } finally {
            setLoading(false);
        }
    };
    
     const calculateTotalEstimatedAmount = () => {
      const packageCost = weddingTypes[formData.weddingType]?.packages?.[formData.venue]?.[formData.package] || 0;
      const additionalCost = selectedAdditional.reduce((sum, event) => sum + event.price, 0);
      return (packageCost + additionalCost) * 1.15;
    };

    const isFormValid = () => {
      // Check all required fields are filled
      const requiredFields = [
        'brideName', 'groomName', 'contactPerson', 'mobile', 
        'weddingType', 'venue', 'package', 'weddingDate',
        'attendees', 'accommodation', 'theme', 'food'
      ];
      
      for (const field of requiredFields) {
        if (!formData[field]) return false;
      }
      
      // Validate mobile number
      const isMobileValid = formData.mobile.match(/^\d{10}$/);
      if (!isMobileValid) return false;
      
      // Validate date is within range (though the input should enforce this)
      const selectedDate = new Date(formData.weddingDate);
      const minDateObj = new Date(minDate);
      const maxDateObj = new Date(maxDate);
      
      if (selectedDate < minDateObj || selectedDate > maxDateObj) return false;
      
      // Validate attendees is a positive number
      if (isNaN(formData.attendees) || formData.attendees < 1) return false;
      
      return formData.agreed;
    };

    const [mobileError, setMobileError] = useState('');
    const [dateError, setDateError] = useState('');
    const [formErrors, setFormErrors] = useState({});
    
    const handleMobileChange = (e) => {
      const value = e.target.value;
      if(value.length > 10) return;
      setFormData({...formData, mobile: value});
      
      if(!value.match(/^\d{0,10}$/)) {
        setMobileError('Only numbers allowed');
      } else if(value.length < 10) {
        setMobileError('Exactly 10 digits required');
      } else {
        setMobileError('');
      }
    };

    // Add date validation
  
   const handleDateChange = (e) => {
      const selectedDate = new Date(e.target.value);
      const minDateObj = new Date(minDate);
      const maxDateObj = new Date(maxDate);
      
      setFormData({...formData, weddingDate: e.target.value});
      
      if(selectedDate < minDateObj) {
        setDateError(`Date must be on or after ${minDateObj.toLocaleDateString()}`);
      } else if(selectedDate > maxDateObj) {
        setDateError(`Date must be before ${maxDateObj.toLocaleDateString()}`);
      } else {
        setDateError('');
      }
    };
 // Check if all required fields are filled to enable the agreement checkbox
    const canAgree = () => {
      const requiredFields = [
        'brideName', 'groomName', 'contactPerson', 'mobile', 
        'weddingType', 'venue', 'package', 'weddingDate',
        'attendees', 'accommodation', 'theme', 'food'
      ];
      
      for (const field of requiredFields) {
        if (!formData[field]) return false;
      }
      
      // Validate mobile number
      if (!formData.mobile.match(/^\d{10}$/)) return false;
      
      // Validate date
      if (!formData.weddingDate) return false;
      
      // Validate attendees
      if (isNaN(formData.attendees) || formData.attendees < 1) return false;
      
      return true;
    };
    useEffect(() => {
      if (formData.weddingType && formData.venue && formData.package) {
        const packageEvents = weddingTypes[formData.weddingType].events[formData.package];
        if (JSON.stringify(packageEvents) !== JSON.stringify(packageDetails)) {
          setPackageDetails(packageEvents);
        }
      }
    }, [formData.weddingType, formData.venue, formData.package, weddingTypes, packageDetails]);

    

    const formStyle = {
      fontFamily: 'Times New Roman, serif',
      maxWidth: '800px',
      margin: '20px auto',
      padding: '30px',
      backgroundColor: '#f8f9fa',
      borderRadius: '10px',
      boxShadow: '0 0 10px rgba(0,0,0,0.1)',
      color: '#000000'
    };
    
    const inputStyle = {
      backgroundColor: '#ffffff',
      border: '1px solid #ced4da',
      borderRadius: '4px',
      padding: '8px',
      margin: '5px 0',
      width: '100%',
      fontFamily: 'Times New Roman, serif',
      color: '#000000'
    };

    return (
      <form style={formStyle} onSubmit={handlePaymentSubmit}>
        <h2 style={{ color: '#2c3e50', textAlign: 'center' }}>Wedding Planning Form</h2>

        {/* Basic Information Section */}
        <div style={{ marginBottom: '20px' }}>
          <h3 style={{ color: '#3498db' }}>Couple Information</h3>
          <input type="text" placeholder="Bride's Name" required 
                style={inputStyle} 
                onChange={(e) => setFormData({...formData, brideName: e.target.value})} />

          <input type="text" placeholder="Groom's Name" required 
                style={inputStyle} 
                onChange={(e) => setFormData({...formData, groomName: e.target.value})} />

          <input type="text" placeholder="Contact Person Name" required 
                style={inputStyle} 
                onChange={(e) => setFormData({...formData, contactPerson: e.target.value})} />

          <input 
            type="tel" 
            placeholder="Mobile Number" 
            pattern="[0-9]{10}"
            required 
            style={inputStyle}
            value={formData.mobile}
            onChange={handleMobileChange}
          />
          {mobileError && <div style={{color: 'red', fontSize: '0.8em'}}>{mobileError}</div>}
        </div>

        {/* Wedding Details Section */}
        <div style={{ marginBottom: '20px' }}>
          <h3 style={{ color: '#3498db' }}>Wedding Details</h3>
          <select value={formData.weddingType} required 
                  style={inputStyle}
                  onChange={(e) => setFormData({...formData, weddingType: e.target.value, venue: '', package: ''})}>
            <option value="">Select Wedding Type</option>
            {Object.keys(weddingTypes).map(type => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>

          {formData.weddingType && (
            <select value={formData.venue} required 
                    style={inputStyle}
                    onChange={(e) => setFormData({...formData, venue: e.target.value, package: ''})}>
              <option value="">Select Venue</option>
              {weddingTypes[formData.weddingType].venues.map(venue => (
                <option key={venue} value={venue}>{venue}</option>
              ))}
            </select>
          )}

          {formData.venue && (
            <select value={formData.package} required 
                    style={inputStyle}
                    onChange={(e) => setFormData({...formData, package: e.target.value})}>
              <option value="">Select Package</option>
              {Object.keys(weddingTypes[formData.weddingType].packages[formData.venue]).map(pkg => (
                <option key={pkg} value={pkg}>{pkg} (₹{weddingTypes[formData.weddingType].packages[formData.venue][pkg].toLocaleString()})</option>
              ))}
            </select>
          )}

          {packageDetails.length > 0 && (
            <div style={{ margin: '15px 0', padding: '10px', backgroundColor: '#e8f4fc' }}>
              <h4>Package Includes:</h4>
              <ul>
                {packageDetails.map((event, index) => (
                  <li key={index} style={{ margin: '5px 0' }}>{event}</li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Additional Events Section */}
        {formData.package && (
          <div style={{ marginBottom: '20px' }}>
            <h3 style={{ color: '#3498db' }}>Additional Events</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '10px' }}>
              {additionalEventsList.map((event, index) => (
                <label key={index} style={{ display: 'flex', alignItems: 'center' }}>
                  <input type="checkbox" 
                        style={{ marginRight: '8px' }}
                        onChange={(e) => {
                          if(e.target.checked) {
                            setSelectedAdditional([...selectedAdditional, event]);
                          } else {
                            setSelectedAdditional(selectedAdditional.filter(ev => ev !== event));
                          }
                        }} />
                  {event.name} (₹{event.price.toLocaleString()})
                </label>
              ))}
            </div>
          </div>
        )}

        {/* Other Form Fields */}
        <div style={{ marginBottom: '20px' }}>
          <h3 style={{ color: '#3498db' }}>Additional Details</h3>
          
          <input 
            type="date" 
            min="2025-05-12"
            required
            style={inputStyle}
            value={formData.weddingDate}
            onChange={handleDateChange}
          />
          {dateError && <div style={{color: 'red', fontSize: '0.8em'}}>{dateError}</div>}

          <input type="number" 
                placeholder="Number of Attendees" 
                min="1"
                required
                style={inputStyle}
                onChange={(e) => setFormData({...formData, attendees: e.target.value})} />

          <select value={formData.accommodation} 
                  required
                  style={inputStyle}
                  onChange={(e) => setFormData({...formData, accommodation: e.target.value})}>
            <option value="">Accommodation Required?</option>
            <option value="yes">Yes</option>
            <option value="no">No</option>
          </select>

          <select value={formData.theme} 
                  required
                  style={inputStyle}
                  onChange={(e) => setFormData({...formData, theme: e.target.value})}>
            <option value="">Select Theme Type</option>
            <option value="Traditional">Traditional</option>
            <option value="Modern">Modern</option>
            <option value="Vintage">Vintage</option>
            <option value="Beach">Beach</option>
          </select>

          <select value={formData.food} 
                  required
                  style={inputStyle}
                  onChange={(e) => setFormData({...formData, food: e.target.value})}>
            <option value="">Select Food Preference</option>
            <option value="Veg">Vegetarian</option>
            <option value="Non-Veg">Non-Vegetarian</option>
            <option value="Mix">Mix</option>
            <option value="Jain">Jain</option>
          </select>
        </div>

        {/* Pricing Summary */}
        <div style={{ marginBottom: '20px', padding: '15px', backgroundColor: '#e8f4fc' }}>
          <h3 style={{ color: '#3498db' }}>Pricing Summary</h3>
          <p>Package Cost: ₹{(weddingTypes[formData.weddingType]?.packages?.[formData.venue]?.[formData.package] || 0).toLocaleString()}</p>
          <p>Additional Events: ₹{selectedAdditional.reduce((sum, event) => sum + event.price, 0).toLocaleString()}</p>
          <p>Flexibility Margin (15%): ₹{((weddingTypes[formData.weddingType]?.packages?.[formData.venue]?.[formData.package] + selectedAdditional.reduce((sum, event) => sum + event.price, 0)) * 0.15 || 0).toLocaleString()}</p>
          <h4>Total Estimated Amount: ₹{calculateTotalEstimatedAmount().toLocaleString()}</h4>
          <p>Advance Amount (40%): ₹{(calculateTotalEstimatedAmount() * 0.4).toLocaleString()}</p>
          <p>Remaining Amount (60%): ₹{(calculateTotalEstimatedAmount() * 0.6).toLocaleString()}</p>
        </div>

        {/* Terms Agreement */}
        <div style={{ marginBottom: '20px' }}>
          <label style={{ display: 'flex', alignItems: 'center' }}>
            <input 
              type="checkbox" 
              checked={formData.agreed}
              onChange={(e) => setFormData({...formData, agreed: e.target.checked})}
              style={{ marginRight: '10px' }}
              required
            />
            <span>
              I agree to the event management terms and cancellation policy. 
              (40% advance is non-refundable as per cancellation policy)
            </span>
          </label>
        </div>

        {/* Payment Button */}
        <button 
          type="submit"
          style={{
            backgroundColor: '#27ae60',
            color: 'white',
            padding: '10px 20px',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
            width: '100%',
            fontSize: '1.1em',
            fontWeight: 'bold'
          }}
          disabled={!formData.agreed || loading}
        >
          {loading ? 'Processing...' : `Proceed to Pay Advance (₹${(calculateTotalEstimatedAmount() * 0.4).toLocaleString()})`}
        </button>
      </form>
    );
};

export default WeddingForm;