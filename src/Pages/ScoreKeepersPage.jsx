import React, { useState, useEffect } from 'react';
import { jwtDecode } from "jwt-decode";
import axios from 'axios';
import ScoreKeeper from '../component/ScoreKeeper';
import NavigationBar from '../component/Navbar';
import GameList from '../component/GameList';
import CreateGameForm from '../component/CreateGameForm';
import GameAPI from '../api/GameAPI';

function ScoreKeepersPage() {
  const [games, setGames] = useState([]);
  const [selectedGame, setSelectedGame] = useState(null);

  useEffect(() => {
    const token = sessionStorage.getItem('token');
    if (token) {
      const decodedToken = jwtDecode(token);
      const userId = decodedToken.userId;
      fetchGames(userId);
    }
  }, []);

  const fetchGames = async (userId) => {
    try {
      const response = await axios.get(`http://localhost:8080/game/${userId}/all`, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem('token')}`,
        },
      });
      setGames(response.data);
    } catch (error) {
      console.error('Error fetching games:', error);
    }
  };

  const handleCreateGame = async (newGame) => {
    try {
      const response = await GameAPI.createGame(newGame);
      const createdGame = { ...newGame, gameId: response.data };
      setGames([...games, createdGame]);
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
      <h1>Baseball Scorekeeping App</h1>
      <div className="row">
        <div className="col">
          <GameList games={games} onCreateGame={handleCreateGame} onSelectGame={handleSelectGame} />
        </div>
        <div className="col">
          <CreateGameForm onCreateGame={handleCreateGame} />
        </div>
        <div className="col">
          {selectedGame && <ScoreKeeper game={selectedGame} />}
        </div>
      </div>
    </div>
  );
}

export default ScoreKeepersPage;