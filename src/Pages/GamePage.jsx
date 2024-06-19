import React, { useState, useEffect, useContext } from 'react';
import { Button, Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import NavigationBar from '../component/Navbar';
import GameList from '../component/GameList';
import CreateGameForm from '../component/CreateGameForm';
import GameAPI from '../api/GameAPI';
import AuthContext from '../Auth/AuthContext';
import ScoreKeeper from '../component/ScoreKeeper';

function GamePage() {
    const { user } = useContext(AuthContext);
    const [games, setGames] = useState([]);
    const [selectedGame, setSelectedGame] = useState(null);
    const [showCreateForm, setShowCreateForm] = useState(false);
    const [showScoreKeeper, setShowScoreKeeper] = useState(false);
    const token = sessionStorage.getItem('token');

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
        setShowScoreKeeper(true);
    };

    const handleCloseScoreKeeper = () => {
        setSelectedGame(null);
        setShowScoreKeeper(false);
    };

    return (
      <>
      <NavigationBar />
        <Container>
            <Col md={4}>
                <Button as={Link} to="/coach-dashboard" variant="secondary" className="mb-3">
                    Back to Coach Dashboard
                </Button>
            </Col>
            <Row>
                <Col md={selectedGame || showScoreKeeper ? 4 : 8}>
                    {games.length > 0 && !selectedGame && !showScoreKeeper && (
                        <GameList games={games} onCreateGame={handleCreateGame} onSelectGame={handleSelectGame} />
                    )}
                    {games.length === 0 && (
                        <Button variant="primary" onClick={() => setShowCreateForm(true)} className="mt-3">
                            Create Game
                        </Button>
                    )}
                </Col>
                {(selectedGame || showScoreKeeper) && (
                    <>
                        {!showScoreKeeper && (
                            <Col md={4}>
                                {showCreateForm && <CreateGameForm onCreateGame={handleCreateGame} />}
                            </Col>
                        )}
                    </>
                )}
                {selectedGame && showScoreKeeper && (
                    <Col md={8}>
                        <ScoreKeeper game={selectedGame} onClose={handleCloseScoreKeeper} />
                    </Col>
                )}
            </Row>
        </Container>
        </>
    );
}

export default GamePage;