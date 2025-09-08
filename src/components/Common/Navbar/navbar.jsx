import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";

import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import "./navbar.css";
import SearchBar from "../../SearchBar/SearchBar";
import { FaSearch } from "react-icons/fa";
// import LogoutButton from "../LogoutButton/LogoutButton";
import LogoutConfirmationModal from "../LogoutConfirmationModal";
import { FiLogOut } from "react-icons/fi";
import { io } from "socket.io-client";
// import BACKEND_URL from "../../../config/backend-config";
import { handleLogout } from "../../../config/firebase";
import { useLocation } from "react-router-dom";
import SectionContainer from "../../SectionContainer";
import BACKEND_URL from "../../../config/backend-config";
function NavBar() {
  // ...existing code...
  const socket = io(BACKEND_URL, { transports: ["websocket"] });
  const [profilePicture, setProfilePicture] = useState("");
  const [loading, setLoading] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const location = useLocation();
  const uid = localStorage.getItem("uid");
  const token = localStorage.getItem("token");
  const navigation = useNavigate();

  useEffect(() => {
    if (uid !== "" && uid !== null) {
      getProfile();
    }
  }, [uid]);
  const getProfile = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${BACKEND_URL}/api/auth/users/${uid}`, {
        method: "GET",
        headers: { Authorization: token },
      });
      if (response.ok) {
        const data = await response.json();
        setProfilePicture(data.user.profilePicture || "");
      }
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  // Logout logic
  const handleLogoutClick = () => {
    setShowLogoutModal(true);
  };
  const handleLogoutConfirm = async () => {
    setShowLogoutModal(false);
    // Update active status on server
    socket.emit("active-status-update", {
      uid: localStorage.getItem("uid"),
      activeStatus: false,
    });
    // Call actual logout logic
    const success = await handleLogout();
    if (success) {
      navigation("/client-signin");
    } else {
      // fallback: clear localStorage and redirect
      localStorage.clear();
      navigation("/client-signin");
    }
  };
  const handleLogoutCancel = () => {
    setShowLogoutModal(false);
  };

  return (
    <SectionContainer containerColor={"#f8f9fa"} backgroundColor="#f8f9fa">
      <Navbar expand="lg" className="bg-body-tertiary">
        <Container
          fluid
          style={{ display: "flex", justifyContent: "space-around" }}
        >
          <Navbar.Brand href="/">
            <div className="nav-logo">
              <img
                src="/images/logo-ri-express.png"
                alt="logo"
                width="125"
                height="58px"
              ></img>
            </div>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="me-auto my-2 my-lg-0"
              style={{ maxHeight: "100px" }}
              navbarScroll
            >
              <Nav.Link href="/#landing" className="nav-link">
                <div className="text">Home</div>
              </Nav.Link>
              <Nav.Link href="/#about" className="nav-link">
                <div className="text">About</div>
              </Nav.Link>
              <Nav.Link href="/#contact">
                <div className="text">Contact</div>
              </Nav.Link>
              <Nav.Link className="nav-link" href="/#faq">
                <div className="text">FAQ</div>
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
          <div className="placeholder">
            {token !== "" && token !== null ? (
              <div style={{ display: "flex", gap: "15px" }}>
                <img
                  src={
                    profilePicture !== ""
                      ? profilePicture
                      : "../../../public/images/profile.png"
                  }
                  alt="User"
                  className="user-profile"
                  onClick={() => navigation("/profile")}
                />
                {/* Show logout icon/text, only trigger modal on click */}
                <button
                  className="logout-btn"
                  style={{ background: "none", border: "none", cursor: "pointer", display: "flex", alignItems: "center" }}
                  onClick={handleLogoutClick}
                  aria-label="Logout"
                >
                  <FiLogOut size={24} style={{ marginRight: 4 }} />
                  <span style={{ fontWeight: 500 }}>Logout</span>
                </button>
                <LogoutConfirmationModal
                  show={showLogoutModal}
                  onConfirm={handleLogoutConfirm}
                  onCancel={handleLogoutCancel}
                />
              </div>
            ) : (
              <FaSearch className="search-icon" />
            )}
          </div>
        </Container>
      </Navbar>
    </SectionContainer>
  );
}

export default NavBar;
