import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import UserSignIn from "../UserAuth/UserSignIn";
import { useAuth } from "../UserAuth/AuthContext";
import WeddingForm from "../WeddingForm/WeddingForm";

const Templedes = () => {
  const [showSignInModal, setShowSignInModal] = useState(false);
  const [showWeddingFormModal, setShowWeddingFormModal] = useState(false);
  const { currentUser } = useAuth();

  const packages = [
    {
      name: "Sacred Temple Package",
      price: "₹8,00,000 - ₹15,00,000",
      details: [
        "Wedding at renowned temple complex",
        "Traditional Vedic rituals by priests",
        "Temple-style floral decorations",
        "Prasadam meal for all guests",
        "Classical devotional music",
        "Basic photography coverage"
      ]
    },
    {
      name: "Divine Celebration",
      price: "₹20,00,000 - ₹35,00,000",
      details: [
        "Exclusive temple venue booking",
        "Elaborate puja ceremonies",
        "Gold-accented mandap setup",
        "Traditional vegetarian feast",
        "Live classical music performance",
        "Premium photography package"
      ]
    },
    {
      name: "Spiritual Grandeur",
      price: "₹50,00,000+",
      details: [
        "Wedding at historic temple",
        "Rare Vedic rituals performed",
        "Temple elephant procession",
        "Gourmet satvik cuisine",
        "Renowned devotional artists",
        "Cinematic wedding film"
      ]
    }
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
      {/* Hero Image */}
      <div style={{ position: "relative", height: "70vh" }}>
        <img 
          src="/Images/Wedding/WE4.jpg" 
          alt="Temple Wedding"
          style={{ 
            width: "100%", 
            height: "100%", 
            objectFit: "cover" 
          }}
        />
        <div style={{
          position: "absolute", 
          top: 0, 
          left: 0, 
          right: 0, 
          bottom: 0,
          backgroundColor: "rgba(0,0,0,0.5)",
          display: "flex", 
          flexDirection: "column", 
          justifyContent: "center", 
          alignItems: "center",
          textAlign: "center",
          padding: "20px"
        }}>
          <h1 style={{ fontSize: "3rem", marginBottom: "20px" }}>Temple Weddings</h1>
          <p style={{ fontSize: "1.5rem", maxWidth: "800px" }}>
            Sacred unions blessed by divine energy in India's most revered temples.
          </p>
        </div>
      </div>

      {/* Packages */}
      <div style={{
        display: "flex", 
        flexWrap: "wrap", 
        justifyContent: "center", 
        gap: "30px",
        padding: "40px", 
        backgroundColor: "#121212"
      }}>
        {packages.map((pack, index) => (
          <div key={index} style={{
            flex: "1", 
            minWidth: "300px", 
            maxWidth: "400px",
            backgroundColor: "#1e1e1e", 
            borderRadius: "10px", 
            padding: "25px",
            boxShadow: "0 4px 8px rgba(0,0,0,0.3)"
          }}>
            <h2 style={{ fontSize: "1.8rem", marginBottom: "15px" }}>{pack.name}</h2>
            <p style={{ fontWeight: "bold", marginBottom: "15px" }}>{pack.price}</p>
            <ul style={{ paddingLeft: "20px" }}>
              {pack.details.map((detail, i) => (
                <li key={i} style={{ marginBottom: "10px" }}>{detail}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Book Now Button */}
      <div style={{ 
        textAlign: "center", 
        padding: "40px 0", 
        backgroundColor: "#121212" 
      }}>
        <button 
          onClick={handleBookNow}
          style={{
            padding: "15px 40px",
            fontSize: "1.2rem",
            backgroundColor: "#8B4513",
            color: "white",
            border: "none",
            borderRadius: "30px",
            cursor: "pointer",
            fontFamily: "Times New Roman, serif"
          }}
        >
          Book Now
        </button>
      </div>

      {/* Sign In Modal */}
      <Modal show={showSignInModal} onHide={() => setShowSignInModal(false)} centered>
        <Modal.Header closeButton style={{ 
          backgroundColor: "#1e1e1e", 
          color: "white" 
        }}>
          <Modal.Title>Sign In Required</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ 
          backgroundColor: "#1e1e1e", 
          color: "white" 
        }}>
          <UserSignIn onSuccess={handleSignInSuccess} />
        </Modal.Body>
      </Modal>

      {/* Wedding Form Modal */}
      <Modal 
        show={showWeddingFormModal} 
        onHide={() => setShowWeddingFormModal(false)} 
        size="lg" 
        centered
      >
        <Modal.Header closeButton style={{ 
          backgroundColor: "#1e1e1e", 
          color: "white" 
        }}>
          <Modal.Title>Temple Wedding Booking</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ 
          backgroundColor: "#1e1e1e", 
          color: "white" 
        }}>
          <WeddingForm initialWeddingType="temple" />
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default Templedes;