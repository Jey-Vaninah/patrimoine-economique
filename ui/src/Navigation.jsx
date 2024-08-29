import React from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Nav, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'; // Import custom CSS

function Navigation() {
  return (
    <Navbar className="navbar" expand="lg">
      <Navbar.Brand as={Link} to="/"className='add2'>Accueil</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link as={Link}  to="/possessions">Liste des Possessions</Nav.Link>
          <Nav.Link as={Link} to="/chart">Graphique</Nav.Link>
        </Nav>
        <Nav className="ml-auto">
          <Button variant="success" as={Link} to="/add" className='add'>Ajouter une Possession</Button>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default Navigation;
