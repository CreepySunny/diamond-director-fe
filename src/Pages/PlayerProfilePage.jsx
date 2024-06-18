import React, { useContext, useEffect, useState } from 'react';
import { Container, Row, Col, Spinner } from 'react-bootstrap';
import PlayerBasicInfo from '../component/PlayerBasicInfo';
import BattingStatistics from '../component/BattingStatistics';
import PitchingStatistics from '../component/PitchingStatistics';
import PlayerAPI from '../api/PlayerAPI';
import AuthContext from '../Auth/AuthContext';
import NavigationBar from '../component/Navbar';

const PlayerProfilePage = () => {
  const [player, setPlayer] = useState(null);
  const [battingStats, setBattingStats] = useState(null);
  const [pitchingStats, setPitchingStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const fetchPlayerData = async () => {
      try {
        const playerResponse = await PlayerAPI.getPlayerById(user.userId, sessionStorage.getItem('token'));
        setPlayer(playerResponse.data);

        const battingStatsResponse = await PlayerAPI.getBattingStatsByPlayerId(user.userId, sessionStorage.getItem('token'));
        setBattingStats(battingStatsResponse.data);

        if (playerResponse.data.position === 'Pitcher' ||
            playerResponse.data.position === 'Reliever' ||
            playerResponse.data.position === 'Starter') {
          const pitchingStatsResponse = await PlayerAPI.getPitchingStatsByPlayerId(user.userId, sessionStorage.getItem('token'));
          setPitchingStats(pitchingStatsResponse.data);
        }

        setLoading(false);
      } catch (error) {
        console.error('Error fetching player data:', error);
        setLoading(false);
      }
    };

    fetchPlayerData();
  }, [user]);

  if (loading) {
    return (
      <Container className="mt-5">
        <Spinner animation="border" role="status">
          <span className="sr-only"></span>
        </Spinner>
      </Container>
    );
  }

  return (
    <>
    <NavigationBar />
    <Container className="mt-5">
      <h1 className="mb-4">Player Profile</h1>
      <PlayerBasicInfo player={player} />
      <hr />
      <Row className="mb-4">
        <Col>
          <BattingStatistics battingStats={battingStats} />
        </Col>
        {pitchingStats && (
          <Col>
            <PitchingStatistics pitchingStats={pitchingStats} />
          </Col>
        )}
      </Row>
    </Container>
    </>
  );
};

export default PlayerProfilePage;
