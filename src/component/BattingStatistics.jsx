import React from 'react';
import { Card, ListGroup } from 'react-bootstrap';

const BattingStatistics = ({ battingStats }) => {
  return (
    <Card>
      <Card.Header as="h5">Batting Statistics</Card.Header>
      <ListGroup variant="flush">
        <ListGroup.Item><strong>Hits:</strong> {battingStats.hits}</ListGroup.Item>
        <ListGroup.Item><strong>Walks:</strong> {battingStats.walks}</ListGroup.Item>
        <ListGroup.Item><strong>Singles:</strong> {battingStats.singles}</ListGroup.Item>
        <ListGroup.Item><strong>Doubles:</strong> {battingStats.doubles}</ListGroup.Item>
        <ListGroup.Item><strong>Triples:</strong> {battingStats.triples}</ListGroup.Item>
        <ListGroup.Item><strong>Home Runs:</strong> {battingStats.homeRuns}</ListGroup.Item>
        <ListGroup.Item><strong>Outs:</strong> {battingStats.outs}</ListGroup.Item>
        <ListGroup.Item><strong>Batting Average:</strong> {battingStats.battingAverage}</ListGroup.Item>
        <ListGroup.Item><strong>On-Base Percentage:</strong> {battingStats.onBasePercentage}</ListGroup.Item>
        <ListGroup.Item><strong>Slugging Percentage:</strong> {battingStats.sluggingPercentage}</ListGroup.Item>
        <ListGroup.Item><strong>On-Base + Slugging (OPS):</strong> {battingStats.onBasePlusSlugging}</ListGroup.Item>
        <ListGroup.Item><strong>Weighted On-Base Average (wOBA):</strong> {battingStats.weightedOnBaseAverage}</ListGroup.Item>
      </ListGroup>
    </Card>
  );
};

export default BattingStatistics;