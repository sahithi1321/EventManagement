import React from "react";
import { useNavigate } from "react-router-dom";
import MusicalForm from "../../Musical_Forms/MusicalForm";
import { useAuth } from "../../UserAuth/AuthContext";
import { Container, Row, Col, Card } from "react-bootstrap";

const AlbumRelease = () => {
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
              <h2 className="text-center mb-0">Album Release Event</h2>
            </Card.Header>
            <Card.Body>
              <MusicalForm 
                eventDetails={{
                  eventName: "Album Release",
                  eventImage: "/Images/Music/M1.jpg",
                  eventType: "album-release",
                  description: "Book your album release event with professional sound setup and promotion services."
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

export default AlbumRelease;