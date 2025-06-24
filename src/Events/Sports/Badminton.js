// src/Events/Sports/Badminton.js
import React from "react";

const Badminton = () => {
  return (
    <div
      id="badminton"
      style={{
        backgroundColor: "white",
        borderRadius: "10px",
        boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
        overflow: "hidden",
        textAlign: "center",
        padding: "20px",
        fontFamily: "Times New Roman, Times, serif",
        transition: "transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out",
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
          src="/Images/Sports/SPO3.avif"
          alt="Badminton Tournament"
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
          fontFamily: "Times New Roman, Times, serif",
        }}
        className="custom-title"
      >
        Badminton Tournament
      </h3>
      <p
        style={{
          fontSize: "1rem",
          color: "#666",
          marginTop: "5px",
          fontFamily: "Times New Roman, Times, serif",
        }}
        className="custom-description"
      >
        Singles and doubles, knockout or round-robin.
      </p>
    </div>
  );
};

export default Badminton;