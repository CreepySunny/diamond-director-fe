import React, { useState, useEffect, useContext } from 'react';
import { Card, Form, Dropdown, DropdownButton } from 'react-bootstrap';
import { Pie } from 'react-chartjs-2';
import PlayerAPI from '../api/PlayerAPI';
import AuthContext from '../Auth/AuthContext';

const PlayerPerFieldPositionStatisticsBatter = ({ positions }) => {
  const [selectedPosition, setSelectedPosition] = useState(null);
  const [loading, setLoading] = useState(false);
  const [batterStats, setBatterStats] = useState(null);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    if (selectedPosition) {
      fetchBatterStats(selectedPosition);
    }
  }, [selectedPosition]);

  const fetchBatterStats = async (position) => {
    setLoading(true);
    try {
      const response = await PlayerAPI.getFieldPositionSpecificBattingStats(
        user.userId,
        position,
        sessionStorage.getItem('token')
      );
      setBatterStats(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching batter stats:', error);
      setLoading(false);
    }
  };

  const handlePositionSelect = (position) => {
    setSelectedPosition(position);
  };

  const renderPieChart = () => {
    if (!batterStats || !batterStats.percentageToPlayerPosition) {
      return null;
    }

    const data = {
      labels: ['Percentage to Player Position', 'Rest'],
      datasets: [
        {
          data: [batterStats.percentageToPlayerPosition, 100 - batterStats.percentageToPlayerPosition],
          backgroundColor: ['#36A2EB', '#FF6384'],
          hoverBackgroundColor: ['#36A2EB', '#FF6384'],
        },
      ],
    };

    return <Pie data={data} />;
  };

  return (
    <Card>
      <Card.Header as="h5">Field Position Statistics (Batter)</Card.Header>
      <Card.Body>
        <Form.Group controlId="selectPosition">
          <Form.Label>Select Position</Form.Label>
          <DropdownButton
            variant="secondary"
            title={selectedPosition ? selectedPosition : 'Select Position'}
            onSelect={handlePositionSelect}
          >
            {positions.map((position, index) => (
              <Dropdown.Item key={index} eventKey={position}>
                {position}
              </Dropdown.Item>
            ))}
          </DropdownButton>
        </Form.Group>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <>
            {batterStats && (
              <>
                <div className="mb-3">
                  <strong>Position:</strong> {batterStats.position}
                </div>
                <div className="mb-3">
                  <strong>Batting Average:</strong> {batterStats.battingAverage}
                </div>
                <div className="mb-3">
                  <strong>On Base Percentage:</strong> {batterStats.onBasePercentage}
                </div>
                <div className="mb-3">
                  <strong>Slugging Percentage:</strong> {batterStats.sluggingPercentage}
                </div>
                <div className="mb-3">
                  <strong>On Base Plus Slugging:</strong> {batterStats.onBasePlusSlugging}
                </div>
                <div className="mb-3">
                  <strong>Weighted On Base Average:</strong> {batterStats.weightedOnBaseAverage}
                </div>
                <div style={{ height: '300px' }}>
                  <strong>Percentage to Player Position:</strong>
                  {renderPieChart()}
                </div>
              </>
            )}
          </>
        )}
      </Card.Body>
    </Card>
  );
};

export default PlayerPerFieldPositionStatisticsBatter;