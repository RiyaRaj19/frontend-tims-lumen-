import React from 'react';
import { Navbar as BootstrapNavbar, Container, Button } from 'react-bootstrap';
import { FaBars, FaUser, FaSignOutAlt } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import './Navbar.css';

const Navbar = ({ toggleSidebar }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    navigate('/login');
  };

  return (
    <BootstrapNavbar bg="light" expand="lg" className="mb-4">
      <Container fluid>
        <Button variant="outline-secondary" onClick={toggleSidebar} className="me-2">
          <FaBars />
        </Button>
        <BootstrapNavbar.Brand href="/">TIMS</BootstrapNavbar.Brand>
        <BootstrapNavbar.Toggle aria-controls="basic-navbar-nav" />
        <BootstrapNavbar.Collapse id="basic-navbar-nav" className="justify-content-end">
          <Button variant="outline-secondary" className="me-2">
            <FaUser className="me-2" />
            Profile
          </Button>
          <Button variant="outline-danger" onClick={handleLogout}>
            <FaSignOutAlt className="me-2" />
            Logout
          </Button>
        </BootstrapNavbar.Collapse>
      </Container>
    </BootstrapNavbar>
  );
};

export default Navbar;

