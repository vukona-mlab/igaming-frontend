import { useState } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Form from "react-bootstrap/Form";
import "./customNavbar.css";

function CustomNavBar() {
  const [showSearch, setShowSearch] = useState(false); // Toggle search visibility

  const handleSearchIconClick = () => {
    setShowSearch((prev) => !prev);
  };

  return (
    <>
      <Navbar className="custom-navigation" bg="light" data-bs-theme="light">
        <Container>
          <Navbar.Brand href="#home">
            <img
              src="/images/logo-ri-express.png"
              alt="logo"
              width="137"
              height="58px"
            />
          </Navbar.Brand>

          <Nav className="me-auto custom-navbar">
            <Nav.Link className="nav-link active" href="#home">
              Home
            </Nav.Link>
            <Nav.Link className="nav-link" href="#features">
              About
            </Nav.Link>
            <Nav.Link className="nav-link" href="#contact">
              Contact
            </Nav.Link>
            <Nav.Link className="nav-link" href="#faq">
              FAQ
            </Nav.Link>
          </Nav>

          {/* Search Icon */}
          <div className="search-icon" onClick={handleSearchIconClick}>
            <img
              src="/images/search-icon.png"
              alt="search-icon"
              width="24"
              height="24"
              style={{ cursor: "pointer" }}
            />
          </div>

          {/* Search Bar (conditionally visible) */}
          {showSearch && (
            <Form className="d-flex search-bar">
              <Form.Control
                type="search"
                placeholder="Search"
                className="search-input"
                aria-label="Search"
              />
            </Form>
          )}
        </Container>
      </Navbar>
    </>
  );
}

export default CustomNavBar;
