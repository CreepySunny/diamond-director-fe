import axios from "axios";

const getAuthHeaders = (token) => ({
    headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
    }
});

const TeamAPI = {
    createTeam: (newTeam, token) => axios.post(
        "http://localhost:8080/team",
        newTeam ,
        getAuthHeaders(token)
    ),

    findTeamFromUserEmail: (email, token) => axios.get(`http://localhost:8080/team/${email}`, getAuthHeaders(token)),

    findAllTeams: (token) => axios.get("http://localhost:8080/team", getAuthHeaders(token)),

    assignCoachToTeam: (teamName, coachId, token) => axios.put(
        "http://localhost:8080/team/assign/coach",
        { teamName, coachId },
        getAuthHeaders(token)
    ),

    assignPlayerToTeam: (teamName, playerId, token) => axios.put(
        "http://localhost:8080/team/assign/player",
        { teamName, playerId },
        getAuthHeaders(token)
    ),

    deleteTeamByTeamId: (id, token) => axios.delete(`http://localhost:8080/team/${id}`, getAuthHeaders(token))
}

export default TeamAPI;
