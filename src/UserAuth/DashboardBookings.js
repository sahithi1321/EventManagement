import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Table, Card, Button, Alert, Spinner, Tabs, Tab, Modal, Form } from 'react-bootstrap';
import { 
  getBookingDetails, 
  getUserBookings, 
  getPaymentHistory, 
  updateBooking, 
  cancelBooking,
  createBooking  
} from '../API/api';
import { useAuth } from './AuthContext';

const DashboardBookings = () => {
  const { currentUser } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [bookings, setBookings] = useState([]);
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState('bookings');
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [updateData, setUpdateData] = useState({
    attendees: '',
    specialRequirements: ''
  });

useEffect(() => {
  const fetchData = async () => {
    try {
      setLoading(true);
      setError('');
      
      if (!currentUser?.id) return;
      
      // Get bookings from localStorage first
      const localBookings = JSON.parse(localStorage.getItem('userBookings')) || [];
      
      // Filter local bookings to only those for the current user
      const userLocalBookings = localBookings.filter(
        booking => booking.userId === currentUser.id || booking.userId === currentUser._id
      );

      // Then fetch fresh data from server
      const [bookingsResponse, paymentsResponse] = await Promise.all([
        getUserBookings(currentUser.id),
        getPaymentHistory(currentUser.id)
      ]);
      
      // Combine server and local bookings
      const serverBookings = bookingsResponse.bookings || bookingsResponse.data || [];
      const allBookings = [...serverBookings, ...userLocalBookings];
      
      setBookings(allBookings);
      setPayments(paymentsResponse.payments || paymentsResponse.data || []);
      
    } catch (err) {
      console.error('Fetch error:', err);
      setError(err.message || 'Failed to load data');
      
      // Fallback to localStorage if API fails
      const localBookings = JSON.parse(localStorage.getItem('userBookings')) || [];
      const userLocalBookings = localBookings.filter(
        booking => booking.userId === currentUser?.id || booking.userId === currentUser?._id
      );
      setBookings(userLocalBookings);
    } finally {
      setLoading(false);
    }
  };
  
  fetchData();
}, [currentUser?.id]);

  const handleCreateBooking = async (formData) => {
    try {
      const response = await createBooking(formData);
      if (response.success) {
        // Store in localStorage
        const userBookings = JSON.parse(localStorage.getItem('userBookings')) || [];
        userBookings.push(response.booking);
        localStorage.setItem('userBookings', JSON.stringify(userBookings));
        
        navigate('/payments', { 
          state: { 
            bookingId: response.booking._id,
            formData: response.booking 
          }
        });
      }
    } catch (err) {
      setError(err.message || 'Booking creation failed');
    }
  };
  
  const handleCancel = async () => {
    try {
      if (selectedBooking._id) {
        // API cancellation for server bookings
        const response = await cancelBooking(selectedBooking._id);
        if (response.success) {
          setBookings(bookings.filter(b => b._id !== selectedBooking._id));
        }
      } else {
        // LocalStorage cancellation for local bookings
        const userBookings = JSON.parse(localStorage.getItem('userBookings')) || [];
        const updatedBookings = userBookings.filter(b => 
          b.date !== selectedBooking.date || b.eventName !== selectedBooking.eventName
        );
        localStorage.setItem('userBookings', JSON.stringify(updatedBookings));
        setBookings(bookings.filter(b => 
          b.date !== selectedBooking.date || b.eventName !== selectedBooking.eventName
        ));
      }
      setShowCancelModal(false);
    } catch (err) {
      setError(err.message || 'Failed to cancel booking');
    }
  };

  const handleUpdate = async (bookingId) => {
    if (!bookingId) {
      // Handle localStorage updates for bookings without ID
      const userBookings = JSON.parse(localStorage.getItem('userBookings')) || [];
      const updatedBookings = userBookings.map(b => 
        b.date === selectedBooking.date && b.eventName === selectedBooking.eventName ? 
        { ...b, ...updateData } : b
      );
      localStorage.setItem('userBookings', JSON.stringify(updatedBookings));
      setBookings(bookings.map(b => 
        b.date === selectedBooking.date && b.eventName === selectedBooking.eventName ? 
        { ...b, ...updateData } : b
      ));
      setSelectedBooking(null);
      return;
    }
    
    try {
      const response = await updateBooking(bookingId, updateData);
      if (response.success) {
        setBookings(bookings.map(b => 
          b._id === bookingId ? { ...b, ...updateData } : b
        ));
        setSelectedBooking(null);
      }
    } catch (err) {
      setError(err.message || 'Failed to update booking');
    }
  };

  if (loading) {
    return (
      <div className="text-center mt-5">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
        <p>Loading your booking information...</p>
      </div>
    );
  }

  if (error) {
    return (
      <Alert variant="danger" className="mt-3">
        <Alert.Heading>Error loading data</Alert.Heading>
        <p>{error}</p>
        <Button variant="primary" onClick={() => window.location.reload()}>
          Try Again
        </Button>
      </Alert>
    );
  }

  return (
    <Card className="mt-4">
      <Card.Header>
        <h4>My Bookings & Payments</h4>
      </Card.Header>
      <Card.Body>
        <Tabs activeKey={activeTab} onSelect={(k) => setActiveTab(k)} className="mb-3">
          <Tab eventKey="bookings" title="My Bookings">
            <Table striped bordered hover responsive>
              <thead>
                <tr>
                  <th>Event</th>
                  <th>Date</th>
                  <th>Venue</th>
                  <th>Attendees</th>
                  <th>Total Price</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {bookings.length > 0 ? (
                  bookings.map((booking, index) => (
                    <tr key={booking._id || index}>
                      <td>{booking.eventName}</td>
                      <td>{new Date(booking.date).toLocaleDateString()}</td>
                      <td>{booking.venue}</td>
                      <td>{booking.attendees}</td>
                      <td>{booking.currency} {booking.totalPrice}</td>
                      <td>{booking.status || 'Pending'}</td>
                      <td>
                        <Button variant="info" size="sm" onClick={() => navigate(`/booking/${booking._id || index}`)}>
                          View
                        </Button>
                        <Button 
                          variant="warning" 
                          size="sm" 
                          className="ms-2" 
                          onClick={() => {
                            setSelectedBooking(booking);
                            setUpdateData({
                              attendees: booking.attendees,
                              specialRequirements: booking.specialRequirements || ''
                            });
                          }}
                        >
                          Update
                        </Button>
                        <Button 
                          variant="danger" 
                          size="sm" 
                          className="ms-2" 
                          onClick={() => {
                            setSelectedBooking(booking);
                            setShowCancelModal(true);
                          }}
                        >
                          Cancel
                        </Button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="7" className="text-center">No bookings found</td>
                  </tr>
                )}
              </tbody>
            </Table>
          </Tab>
          
          <Tab eventKey="payments" title="Payment History">
            <Table striped bordered hover responsive>
              <thead>
                <tr>
                  <th>Booking ID</th>
                  <th>Event</th>
                  <th>Amount</th>
                  <th>Date</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {payments.length > 0 ? (
                  payments.map(payment => (
                    <tr key={payment._id}>
                      <td>{payment.bookingId}</td>
                      <td>{payment.eventName || 'N/A'}</td>
                      <td>{payment.currency || '$'}{payment.amount?.toFixed(2) || '0.00'}</td>
                      <td>{new Date(payment.createdAt).toLocaleString()}</td>
                      <td>{payment.status}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="text-center">No payment history found</td>
                  </tr>
                )}
              </tbody>
            </Table>
          </Tab>
        </Tabs>

        {/* Update Modal */}
        {selectedBooking && (
          <Modal show={!!selectedBooking} onHide={() => setSelectedBooking(null)}>
            <Modal.Header closeButton>
              <Modal.Title>Update Booking</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form>
                <Form.Group className="mb-3">
                  <Form.Label>Attendees</Form.Label>
                  <Form.Control 
                    type="number" 
                    value={updateData.attendees}
                    onChange={(e) => setUpdateData({...updateData, attendees: e.target.value})}
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label>Special Requirements</Form.Label>
                  <Form.Control 
                    as="textarea"
                    rows={3}
                    value={updateData.specialRequirements}
                    onChange={(e) => setUpdateData({...updateData, specialRequirements: e.target.value})}
                  />
                </Form.Group>
              </Form>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={() => setSelectedBooking(null)}>
                Close
              </Button>
              <Button variant="primary" onClick={() => handleUpdate(selectedBooking._id)}>
                Save Changes
              </Button>
            </Modal.Footer>
          </Modal>
        )}

        {/* Cancel Modal */}
        <Modal show={showCancelModal} onHide={() => setShowCancelModal(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Cancel Booking</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            Are you sure you want to cancel this booking?
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowCancelModal(false)}>
              No
            </Button>
            <Button variant="danger" onClick={handleCancel}>
              Yes, Cancel
            </Button>
          </Modal.Footer>
        </Modal>
      </Card.Body>
    </Card>
  );
};

export default DashboardBookings;