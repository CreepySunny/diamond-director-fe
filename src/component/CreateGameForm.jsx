import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';

const CreateGameForm = ({ onCreateGame }) => {
  const [season, setSeason] = useState('');
  const [homeTeamName, setHomeTeamName] = useState('');
  const [awayTeamName, setAwayTeamName] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onCreateGame({ season, homeTeamName, awayTeamName });
    setSeason('');
    setHomeTeamName('');
    setAwayTeamName('');
  };

  return (
    <div>
      <h2>Create Game</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="season">
          <Form.Label>Season</Form.Label>
          <Form.Control
            type="text"
            value={season}
            onChange={(e) => setSeason(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group controlId="homeTeamName">
          <Form.Label>Home Team Name</Form.Label>
          <Form.Control
            type="text"
            value={homeTeamName}
            onChange={(e) => setHomeTeamName(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group controlId="awayTeamName">
          <Form.Label>Away Team Name</Form.Label>
          <Form.Control
            type="text"
            value={awayTeamName}
            onChange={(e) => setAwayTeamName(e.target.value)}
            required
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Create
        </Button>
      </Form>
    </div>
  );
};

export default CreateGameForm;
