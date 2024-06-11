import React, { useEffect, useState } from 'react';
import WebSocketService from './WebSocketService';
import { Container, Row, Col, Form, Card } from 'react-bootstrap';

const LiveGameScore = () => {
    const [selectedGame, setSelectedGame] = useState('');
    const [games, setGames] = useState([]);
    const [scoreData, setScoreData] = useState({
        homeTeam: '',
        awayTeam: '',
        homeScore: 0,
        awayScore: 0,
        outs: 0,
    });

    useEffect(() => {
        // Fetch the list of games when the component mounts
        fetchGames();
        WebSocketService.connect();

        return () => {
            WebSocketService.disconnect();
        };
    }, []);

    useEffect(() => {gameId;
        if (selectedGame) {
            WebSocketService.subscribe(selectedGame, (message) => {
                setScoreData(message);
            });
        }
    }, [selectedGame]);

    const fetchGames = async () => {
        try {
            const response = await axios.get('/api/games');
            setGames(response.data);
        } catch (error) {
            console.error('Error fetching games:', error);
        }
    };

    const handleGameChange = (event) => {
        setSelectedGame(event.target.value);
    };

    return (
        <Container className="mt-5">
            <Row className="mb-4">
                <Col>
                    <Form.Group controlId="gameDropdown">
                        <Form.Label>Choose a game:</Form.Label>
                        <Form.Control as="select" onChange={handleGameChange}>
                            <option value="">Select a game</option>
                            {games.map((game) => (
                                <option key={game.gameId} value={game.gameId}>
                                    {game.homeTeamName} vs {game.awayTeamName}
                                </option>
                            ))}
                        </Form.Control>
                    </Form.Group>
                </Col>
            </Row>
            <Row>
                <Col>
                    <Card>
                        <Card.Body>
                            <Card.Title>Baseball Score</Card.Title>
                            <Card.Text>
                                <strong>Home Team:</strong> {scoreData.homeTeam}<br />
                                <strong>Away Team:</strong> {scoreData.awayTeam}<br />
                                <strong>Home Score:</strong> {scoreData.homeScore}<br />
                                <strong>Away Score:</strong> {scoreData.awayScore}<br />
                                <strong>Outs:</strong> {scoreData.outs}
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default LiveGameScore;