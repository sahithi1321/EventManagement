import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, ArrowRight } from "react-bootstrap-icons";
import { motion, useInView } from "framer-motion";

const Carosal2 = () => {
  const images = [
    { src: "Images/Carosal2/FI1.jpg", text: "Music Concerts & Festivals 🎶\nLive performances by famous artists" },
    { src: "Images/Carosal2/FI2.jpg", text: "Corporate Events\nBusiness conferences, Startup networking meetups" },
    { src: "Images/Carosal2/FI3.jpg", text: "Weddings & Receptions\nGrand wedding celebrations\nDestination wedding" },
    { src: "Images/Carosal2/FI4.jpg", text: "Cultural & Traditional Festivals\nDiwali, Holi, Christmas, and New Year celebrations" },
    { src: "Images/Carosal2/FI6.jpg", text: "Workshops & Tech Talks\nHackathons, Bootcamps" },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { triggerOnce: false, margin: "-100px 0px" });
  const navigate = useNavigate(); // Added for navigation

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 100 }} 
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 100 }} 
      transition={{ duration: 0.8, ease: "easeOut" }}
      style={{
        position: "relative",
        backgroundColor: "white",
        padding: "20px",
        textAlign: "center",
      }}
    >
      <h2>Our Featured Events</h2>
      <div
        style={{
          position: "relative",
          width: "60%",
          height: "500px",
          margin: "20px auto",
          overflow: "hidden",
          zIndex: 1,
        }}
      >
        <motion.img
          src={images[currentIndex].src}
          alt="Featured Event"
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
          whileHover={{ scale: 1.05 }}
        />
        <div
          style={{
            position: "absolute",
            bottom: "10%",
            left: "50%",
            transform: "translateX(-50%)",
            backgroundColor: "rgba(0, 0, 0, 0.6)",
            color: "white",
            padding: "10px 20px",
            borderRadius: "8px",
          }}
        >
          {images[currentIndex].text.split("\n").map((line, index) => (
            <div key={index}>{line}</div>
          ))}
        </div>
        <div
          style={{
            position: "absolute",
            left: "10px",
            top: "50%",
            transform: "translateY(-50%)",
            backgroundColor: "rgba(255, 255, 255, 0.8)",
            borderRadius: "50%",
            padding: "10px",
            cursor: "pointer",
          }}
          onClick={() => setCurrentIndex((prev) => (prev - 1 + images.length) % images.length)}
        >
          <ArrowLeft size={30} color="black" />
        </div>
        <div
          style={{
            position: "absolute",
            right: "10px",
            top: "50%",
            transform: "translateY(-50%)",
            backgroundColor: "rgba(255, 255, 255, 0.8)",
            borderRadius: "50%",
            padding: "10px",
            cursor: "pointer",
          }}
          onClick={() => setCurrentIndex((prev) => (prev + 1) % images.length)}
        >
          <ArrowRight size={30} color="black" />
        </div>
      </div>
      {/* Learn More Button */}
     
    </motion.div>
  );
};

export default Carosal2;
