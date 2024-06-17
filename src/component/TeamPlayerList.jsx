import React, { useState, useEffect } from 'react';
import { Button, Modal, Form, Dropdown } from 'react-bootstrap';
import TeamAPI from '../api/TeamAPI';
import PlayerAPI from '../api/PlayerAPI';

const TeamPlayerList = ({ teamName }) => {
  const [Players, setPlayers] = useState([]);
  const [showAddPlayerModal, setShowAddPlayerModal] = useState(false);
  const [availablePlayers, setAvailablePlayers] = useState([]);
  const [selectedPlayer, setselectedPlayer] = useState(null);
  const token = sessionStorage.getItem('token');

  useEffect(() => {
    fetchPlayersInTeam();
    fetchPlayersWithoutTeam();
  }, [teamName]);

  const fetchPlayersInTeam = () => {
    PlayerAPI.findPlayersFromTeamName(teamName, token)
      .then(response => {
        setPlayers(response.data);
      })
      .catch(error => {
        console.error('Error fetching Players in team:', error);
      });
  };

  const fetchPlayersWithoutTeam = () => {
    PlayerAPI.findPlayersNoTeam(token)
      .then(response => {
        setAvailablePlayers(response.data);
      })
      .catch(error => {
        console.error('Error fetching available Players:', error);
      });
  };

  const handleAddPlayer = () => {
    if (!selectedPlayer) {
      console.error('No Player selected');
      return;
    }

    TeamAPI.assignPlayerToTeam(teamName, selectedPlayer.id, token)
      .then(() => {
          fetchPlayersInTeam();
          handleCloseAddPlayerModal();
      })
      .catch(error => {
        console.error('Error assigning Player to team:', error);
      });
  };

  const handleSelectPlayer = (player) => {
    setselectedPlayer(player);
  };

  const handleCloseAddPlayerModal = () => {
    setShowAddPlayerModal(false);
    setselectedPlayer(null);
  };
  const handleShowAddPlayerModal = () => setShowAddPlayerModal(true);

  return (
    <div>
      <h2>Players in Team</h2>
      <ul>
        {Players.map(player => (
          <li key={player.id}>{player.firstName} {player.lastName}</li>
        ))}
      </ul>
      
      <Button variant="primary" onClick={handleShowAddPlayerModal}>
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
