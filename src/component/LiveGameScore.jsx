import React, { useEffect, useState } from 'react';
import WebSocketService from '../websocket/WebSocketService';
import { Card, Button, Spinner } from 'react-bootstrap';

const LiveGameScores = ({ gameId, onBack }) => {
    const [gameState, setGameState] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        WebSocketService.connect(gameId, handleGameStateUpdate);

        return () => {
            WebSocketService.disconnect();
        };
    }, [gameId]);

    const handleGameStateUpdate = (message) => {
        setGameState(message);
        setIsLoading(false);
        console.log(gameState);
    };

    if (isLoading || !gameState) {
        return (
            <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
                <Spinner animation="border" variant="primary" />
                <span className="ml-2">Loading game updates...</span>
            </div>
        );
    }

    return (
        <Card>
            <Card.Body>
                <Card.Title>{gameState.homeTeamName} vs {gameState.awayTeamName}</Card.Title>
                <Card.Text>
                    <strong>Home Score:</strong> {gameState.homeScore}<br />
                    <strong>Away Score:</strong> {gameState.awayScore}<br />
                    <strong>Outs:</strong> {gameState.outs}
                </Card.Text>
                <Button variant="secondary" onClick={onBack}>Back to Game Selection</Button>
            </Card.Body>
        </Card>
    );
};

export default LiveGameScores;