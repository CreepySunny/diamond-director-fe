import React from 'react';
import { Button, ListGroup } from 'react-bootstrap';

const GameList = ({ games, onCreateGame, onSelectGame }) => {
  return (
    <div>
      <h2>Game List</h2>
      <Button variant="primary" onClick={() => onCreateGame({ season: '2024', homeTeamName: 'Team A', awayTeamName: 'Team B' })}>
        Create Game
      </Button>
      <ListGroup>
        {games.map((game, index) => (
          <ListGroup.Item key={index} action onClick={() => onSelectGame(game)}>
            {game.homeTeamName} vs {game.awayTeamName} - Season {game.season}
          </ListGroup.Item>
        ))}
      </ListGroup>
    </div>
  );
};

export default GameList;
