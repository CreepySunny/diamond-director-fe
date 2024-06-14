import React, { useState, useEffect } from 'react';
import { Button, Modal, Form, Dropdown } from 'react-bootstrap';
import CoachAPI from '../api/CoachAPI'; // Ensure path is correct
import TeamAPI from '../api/TeamAPI'; // Ensure path is correct

const TeamCoachList = ({ teamName, token }) => {
  const [coaches, setCoaches] = useState([]);
  const [showAddCoachModal, setShowAddCoachModal] = useState(false);
  const [availableCoaches, setAvailableCoaches] = useState([]);

  useEffect(() => {
    fetchCoachesInTeam();
    fetchCoachesWithoutTeam();
  }, []);

  const fetchCoachesInTeam = () => {
    CoachAPI.findCoachesFromTeamName(teamName, token)
      .then(response => {
        if (response.exception) {
          console.error('Error fetching coaches:', response.exception);
        } else {
          setCoaches(response.coaches);
        }
      });
  };

  const fetchCoachesWithoutTeam = () => {
    CoachAPI.findCoachNoTeam(token)
      .then(response => {
        if (response.exception) {
          console.error('Error fetching available coaches:', response.exception);
        } else {
          setAvailableCoaches(response.coaches);
        }
      });
  };

  const handleAddCoach = (coachId) => {
    TeamAPI.assignCoachToTeam(teamName, coachId, token)
      .then(response => {
        if (response.exception) {
          console.error('Error assigning coach to team:', response.exception);
        } else {
          fetchCoachesInTeam();
        }
      })
      .catch(error => {
        console.error('Error assigning coach to team:', error);
      });
    handleCloseAddCoachModal();
  };
  const handleCloseAddCoachModal = () => setShowAddCoachModal(false);
  const handleShowAddCoachModal = () => setShowAddCoachModal(true);

  return (
    <div>
      <h2>Coaches in Team</h2>
      <ul>
        {coaches.map(coach => (
          <li key={coach.id}>{coach.name}</li>
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
                Select Coach
              </Dropdown.Toggle>
              <Dropdown.Menu>
                {availableCoaches.map(coach => (
                  <Dropdown.Item key={coach.id} onSelect={() => handleAddCoach(coach.id)}>
                    {coach.name}
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
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default TeamCoachList;
