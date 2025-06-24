import React, { useState, useEffect } from "react";
import Header from "./Components/header";
import MainContent from "./MainContent";

const Home = () => {
  const [showTitle, setShowTitle] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const mainContentHeight = window.innerHeight;
      setShowTitle(scrollY > mainContentHeight - 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <Header />
      {showTitle && (
        <div style={{
          position: "fixed",
          top: "0",
          left: "50%",
          transform: "translateX(-50%)",
          backgroundColor: "black",
          color: "white",
          padding: "10px 20px",
          fontSize: "24px",
          fontWeight: "bold",
          textAlign: "center",
          width: "100%",
          zIndex: "1000"
        }}>
          Our Featured Events
        </div>
      )}
      <MainContent />
      {/* Ensure there's enough content to scroll down */}
      <div style={{ height: "100vh", backgroundColor: "#f8f9fa", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <h2>Welcome to the Next Section</h2>
      </div>
    </>
  );
};

export default Home;
