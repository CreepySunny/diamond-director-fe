import React, { useEffect, useState } from 'react';
import WebSocketService from '../websocket/WebSocketService';
import { Card, Button } from 'react-bootstrap';

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
        return <div>No new Update</div>;
    }

    return (
        <Card>
            <Card.Body>
                <Card.Title>{gameState.homeTeamName} vs {gameState.awayTeamName}</Card.Title>
                <Card.Text>
                    Home Score: {gameState.homeScore}<br />
                    Away Score: {gameState.awayScore}<br />
                    Outs: {gameState.outs}
                </Card.Text>
                <Button variant="secondary" onClick={onBack}>Back to Game Selection</Button>
            </Card.Body>
        </Card>
    );
};

export default LiveGameScores;
