import React, { useState } from "react";
import { motion } from "framer-motion";
import Anniversary from "./Anniversary";
import BabyShower from "./BabyShower";
import Birthday from "./Birthday";
import HouseWarming from "./HouseWarming";
import FamilyUnion from "./FamilyUnion";
import FestiveGather from "./FestiveGather";
import Retirement from "./Retirement";
import CulturalEvent from "./CulturalEvent";
import { useNavigate } from "react-router-dom";
import { FaSearch } from "react-icons/fa";

const events = [
  { 
    id: "W1", 
    path: "/events/wedding-options", // Direct path to WeddingIndex.js
    imageSrc: "/Images/FamilyEvents/W1.jpg", 
    title: "Wedding", 
    description: "Celebrating love and joy." 
  },
  { id: "W2", path: "/events/anniversary", imageSrc: "/Images/FamilyEvents/W2.jpg", title: "Anniversary", description: "Cherishing years of togetherness." },
  { id: "W3", path: "/events/babyshower", imageSrc: "/Images/FamilyEvents/W3.jpg", title: "Baby Shower", description: "Welcoming new beginnings." },
  { id: "W4", path: "/events/birthday", imageSrc: "/Images/FamilyEvents/W4.jpg", title: "Birthday", description: "A special day filled with joy." },
  { id: "W5", path: "/events/housewarming", imageSrc: "/Images/FamilyEvents/W5.jpg", title: "House Warming", description: "Blessings for a new home." },
  { id: "W6", path: "/events/familyunion", imageSrc: "/Images/FamilyEvents/W6.jpg", title: "Family Reunion", description: "Reconnecting and celebrating together." },
  { id: "W7", path: "/events/festivegather", imageSrc: "/Images/FamilyEvents/W7.jpg", title: "Festive Gathering", description: "Spreading joy and traditions." },
  { id: "W8", path: "/events/retirement", imageSrc: "/Images/FamilyEvents/W8.jpg", title: "Retirement", description: "Honoring a lifetime of work." },
  { id: "W9", path: "/events/culturalevent", imageSrc: "/Images/FamilyEvents/W9.jpg", title: "Cultural Event", description: "Embracing traditions and cultures." },
];

const FamilyIndex = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");

  const filteredEvents = events.filter(event =>
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
        <h1 style={{ textAlign: "center" }}>Event Finder</h1>
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
          Explore Family Events That Create Lifelong Memories
        </h2>

        {/* Events Display */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)", // Restrict to 3 cards per row
            gap: "20px",
          }}
        >
          {filteredEvents.map(({ id, imageSrc, title, description, path }) => (
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

export default FamilyIndex;
