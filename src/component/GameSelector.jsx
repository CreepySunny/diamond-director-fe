import React, { useState, useEffect } from 'react';
import GameAPI from '../api/GameAPI';
import { Form, Button, Card, Spinner, Alert } from 'react-bootstrap';

const GameSelector = ({ onSelectGame }) => {
    const [games, setGames] = useState([]);
    const [selectedGameId, setSelectedGameId] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        GameAPI.getAllGames().then(response => {
            setGames(response.data);
            setIsLoading(false);
        }).catch(error => {
            console.error('Error fetching games:', error);
            setError('Failed to fetch games.');
            setIsLoading(false);
        });
    }, [onSelectGame]);

    const handleSelectChange = (event) => {
        setSelectedGameId(event.target.value);
    };

    const handleSelectClick = () => {
        if (selectedGameId) {
            onSelectGame(selectedGameId);
        }
    };

    if (isLoading) {
        return (
            <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
                <Spinner animation="border" variant="primary" />
                <span className="ml-2">Loading games...</span>
            </div>
        );
    }

    if (error) {
        return <Alert variant="danger">{error}</Alert>;
    }

    return (
        <Card>
            <Card.Body>
                <Form>
                    <Form.Group controlId="gameSelect">
                        <Form.Label>Select a game</Form.Label>
                        <Form.Control as="select" value={selectedGameId} onChange={handleSelectChange}>
                            <option value="">Select a game</option>
                            {games.map(game => (
                                <option key={game.gameId} value={game.gameId}>
                                    {game.season} : {game.awayTeamName} - {game.homeTeamName}
                                </option>
                            ))}
                        </Form.Control>
                    </Form.Group>
                    <Button variant="primary" onClick={handleSelectClick}>
                        Select Game
                    </Button>
                </Form>
            </Card.Body>
        </Card>
    );
};

export default GameSelector;