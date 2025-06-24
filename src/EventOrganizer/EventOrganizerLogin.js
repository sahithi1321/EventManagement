// src/components/EventOrganizer/EventOrganizerLogin.js
import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Alert } from 'react-bootstrap'; // Ensure Alert is imported

const EventOrganizerLogin = ({ show, handleClose }) => {
  const [email, setEmail] = useState("eventmanage0018@gmail.com");
  const [password, setPassword] = useState("Event#12");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    setError("");
    
    if (email === "eventmanage0018@gmail.com" && password === "Event#12") {
      // Store organizer login state in localStorage
      localStorage.setItem("organizerLoggedIn", "true");
      handleClose();
      navigate("/organizer-dashboard");
    } else {
      setError("Invalid credentials. Please try again.");
    }
  };

  return (
    <Modal show={show} onHide={handleClose} centered>
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.8 }}
        transition={{ duration: 0.3 }}
      >
        <Modal.Header closeButton>
          <Modal.Title className="text-center w-100">Organizer Login</Modal.Title>
        </Modal.Header>
        
        <Modal.Body>
          {error && <Alert variant="danger">{error}</Alert>}
          
          <Form onSubmit={handleLogin}>
            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </Form.Group>

            <Button
              variant="primary"
              type="submit"
              className="w-100 mb-2"
            >
              Login
            </Button>
          </Form>
        </Modal.Body>
      </motion.div>
    </Modal>
  );
};

export default EventOrganizerLogin;