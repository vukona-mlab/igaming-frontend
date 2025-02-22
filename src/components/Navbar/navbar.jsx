import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import './navbar.css';


function NavBar() {
  return (
    <>
      <Navbar className='navigation' bg="light" data-bs-theme="light">
        <Container>
          <Navbar.Brand href="#home"><img src="/images/logo-ri-express.png" alt="logo" width="137" height="58px"></img></Navbar.Brand>
          <Nav className="me-auto navbar">
            <Nav.Link className="nav-link" href="#home">Home</Nav.Link>
            <Nav.Link className="nav-link" href="#features">About</Nav.Link>
            <Nav.Link className="nav-link" href="#pricing">Contact</Nav.Link>
            <Nav.Link className="nav-link" href="#pricing">FAQ</Nav.Link>
          </Nav>
        </Container>     
      </Navbar>
    </>
  );
}

export default NavBar;
