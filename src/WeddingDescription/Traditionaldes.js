import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import UserSignIn from "../UserAuth/UserSignIn";
import { useAuth } from "../UserAuth/AuthContext";
import WeddingForm from "../WeddingForm/WeddingForm";

const Traditionaldes = () => {
  const [showSignInModal, setShowSignInModal] = useState(false);
  const [showWeddingFormModal, setShowWeddingFormModal] = useState(false);
  const { currentUser } = useAuth();

  const packages = [
    {
      name: "Classic Traditional Package",
      price: "₹5,00,000 - ₹10,00,000",
      details: [
        "Authentic village-style wedding setup",
        "Traditional brass band for baraat",
        "Organic haldi and mehendi ceremonies",
        "Earthenware decor and floral arrangements",
        "Regional cuisine served on banana leaves",
        "Folk dance performances"
      ]
    },
    {
      name: "Heritage Celebration",
      price: "₹15,00,000 - ₹25,00,000",
      details: [
        "Traditional rituals with Vedic priests",
        "Bullock cart or palanquin for bride",
        "Handcrafted organic decor",
        "Regional specialty food stations",
        "Classical dance performances",
        "Traditional music ensemble"
      ]
    },
    {
      name: "Ancestral Grandeur",
      price: "₹40,00,000+",
      details: [
        "Multi-day traditional ceremonies",
        "Antique jewelry and attire for couple",
        "Artisan-crafted wedding decor",
        "Heirloom recipe banquet",
        "Rare traditional art performances",
        "Customized ritual artifacts"
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
          src="/Images/Wedding/WE5.jpg" 
          alt="Traditional Wedding"
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
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
          <h1 style={{ fontSize: "3rem", marginBottom: "20px" }}>Traditional Weddings</h1>
          <p style={{ fontSize: "1.5rem", maxWidth: "800px" }}>
            Embrace the rich cultural heritage with authentic regional wedding traditions.
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
          <Modal.Title>Traditional Wedding Booking</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ 
          backgroundColor: "#1e1e1e", 
          color: "white" 
        }}>
          <WeddingForm initialWeddingType="traditional" />
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default Traditionaldes;