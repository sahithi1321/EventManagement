import React from "react";
import DestinationWed from "./DestinationWed";
import BeachWed from "./BeachWed";
import TempleWed from "./TempleWed";
import TraditionalWed from "./TraditionalWed";
import LuxuryWed from "./LuxuryWed";
import PalaceWed from "./PalaceWed";

const WeddingIndex = () => {
  return (
    <div
      style={{
        fontFamily: "Times New Roman",
        backgroundImage: "url('/Images/Wedding/WE7.jpg')", // Background image path
        backgroundSize: "cover", // Ensures the image covers the entire div
        backgroundPosition: "center", // Centers the image
        backgroundRepeat: "no-repeat", // Prevents image repetition
        color: "white", // Ensures text is readable on a darker background
        padding: "20px",
        minHeight: "100vh", // Makes the background cover the full viewport height
      }}
    >
      {/* Title Section */}
      <div
        style={{
          marginTop: "80px", // Ensures it's below the fixed header
          textAlign: "center",
        }}
      >
        <h1 style={{ fontSize: "2.5rem", marginBottom: "10px" }}>
          Create Unforgettable Memories with Our Signature Wedding Styles
        </h1>
        <p style={{ fontSize: "1rem", color: "white" }}>
          Explore our handpicked wedding styles, each curated to make your special day extraordinary.
        </p>
      </div>

      {/* Wedding Types Grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(2, 1fr)", // 2 cards per row
          gap: "20px",
          padding: "10px",
          marginTop: "20px", // Space between title and content
        }}
      >
        <DestinationWed />
        <BeachWed />
        <TempleWed />
        <TraditionalWed />
        <LuxuryWed />
        <PalaceWed />
      </div>
    </div>
  );
};

export default WeddingIndex;
