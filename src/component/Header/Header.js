import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Link } from "react-router-dom";

const Header = () => {
    return (
        <Navbar expand="lg" className="bg-body-tertiary" bg="primary" data-bs-theme="dark">
            <Container>
                <Navbar.Brand href="#home">Joy Nguyen</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Link to={'/'} className='nav-link'>
                            Home
                        </Link>
                        <Link to={'/users'} className='nav-link'>
                            User
                        </Link>
                        <Link to={'/admins'} className='nav-link'>
                            Admin
                        </Link>
                    </Nav>
                    <NavDropdown title="Setting" id="basic-nav-dropdown">
                        <NavDropdown.Item href="#action/3.1">Log In</NavDropdown.Item>
                        <NavDropdown.Item href="#action/3.2">
                            Log out
                        </NavDropdown.Item>
                        <NavDropdown.Item href="#action/3.3">
                            Profile
                        </NavDropdown.Item>

                    </NavDropdown>
                    <Nav>

                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default Header;