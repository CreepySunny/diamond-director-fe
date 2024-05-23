import React, { useState } from 'react';
import PlayerAPI from "../api/PlayerAPI"
import { Container, Row, Col, Button, Form } from 'react-bootstrap';


const RegistrationForm = () => {
  const [accountType, setAccountType] = useState('player');

  const handleAccountTypeChange = (type) => {
    setAccountType(type);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const form = e.target;
    const formData = new FormData(form);

    const data = {
      firstName: formData.get('firstName'),
      lastName: formData.get('lastName'),
      handed_bats: formData.get('handed_bats'),
      handed_throws: formData.get('handed_throws'),
      position: formData.get('position'),
      dateOfBirth: formData.get('dateOfBirth'),
      height: parseFloat(formData.get('height')),
      weight: parseFloat(formData.get('weight')),
    };
    try{
     const responce = await PlayerAPI.createPlayer(data);
    }catch (err){
      console.log(err.message);
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
              <Form.Control type="text" name="firstName" placeholder="Enter your first name" />
            </Form.Group>
            <Form.Group controlId="lastName">
              <Form.Label>Last Name</Form.Label>
              <Form.Control type="text" name="lastName" placeholder="Enter your last name" />
            </Form.Group>
            <Form.Group controlId="dateOfBirth">
              <Form.Label>Date of Birth</Form.Label>
              <Form.Control type="date" name="dateOfBirth" placeholder="Enter your date of birth" />
            </Form.Group>
            <Form.Group controlId="email">
              <Form.Label>Email address</Form.Label>
              <Form.Control type="email" name="email" placeholder="Enter your email" />
            </Form.Group>
            {accountType === 'player' && (
              <>
                <Form.Group controlId="position">
                <Form.Label>Position</Form.Label>
                <Form.Control as="select" name="position">
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
                  <Form.Control type="text" name="handed_throws" placeholder="Enter your throwing handedness" />
                </Form.Group>
                <Form.Group controlId="handed_bats">
                  <Form.Label>Handedness (Batting)</Form.Label>
                  <Form.Control type="text" name="handed_bats" placeholder="Enter your batting handedness" />
                </Form.Group>
                <Form.Group controlId="height">
                  <Form.Label>Height</Form.Label>
                  <Form.Control type="text" name="height" placeholder="Enter your height" />
                </Form.Group>
                <Form.Group controlId="weight">
                  <Form.Label>Weight</Form.Label>
                  <Form.Control type="text" name="weight" placeholder="Enter your weight" />
                </Form.Group>
              </>
            )}
            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default RegistrationForm;
