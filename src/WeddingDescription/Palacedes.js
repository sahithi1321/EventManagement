import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import UserSignIn from "../UserAuth/UserSignIn";
import { useAuth } from "../UserAuth/AuthContext";
import WeddingForm from "../WeddingForm/WeddingForm";

const Palacedes = () => {
  const [showSignInModal, setShowSignInModal] = useState(false);
  const [showWeddingFormModal, setShowWeddingFormModal] = useState(false);
  const { currentUser } = useAuth();

  const packages = [
    {
      name: "Royal Palace Package",
      price: "₹25,00,000 - ₹40,00,000",
      details: [
        "Venue at heritage palace in Rajasthan",
        "Traditional welcome with shehnai players",
        "Elephant or horse carriage for baraat",
        "Regal mandap with gold accents",
        "Royal cuisine with authentic Rajasthani dishes",
        "Traditional folk dance performances"
      ]
    },
    {
      name: "Maharaja Experience",
      price: "₹50,00,000 - ₹75,00,000",
      details: [
        "Private palace venue for entire event",
        "Baraat on decorated elephants",
        "Fireworks display over palace courtyard",
        "Luxury accommodation in palace suites",
        "Personalized royal menus",
        "Live classical music ensemble"
      ]
    },
    {
      name: "Imperial Celebration",
      price: "₹1,00,00,000+",
      details: [
        "Exclusive use of royal palace",
        "Gold and silver decorated mandap",
        "Private vintage car collection for guests",
        "Celebrity chef-curated royal banquet",
        "Traditional puppet shows and acrobats",
        "Personalized royal jewelry for couple"
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
          src="/Images/Wedding/WE3.jpg" 
          alt="Palace Wedding"
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
          <h1 style={{ fontSize: "3rem", marginBottom: "20px" }}>Palace Weddings</h1>
          <p style={{ fontSize: "1.5rem", maxWidth: "800px" }}>
            Experience royal grandeur in majestic palaces of Rajasthan, Udaipur, and Jaipur.
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
      <div style={{ textAlign: "center", padding: "40px 0", backgroundColor: "#121212" }}>
        <button 
          onClick={handleBookNow}
          style={{
            padding: "15px 40px",
            fontSize: "1.2rem",
            backgroundColor: "#b8860b",
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
      <Modal 
        show={showSignInModal} 
        onHide={() => setShowSignInModal(false)} 
        centered
      >
        <Modal.Header 
          closeButton 
          style={{ 
            backgroundColor: "#1e1e1e", 
            color: "white",
            borderBottom: "1px solid #333"
          }}
        >
          <Modal.Title>Sign In Required</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ backgroundColor: "#1e1e1e", color: "white" }}>
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
        <Modal.Header 
          closeButton 
          style={{ 
            backgroundColor: "#1e1e1e", 
            color: "white",
            borderBottom: "1px solid #333"
          }}
        >
          <Modal.Title>Palace Wedding Booking</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ backgroundColor: "#1e1e1e", color: "white" }}>
          <WeddingForm 
            initialWeddingType="palace" 
            onSuccess={() => setShowWeddingFormModal(false)}
          />
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default Palacedes;