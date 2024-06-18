import React, { useContext, useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import TeamAPI from '../api/TeamAPI';
import AuthContext from '../Auth/AuthContext';

const CreateTeamForm = () => {
  const [teamNameState, setteamNameState] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const { user } = useContext(AuthContext);

  const handleInputChange = (e) => {
    setteamNameState(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');

    console.log(user);

    const newTeam = {
      createCoachUserEmail: user.sub,
      teamName: teamNameState
    };

    TeamAPI.createTeam(newTeam, sessionStorage.getItem("token"))
      .then(() => {
        setSuccessMessage(`Team created successfully!`);
        setteamNameState('');
      })
      .catch(error => {
        setErrorMessage(`Failed to create team: ${error.message}`);
      });
  };

  return (
    <div>
      <h2>Create New Team</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="teamNameState">
          <Form.Label>Team Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter team name"
            value={teamNameState}
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