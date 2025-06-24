import React from "react";
import { useNavigate } from "react-router-dom";
import MusicalForm from "../../Musical_Forms/MusicalForm";
import { useAuth } from "../../UserAuth/AuthContext";
import { Container, Row, Col, Card } from "react-bootstrap";

const BandEvent = () => {
  const navigate = useNavigate();
  const { currentUser } = useAuth();

  const handleBookingSuccess = (bookingData) => {
    navigate("/payments", {
      state: { 
        bookingData,
        paymentAmount: bookingData.advanceAmount,
        currency: bookingData.location === 'IN' ? '₹' : 
                 bookingData.location === 'US' ? '$' : '€'
      }
    });
  };

  const handleBookingCancel = () => {
    navigate("/musical-events");
  };

  return (
    <Container className="py-4">
      <Row className="justify-content-center">
        <Col md={10} lg={8}>
          <Card className="shadow-sm">
            <Card.Header className="bg-primary text-white">
              <h2 className="text-center mb-0">Band Performance Booking</h2>
            </Card.Header>
            <Card.Body>
              <MusicalForm 
                eventDetails={{
                  eventName: "Band Performance",
                  eventImage: "/Images/Music/M2.jpg",
                  eventType: "band-performance",
                  description: "Book a professional band performance for your event."
                }}
                onSuccess={handleBookingSuccess}
                onCancel={handleBookingCancel}
              />
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default BandEvent;