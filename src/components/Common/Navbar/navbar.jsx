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
import SectionContainer from "../../SectionContainer";
import BACKEND_URL from "../../../config/backend-config";
function NavBar() {
  const [profilePicture, setProfilePicture] = useState("");
  const [loading, setLoading] = useState(false);
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
        console.log("DISCOVERY", { data });
        setProfilePicture(data.user.profilePicture || "");
      }
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <SectionContainer containerColor={"#f8f9fa"} backgroundColor="#f8f9fa">
      <Navbar expand="lg" className="bg-body-tertiary">
        <Container
          fluid
          style={{ display: "flex", justifyContent: "space-around" }}
        >
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
                <LogoutButton />
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
