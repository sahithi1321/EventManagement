import React from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

const responsive = {
  desktop: { breakpoint: { max: 3000, min: 1024 }, items: 1 },
  tablet: { breakpoint: { max: 1024, min: 464 }, items: 1 },
  mobile: { breakpoint: { max: 464, min: 0 }, items: 1 }
};

const carouselData = [
  ["/Images/Gallery/C1/CI1.jpg", "/Images/Gallery/C1/CI2.jpg", "/Images/Gallery/C1/CI3.jpg", "/Images/Gallery/C1/CI4.jpg"],
  ["/Images/Gallery/C2/CR1.jpg", "/Images/Gallery/C2/CR2.jpg", "/Images/Gallery/C2/CR3.jpg", "/Images/Gallery/C2/CR4.jpg"],
  ["/Images/Gallery/C3/CA1.jpg", "/Images/Gallery/C3/CA2.jpg", "/Images/Gallery/C3/CA3.jpg", "/Images/Gallery/C3/CA4.jpg"],
  ["/Images/Gallery/C4/CQ1.jpg", "/Images/Gallery/C4/CQ2.jpg", "/Images/Gallery/C4/CQ3.jpg", "/Images/Gallery/C4/CQ4.jpg"]
];

const Gallery = () => {
  const navigate = useNavigate(); // Initialize navigate function

  return (
    <div
      style={{
        backgroundColor: "#000",
        color: "white",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        fontFamily: "Times New Roman",
        width: "80%",
        margin: "40px auto",
        padding: "20px",
        border: "2px solid white",
        borderRadius: "15px"
      }}
    >
      <div style={{ flex: 1, textAlign: "left", paddingRight: "20px" }}>
        <h1 style={{ fontSize: "36px", fontWeight: "bold", textAlign: "center" }}>Where Every Picture Tells a Story</h1>
        <h2 style={{ fontSize: "28px", fontWeight: "bold", textAlign: "center", marginBottom: "10px" }}>Visit Our Gallery</h2>
        <p style={{ fontSize: "16px", lineHeight: "1.5", textAlign: "justify", marginBottom: "20px" }}>
          Explore our collection of unforgettable moments. Witness the beauty and joy captured in each frame.
          Our gallery is a tribute to creativity, passion, and the art of storytelling through visuals.
          Every image showcases a unique perspective and an inspiring journey.
        </p>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <button
            onClick={() => navigate("/gallery-info")} // Navigate to GalleryInfo
            style={{
              backgroundColor: "white",
              color: "black",
              border: "none",
              padding: "10px 20px",
              fontSize: "16px",
              fontWeight: "bold",
              cursor: "pointer",
              borderRadius: "5px"
            }}
          >
            Check Out →
          </button>
        </div>
      </div>
      
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gridTemplateRows: "1fr 1fr",
          gap: "10px",
          flex: 1
        }}
      >
        {carouselData.map((images, index) => (
          <div
            key={index}
            style={{
              width: "100%",
              height: "150px",
              overflow: "hidden",
              borderRadius: "10px",
              border: "2px solid white",
              transition: "transform 0.3s ease-in-out"
            }}
            className="carousel-box"
          >
            <Carousel 
              responsive={responsive} 
              autoPlay 
              autoPlaySpeed={3000} 
              infinite 
              showDots={false} 
              arrows={false}
            >
              {images.map((src, idx) => (
                <img
                  key={idx}
                  src={src}
                  alt={`Gallery ${index}-${idx}`}
                  style={{
                    width: "100%",
                    height: "150px",
                    objectFit: "cover",
                    borderRadius: "10px",
                    transition: "transform 0.3s ease-in-out"
                  }}
                  className="zoom-image"
                />
              ))}
            </Carousel>
          </div>
        ))}
      </div>
      
      <style>
        {`
          .carousel-box:hover {
            transform: scale(1.05);
          }
          .zoom-image:hover {
            transform: scale(1.1);
          }
        `}
      </style>
    </div>
  );
};

export default Gallery;
