import React, { useState, useEffect } from 'react';
import { Button, Modal, Form, Dropdown } from 'react-bootstrap';
import CoachAPI from '../api/CoachAPI';
import TeamAPI from '../api/TeamAPI';

const TeamCoachList = ({ teamName }) => {
  const [coaches, setCoaches] = useState([]);
  const [showAddCoachModal, setShowAddCoachModal] = useState(false);
  const [availableCoaches, setAvailableCoaches] = useState([]);
  const [selectedCoach, setSelectedCoach] = useState(null);
  const token = sessionStorage.getItem('token');

  useEffect(() => {
    fetchCoachesInTeam();
    fetchCoachesWithoutTeam();
  }, [teamName]);

  const fetchCoachesInTeam = () => {
    CoachAPI.findCoachesFromTeamName(teamName, token)
      .then(response => {
        setCoaches(response.data);
      })
      .catch(error => {
        console.error('Error fetching coaches in team:', error);
      });
  };

  const fetchCoachesWithoutTeam = () => {
    CoachAPI.findCoachNoTeam(token)
      .then(response => {
        setAvailableCoaches(response.data);
      })
      .catch(error => {
        console.error('Error fetching available coaches:', error);
      });
  };

  const handleAddCoach = () => {
    if (!selectedCoach) {
      console.error('No coach selected');
      return;
    }

    TeamAPI.assignCoachToTeam(teamName, selectedCoach.id, token)
      .then(response => {
        if (response.exception) {
          console.error('Error assigning coach to team:', response.exception);
        } else {
          fetchCoachesInTeam();
          handleCloseAddCoachModal();
        }
      })
      .catch(error => {
        console.error('Error assigning coach to team:', error);
      });
  };

  const handleSelectCoach = (coach) => {
    setSelectedCoach(coach);
  };

  const handleCloseAddCoachModal = () => {
    setShowAddCoachModal(false);
    setSelectedCoach(null);
  };
  const handleShowAddCoachModal = () => setShowAddCoachModal(true);

  return (
    <div>
      <h2>Coaches in Team</h2>
      <ul>
        {coaches.map(coach => (
          <li key={coach.id}>{coach.firstName} {coach.lastName}</li>
        ))}
      </ul>
      
      <Button variant="primary" onClick={handleShowAddCoachModal}>
        Add Coach
      </Button>

      <Modal show={showAddCoachModal} onHide={handleCloseAddCoachModal}>
        <Modal.Header closeButton>
          <Modal.Title>Add Coach to Team</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group controlId="selectCoach">
            <Form.Label>Select Coach:</Form.Label>
            <Dropdown>
              <Dropdown.Toggle variant="success" id="dropdown-basic">
                {selectedCoach ? `${selectedCoach.firstName} ${selectedCoach.lastName}` : 'Select Coach'}
              </Dropdown.Toggle>
              <Dropdown.Menu>
                {availableCoaches.map(coach => (
                  <Dropdown.Item key={coach.id} onClick={() => handleSelectCoach(coach)}>
                    {coach.firstName} {coach.lastName}
                  </Dropdown.Item>
                ))}
              </Dropdown.Menu>
            </Dropdown>
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseAddCoachModal}>
            Close
          </Button>
          <Button variant="primary" onClick={handleAddCoach}>
            Add Coach
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default TeamCoachList;
