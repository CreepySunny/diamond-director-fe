import React, { useContext, useState } from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import LoginAPI from '../api/LoginAPI';
import AuthContext from '../Auth/AuthContext';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const handleUsernameChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
  
    try {
      const loginCreds = {
        email: email,
        password: password
      };
  
      const response = await LoginAPI.loginUser(loginCreds);
      if (response.data.accessToken) {
        sessionStorage.setItem('token', response.data.accessToken);
        login(response.data.accessToken);
  
        const decodedToken = jwtDecode(response.data.accessToken);
        if (decodedToken.roles === 'PLAYER') {
          navigate('/player');
        } else {
          navigate('/coach-dashboard');
        }
      } else {
        console.log('Login failed: No access token in response.');
      }
    } catch (err) {
      if (err.response && err.response.status === 404) {
        setError('User not found. Please check your credentials.');
      } else {
        setError('Login failed. Please try again later.');
        console.error('Login failed:', err.message);
      }
    }
  };
  

  return (
    <Container>
      <Row className="justify-content-md-center">
        <Col md="6">
          <h2 className="text-center">Login</h2>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={handleUsernameChange}
                required
              />
            </Form.Group>

            <Form.Group controlId="formPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                value={password}
                onChange={handlePasswordChange}
                required
              />
            </Form.Group>

            {error && <div className="alert alert-danger">{error}</div>}

            <Button variant="primary" type="submit" className="w-100">
              Login
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default LoginForm;