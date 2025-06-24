import React, { useState, useEffect } from "react";
import { Navbar, Nav, Button, Dropdown, Modal } from "react-bootstrap";
import { 
  HouseFill, 
  CalendarEventFill, 
  PersonFill, 
  BookmarkFill, 
  JournalBookmarkFill,
  PersonCircle 
} from "react-bootstrap-icons";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../UserAuth/AuthContext";
import EventOrganizerLogin from "../EventOrganizer/EventOrganizerLogin";
import UserSignIn from "../UserAuth/UserSignIn";
import UserSignUp from "../UserAuth/UserSignUp";

const Header = () => {
  const [showOrganizerLogin, setShowOrganizerLogin] = useState(false);
  const [showUserAuth, setShowUserAuth] = useState(false);
  const [authMode, setAuthMode] = useState("signin");
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  const handleUserLogin = () => {
    setShowUserAuth(false);
    navigate('/dashboard');
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const toggleAuthMode = () => {
    setAuthMode(prevMode => prevMode === "signin" ? "signup" : "signin");
  };

  return (
    <>
      <Navbar expand="lg" className="fixed-top w-100 px-3 d-flex justify-content-between" 
        style={{ height: "60px", backgroundColor: "black", color: "white" }}>
        
        <Navbar.Brand style={{ fontFamily: "Times New Roman", fontSize: "24px", color: "white" }}>
          Event Management
        </Navbar.Brand>
        
        <Nav className="d-flex justify-content-between w-50">
          <Link to="/" className="d-flex align-items-center text-decoration-none" style={{ color: "white" }}>
            <HouseFill className="me-1" /> Home
          </Link>
          <Link to="/services" className="d-flex align-items-center text-decoration-none" style={{ color: "white" }}>
            <CalendarEventFill className="me-1" /> Events
          </Link>
          <Link to="/blog" className="d-flex align-items-center text-decoration-none" style={{ color: "white" }}>
            <JournalBookmarkFill className="me-1" /> Blogs
          </Link>
          <Link to="/about" className="d-flex align-items-center text-decoration-none" style={{ color: "white" }}>
            <PersonFill className="me-1" /> About Us
          </Link>
          
          <Button
            variant="dark"
            className="d-flex align-items-center text-white"
            style={{ border: "1px solid white" }}
            onClick={() => setShowOrganizerLogin(true)}
          >
            <BookmarkFill className="me-1" /> Organizer Login
          </Button>
          
          {currentUser ? (
            <Dropdown align="end">
              <Dropdown.Toggle variant="dark" id="dropdown-profile" 
                className="d-flex align-items-center text-white"
                style={{ border: "1px solid white", background: "transparent" }}>
                <PersonCircle className="me-1" size={20} />
                {currentUser.displayName || currentUser.email || "Profile"}
              </Dropdown.Toggle>

              <Dropdown.Menu style={{ backgroundColor: "#333", color: "white" }}>
                <Dropdown.Item 
                  as={Link} 
                  to="/dashboard"
                  style={{ color: "white" }}
                >
                  Dashboard
                </Dropdown.Item>
                <Dropdown.Item 
                  as={Link} 
                  to="/profile"
                  style={{ color: "white" }}
                >
                  My Profile
                </Dropdown.Item>
                <Dropdown.Item 
                  onClick={handleLogout}
                  style={{ color: "white" }}
                >
                  Logout
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          ) : (
            <Button
              variant="dark"
              className="d-flex align-items-center text-white ms-2"
              style={{ border: "1px solid white" }}
              onClick={() => setShowUserAuth(true)}
            >
              <PersonFill className="me-1" /> User Login
            </Button>
          )}
        </Nav>
      </Navbar>

      <EventOrganizerLogin 
        show={showOrganizerLogin} 
        handleClose={() => setShowOrganizerLogin(false)} 
      />

      <Modal 
        show={showUserAuth} 
        onHide={() => {
          setShowUserAuth(false);
          setAuthMode("signin");
        }} 
        centered
      >
        <Modal.Header closeButton style={{ backgroundColor: "#333", color: "white" }}>
          <Modal.Title>
            {authMode === "signin" ? "User Sign In" : "User Sign Up"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ backgroundColor: "#333", color: "white" }}>
          {authMode === "signin" ? (
            <UserSignIn 
              onSuccess={handleUserLogin} 
              onSwitchToSignUp={toggleAuthMode}
            />
          ) : (
            <UserSignUp 
              onSuccess={handleUserLogin} 
              onSwitchToSignIn={toggleAuthMode}
            />
          )}
        </Modal.Body>
      </Modal>
    </>
  );
};

export default Header;