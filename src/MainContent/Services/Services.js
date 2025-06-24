import React from "react";
import { motion } from "framer-motion";
import FamilyEve from "./FamilyEve";
import CorporateEve from "./CorporateEve";
import MusicalEve from "./MusicalEve";
import SportsEve from "./SportsEve";
import MarketEve from "./MarketEve";
import FundEve from "./FundEve";

const Services = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }} 
      whileInView={{ opacity: 1, y: 0 }} 
      transition={{ duration: 0.6 }}
      viewport={{ once: true }} 
      style={{ padding: "40px 20px", textAlign: "center" }}
    >
      <motion.h2
        initial={{ opacity: 0, y: -50 }} 
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        viewport={{ once: true }}
        style={{ 
          fontSize: "32px", 
          fontFamily: "Times New Roman", 
          fontWeight: "bold", 
          color: "black", 
          marginBottom: "10px"
        }}
      >
        Our Event Services
      </motion.h2>

      <motion.p
        initial={{ opacity: 0, y: -30 }} 
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        viewport={{ once: true }}
        style={{ fontSize: "16px", color: "#555", maxWidth: "800px", margin: "0 auto 30px" }}
      >
        We specialize in organizing top-notch events, ensuring excellence in every detail.
      </motion.p>

      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(3, 1fr)", 
        gap: "40px", 
        justifyContent: "center",
        maxWidth: "1000px",
        margin: "0 auto"
      }}>
        <motion.div initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} viewport={{ once: true }}>
          <FamilyEve />
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }}>
          <CorporateEve />
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} viewport={{ once: true }}>
          <MusicalEve />
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} viewport={{ once: true }}>
          <SportsEve />
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.9 }} viewport={{ once: true }}>
          <MarketEve />
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 1 }} viewport={{ once: true }}>
          <FundEve />
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Services;