import React from "react";
import { useNavigate } from "react-router-dom";

const Wedding = () => {
  const navigate = useNavigate();

  return (
    <div
      id="wedding"
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
          src="/Images/FamilyEvents/Wedding.jpg"
          alt="Wedding"
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
        Wedding
      </h3>
      <p
        style={{
          fontSize: "1rem",
          color: "#666",
          marginTop: "5px",
        }}
      >
        Discover the perfect wedding options for your special day.
      </p>
      <button
      onClick={() => navigate("/events/wedding-options")}
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
    >
      Go to Wedding Options
    </button>

    </div>
  );
};
export default Wedding;
