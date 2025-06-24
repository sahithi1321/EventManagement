import React, { useState } from "react";
import { motion } from "framer-motion";
import { FaSearch } from "react-icons/fa";

const fundraisingEvents = [
  { 
    id: "F1", 
    imageSrc: "/Images/FundRaising/FUND1.jpg", 
    title: "Pitch Perfect", 
    description: "Teams pitch product ideas to investor panels in Shark Tank-style competition.",
    details: [
      "Present your innovative product idea to judges",
      "Judged on creativity, feasibility, and marketing skills",
      "Great for aspiring entrepreneurs and business students",
      "Winning pitches may receive real funding opportunities"
    ]
  },
  { 
    id: "F2", 
    imageSrc: "/Images/FundRaising/FUND2.webp", 
    title: "Social Media Marketing Challenge", 
    description: "24-hour campaign challenge for mock brands using real platforms.",
    details: [
      "Teams create and execute a complete social media campaign",
      "Uses real platforms or simulated marketing tools",
      "Judged on engagement metrics, content quality, and strategy",
      "Perfect for digital marketing enthusiasts"
    ]
  }
];

const FundRaising = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredEvents = fundraisingEvents.filter(event =>
    event.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div style={{ 
      padding: "20px", 
      fontFamily: "'Times New Roman', Times, serif",
      minHeight: "100vh"
    }}>
      {/* Header Section */}
      <header style={{
        position: "fixed",
        top: 0,
        width: "100%",
        backgroundColor: "#333",
        color: "white",
        padding: "10px",
        zIndex: 1000,
        fontFamily: "'Times New Roman', Times, serif"
      }}>
        <h1 style={{ 
          textAlign: "center",
          fontSize: "2rem",
          fontWeight: "bold",
          margin: 0
        }}>
          Fundraising Event Explorer
        </h1>
      </header>

      {/* Main Content */}
      <div style={{ 
        marginTop: "60px",
        fontFamily: "'Times New Roman', Times, serif" 
      }}>
        {/* Search Bar */}
        <div style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginBottom: "20px",
          position: "relative",
        }}>
          <FaSearch style={{ 
            position: "absolute", 
            left: "10px", 
            color: "#666",
            fontSize: "1.2rem"
          }} />
          <input
            type="text"
            placeholder="Search fundraising events..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{
              width: "100%",
              maxWidth: "500px",
              padding: "12px 40px",
              borderRadius: "25px",
              border: "1px solid #ccc",
              outline: "none",
              fontSize: "1rem",
              fontFamily: "'Times New Roman', Times, serif"
            }}
          />
        </div>

        {/* Captivating Title */}
        <h2 style={{
          textAlign: "center",
          fontSize: "1.8rem",
          color: "#333",
          marginBottom: "30px",
          fontWeight: "bold",
          fontStyle: "italic"
        }}>
          Exciting Fundraising Events to Showcase Your Skills
        </h2>

        {/* Events Display */}
        <div style={{
          display: "flex",
          justifyContent: "center",
          flexWrap: "wrap",
          gap: "30px",
          maxWidth: "1200px",
          margin: "0 auto"
        }}>
          {filteredEvents.map(({ id, imageSrc, title, description, details }) => (
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
                padding: "20px",
                width: "350px",
                transition: "transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out",
                fontFamily: "'Times New Roman', Times, serif"
              }}
              whileHover={{ 
                scale: 1.05,
                boxShadow: "0px 8px 12px rgba(0, 0, 0, 0.2)"
              }}
            >
              <div style={{ overflow: "hidden", borderRadius: "10px" }}>
                <motion.img
                  src={imageSrc}
                  alt={title}
                  style={{
                    width: "100%",
                    height: "200px",
                    objectFit: "cover",
                  }}
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.3 }}
                />
              </div>
              <h3 style={{
                fontSize: "1.5rem",
                margin: "15px 0",
                color: "#222",
                fontWeight: "bold",
                fontFamily: "'Times New Roman', Times, serif"
              }}>
                {title}
              </h3>
              <p style={{
                fontSize: "1.1rem",
                color: "#555",
                margin: "10px 0",
                minHeight: "60px",
                fontStyle: "italic"
              }}>
                {description}
              </p>
              
              {/* Additional Details */}
              <div style={{ 
                textAlign: "left", 
                margin: "15px 0",
                fontFamily: "'Times New Roman', Times, serif"
              }}>
                <ul style={{ 
                  paddingLeft: "20px",
                  listStyleType: "none"
                }}>
                  {details.map((item, index) => (
                    <li key={index} style={{ 
                      marginBottom: "10px",
                      position: "relative",
                      paddingLeft: "20px",
                      fontSize: "1rem"
                    }}>
                      <span style={{
                        position: "absolute",
                        left: 0,
                        color: "#4CAF50"
                      }}>•</span> {item}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Book Now Button */}
              <motion.button
                style={{
                  backgroundColor: "#4CAF50",
                  color: "white",
                  border: "none",
                  padding: "12px 24px",
                  borderRadius: "5px",
                  marginTop: "15px",
                  cursor: "pointer",
                  fontSize: "1.1rem",
                  width: "100%",
                  fontWeight: "bold",
                  fontFamily: "'Times New Roman', Times, serif",
                  letterSpacing: "0.5px"
                }}
                whileHover={{ 
                  backgroundColor: "#45a049",
                  scale: 1.02
                }}
                whileTap={{ scale: 0.98 }}
              >
                Book Now
              </motion.button>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FundRaising;