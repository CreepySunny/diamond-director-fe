import React, { useState } from 'react';
import { Container, Form, Button, Alert, Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const PlayResult = {
  SINGLE: "1B",
  DOUBLE: "2B",
  TRIPLE: "3B",
  HOME_RUN: "HR",
  STRIKEOUT: "K",
  SACRIFICE_FLY: "SF",
  ERROR: "E",
  GROUNDOUT: "GO",
  FLYOUT: "FO",
  LINEOUT: "LO",
  POP_OUT: "PO",
  FIELDERS_CHOICE: "FC",
  WALK: "BB",
  NON_INTENTIONAL_WALK: "NIBB",
  INTENTIONAL_WALK: "IBB",
  HIT_BY_PITCH: "HBP"
};

const ScoreKeeper = () => {
  const [batter, setBatter] = useState('');
  const [pitcher, setPitcher] = useState('');
  const [inning, setInning] = useState('');
  const [half, setHalf] = useState('top');
  const [playType, setPlayType] = useState('');
  const [playDetail, setPlayDetail] = useState('');
  const [positions, setPositions] = useState('');

  const handlePlayTypeClick = (type) => {
    setPlayType(type);
    setPlayDetail('');
  };

  const handlePlayDetailClick = (detail) => {
    setPlayDetail(PlayResult[detail]);
  };

  return (
    <Container>
      <h2>Baseball Scorekeeper</h2>
      
      <Form.Group className="mb-3">
        <Form.Label>Select Batter</Form.Label>
        <Form.Control
          as="select"
          value={batter}
          onChange={(e) => setBatter(e.target.value)}
        >
          <option value="">Select a Batter</option>
          <option value="batter1">Batter 1</option>
          <option value="batter2">Batter 2</option>
          {/* Add more batters as needed */}
        </Form.Control>
      </Form.Group>

      {/* Pitcher Dropdown */}
      <Form.Group className="mb-3">
        <Form.Label>Select Pitcher</Form.Label>
        <Form.Control
          as="select"
          value={pitcher}
          onChange={(e) => setPitcher(e.target.value)}
        >
          <option value="">Select a Pitcher</option>
          <option value="pitcher1">Pitcher 1</option>
          <option value="pitcher2">Pitcher 2</option>
          {/* Add more pitchers as needed */}
        </Form.Control>
      </Form.Group>

      {/* Inning and Half Inputs */}
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
            value="top"
            checked={half === 'top'}
            onChange={(e) => setHalf(e.target.value)}
          />
          <Form.Check
            inline
            label="Bottom"
            type="radio"
            name="halfOptions"
            id="bottomHalf"
            value="bottom"
            checked={half === 'bottom'}
            onChange={(e) => setHalf(e.target.value)}
          />
        </div>
      </Form.Group>

      {/* Play Outcome Buttons */}
      <Form.Group className="mb-3">
        <Form.Label>Play Outcome</Form.Label>
        <div>
          <Button variant="primary" className="me-2" onClick={() => handlePlayTypeClick('hit')}>Hit</Button>
          <Button variant="primary" className="me-2" onClick={() => handlePlayTypeClick('walk')}>Walk</Button>
          <Button variant="primary" onClick={() => handlePlayTypeClick('out')}>Out</Button>
        </div>
      </Form.Group>

      {/* Detailed Play Options */}
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

      {/* Positions Input */}
      <Form.Group className="mb-3">
        <Form.Label>Positions Touched</Form.Label>
        <Form.Control
          type="text"
          value={positions}
          onChange={(e) => setPositions(e.target.value)}
          placeholder="e.g., 1B, 2B, SS, OF"
        />
      </Form.Group>

      {/* Display selected play result */}
      {playDetail && (
        <Alert variant="info">
          Selected Play: {playDetail}
        </Alert>
      )}
    </Container>
  );
};

export default ScoreKeeper;
