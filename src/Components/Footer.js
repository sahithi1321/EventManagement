import React from "react";
import { FaFacebook, FaTwitter, FaInstagram, FaYoutube } from "react-icons/fa";

const Footer = () => {
  return (
    <div
      style={{
        backgroundImage: "url('/Images/Footer/F1.jpg')",
        backgroundSize: "cover", // Ensures full image fits properly
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        position: "relative",
        width: "100%",
        height: "100vh", // Ensures footer takes full height
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        color: "white",
        fontFamily: "Times New Roman, serif",
        padding: "20px"
      }}
    >
      {/* Gradient Overlay */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          background: "rgba(0, 0, 0, 0.6)",
        }}
      ></div>

      {/* Content */}
      <div style={{ position: "relative", zIndex: 1 }}>
        <h1 style={{ fontSize: "32px", marginBottom: "10px" }}>Event Management</h1>
        <p style={{ maxWidth: "700px", margin: "auto", fontSize: "16px" }}>
          We specialize in crafting unforgettable experiences. Our expertise spans corporate events,
          weddings, concerts, and more. From meticulous planning to flawless execution, we ensure
          every detail is perfect. Our team is passionate about bringing innovative designs and
          creative concepts to life. We collaborate closely with clients to tailor every aspect
          to their vision. No matter the scale, we make every occasion special and memorable.
        </p>
        
        <h3>Contact Us</h3>
        <p>Email: eventmanage@gmail.com</p>
        <p>Phone: +91 98765 43210 | +91 87654 32109</p>
        
        <blockquote style={{ fontStyle: "italic", marginTop: "20px" }}>
          "Turning dreams into reality, one event at a time."
        </blockquote>
      </div>

      {/* Social Icons */}
      <div
        style={{
          position: "relative",
          display: "flex",
          gap: "20px",
          zIndex: 1,
          marginTop: "20px"
        }}
      >
        <a href="#" style={{ color: "white", fontSize: "24px" }}>
          <FaFacebook />
        </a>
        <a href="#" style={{ color: "white", fontSize: "24px" }}>
          <FaTwitter />
        </a>
        <a href="#" style={{ color: "white", fontSize: "24px" }}>
          <FaInstagram />
        </a>
        <a href="#" style={{ color: "white", fontSize: "24px" }}>
          <FaYoutube />
        </a>
      </div>
    </div>
  );
};

export default Footer;