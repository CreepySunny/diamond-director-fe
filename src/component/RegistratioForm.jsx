import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PlayerAPI from "../api/PlayerAPI";
import CoachAPI from "../api/CoachAPI";
import { Container, Row, Col, Button, Form, Alert } from 'react-bootstrap';

const RegistrationForm = () => {
  const [accountType, setAccountType] = useState('player');
  const [returnMessage, setReturnMessage] = useState();
  const [isScorekeeper, setIsScorekeeper] = useState(false);
  const navigate = useNavigate();

  const handleAccountTypeChange = (type) => {
    setAccountType(type);
    setReturnMessage('');
  };

  const handleSubmitPlayer = async (data) => {
    try {
      const response = await PlayerAPI.createPlayer(data);
      if (response.status === 201) {
        setReturnMessage('Account successfully created!');
        setTimeout(() => {
          navigate('/');
        }, 3000);
      } else if (response.status === 400) {
        setReturnMessage('[!] Error: ' + response.statusText);
      } else {
        console.log(response.statusText);
      }
    } catch (err) {
      console.log(err.message);
    }
  };

  const handleSubmitCoach = async (data) => {
    try {
      const response = await CoachAPI.createCoach(data);
      if (response.status === 201) {
        setReturnMessage('Coach account successfully created!');
        setTimeout(() => {
          navigate('/team');
        }, 3000); 
      } else if (response.status === 400) {
        setReturnMessage('[!] Error: ' + response.statusText);
      } else {
        console.log(response.statusText);
      }
    } catch (err) {
      console.log(err.message);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const form = e.target;
    const formData = new FormData(form);

    const commonData = {
      firstName: formData.get('firstName'),
      lastName: formData.get('lastName'),
      email: formData.get('email'),
      password: formData.get('password'),
      dateOfBirth: formData.get('dateOfBirth'),
    };

    if (accountType === 'player') {
      const playerData = {
        ...commonData,
        handed_bats: formData.get('handed_bats'),
        handed_throws: formData.get('handed_throws'),
        position: formData.get('position'),
        height: parseFloat(formData.get('height')),
        weight: parseFloat(formData.get('weight')),
      };
      await handleSubmitPlayer(playerData);
    } else if (accountType === 'coach') {
      const coachData = {
        ...commonData,
        canScoreKeep: isScorekeeper,
        position: formData.get('coachPosition'),
      };
      await handleSubmitCoach(coachData);
    }
  };

  return (
    <Container>
      <Row className="justify-content-center mt-5">
        <Col md={6}>
          <div className="text-center mb-3">
            <Button
              variant={accountType === 'player' ? 'primary' : 'secondary'}
              className="mr-2"
              onClick={() => handleAccountTypeChange('player')}
            >
              Player
            </Button>
            <Button
              variant={accountType === 'coach' ? 'primary' : 'secondary'}
              onClick={() => handleAccountTypeChange('coach')}
            >
              Coach
            </Button>
          </div>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="firstName">
              <Form.Label>First Name</Form.Label>
              <Form.Control type="text" name="firstName" placeholder="Enter your first name" required />
            </Form.Group>
            <Form.Group controlId="lastName">
              <Form.Label>Last Name</Form.Label>
              <Form.Control type="text" name="lastName" placeholder="Enter your last name" required />
            </Form.Group>
            <Form.Group controlId="dateOfBirth">
              <Form.Label>Date of Birth</Form.Label>
              <Form.Control type="date" name="dateOfBirth" placeholder="Enter your date of birth" required />
            </Form.Group>
            <Form.Group controlId="email">
              <Form.Label>Email address</Form.Label>
              <Form.Control type="email" name="email" placeholder="Enter your email" required />
            </Form.Group>
            <Form.Group controlId="password">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" name="password" placeholder="Enter your password" required />
            </Form.Group>
            {accountType === 'player' && (
              <>
                <Form.Group controlId="position">
                  <Form.Label>Position</Form.Label>
                  <Form.Control as="select" name="position" required>
                    <option value="first">First Base</option>
                    <option value="second">Second Base</option>
                    <option value="third">Third Base</option>
                    <option value="shortstop">Shortstop</option>
                    <option value="left_field">Left Field</option>
                    <option value="right_field">Right Field</option>
                    <option value="center_field">Center Field</option>
                    <option value="catcher">Catcher</option>
                    <option value="starter">Starter</option>
                    <option value="reliever">Reliever</option>
                  </Form.Control>
                </Form.Group>
                <Form.Group controlId="handed_throws">
                  <Form.Label>Handedness (Throwing)</Form.Label>
                  <Form.Control as="select" name="handed_throws" required>
                    <option value="RIGHT">Right</option>
                    <option value="LEFT">Left</option>
                    <option value="SWITCH">Switch</option>
                  </Form.Control>
                </Form.Group>
                <Form.Group controlId="handed_bats">
                  <Form.Label>Handedness (Batting)</Form.Label>
                  <Form.Control as="select" name="handed_bats" required>
                    <option value="RIGHT">Right</option>
                    <option value="LEFT">Left</option>
                    <option value="SWITCH">Switch</option>
                  </Form.Control>
                </Form.Group>
                <Form.Group controlId="height">
                  <Form.Label>Height</Form.Label>
                  <Form.Control type="text" name="height" placeholder="Enter your height" required />
                </Form.Group>
                <Form.Group controlId="weight">
                  <Form.Label>Weight</Form.Label>
                  <Form.Control type="text" name="weight" placeholder="Enter your weight" required />
                </Form.Group>
              </>
            )}
            {accountType === 'coach' && (
              <>
              <Form.Group controlId="isScorekeeper">
                <Form.Check
                  type="checkbox"
                  label="Can be a scorekeeper"
                  checked={isScorekeeper}
                  onChange={(e) => setIsScorekeeper(e.target.checked)}
                />
              </Form.Group>
              
              <Form.Group controlId="coachPosition">
                <Form.Label>Position</Form.Label>
                <Form.Control as="select" name="coachPosition" required>
                  <option value="DEFENSE">Defense</option>
                  <option value="OFFENSE">Offense</option>
                  <option value="PITCHING">Pitching</option>
                  <option value="HEAD">Head</option>
                </Form.Control>
              </Form.Group>
              </>
            )}
            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
          {returnMessage && (
            <Alert variant={returnMessage.includes('successfully') ? 'success' : 'danger'} className="mt-3">
              {returnMessage}
            </Alert>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default RegistrationForm;
