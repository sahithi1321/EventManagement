import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../UserAuth/AuthContext";
import { Container, Row, Col, Card, Button } from "react-bootstrap";

const BollywoodDanceEvent = () => {
  const navigate = useNavigate();
  const { currentUser } = useAuth();

  const handleBookNow = () => {
  navigate("/musical-events/booking", {
    state: {
      eventDetails: {
        eventName: "Bollywood Dance",
        eventImage: "/Images/Music/M4.jpg",
        eventType: "bollywood-dance",
        description: "Book a vibrant Bollywood dance performance for your event."
      }
    }
  });
};
  return (
    <Container className="py-4">
      <Row className="justify-content-center">
        <Col md={10} lg={8}>
          <Card className="shadow-sm">
            <Card.Header className="bg-primary text-white">
              <h2 className="text-center mb-0">Bollywood Dance Booking</h2>
            </Card.Header>
            <Card.Body>
              <div className="text-center">
                <img 
                  src="/Images/Music/M4.jpg" 
                  alt="Bollywood Dance" 
                  className="img-fluid mb-4"
                  style={{ maxHeight: '300px' }}
                />
                <p className="lead">
                  Book a vibrant Bollywood dance performance for your event.
                </p>
                <Button 
                  variant="primary" 
                  size="lg"
                  onClick={handleBookNow}
                >
                  Book Now
                </Button>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default BollywoodDanceEvent;