import React, { useState, useEffect, useContext } from 'react';
import { Card, Form, Dropdown, DropdownButton } from 'react-bootstrap';
import { Pie } from 'react-chartjs-2';
import PlayerAPI from '../api/PlayerAPI';
import AuthContext from '../Auth/AuthContext';

const PlayerPerFieldPositionStatisticsPitcher = ({ positions }) => {
  const [selectedPosition, setSelectedPosition] = useState(null);
  const [loading, setLoading] = useState(false);
  const [pitchingStats, setPitchingStats] = useState(null);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    if (selectedPosition) {
      fetchPitchingStats(selectedPosition);
    }
  }, [selectedPosition]);

  const fetchPitchingStats = async (position) => {
    setLoading(true);
    try {
      const response = await PlayerAPI.getFieldPositionSpecificPitchingStats(
        user.userId,
        position,
        sessionStorage.getItem('token')
      );
      setPitchingStats(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching pitching stats:', error);
      setLoading(false);
    }
  };

  const handlePositionSelect = (position) => {
    setSelectedPosition(position);
  };

  const renderPieChart = () => {
    if (!statistics || !statistics.percentageToPlayerPosition) {
      return null;
    }

    const data = {
      labels: ['Percentage of Plays to field position', 'Rest'],
      datasets: [
        {
          label: 'Percentage of Plays to field position',
          data: [statistics.percentageToPlayerPosition, 100 - statistics.percentageToPlayerPosition],
          backgroundColor: ['#36A2EB', '#FF6384'],
          hoverBackgroundColor: ['#36A2EB', '#FF6384'],
        },
      ],
    };

    return <Pie data={data} />;
  };

  return (
    <Card>
      <Card.Header as="h5">Field Position Statistics (Pitcher)</Card.Header>
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
            {pitchingStats && (
              <>
                <div className="mb-3">
                  <strong>Position:</strong> {pitchingStats.position}
                </div>
                <div className="mb-3">
                  <strong>BABIP:</strong> {pitchingStats.babip}
                </div>
                <div className="mb-3">
                  <strong>FIP:</strong> {pitchingStats.fip}
                </div>
                <div className="mb-3">
                  <strong>WHIP:</strong> {pitchingStats.whip}
                </div>
                <div className="mb-3">
                  <strong>K9:</strong> {pitchingStats.k9}
                </div>
                <div className="mb-3">
                  <strong>BB9:</strong> {pitchingStats.bb9}
                </div>
                <div className="mb-3">
                  <strong>HR9:</strong> {pitchingStats.hr9}
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

export default PlayerPerFieldPositionStatisticsPitcher;