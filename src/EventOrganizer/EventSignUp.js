import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { motion } from "framer-motion";
import EventOrganizerLogin from "./EventOrganizerLogin"; // Importing the Sign In modal

const EventSignUp = ({ show, handleClose }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);
  const [message, setMessage] = useState("");
  const [showSignIn, setShowSignIn] = useState(false); // State for Sign In modal

  // Function to send OTP (Simulated)
  const sendOtp = () => {
    if (!email.includes("@") || !email.includes(".")) {
      alert("Enter a valid email!");
      return;
    }
    setMessage("OTP sent successfully (Simulated)");
    setOtpSent(true);
  };

  // Function to verify OTP (Simulated)
  const verifyOtp = () => {
    if (otp === "123456") {
      // Simulated correct OTP
      setMessage("OTP verified successfully (Simulated)");
      setOtpVerified(true);
    } else {
      setMessage("Invalid OTP. Please try again.");
    }
  };

  // Password validation logic
  const validatePassword = (pwd) => {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return passwordRegex.test(pwd)
      ? ""
      : "Password must be at least 8 characters long, include one uppercase letter, one lowercase letter, one number, and one special character.";
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    setPasswordError(validatePassword(e.target.value));
  };

  const handleSignInClick = () => {
    if (!otpVerified || passwordError || password !== confirmPassword) return;
  
    // Save user data (example: localStorage or context/state management)
    const userData = { name, email };
    localStorage.setItem("user", JSON.stringify(userData)); // Simulated storage
    
    handleClose(); // Close Sign-Up modal
    setShowSignIn(true); // Open Sign-In modal
  };
  

  return (
    <>
      <Modal show={show} onHide={handleClose} centered>
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.3 }}
        >
          <h2
            style={{
              textAlign: "center",
              fontFamily: "Times New Roman",
              fontSize: "1.5rem",
              marginBottom: "20px",
            }}
          >
            Sign Up
          </h2>
          <Modal.Body>
            <Form>
              {/* Name Input */}
              <Form.Group className="mb-3">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter your name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </Form.Group>

              {/* Email Input */}
              <Form.Group className="mb-3">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Form.Group>

              {/* OTP Section */}
              {otpSent ? (
                <>
                  <Form.Group className="mb-3">
                    <Form.Label>Enter OTP</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter OTP"
                      value={otp}
                      onChange={(e) => setOtp(e.target.value)}
                    />
                  </Form.Group>
                  <Button variant="secondary" onClick={verifyOtp} className="mb-3">
                    Verify OTP
                  </Button>
                </>
              ) : (
                <Button variant="primary" onClick={sendOtp} className="mb-3">
                  Send OTP
                </Button>
              )}

              {/* Message Display */}
              {message && <p style={{ color: otpVerified ? "green" : "red" }}>{message}</p>}

              {/* Password Inputs */}
              <Form.Group className="mb-3">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Enter password"
                  value={password}
                  onChange={handlePasswordChange}
                />
                {passwordError && <small style={{ color: "red" }}>{passwordError}</small>}
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Confirm password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
                {confirmPassword && password !== confirmPassword && (
                  <small style={{ color: "red" }}>Passwords do not match.</small>
                )}
              </Form.Group>

              {/* Sign In Button */}
              <Button
                variant="success"
                className="w-100 mb-2"
                disabled={!otpVerified || passwordError || password !== confirmPassword}
                onClick={handleSignInClick}
              >
                Sign In
              </Button>
            </Form>
          </Modal.Body>
        </motion.div>
      </Modal>

      {/* Sign In Modal */}
      {showSignIn && <EventOrganizerLogin show={showSignIn} handleClose={() => setShowSignIn(false)} />}
    </>
  );
};

export default EventSignUp;
