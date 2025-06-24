import React, { useState, useContext } from "react";
import { useAuth } from "./AuthContext";
import { useNavigate } from "react-router-dom";

const EventBookingForm = () => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    event: "",
    name: currentUser?.firstName || "",
    email: currentUser?.email || "",
    phone: currentUser?.mobile || "",
    date: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const response = await fetch('http://localhost:5001/api/events', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Booking failed');
      }

      alert("Event booked successfully!");
      console.log("Booking Data:", data);
    } catch (error) {
      console.error("Booking Error:", error.message);
      alert(`Booking failed: ${error.message}`);
    }
  };

  if (!currentUser) {
    return (
      <div style={{ textAlign: 'center', padding: '20px' }}>
        <h3>Please login to book events</h3>
        <button onClick={() => navigate('/login')}>Login</button>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: "400px", margin: "auto", padding: "20px" }}>
      <h2 style={{ textAlign: "center" }}>Book an Event</h2>
      <form onSubmit={handleSubmit}>
        {/* Form fields remain the same */}
      </form>
    </div>
  );
};

export default EventBookingForm;