import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const FundEve = () => {
  const navigate = useNavigate();

  return (
    <motion.div
      whileHover={{ scale: 1.1 }}
      whileInView={{ opacity: 1, y: 0 }}
      initial={{ opacity: 0, y: 50 }}
      transition={{ duration: 0.5 }}
      style={{
        fontFamily: "Times New Roman",
        padding: "10px",
        border: "1px solid #ccc",
        borderRadius: "10px",
        textAlign: "center",
        backgroundColor: "black",
        color: "white",
        boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
        overflow: "hidden",
        width: "300px",
        margin: "40px auto"
      }}
    >
      <motion.img
        src="/images/Services/S6.jpg"
        alt="Fundraising Events"
        style={{
          width: "100%",
          height: "150px",
          objectFit: "cover",
          borderRadius: "10px",
          transition: "transform 0.3s ease-in-out",
        }}
        whileHover={{ scale: 1.2 }}
      />
      <h3 style={{ margin: "10px 0" }}>Fundraising Events</h3>
      <p style={{ fontSize: "14px", color: "#ccc" }}>Helping causes with impactful events.</p>
      <button 
        onClick={() => navigate("/fundraising-events")}
        style={{
          backgroundColor: "#007BFF",
          color: "white",
          border: "none",
          padding: "8px 12px",
          borderRadius: "5px",
          cursor: "pointer",
          marginTop: "10px",
          fontSize: "14px"
        }}
      >
        Learn More &gt;&gt;
      </button>
    </motion.div>
  );
};

export default FundEve;