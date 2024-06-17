// src/components/GameSelector.js
import React, { useState, useEffect } from 'react';
import GameAPI from '../api/GameAPI';
import { Form, Button } from 'react-bootstrap';

const GameSelector = ({  onSelectGame }) => {
    const [games, setGames] = useState([]);
    const [selectedGameId, setSelectedGameId] = useState('');

    useEffect(() => {
        GameAPI.getAllGames().then(response => {
            console.log(response.data);
            setGames(response.data);
        }).catch(error => {
            console.error('Error fetching games:', error);
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

    return (
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
    );
};

export default GameSelector;
