import React, { useContext } from 'react';
import { Navbar, Nav, Button } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import AuthContext from '../Auth/AuthContext';

const NavigationBar = () => {
  const { user, logout } = useContext(AuthContext);

  return (
    <Navbar bg="light" expand="lg">
      <LinkContainer to="/">
        <Navbar.Brand>Diamond Director</Navbar.Brand>
      </LinkContainer>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
        <Nav className="ml-2">
          {user ? (
            <Button variant="outline-primary" onClick={logout}>Logout</Button>
          ) : (
            <>
              <LinkContainer to="/login">
                <Button variant="outline-success">Login</Button>
              </LinkContainer>
              <LinkContainer to="/register">
                <Button variant="success">Register</Button>
              </LinkContainer>
            </>
          )}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default NavigationBar;
