// src/components/MainComponent.js
import React, { useState } from 'react';
import GameSelector from '../component/GameSelector';
import LiveGameScores from '../component/LiveGameScore';

const GameScorePage = () => {
    const [selectedGameId, setSelectedGameId] = useState(null);

    const handleSelectGame = (gameId) => {
        setSelectedGameId(gameId);
    };

    const handleBack = () => {
        setSelectedGameId(null);
    };

    return (
        <div className="container mt-5">
            {selectedGameId ? (
                <LiveGameScores gameId={selectedGameId} onBack={handleBack} />
            ) : (
                <GameSelector onSelectGame={handleSelectGame} />
            )}
        </div>
    );
};

export default GameScorePage;
