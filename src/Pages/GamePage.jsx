import React, { useState, useEffect, useContext } from 'react';
import { jwtDecode } from 'jwt-decode';
import ScoreKeeper from '../component/ScoreKeeper';
import NavigationBar from '../component/Navbar';
import GameList from '../component/GameList';
import CreateGameForm from '../component/CreateGameForm';
import GameAPI from '../api/GameAPI';
import { Button } from 'react-bootstrap';
import AuthContext from '../Auth/AuthContext';

function GamePage() {
  const { user } = useContext(AuthContext);
  const [games, setGames] = useState([]);
  const [selectedGame, setSelectedGame] = useState(null);
  const [showCreateForm, setShowCreateForm] = useState(false);

  useEffect(() => {
      fetchGames(user.sub, token);
  }, []);

  const fetchGames = (userEmail, token) => {
    GameAPI.getAllGamesFromUserEmail(userEmail, token)
      .then(response => {
        setGames(response.data);
      })
      .catch(error => {
        console.error('Error fetching games:', error);
      });
  };

  const handleCreateGame = async (newGame) => {
    try {
      const token = sessionStorage.getItem('token');
      const response = await GameAPI.createGame(newGame, token);
      const createdGame = { ...newGame, gameId: response.data };
      setGames([...games, createdGame]);
      setShowCreateForm(false);
    } catch (error) {
      console.error('Error creating game:', error);
    }
  };

  const handleSelectGame = (game) => {
    setSelectedGame(game);
  };

  return (
    <div className="container">
      <NavigationBar />
      <h1>Games</h1>
      <div className="row">
        <div className="col">
          {games.length > 0 && (
            <GameList games={games} onCreateGame={handleCreateGame} onSelectGame={handleSelectGame} />
          )}
          {games.length === 0 && (
            <Button variant="primary" onClick={() => setShowCreateForm(true)}>Create Game</Button>
          )}
        </div>
        <div className="col">
          {showCreateForm && <CreateGameForm onCreateGame={handleCreateGame} />}
        </div>
        <div className="col">
          {selectedGame && <ScoreKeeper game={selectedGame} />}
        </div>
      </div>
    </div>
  );
}

export default GamePage;