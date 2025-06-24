import React from "react";
import { useNavigate } from "react-router-dom";

const Anniversary = () => {
  const navigate = useNavigate();

  const handleBookNowClick = () => {
    navigate("/fam-event/fam-booking-form", {
      state: {
        eventType: "Anniversary",
        description: "Cherishing years of togetherness",
        image: "/Images/FamilyEvents/W2.jpg",
      },
    });
  };

  return (
    <div
      id="anniversary"
      style={{
        backgroundColor: "white",
        borderRadius: "10px",
        boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
        overflow: "hidden",
        textAlign: "center",
        padding: "20px",
        transition: "transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out",
        cursor: "pointer",
      }}
      className="custom-event-card"
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "scale(1.05)";
        e.currentTarget.style.boxShadow = "0px 8px 15px rgba(0, 0, 0, 0.3)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "scale(1)";
        e.currentTarget.style.boxShadow = "0px 4px 6px rgba(0, 0, 0, 0.1)";
      }}
    >
      <div
        style={{
          overflow: "hidden",
          borderRadius: "10px",
        }}
        className="image-container"
      >
        <img
          src="/Images/FamilyEvents/W2.jpg"
          alt="Anniversary"
          style={{
            width: "100%",
            height: "200px",
            objectFit: "cover",
            transition: "transform 0.3s ease-in-out",
          }}
          className="event-image"
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = "scale(1.1)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "scale(1)";
          }}
        />
      </div>
      <h3
        style={{
          fontSize: "1.5rem",
          margin: "10px 0",
          color: "#333",
        }}
        className="custom-title"
      >
        Anniversary
      </h3>
      <p
        style={{
          fontSize: "1rem",
          color: "#666",
          marginTop: "5px",
        }}
        className="custom-description"
      >
        Cherishing years of togetherness.
      </p>
      <button
        style={{
          backgroundColor: "#007BFF",
          color: "white",
          border: "none",
          padding: "10px 15px",
          borderRadius: "5px",
          cursor: "pointer",
          margin: "20px auto",
          display: "block",
          fontSize: "1rem",
          textAlign: "center",
        }}
        onClick={handleBookNowClick} // Navigate to FamBookingForm
      >
        Book Now
      </button>
    </div>
  );
};

export default Anniversary;
