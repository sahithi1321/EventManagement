import React, { useState, useEffect } from 'react';
import { Tab, Tabs, Table, Badge, Alert, Spinner, Card, Row, Col, Button } from 'react-bootstrap';
import { getAllBookings, getAllPayments, getAllEvents, getAllUsers } from '../API/api';
import { useAuth } from '../UserAuth/AuthContext';
import { Form } from 'react-bootstrap'; 
import API from '../API/api'; 

const EventOrganizerDashboard = () => {
  const { currentUser } = useAuth();
  const [activeTab, setActiveTab] = useState('events');
  const [events, setEvents] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [payments, setPayments] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [refreshCount, setRefreshCount] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError('');
        
        switch(activeTab) {
          case 'events':
            const eventsRes = await getAllEvents();
            setEvents(Array.isArray(eventsRes?.data) ? eventsRes.data : []);
            break;
          case 'bookings':
            const bookingsRes = await getAllBookings();
            setBookings(bookingsRes?.bookings || []);
            break;
          case 'payments':
            const paymentsRes = await getAllPayments();
            setPayments(paymentsRes?.data || []);
            break;
          case 'users':
            const usersRes = await getAllUsers();
            setUsers(Array.isArray(usersRes?.data) ? usersRes.data : []);
            break;
          default:
            break;
        }
      } catch (err) {
        console.error('Fetch error:', err);
        setError(err.message || 'Failed to fetch data');
        if (activeTab === 'events') setEvents([]);
        if (activeTab === 'bookings') setBookings([]);
        if (activeTab === 'payments') setPayments([]);
        if (activeTab === 'users') setUsers([]);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [activeTab, refreshCount]);

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    try {
      return new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    } catch {
      return 'Invalid Date';
    }
  };

  const getStatusVariant = (status) => {
    switch(status) {
      case 'confirmed': return 'success';
      case 'cancelled': return 'danger';
      case 'pending': return 'warning';
      default: return 'secondary';
    }
  };

  const totalRevenue = (payments || []).reduce((sum, payment) => {
    return sum + ((payment?.status === 'completed' && payment?.amount) ? payment.amount : 0);
  }, 0);

  const totalPendingPayments = (payments || []).reduce((sum, payment) => {
    return sum + ((payment?.status !== 'completed' && payment?.amount) ? payment.amount : 0);
  }, 0);

  return (
    <div className="organizer-dashboard">
      <h2 className="mb-4">Organizer Dashboard</h2>
      
      <Tabs activeKey={activeTab} onSelect={setActiveTab} className="mb-4">
        <Tab eventKey="events" title="Events">
          <div className="d-flex justify-content-between align-items-center">
            <h4 className="my-4">All Events</h4>
            <Button variant="primary" onClick={() => setRefreshCount(c => c + 1)}>
              <i className="bi bi-arrow-repeat"></i> Refresh
            </Button>
          </div>
          {loading ? (
            <div className="text-center">
              <Spinner animation="border" />
              <p>Loading events...</p>
            </div>
          ) : error ? (
            <Alert variant="danger">
              <Alert.Heading>Error</Alert.Heading>
              <p>{error}</p>
              <Button variant="primary" size="sm" onClick={() => window.location.reload()}>
                Try Again
              </Button>
            </Alert>
          ) : events.length === 0 ? (
            <Alert variant="info">No events found</Alert>
          ) : (
            <Table striped bordered hover responsive>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Type</th>
                  <th>Date</th>
                  <th>Location</th>
                  <th>Ticket Price</th>
                  <th>Available Seats</th>
                  <th>Booked Seats</th>
                </tr>
              </thead>
              <tbody>
                {events.map(event => (
                  <tr key={event?._id || Math.random()}>
                    <td>{event?.name || 'N/A'}</td>
                    <td>{event?.eventType || 'N/A'}</td>
                    <td>{formatDate(event?.date)}</td>
                    <td>{event?.location || 'N/A'}</td>
                    <td>₹{event?.ticketPrice || 0}</td>
                    <td>{event?.availableSeats || 0}</td>
                    <td>{event?.bookingDetails?.seatsBooked || 0}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          )}
        </Tab>
        
        <Tab eventKey="bookings" title="Bookings">
          <div className="d-flex justify-content-between align-items-center">
            <h4 className="my-4">All Bookings</h4>
            <Button variant="primary" onClick={() => setRefreshCount(c => c + 1)}>
              <i className="bi bi-arrow-repeat"></i> Refresh
            </Button>
          </div>
          {loading ? (
            <div className="text-center">
              <Spinner animation="border" />
              <p>Loading bookings...</p>
            </div>
          ) : error ? (
            <Alert variant="danger">
              <Alert.Heading>Error</Alert.Heading>
              <p>{error}</p>
            </Alert>
          ) : bookings.length === 0 ? (
            <Alert variant="info">No bookings found</Alert>
          ) : (
            <Table striped bordered hover responsive>
              <thead>
                <tr>
                  <th>Event</th>
                  <th>User</th>
                  <th>Date</th>
                  <th>Venue</th>
                  <th>Attendees</th>
                  <th>Total Price</th>
                  <th>Status</th>
                  <th>Payment</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {bookings.map(booking => (
                  <tr key={booking?._id || Math.random()}>
                    <td>{booking?.eventName || 'N/A'}</td>
                    <td>{booking?.userEmail || 'N/A'}</td>
                    <td>{formatDate(booking?.date)}</td>
                    <td>{booking?.venue || 'N/A'}, {booking?.location || 'N/A'}</td>
                    <td>{booking?.attendees || 0}</td>
                    <td>₹{booking?.totalPrice || 0}</td>
                    <td>
                      <Badge bg={getStatusVariant(booking?.status)}>
                        {booking?.status || 'unknown'}
                      </Badge>
                    </td>
                    <td>
                      {booking?.paymentDetails?.status === 'completed' ? (
                        `Paid ₹${booking?.paymentDetails?.advanceAmount || 0}`
                      ) : (
                        'Pending'
                      )}
                    </td>
                    <td>
                      <Button variant="info" size="sm">
                        View
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          )}
        </Tab>
        
        <Tab eventKey="payments" title="Payments">
          <div className="d-flex justify-content-between align-items-center">
            <h4 className="my-4">All Payments</h4>
            <Button variant="primary" onClick={() => setRefreshCount(c => c + 1)}>
              <i className="bi bi-arrow-repeat"></i> Refresh
            </Button>
          </div>
          {loading ? (
            <div className="text-center">
              <Spinner animation="border" />
              <p>Loading payments...</p>
            </div>
          ) : error ? (
            <Alert variant="danger">
              <Alert.Heading>Error</Alert.Heading>
              <p>{error}</p>
            </Alert>
          ) : payments.length === 0 ? (
            <Alert variant="info">No payments found</Alert>
          ) : (
            <Table striped bordered hover responsive>
              <thead>
                <tr>
                  <th>Booking ID</th>
                  <th>User</th>
                  <th>Event</th>
                  <th>Amount</th>
                  <th>Date</th>
                  <th>Method</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {payments.map(payment => (
                  <tr key={payment?._id || Math.random()}>
                    <td>{payment?.bookingId || 'N/A'}</td>
                    <td>{payment?.userEmail || 'N/A'}</td>
                    <td>{payment?.eventName || 'N/A'}</td>
                    <td>₹{payment?.amount || 0}</td>
                    <td>{formatDate(payment?.paymentDate)}</td>
                    <td>{payment?.paymentMethod || 'N/A'}</td>
                    <td>
                      <Badge bg={payment?.status === 'completed' ? 'success' : 'warning'}>
                        {payment?.status || 'unknown'}
                      </Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          )}
        </Tab>
        
        <Tab eventKey="users" title="Users">
          <div className="d-flex justify-content-between align-items-center">
            <h4 className="my-4">Registered Users</h4>
            <Button variant="primary" onClick={() => setRefreshCount(c => c + 1)}>
              <i className="bi bi-arrow-repeat"></i> Refresh
            </Button>
          </div>
          {loading ? (
            <div className="text-center">
              <Spinner animation="border" />
              <p>Loading users...</p>
            </div>
          ) : error ? (
            <Alert variant="danger">
              <Alert.Heading>Error</Alert.Heading>
              <p>{error}</p>
            </Alert>
          ) : users.length === 0 ? (
            <Alert variant="info">No users found</Alert>
          ) : (
            <Table striped bordered hover responsive>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Mobile</th>
                  <th>Registered On</th>
                  <th>Admin</th>
                </tr>
              </thead>
              <tbody>
                {users.map(user => (
                  <tr key={user?._id || Math.random()}>
                    <td>{user?.firstName || ''} {user?.lastName || ''}</td>
                    <td>{user?.email || 'N/A'}</td>
                    <td>{user?.mobile || 'N/A'}</td>
                    <td>{formatDate(user?.createdAt)}</td>
                    <td>
                      <Badge bg={user?.isAdmin ? 'primary' : 'secondary'}>
                        {user?.isAdmin ? 'Yes' : 'No'}
                      </Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          )}
        </Tab>
      </Tabs>
      
      <Row className="mt-4">
        <Col md={3}>
          <Card className="text-center">
            <Card.Body>
              <Card.Title>Total Events</Card.Title>
              <Card.Text className="display-6">{events.length}</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3}>
          <Card className="text-center">
            <Card.Body>
              <Card.Title>Total Bookings</Card.Title>
              <Card.Text className="display-6">{bookings.length}</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3}>
          <Card className="text-center">
            <Card.Body>
              <Card.Title>Total Revenue</Card.Title>
              <Card.Text className="display-6">₹{totalRevenue.toFixed(2)}</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3}>
          <Card className="text-center">
            <Card.Body>
              <Card.Title>Pending Payments</Card.Title>
              <Card.Text className="display-6">₹{totalPendingPayments.toFixed(2)}</Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default EventOrganizerDashboard;