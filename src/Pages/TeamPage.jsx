import React, { useState, useEffect, useContext } from "react";
import NavigationBar from "../component/Navbar";
import { Container } from "react-bootstrap";
import TeamCoachList from "../component/TeamCoachList";
import CreateTeamForm from "../component/CreateTeamForm";
import TeamAPI from "../api/TeamAPI";
import TeamPlayerList from "../component/TeamPlayerList";
import AuthContext from "../Auth/AuthContext";

function TeamPage(){
  const { user } = useContext(AuthContext);
  const [team, setTeam] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUserTeam(user.sub, sessionStorage.getItem('token'));
  }, []);

  const fetchUserTeam = (userEmail, token) => {
    TeamAPI.findTeamFromUserEmail(userEmail, token)
      .then(response => {
          setTeam(response.data);
          setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching team:', error);
        setLoading(false);
      });
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <NavigationBar />
      <Container>
        {team ? (
          <>
            <TeamCoachList teamName={team.teamName} />
            <TeamPlayerList teamName={team.teamName} />
          </>
        ) : (
          <CreateTeamForm/>
        )}
      </Container>
    </>
  );
}

export default TeamPage;
