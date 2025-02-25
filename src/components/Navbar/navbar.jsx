import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import './navbar.css';


function NavBar() {
  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container fluid>
        <Navbar.Brand href="#"><img src="/images/logo-ri-express.png" alt="logo" width="137" height="58px"></img></Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: '100px' }}
            navbarScroll
          >
            <Nav.Link href="#action1"><div className="text">Home</div></Nav.Link>
            <Nav.Link href="#action2"><div className="text">About</div></Nav.Link>
            <Nav.Link href="#">
            <div className="text">Contact</div>
            </Nav.Link>
            <Nav.Link className="nav-link" href="#pricing"><div className="text">FAQ</div></Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}


export default NavBar;

