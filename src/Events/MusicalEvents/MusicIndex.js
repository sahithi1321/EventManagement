// src/Events/MusicalEvents/MusicIndex.js
import React, { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import { Button } from "react-bootstrap";

const events = [
  { id: "M1", path: "/musical-events/album-release", imageSrc: "/Images/Music/M1.jpg", title: "Album Release", description: "Celebrating the launch of a new musical journey." },
  { id: "M2", path: "/musical-events/band-performance", imageSrc: "/Images/Music/M2.jpg", title: "Band Performance", description: "Experience the magic of live music." },
  { id: "M3", path: "/musical-events/bollywood-dance", imageSrc: "/Images/Music/M4.jpg", title: "Bollywood Dance", description: "Groove to the vibrant beats of Bollywood." },
  { id: "M4", path: "/musical-events/classical-dance", imageSrc: "/Images/Music/M5.jpg", title: "Classical Dance", description: "Celebrating the grace and heritage of classical art." },
  { id: "M5", path: "/musical-events/classical-music", imageSrc: "/Images/Music/M3.jpg", title: "Classical Music", description: "Immerse yourself in the timeless melodies of classical music." },
  { id: "M6", path: "/musical-events/concert", imageSrc: "/Images/Music/M6.jpg", title: "Concert", description: "Feel the energy of live performances and mesmerizing music." },
  { id: "M7", path: "/musical-events/dj-night", imageSrc: "/Images/Music/M7.jpg", title: "DJ Night", description: "Dance to the beats of an electrifying DJ performance." },
  { id: "M8", path: "/musical-events/kpop", imageSrc: "/Images/Music/M11.jpg", title: "Kpop Event", description: "Dive into the vibrant world of Kpop beats and performances." },
  { id: "M9", path: "/musical-events/music-festival", imageSrc: "/Images/Music/M12.jpg", title: "Music Festival", description: "Celebrate music with an unforgettable festival experience." },
  { id: "M10", path: "/musical-events/orchestra", imageSrc: "/Images/Music/M10.jpg", title: "Orchestra", description: "Indulge in the symphony of orchestral masterpieces." },
];

const MusicIndex = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedEvent, setSelectedEvent] = useState(null);

  const filteredEvents = events.filter(event =>
    event.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleBookNow = () => {
    if (selectedEvent) {
      navigate("/musical-events/booking", {
        state: {
          eventDetails: {
            eventName: selectedEvent.title,
            eventImage: selectedEvent.imageSrc,
            eventType: selectedEvent.path.split('/').pop(),
            description: selectedEvent.description
          }
        }
      });
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <header style={{
        position: "fixed",
        top: 0,
        width: "100%",
        backgroundColor: "#333",
        color: "white",
        padding: "10px",
        zIndex: 1000,
      }}>
        <h1 style={{ textAlign: "center" }}>Music Event Finder</h1>
      </header>

      <div style={{ marginTop: "60px" }}>
        <div style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginBottom: "20px",
          position: "relative",
        }}>
          <FaSearch style={{ position: "absolute", left: "10px", color: "#666" }} />
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

        <h2 style={{
          textAlign: "center",
          fontSize: "2rem",
          color: "#333",
          marginBottom: "20px",
        }}>
          Explore Music Events to Soothe Your Soul and Pump Up Your Energy
        </h2>

        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "20px",
          marginBottom: "40px"
        }}>
          {filteredEvents.map((event) => (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, y: 50, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: false, amount: 0.1 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              style={{
                background: "white",
                borderRadius: "10px",
                boxShadow: selectedEvent?.id === event.id 
                  ? "0px 0px 0px 3px #0d6efd" 
                  : "0px 4px 6px rgba(0, 0, 0, 0.1)",
                overflow: "hidden",
                textAlign: "center",
                padding: "15px",
                transition: "all 0.3s ease-in-out",
                cursor: "pointer"
              }}
              onClick={() => setSelectedEvent(event)}
            >
              <div style={{ overflow: "hidden", borderRadius: "10px" }}>
                <img
                  src={event.imageSrc}
                  alt={event.title}
                  style={{
                    width: "100%",
                    height: "150px",
                    objectFit: "cover",
                  }}
                />
              </div>
              <h3 style={{ fontSize: "1.2rem", margin: "10px 0", color: "#333" }}>
                {event.title}
              </h3>
              <p style={{ fontSize: "0.9rem", color: "#666", marginTop: "5px" }}>
                {event.description}
              </p>
            </motion.div>
          ))}
        </div>

        <div style={{ textAlign: "center", margin: "40px 0" }}>
          <Button 
            variant="primary" 
            size="lg"
            onClick={handleBookNow}
            disabled={!selectedEvent}
          >
            {selectedEvent ? `Book ${selectedEvent.title}` : 'Select an event to book'}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default MusicIndex;