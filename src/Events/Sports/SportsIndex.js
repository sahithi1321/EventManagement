// src/Events/Sports/SportsIndex.js
import React, { useState } from "react";
import { motion } from "framer-motion";
import Cricket from "./Cricket";
import Athletics from "./Athletics";
import Badminton from "./Badminton";
import Chess from "./Chess";
import { useNavigate } from "react-router-dom";
import { FaSearch } from "react-icons/fa";

const sportsEvents = [
  { 
    id: "S1", 
    Component: Cricket, 
    path: "/events/cricket", 
    imageSrc: "/Images/Sports/SPO1.jpg", 
    title: "Cricket Premier League", 
    description: "Team-based, with league and knockout stages." 
  },
  { 
    id: "S2", 
    Component: Athletics, 
    path: "/events/athletics", 
    imageSrc: "/Images/Sports/SPO2.jpeg", 
    title: "Athletics Championship", 
    description: "100m, relay, long jump, shot put (individual & team points)." 
  },
  { 
    id: "S3", 
    Component: Badminton, 
    path: "/events/badminton", 
    imageSrc: "/Images/Sports/SPO3.avif", 
    title: "Badminton Tournament", 
    description: "Singles and doubles, knockout or round-robin." 
  },
  { 
    id: "S4", 
    Component: Chess, 
    path: "/events/chess", 
    imageSrc: "/Images/Sports/SPO4.jpeg", 
    title: "Chess Battle League", 
    description: "Timed matches, department-wise or open category." 
  },
];

const SportsIndex = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");

  const filteredSportsEvents = sportsEvents.filter(event =>
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
        <h1 style={{ textAlign: "center" }}>Sports Event Finder</h1>
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
          Exciting Sports Events to Challenge Your Limits
        </h2>

        {/* Events Display */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
            gap: "20px",
          }}
        >
          {filteredSportsEvents.map(({ id, imageSrc, title, description, path }) => (
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

export default SportsIndex;