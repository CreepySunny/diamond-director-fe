import React from 'react';
import { ListGroup } from 'react-bootstrap';
import styles from './LineupCard.Module.css';

function LineupCard({ teamName, battingOrder, benchPlayers }) {
  return (
    <div className={styles.LineupCard}>
      <h3>{teamName}</h3>

      <div className={styles.battingOrder}>
        <h4>Batting Order</h4>
        <ListGroup>
          {battingOrder.map((player, index) => (
            <ListGroup.Item key={index}>
              {player.jerseyNumber} - {player.name} ({player.position})
            </ListGroup.Item>
          ))}
        </ListGroup>
      </div>

      <div className={styles.benchPlayers}>
        <h4>Bench Players</h4>
        <ListGroup>
          {benchPlayers.map((player, index) => (
            <ListGroup.Item key={index}>
              {player.jerseyNumber} - {player.name}
            </ListGroup.Item>
          ))}
        </ListGroup>
      </div>
    </div>
  );
}

export default LineupCard;
