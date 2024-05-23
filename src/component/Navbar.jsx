import React from 'react';
import { Navbar, Nav, Form, FormControl, Button } from 'react-bootstrap';

const NavigationBar = () => {
  return (
    <Navbar bg="light" expand="lg" className='fixed-top'>
      <Navbar.Brand href="/">Diamond Director</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link href="/">Home</Nav.Link>
          <Nav.Link href="/about-us">About Us</Nav.Link>
        </Nav>
        <Form inline className='ml-auto'>
          <FormControl type="text" placeholder="Search" className="mr-sm-2" />
          <Button variant="outline-success">Search</Button>
        </Form>
        <Nav className="ml-md-auto">
          <Nav.Link href="/login">Login</Nav.Link>
          <Nav.Link href="/register">Register</Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default NavigationBar;
