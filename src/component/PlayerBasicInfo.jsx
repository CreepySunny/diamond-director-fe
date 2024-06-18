import React from 'react';
import { Card, ListGroup } from 'react-bootstrap';

const PlayerBasicInfo = ({ player }) => {
  return (
    <Card>
      <Card.Header as="h5">Basic Information</Card.Header>
      <ListGroup variant="flush">
        <ListGroup.Item><strong>Name:</strong> {player.firstName} {player.lastName}</ListGroup.Item>
        <ListGroup.Item><strong>Date of Birth:</strong> {player.dateOfBirth}</ListGroup.Item>
        <ListGroup.Item><strong>Height:</strong> {player.height} cm</ListGroup.Item>
        <ListGroup.Item><strong>Weight:</strong> {player.weight} kg</ListGroup.Item>
        <ListGroup.Item><strong>Bats:</strong> {player.handed_bats}</ListGroup.Item>
        <ListGroup.Item><strong>Throws:</strong> {player.handed_throws}</ListGroup.Item>
        <ListGroup.Item><strong>Position:</strong> {player.position}</ListGroup.Item>
      </ListGroup>
    </Card>
  );
};

export default PlayerBasicInfo;
