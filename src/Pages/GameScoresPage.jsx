import React, { useState } from 'react';
import { Container, Button } from 'react-bootstrap';
import GameSelector from '../component/GameSelector';
import LiveGameScores from '../component/LiveGameScore';
import NavigationBar from '../component/Navbar';

const GameScorePage = () => {
    const [selectedGameId, setSelectedGameId] = useState(null);

    const handleSelectGame = (gameId) => {
        setSelectedGameId(gameId);
    };

    const handleBack = () => {
        setSelectedGameId(null);
    };

    return (
        <>
            <NavigationBar />
            <Container className="mt-5">
                {!selectedGameId ? (
                    <GameSelector onSelectGame={handleSelectGame} />
                ) : (
                    <>
                        <Button variant="secondary" onClick={handleBack} className="mb-3">
                            Back to Game Selector
                        </Button>
                        <LiveGameScores gameId={selectedGameId} onBack={handleBack} />
                    </>
                )}
            </Container>
        </>
    );
};

export default GameScorePage;
