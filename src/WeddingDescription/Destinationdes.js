import React, { useState } from "react";
import { Carousel, Modal } from "react-bootstrap";
import UserSignIn from "../UserAuth/UserSignIn";
import { useAuth } from "../UserAuth/AuthContext";
import WeddingForm from "../WeddingForm/WeddingForm";

const Destinationdes = () => {
  const [showSignInModal, setShowSignInModal] = useState(false);
  const [showWeddingFormModal, setShowWeddingFormModal] = useState(false);
  const { currentUser } = useAuth();

  const packages = [
    {
      name: "Beginner Pack (Basic & Intimate)",
      price: "₹10,00,000",
      details: [
        "Haldi Ceremony – Fun-filled turmeric ritual at the destination.",
        "Mehendi Ceremony – Henna application with music and dance.",
        "Wedding Ceremony – Traditional rituals under a floral mandap.",
        "Simple Destination Décor – Minimal yet elegant.",
        "DJ Night / Sangeet (Basic) – Small-scale music and dance event.",
        "Photography & Videography (Basic) – Coverage of key moments.",
      ],
    },
    {
      name: "Silver Pack (Mid-Range with More Fun)",
      price: "₹30,00,000 - ₹40,00,000",
      details: [
        "Includes everything from the Beginner Pack, plus:",
        "Cocktail Party – Bonfire, music, and drinks at the destination.",
        "Baraat on ATVs or Boats – Groom's grand entry in a unique way.",
        "Bridal Entry with Fireworks – Stunning visuals for the big moment.",
        "Floral Mandap Setup – More luxurious décor.",
        "Pre-Wedding Photoshoot – With traditional & casual themes.",
        "Live Dhol & DJ Night – High-energy Punjabi or Bollywood beats.",
        "Customized Buffet – Destination-specific menu options.",
      ],
    },
    {
      name: "Premium Pack (Luxurious Experience)",
      price: "₹60,00,000",
      details: [
        "Includes everything from the Silver Pack, plus:",
        "Destination Helicopter Entry – Grand entrance for the couple.",
        "Luxury Villa Stay – Stay in premium destination villas.",
        "Customized Designer Invitations – Exclusive invites for guests.",
        "Personalized Live Entertainment – Celebrity singers or artists.",
        "Grand Fireworks Display – Stunning post-wedding celebrations.",
        "Exquisite Multi-Cuisine Buffet – International flavors included.",
      ],
    },
  ];

  const handleBookNow = () => {
    if (currentUser) {
      setShowWeddingFormModal(true);
    } else {
      setShowSignInModal(true);
    }
  };

  const handleSignInSuccess = () => {
    setShowSignInModal(false);
    setShowWeddingFormModal(true);
  };

  return (
    <div style={{ fontFamily: "Times New Roman, serif", color: "white" }}>
      {/* Carousel */}
      <div style={{ position: "relative" }}>
        <Carousel interval={3000} controls indicators>
          {[1, 2, 3, 4].map((num) => {
            const imageUrl =
              num === 1
                ? `/Images/BeachDes/BE${num}.png`
                : `/Images/BeachDes/BE${num}.jpg`;

            return (
              <Carousel.Item key={num}>
                <div
                  style={{
                    backgroundImage: `url('${imageUrl}')`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    height: "100vh",
                    position: "relative",
                  }}
                >
                  <div
                    style={{
                      backgroundColor: "rgba(0, 0, 0, 0.5)",
                      position: "absolute",
                      width: "100%",
                      height: "100%",
                      top: 0,
                      left: 0,
                    }}
                  />
                </div>
              </Carousel.Item>
            );
          })}
        </Carousel>

        <div
          style={{
            position: "absolute",
            top: "50%",
            width: "100%",
            textAlign: "center",
            transform: "translateY(-50%)",
            color: "white",
            textShadow: "2px 2px 6px black",
          }}
        >
          <h1 style={{ fontSize: "3.5rem", fontWeight: "bold" }}>Destination Weddings</h1>
          <p style={{ fontSize: "1.4rem" }}>
            Celebrate your love in breathtaking locations like Jaipur, Udaipur, and Kerala.
          </p>
        </div>
      </div>

      {/* Package Boxes */}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-around",
          padding: "40px 20px",
          backgroundColor: "#121212",
        }}
      >
        {packages.map((pack, index) => (
          <div
            key={index}
            style={{
              flex: "1 1 30%",
              margin: "20px",
              padding: "25px",
              borderRadius: "15px",
              backgroundColor: "#1e1e1e",
              boxShadow: "0 4px 12px rgba(255,255,255,0.1)",
              minWidth: "280px",
              maxWidth: "350px",
              color: "#f1f1f1",
            }}
          >
            <h2 style={{ fontSize: "1.8rem", marginBottom: "10px" }}>{pack.name}</h2>
            <p style={{ fontWeight: "bold", marginBottom: "10px" }}>Price: {pack.price}</p>
            <ul style={{ paddingLeft: "20px" }}>
              {pack.details.map((detail, i) => (
                <li key={i} style={{ marginBottom: "6px", lineHeight: "1.4" }}>
                  {detail}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Book Now Button */}
      <div style={{ textAlign: "center", marginTop: "40px", marginBottom: "80px" }}>
        <button
          onClick={handleBookNow}
          style={{
            padding: "15px 40px",
            fontSize: "1.3rem",
            borderRadius: "30px",
            backgroundColor: "#007BFF",
            color: "white",
            border: "none",
            cursor: "pointer",
            transition: "background-color 0.3s ease",
            fontFamily: "Times New Roman, serif",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#0056b3")}
          onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#007BFF")}
        >
          Book Now
        </button>
      </div>

      {/* Sign In Modal */}
      <Modal 
        show={showSignInModal} 
        onHide={() => setShowSignInModal(false)} 
        centered 
        size="lg"
      >
        <Modal.Header 
          closeButton 
          style={{ 
            backgroundColor: "#1e1e1e", 
            color: "white",
            borderBottom: "1px solid #333"
          }}
        >
          <Modal.Title>User Sign In</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ backgroundColor: "#1e1e1e", color: "white" }}>
          <UserSignIn
            onSuccess={handleSignInSuccess}
          />
        </Modal.Body>
      </Modal>

      {/* Wedding Form Modal */}
      <Modal
        show={showWeddingFormModal}
        onHide={() => setShowWeddingFormModal(false)}
        size="xl"
        centered
        scrollable
      >
        <Modal.Header 
          closeButton 
          style={{ 
            backgroundColor: "#1e1e1e", 
            color: "white",
            borderBottom: "1px solid #333"
          }}
        >
          <Modal.Title>Wedding Booking Form</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ backgroundColor: "#1e1e1e", color: "white", padding: "0" }}>
          <WeddingForm
            onSuccess={() => {
              setShowWeddingFormModal(false);
            }}
            initialWeddingType="destination"
          />
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default Destinationdes;