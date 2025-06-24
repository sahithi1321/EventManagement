import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button, Card, Alert, Spinner, Row, Col, Form, Modal } from 'react-bootstrap';
import { processPayment } from './API/api';
import { useAuth } from './UserAuth/AuthContext';

const Payments = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const [paymentProcessing, setPaymentProcessing] = useState(false);
  const [paymentError, setPaymentError] = useState('');
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [showPrintModal, setShowPrintModal] = useState(false);
  const [paymentOption, setPaymentOption] = useState('advance');
  const [cardDetails, setCardDetails] = useState({
    cardNumber: '',
    expiry: '',
    cvv: '',
    name: ''
  });
  
  const bookingId = location.state?.bookingId;
  const formData = location.state?.formData;

  const handlePayment = async () => {
  if (!bookingId || !formData) return;
  
  setPaymentProcessing(true);
  setPaymentError('');
  
  try {
    if (paymentOption === 'advance') {
      // Card validation
      if (!cardDetails.cardNumber || cardDetails.cardNumber.length < 4) {
        throw new Error('Please enter a valid card number');
      }
      if (!cardDetails.expiry || !cardDetails.expiry.match(/^\d{2}\/\d{2}$/)) {
        throw new Error('Please enter expiry in MM/YY format');
      }
      if (!cardDetails.name) {
        throw new Error('Please enter cardholder name');
      }

      const paymentData = {
        bookingId,
        amount: formData.advanceAmount,
        currency: formData.currency,
        advanceAmount: formData.advanceAmount,
        paymentMethod: 'card',
        cardDetails: {
          last4: cardDetails.cardNumber.slice(-4),
          expiry: cardDetails.expiry,
          brand: detectCardBrand(cardDetails.cardNumber) || 'visa'
        }
      };
      
      const response = await processPayment(paymentData);
      
      if (response.success) {
        setPaymentSuccess(true);
        setShowPrintModal(true);
        sessionStorage.setItem('newBooking', JSON.stringify(response.booking));
        sessionStorage.setItem('newPayment', JSON.stringify(response.payment));
      } else {
        throw new Error(response.error || 'Payment failed');
      }
    } else {
      // Pay later option - navigate directly to dashboard bookings
      navigate('/dashboard/bookings', { 
        state: { 
          booking: {
            ...formData,
            _id: bookingId,
            status: 'pending',
            paymentDetails: {
              status: 'pending',
              amount: formData.totalPrice,
              advanceAmount: 0,
              currency: formData.currency
            }
          }
        }
      });
    }
  } catch (error) {
    console.error('Payment error:', error);
    setPaymentError(error.message || 'Payment processing failed.');
  } finally {
    setPaymentProcessing(false);
  }
};

// Add this helper function outside handlePayment
const detectCardBrand = (cardNumber) => {
  if (!cardNumber) return 'unknown';
  const firstDigit = cardNumber.charAt(0);
  switch(firstDigit) {
    case '3': return 'amex';
    case '4': return 'visa';
    case '5': return 'mastercard';
    case '6': return 'discover';
    default: return 'unknown';
  }
};

const handlePrint = () => {
  window.print();
  navigate('/dashboard/bookings', { 
    state: { 
      booking: JSON.parse(sessionStorage.getItem('newBooking')),
      payment: JSON.parse(sessionStorage.getItem('newPayment'))
    }
  });
  sessionStorage.removeItem('newBooking');
  sessionStorage.removeItem('newPayment');
};

