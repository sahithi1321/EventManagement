import React from "react";

const BoardMeeting = () => {
  return (
    <div
      id="board-meeting"
      style={{
        backgroundColor: "white",
        borderRadius: "10px",
        boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
        overflow: "hidden",
        textAlign: "center",
        padding: "20px",
        fontFamily: "Times New Roman, Times, serif", // Font style applied
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
          src="/Images/Corporate/CE2.jpg"
          alt="Board Meeting"
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
          fontFamily: "Times New Roman, Times, serif", // Font style applied
        }}
        className="custom-title"
      >
        Board Meeting
      </h3>
      <p
        style={{
          fontSize: "1rem",
          color: "#666",
          marginTop: "5px",
          fontFamily: "Times New Roman, Times, serif", // Font style applied
        }}
        className="custom-description"
      >
        Strategizing for organizational growth and success.
      </p>
    </div>
  );
};

export default BoardMeeting;
