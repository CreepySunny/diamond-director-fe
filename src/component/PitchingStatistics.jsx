import React from 'react';
import { Card, ListGroup } from 'react-bootstrap';

const PitchingStatistics = ({ pitchingStats }) => {
  return (
    <Card>
      <Card.Header as="h5">Pitching Statistics</Card.Header>
      <ListGroup variant="flush">
        <ListGroup.Item><strong>Hits Allowed:</strong> {pitchingStats.hits}</ListGroup.Item>
        <ListGroup.Item><strong>Walks Allowed:</strong> {pitchingStats.walks}</ListGroup.Item>
        <ListGroup.Item><strong>Singles Allowed:</strong> {pitchingStats.singles}</ListGroup.Item>
        <ListGroup.Item><strong>Doubles Allowed:</strong> {pitchingStats.doubles}</ListGroup.Item>
        <ListGroup.Item><strong>Triples Allowed:</strong> {pitchingStats.triples}</ListGroup.Item>
        <ListGroup.Item><strong>Home Runs Allowed:</strong> {pitchingStats.homeRuns}</ListGroup.Item>
        <ListGroup.Item><strong>Outs Recorded:</strong> {pitchingStats.outs}</ListGroup.Item>
        <ListGroup.Item><strong>ERA:</strong> {pitchingStats.era}</ListGroup.Item>
        <ListGroup.Item><strong>WHIP:</strong> {pitchingStats.whip}</ListGroup.Item>
        <ListGroup.Item><strong>Strikeouts (K):</strong> {pitchingStats.strikeouts}</ListGroup.Item>
        <ListGroup.Item><strong>Walks + Hits per Inning Pitched (WHIP):</strong> {pitchingStats.whip}</ListGroup.Item>
      </ListGroup>
    </Card>
  );
};

export default PitchingStatistics;
