import React, { useContext, useEffect, useState } from 'react';
import { Container, Row, Col, Spinner } from 'react-bootstrap';
import PlayerBasicInfo from '../component/PlayerBasicInfo';
import PlayerPerFieldPositionStatisticsPitcher from '../component/PlayerPerFieldPositionStatisticsPitcher';
import PlayerPerFieldPositionStatisticsBatter from '../component/PlayerPerFieldPositionStatisticsBatter';
import BattingStatistics from '../component/BattingStatistics';
import PlayerAPI from '../api/PlayerAPI';
import AuthContext from '../Auth/AuthContext';
import NavigationBar from '../component/Navbar';
import PitchingStatistics from '../component/PitchingStatistics';

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

        if (playerResponse.data.position === 'pitcher' ||
            playerResponse.data.position === 'reliever' ||
            playerResponse.data.position === 'starter') {
          const pitchingStatsResponse = await PlayerAPI.getPitchingStatsByPlayerId(
            user.userId,
            sessionStorage.getItem('token')
          );
          setPitchingStats(pitchingStatsResponse.data);
        } else {
          const battingStatsResponse = await PlayerAPI.getBattingStatsByPlayerId(
            user.userId,
            sessionStorage.getItem('token')
          );
          setBattingStats(battingStatsResponse.data);
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
            {player.position === 'pitcher' ||
             player.position === 'reliever' ||
             player.position === 'starter' ? (
              <PitchingStatistics pitchingStats={pitchingStats} />
            ) : (
              <BattingStatistics battingStats={battingStats} />
            )}
          </Col>
          <Col>
            {player.position === 'Pitcher' ||
             player.position === 'Reliever' ||
             player.position === 'Starter' ? (
              <PlayerPerFieldPositionStatisticsPitcher />
            ) : (
              <PlayerPerFieldPositionStatisticsBatter />
            )}
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default PlayerProfilePage;
