import React, { useState, useEffect } from "react";
import NavigationBar from "../component/Navbar";
import { Container } from "react-bootstrap";
import TeamCoachList from "../component/TeamCoachList";
import CreateTeamForm from "../component/CreateTeamForm";
import TeamAPI from "../api/TeamAPI";
import { jwtDecode } from 'jwt-decode';

function TeamPage(){
  const user = jwtDecode(sessionStorage.getItem('token'));
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
          <TeamCoachList teamName={team.teamName} />
        ) : (
          <CreateTeamForm user={user} />
        )}
      </Container>
    </>
  );
}

export default TeamPage;
