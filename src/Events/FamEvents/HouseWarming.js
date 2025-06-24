import React from "react";

const HouseWarming = () => {
  return (
    <div
      id="houseWarming"
      style={{
        backgroundColor: "white",
        borderRadius: "10px",
        boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
        overflow: "hidden",
        textAlign: "center",
        padding: "20px",
        transition: "transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out",
      }}
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
      >
        <img
          src="/Images/FamilyEvents/W5.jpg"
          alt="House Warming"
          style={{
            width: "100%",
            height: "200px",
            objectFit: "cover",
            transition: "transform 0.3s ease-in-out",
          }}
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
      >
        House Warming
      </h3>
      <p
        style={{
          fontSize: "1rem",
          color: "#666",
          marginTop: "5px",
        }}
      >
        Blessings for a new home.
      </p>
    </div>
  );
};

export default HouseWarming;
