import axios from "axios";

const getAuthHeaders = (token) => ({
    headers: {
        Authorization: `Bearer ${token}`
    }
});

const TeamAPI = {
    createTeam: (newTeam, token) => axios.post("http://localhost:8080/team", newTeam, getAuthHeaders(token)),

    findTeamFromUserEmail: (email, token) => axios.get(`http://localhost:8080/team/${email}`, getAuthHeaders(token)),

    findAllTeams: (token) => axios.get("http://localhost:8080/teams", getAuthHeaders(token)),

    assignCoachToTeam: (teamName, coachEmail, token) => axios.put(
        "http://localhost:8080/team",
        { teamName, coachEmail },
        getAuthHeaders(token)
    )
}

export default TeamAPI;
