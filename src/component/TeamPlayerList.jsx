import React, { useState, useEffect } from 'react';
import { Card, ListGroup, Button, Modal, Form, Dropdown } from 'react-bootstrap';
import TeamAPI from '../api/TeamAPI';
import PlayerAPI from '../api/PlayerAPI';

const TeamPlayerList = ({ teamName }) => {
  const [players, setPlayers] = useState([]);
  const [showAddPlayerModal, setShowAddPlayerModal] = useState(false);
  const [availablePlayers, setAvailablePlayers] = useState([]);
  const [selectedPlayer, setSelectedPlayer] = useState(null);
  const token = sessionStorage.getItem('token');

  useEffect(() => {
    fetchPlayersInTeam();
    fetchPlayersWithoutTeam();
  }, [teamName]);

  const fetchPlayersInTeam = () => {
    PlayerAPI.getPlayersFromTeamName(teamName, token)
      .then(response => {
        setPlayers(response.data);
      })
      .catch(error => {
        console.error('Error fetching players in team:', error);
      });
  };

  const fetchPlayersWithoutTeam = () => {
    PlayerAPI.getAllPlayersWithNoTeam(token)
      .then(response => {
        setAvailablePlayers(response.data);
      })
      .catch(error => {
        console.error('Error fetching available players:', error);
      });
  };

  const handleAddPlayer = () => {
    if (!selectedPlayer) {
      console.error('No player selected');
      return;
    }

    TeamAPI.assignPlayerToTeam(teamName, selectedPlayer.id, token)
      .then(() => {
        fetchPlayersInTeam();
        handleCloseAddPlayerModal();
      })
      .catch(error => {
        console.error('Error assigning player to team:', error);
      });
  };

  const handleSelectPlayer = (player) => {
    setSelectedPlayer(player);
  };

  const handleCloseAddPlayerModal = () => {
    setShowAddPlayerModal(false);
    setSelectedPlayer(null);
  };

  const handleShowAddPlayerModal = () => setShowAddPlayerModal(true);

  return (
    <div className="mt-4">
      <Card>
        <Card.Header as="h5">Players in Team</Card.Header>
        <ListGroup variant="flush">
          {players.map(player => (
            <ListGroup.Item key={player.id}>
              {player.position} - {player.firstName} {player.lastName}
            </ListGroup.Item>
          ))}
        </ListGroup>
      </Card>
      
      <Button variant="primary" className="mt-3" onClick={handleShowAddPlayerModal}>
        Add Player
      </Button>

      <Modal show={showAddPlayerModal} onHide={handleCloseAddPlayerModal}>
        <Modal.Header closeButton>
          <Modal.Title>Add Player to Team</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group controlId="selectPlayer">
            <Form.Label>Select Player:</Form.Label>
            <Dropdown>
              <Dropdown.Toggle variant="success" id="dropdown-basic">
                {selectedPlayer ? `${selectedPlayer.firstName} ${selectedPlayer.lastName}` : 'Select Player'}
              </Dropdown.Toggle>
              <Dropdown.Menu>
                {availablePlayers.map(player => (
                  <Dropdown.Item key={player.id} onClick={() => handleSelectPlayer(player)}>
                    {player.firstName} {player.lastName}
                  </Dropdown.Item>
                ))}
              </Dropdown.Menu>
            </Dropdown>
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseAddPlayerModal}>
            Close
          </Button>
          <Button variant="primary" onClick={handleAddPlayer}>
            Add Player
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default TeamPlayerList;