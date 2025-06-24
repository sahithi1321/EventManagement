import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button } from "react-bootstrap";
import { motion, AnimatePresence } from "framer-motion";
import { FaArrowDown } from "react-icons/fa";

const images = [
  "/Images/Bg/bg1.jpg",
  "/Images/Bg/bg2.png",
  "/Images/Bg/bg3.png",
  "/Images/Bg/bg4.png",
  "/Images/Bg/bg5.png",
  "/Images/Bg/bg6.png",
];

const Carosal1 = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  // Scroll to the next section
  const handleScrollDown = () => {
    window.scrollTo({
      top: window.innerHeight, // Scroll down by one full viewport height
      behavior: "smooth",
    });
  };

  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        overflow: "hidden",
        position: "relative",
        fontFamily: "Times New Roman",
      }}
    >
      {/* Image Transition Effect */}
      <AnimatePresence>
        <motion.img
          key={currentIndex}
          src={images[currentIndex]}
          alt="Background"
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            position: "absolute",
          }}
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 1.1 }}
          transition={{ duration: 2, ease: "easeInOut" }}
        />
      </AnimatePresence>

      {/* Gradient Transparent Overlay */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          background:
            "linear-gradient(to bottom, rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.2))",
        }}
      ></div>

      {/* Content Section */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          padding: "20px",
          borderRadius: "10px",
          color: "white",
          textAlign: "center",
          fontFamily: "Times New Roman",
        }}
      >
        <h1>Crafting Events - Creating Memories</h1>
        <p>Seamless event planning tailored to your unique celebrations.</p>
        <Button variant="light" style={{ marginTop: "20px" }} onClick={handleScrollDown}>
          Get Started →
        </Button>
      </div>

      {/* Bouncy Scroll Down Arrow */}
      <motion.div
        style={{
          position: "absolute",
          bottom: "20px",
          left: "50%",
          transform: "translateX(-50%)",
          color: "white",
          fontSize: "2rem",
          fontFamily: "Times New Roman",
        }}
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 1.2, ease: "easeInOut" }}
      >
        <FaArrowDown />
      </motion.div>
    </div>
  );
};

export default Carosal1;