const handleClosePrint = () => {
  setShowPrintModal(false);
  navigate('/dashboard/bookings', { 
    state: { 
      booking: JSON.parse(sessionStorage.getItem('newBooking')),
      payment: JSON.parse(sessionStorage.getItem('newPayment'))
    }
  });
  sessionStorage.removeItem('newBooking');
  sessionStorage.removeItem('newPayment');
};
  return (
    <div className="container py-5">
      <h1 className="text-center mb-4">Payment</h1>
      
      <Row className="justify-content-center">
        <Col md={8}>
          <Card className="mb-4">
            <Card.Header>Booking Summary</Card.Header>
            <Card.Body>
              <Card.Title>{formData.eventName}</Card.Title>
              <Card.Text>
                <strong>Venue:</strong> {formData.venue}, {formData.location}<br />
                <strong>Date:</strong> {new Date(formData.date).toLocaleString()}<br />
                <strong>Attendees:</strong> {formData.attendees}<br />
                <strong>Total Price:</strong> {formData.currency} {formData.totalPrice}<br />
                <strong>Advance Due:</strong> {formData.currency} {formData.advanceAmount}
              </Card.Text>
            </Card.Body>
          </Card>
          
          {paymentSuccess ? (
            <Alert variant="success" className="text-center">
              <h4>Payment Successful!</h4>
              <p>Your advance payment of {formData.currency} {formData.advanceAmount} has been processed.</p>
            </Alert>
          ) : (
            <Card>
              <Card.Header>Payment Options</Card.Header>
              <Card.Body>
                {paymentError && <Alert variant="danger">{paymentError}</Alert>}
                
                <Form.Group className="mb-3">
                  <Form.Check
                    type="radio"
                    label={`Pay Advance Now (${formData.currency} ${formData.advanceAmount})`}
                    name="paymentOption"
                    id="pay-advance"
                    checked={paymentOption === 'advance'}
                    onChange={() => setPaymentOption('advance')}
                  />
                  <Form.Check
                    type="radio"
                    label="Pay Later (Full amount at venue)"
                    name="paymentOption"
                    id="pay-later"
                    checked={paymentOption === 'later'}
                    onChange={() => setPaymentOption('later')}
                  />
                </Form.Group>

                {paymentOption === 'advance' && (
                  <Form>
                    <Form.Group className="mb-3">
                      <Form.Label>Card Number</Form.Label>
                      <Form.Control 
                        type="text" 
                        placeholder="1234 5678 9012 3456" 
                        value={cardDetails.cardNumber}
                        onChange={(e) => setCardDetails({...cardDetails, cardNumber: e.target.value})}
                        disabled={paymentProcessing}
                      />
                    </Form.Group>
                    
                    <Row className="mb-3">
                      <Col md={6}>
                        <Form.Group>
                          <Form.Label>Expiry Date (MM/YY)</Form.Label>
                          <Form.Control 
                            type="text" 
                            placeholder="MM/YY" 
                            value={cardDetails.expiry}
                            onChange={(e) => setCardDetails({...cardDetails, expiry: e.target.value})}
                            disabled={paymentProcessing}
                          />
                        </Form.Group>
                      </Col>
                      <Col md={6}>
                        <Form.Group>
                          <Form.Label>CVV</Form.Label>
                          <Form.Control 
                            type="text" 
                            placeholder="123" 
                            value={cardDetails.cvv}
                            onChange={(e) => setCardDetails({...cardDetails, cvv: e.target.value})}
                            disabled={paymentProcessing}
                          />
                        </Form.Group>
                      </Col>
                    </Row>
                    
                    <Form.Group className="mb-3">
                      <Form.Label>Cardholder Name</Form.Label>
                      <Form.Control 
                        type="text" 
                        placeholder="John Doe" 
                        value={cardDetails.name}
                        onChange={(e) => setCardDetails({...cardDetails, name: e.target.value})}
                        disabled={paymentProcessing}
                      />
                    </Form.Group>
                  </Form>
                )}

                <Button 
                  variant="primary" 
                  onClick={handlePayment}
                  disabled={paymentProcessing}
                  className="w-100"
                >
                  {paymentProcessing ? (
                    <>
                      <Spinner animation="border" size="sm" /> Processing...
                    </>
                  ) : paymentOption === 'advance' ? (
                    `Pay ${formData.currency} ${formData.advanceAmount} Advance`
                  ) : (
                    'Confirm Booking (Pay Later)'
                  )}
                </Button>
              </Card.Body>
            </Card>
          )}
        </Col>
      </Row>

      {/* Print Confirmation Modal */}
      <Modal show={showPrintModal} onHide={handleClosePrint}>
        <Modal.Header closeButton>
          <Modal.Title>Payment Successful</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Your payment of {formData.currency} {formData.advanceAmount} was successful!</p>
          <p>Would you like to print the transaction details?</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClosePrint}>
            Skip
          </Button>
          <Button variant="primary" onClick={handlePrint}>
            Print Receipt
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Payments;