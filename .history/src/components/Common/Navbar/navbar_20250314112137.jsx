import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";

import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import "./navbar.css";
import SearchBar from "../../SearchBar/SearchBar";
import { FaSearch } from "react-icons/fa";
import LogoutButton from "../LogoutButton/LogoutButton";
import { useLocation } from "react-router-dom";
function NavBar() {
  const [profilePicture, setProfilePicture] = useState("");
  const [loading, setLoading] = useState(false);
  const location = useLocation();
  const uid = localStorage.getItem("uid");
  const token = localStorage.getItem("token");
  const navigation = useNavigate();

  useEffect(() => {
    if (uid !== "") {
      getProfile();
    }
  }, [uid]);
  const getProfile = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `http://localhost:8000/api/auth/users/${uid}`,
        {
          method: "GET",
          headers: { Authorization: token },
        }
      );
      if (response.ok) {
        const data = await response.json();
        setProfilePicture(data.user.profilePicture);
      }
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container fluid>
        <Navbar.Brand href="#">
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
            <Nav.Link
              href="#action1"
              className="nav-link"
              onClick={() => navigation("/")}
            >
              <div className="text">Home</div>
            </Nav.Link>
            <Nav.Link href="#action2" className="nav-link">
              <div className="text">About</div>
            </Nav.Link>
            <Nav.Link href="#">
              <div className="text">Contact</div>
            </Nav.Link>
            <Nav.Link className="nav-link" href="#pricing">
              <div className="text">FAQ</div>
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
        <div className="placeholder">
          {profilePicture !== "" ? (
            <div style={{ display: "flex", gap: "15px" }}>
              {location.pathname === "/profile" && <LogoutButton />}
              <img
                src={profilePicture}
                alt="User"
                className="user-profile"
                onClick={() => navigation("/profile")}
              />
              <LogoutButton />
            </div>
          ) : (
            <FaSearch className="search-icon" />
          )}
        </div>
      </Container>
    </Navbar>
  );
}

export default NavBar;
