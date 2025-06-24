import React, { useState } from "react";
import { motion } from "framer-motion";
import AGM from "./AGM";
import Award from "./Award";
import BoardMeeting from "./BoardMeeting";
import CorporateRetreat from "./CorporateRetreat";
import NetworkingEvent from "./NetworkingEvent";
import Seminar from "./Seminar";
import TBA from "./TBA";
import Training from "./Training";
import { useNavigate } from "react-router-dom";
import { FaSearch } from "react-icons/fa";

const corporateEvents = [
  { id: "C1", Component: AGM, path: "/events/agm", imageSrc: "/Images/Corporate/CE1.jpg", title: "AGM", description: "Annual General Meeting for company stakeholders." },
  { id: "C2", Component: Award, path: "/events/award", imageSrc: "/Images/Corporate/CE2.jpg", title: "Award Ceremony", description: "Recognizing achievements and excellence." },
  { id: "C3", Component: BoardMeeting, path: "/events/boardmeeting", imageSrc: "/Images/Corporate/CE3.jpg", title: "Board Meeting", description: "Strategic discussions and decision-making." },
  { id: "C4", Component: CorporateRetreat, path: "/events/corporateretreat", imageSrc: "/Images/Corporate/CE4.jpg", title: "Corporate Retreat", description: "Relaxation and team building away from the office." },
  { id: "C5", Component: NetworkingEvent, path: "/events/networkingevent", imageSrc: "/Images/Corporate/CE5.jpg", title: "Networking Event", description: "Building professional relationships." },
  { id: "C6", Component: Seminar, path: "/events/seminar", imageSrc: "/Images/Corporate/CE6.jpg", title: "Seminar", description: "Knowledge sharing and skill development." },
  { id: "C7", Component: TBA, path: "/events/tba", imageSrc: "/Images/Corporate/CE7.jpg", title: "TBA Event", description: "Exciting events to be announced." },
  { id: "C8", Component: Training, path: "/events/training", imageSrc: "/Images/Corporate/CE8.jpg", title: "Training Program", description: "Skill enhancement and professional growth." },
];

const CorporateIndex = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");

  const filteredCorporateEvents = corporateEvents.filter(event =>
    event.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div style={{ padding: "20px" }}>
      {/* Header Section */}
      <header
        style={{
          position: "fixed",
          top: 0,
          width: "100%",
          backgroundColor: "#333",
          color: "white",
          padding: "10px",
          zIndex: 1000,
        }}
      >
        <h1 style={{ textAlign: "center" }}>Corporate Event Finder</h1>
      </header>

      {/* Main Content */}
      <div style={{ marginTop: "60px" }}>
        {/* Search Bar */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: "20px",
            position: "relative",
          }}
        >
          <FaSearch
            style={{ position: "absolute", left: "10px", color: "#666" }}
          />
          <input
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{
              width: "100%",
              maxWidth: "500px",
              padding: "10px 40px",
              borderRadius: "20px",
              border: "1px solid #ccc",
              outline: "none",
              fontSize: "16px",
            }}
          />
        </div>

        {/* Captivating Title */}
        <h2
          style={{
            textAlign: "center",
            fontSize: "2rem",
            color: "#333",
            marginBottom: "20px",
          }}
        >
          Discover Corporate Events That Drive Success
        </h2>

        {/* Events Display */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)", // Restrict to 3 cards per row
            gap: "20px",
          }}
        >
          {filteredCorporateEvents.map(({ id, imageSrc, title, description, path }) => (
            <motion.div
              key={id}
              initial={{ opacity: 0, y: 50, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: false, amount: 0.1 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              style={{
                background: "white",
                borderRadius: "10px",
                boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
                overflow: "hidden",
                textAlign: "center",
                padding: "15px",
                transition: "transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "scale(1.05)";
                e.currentTarget.style.boxShadow = "0px 8px 12px rgba(0, 0, 0, 0.2)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "scale(1)";
                e.currentTarget.style.boxShadow = "0px 4px 6px rgba(0, 0, 0, 0.1)";
              }}
            >
              <div style={{ overflow: "hidden", borderRadius: "10px" }}>
                <img
                  src={imageSrc}
                  alt={title}
                  style={{
                    width: "100%",
                    height: "150px",
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
                  fontSize: "1.2rem",
                  margin: "10px 0",
                  color: "#333",
                }}
              >
                {title}
              </h3>
              <p
                style={{
                  fontSize: "0.9rem",
                  color: "#666",
                  marginTop: "5px",
                }}
              >
                {description}
              </p>
              <button
                style={{
                  backgroundColor: "#333",
                  color: "white",
                  border: "none",
                  padding: "8px 12px",
                  borderRadius: "5px",
                  marginTop: "10px",
                  cursor: "pointer",
                  transition: "background 0.3s ease-in-out",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = "#555";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = "#333";
                }}
                onClick={() => navigate(path)}
              >
                Learn More
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CorporateIndex;
