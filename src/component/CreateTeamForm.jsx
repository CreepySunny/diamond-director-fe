import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import TeamAPI from '../api/TeamAPI';

const CreateTeamForm = (user) => {
  const [teamName, setTeamName] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleInputChange = (e) => {
    setTeamName(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');

    TeamAPI.createTeam(user.sub, teamName, sessionStorage.getItem("token"))
      .then(() => {
        setSuccessMessage(`Team created successfully!`);
        setTeamName('');
      })
      .catch(error => {
        setErrorMessage(`Failed to create team: ${error.message}`);
      });
  };

  return (
    <div>
      <h2>Create New Team</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="teamName">
          <Form.Label>Team Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter team name"
            value={teamName}
            onChange={handleInputChange}
            required
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Create Team
        </Button>
      </Form>
      {errorMessage && <p className="text-danger">{errorMessage}</p>}
      {successMessage && <p className="text-success">{successMessage}</p>}
    </div>
  );
};

export default CreateTeamForm;
