import React, { useState, useEffect } from 'react';
import { Container, Form, Button, Alert, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import GameAPI from '../api/GameAPI';

import PlayResult from '../Const/PlayResult';
import PlayerPosition from '../Const/PlayerPosition';

const ScoreKeeper = ({ game, onClose }) => {
  const [batter, setBatter] = useState('');
  const [pitcher, setPitcher] = useState('');
  const [inning, setInning] = useState('');
  const [half, setHalf] = useState('TOP');
  const [playType, setPlayType] = useState('');
  const [playDetail, setPlayDetail] = useState('');
  const [selectedPositions, setSelectedPositions] = useState([]);
  const [gameDetails, setGameDetails] = useState(null);
  const [players, setPlayers] = useState([]);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    if (game.gameId) {
      const token = sessionStorage.getItem('token');
      GameAPI.getGameByGameId(game.gameId, token)
        .then(response => {
          setGameDetails(response.data);
        })
        .catch(error => {
          console.error('Error fetching game details:', error);
        });
      GameAPI.getAllPlayersFromGameId(game.gameId, token)
        .then(response => {
          setPlayers(response.data);
        })
        .catch(error => {
          console.error('Error fetching players:', error);
        });
    }
  }, [game]);

  const handlePlayTypeClick = (type) => {
    setPlayType(type);
    setPlayDetail('');
  };

  const handlePlayDetailClick = (detail) => {
    setPlayDetail(PlayResult[detail]);
  };

  const handlePositionChange = (position) => {
    setSelectedPositions((prevPositions) => {
      if (prevPositions.includes(position)) {
        return prevPositions.filter(pos => pos !== position);
      } else {
        return [...prevPositions, position];
      }
    });
  };

  const handleSubmitScore = () => {
    const token = sessionStorage.getItem('token');
    const scoreRequest = {
      inning: parseInt(inning),
      half,
      gameId: game.gameId,
      batterId: parseInt(batter),
      pitcherId: parseInt(pitcher),
      playShorthand: playDetail,
      fieldersPositions: selectedPositions
    };

    GameAPI.addNewGameScore(scoreRequest, token)
      .then(response => {
        console.log(response.data);
        setSuccessMessage('Score updated successfully!');
      })
      .catch(error => {
        console.error('Error updating score:', error);
        setError('Error updating score.');
      });
  };

  const isFormValid = () => {
    return (
      inning &&
      half &&
      game.gameId &&
      batter &&
      pitcher &&
      playDetail &&
      selectedPositions.length > 0
    );
  };

  return (
    <Container>
      <h2>Baseball Scorekeeper</h2>

      {gameDetails && (
        <div>
          <h3>Game Details</h3>
          <p>Season: {gameDetails.season}</p>
          <p>Home Team: {gameDetails.homeTeamName}</p>
          <p>Away Team: {gameDetails.awayTeamName}</p>
        </div>
      )}

      <Form.Group className="mb-3">
        <Form.Label>Select Batter</Form.Label>
        <Form.Control
          as="select"
          value={batter}
          onChange={(e) => setBatter(e.target.value)}
        >
          <option value="">Select a Batter</option>
          {players.map(player => (
            <option key={player.id} value={player.id}>
              {player.position}: {player.firstName} {player.lastName}
            </option>
          ))}
        </Form.Control>
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Select Pitcher</Form.Label>
        <Form.Control
          as="select"
          value={pitcher}
          onChange={(e) => setPitcher(e.target.value)}
        >
          <option value="">Select a Pitcher</option>
          {players.map(player => (
            <option key={player.id} value={player.id}>
              {player.position}: {player.firstName} {player.lastName}
            </option>
          ))}
        </Form.Control>
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Inning</Form.Label>
        <Form.Control
          type="number"
          value={inning}
          onChange={(e) => setInning(e.target.value)}
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Half</Form.Label>
        <div>
          <Form.Check
            inline
            label="Top"
            type="radio"
            name="halfOptions"
            id="topHalf"
            value="TOP"
            checked={half === 'TOP'}
            onChange={(e) => setHalf(e.target.value)}
          />
          <Form.Check
            inline
            label="Bottom"
            type="radio"
            name="halfOptions"
            id="bottomHalf"
            value="BOTTOM"
            checked={half === 'BOTTOM'}
            onChange={(e) => setHalf(e.target.value)}
          />
        </div>
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Play Outcome</Form.Label>
        <div>
          <Button variant="primary" className="me-2" onClick={() => handlePlayTypeClick('hit')}>Hit</Button>
          <Button variant="primary" className="me-2" onClick={() => handlePlayTypeClick('walk')}>Walk</Button>
          <Button variant="primary" onClick={() => handlePlayTypeClick('out')}>Out</Button>
        </div>
      </Form.Group>

      {playType && (
        <Form.Group className="mb-3">
          <Form.Label>Detailed Play</Form.Label>
          <div>
            {playType === 'hit' && (
              <>
                <Button variant="secondary" className="me-2" onClick={() => handlePlayDetailClick('SINGLE')}>Single</Button>
                <Button variant="secondary" className="me-2" onClick={() => handlePlayDetailClick('DOUBLE')}>Double</Button>
                <Button variant="secondary" className="me-2" onClick={() => handlePlayDetailClick('TRIPLE')}>Triple</Button>
                <Button variant="secondary" onClick={() => handlePlayDetailClick('HOME_RUN')}>Home Run</Button>
              </>
            )}
            {playType === 'walk' && (
              <>
                <Button variant="secondary" className="me-2" onClick={() => handlePlayDetailClick('WALK')}>Walk</Button>
                <Button variant="secondary" className="me-2" onClick={() => handlePlayDetailClick('NON_INTENTIONAL_WALK')}>Non-Intentional Walk</Button>
                <Button variant="secondary" onClick={() => handlePlayDetailClick('INTENTIONAL_WALK')}>Intentional Walk</Button>
              </>
            )}
            {playType === 'out' && (
              <>
                <Button variant="secondary" className="me-2" onClick={() => handlePlayDetailClick('STRIKEOUT')}>Strikeout</Button>
                <Button variant="secondary" className="me-2" onClick={() => handlePlayDetailClick('SACRIFICE_FLY')}>Sacrifice Fly</Button>
                <Button variant="secondary" className="me-2" onClick={() => handlePlayDetailClick('ERROR')}>Error</Button>
                <Button variant="secondary" className="me-2" onClick={() => handlePlayDetailClick('GROUNDOUT')}>Groundout</Button>
                <Button variant="secondary" className="me-2" onClick={() => handlePlayDetailClick('FLYOUT')}>Flyout</Button>
                <Button variant="secondary" className="me-2" onClick={() => handlePlayDetailClick('LINEOUT')}>Lineout</Button>
                <Button variant="secondary" className="me-2" onClick={() => handlePlayDetailClick('POP_OUT')}>Pop Out</Button>
                <Button variant="secondary" onClick={() => handlePlayDetailClick('FIELDERS_CHOICE')}>Fielder's Choice</Button>
              </>
            )}
          </div>
        </Form.Group>
      )}

      <Form.Group className="mb-3">
        <Form.Label>Positions Touched</Form.Label>
        {PlayerPosition.map(position => (
          <Form.Check
            type="checkbox"
            key={position}
            label={position.replace('_', ' ')}
            value={position}
            checked={selectedPositions.includes(position)}
            onChange={() => handlePositionChange(position)}
          />
        ))}
      </Form.Group>

      {playDetail && (
        <Alert variant="info">
          Selected Play: {playDetail}
        </Alert>
      )}

      {error && (
        <Alert variant="danger">
          {error}
        </Alert>
      )}

      {successMessage && (
        <Alert variant="success">
          {successMessage}
        </Alert>
      )}

      {isFormValid() && (
        <Button variant="success" onClick={handleSubmitScore}>
          Submit Score
        </Button>
      )}

      <Button variant="danger" onClick={onClose} className="mt-3">
        Close ScoreKeeper
      </Button>
    </Container>
  );
};

export default ScoreKeeper;