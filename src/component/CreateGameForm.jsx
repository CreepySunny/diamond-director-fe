import React, { useState, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';
import TeamAPI from '../api/TeamAPI';

const CreateGameForm = ({ onCreateGame }) => {
  const [season, setSeason] = useState('');
  const [homeTeamName, setHomeTeamName] = useState('');
  const [awayTeamName, setAwayTeamName] = useState('');
  const [teams, setTeams] = useState([]);

  useEffect(() => {
    const token = sessionStorage.getItem('token');
    if (token) {
      fetchTeams(token);
    }
  }, []);

  const fetchTeams = (token) => {
    TeamAPI.findAllTeams(token)
      .then(response => {
        setTeams(response.data);
      })
      .catch(error => {
        console.error('Error fetching teams:', error);
      });
  };

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
            as="select"
            value={homeTeamName}
            onChange={(e) => setHomeTeamName(e.target.value)}
            required
          >
            <option value="">Select Home Team</option>
            {teams.map(team => (
              <option key={team.teamName} value={team.teamName}>
                {team.teamName}
              </option>
            ))}
          </Form.Control>
        </Form.Group>
        <Form.Group controlId="awayTeamName">
          <Form.Label>Away Team Name</Form.Label>
          <Form.Control
            as="select"
            value={awayTeamName}
            onChange={(e) => setAwayTeamName(e.target.value)}
            required
          >
            <option value="">Select Away Team</option>
            {teams.map(team => (
              <option key={team.teamName} value={team.teamName}>
                {team.teamName}
              </option>
            ))}
          </Form.Control>
        </Form.Group>
        <Button variant="primary" type="submit">
          Create
        </Button>
      </Form>
    </div>
  );
};

export default CreateGameForm;
