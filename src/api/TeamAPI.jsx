import axios from "axios";

const getAuthHeaders = (token) => ({
    headers: {
        Authorization: `Bearer ${token}`
    }
});

const TeamAPI = {
    createTeam: (createCoachUserEmail, teamName, token) => axios.post(
        "http://localhost:8080/team",
        { createCoachUserEmail, teamName },
        getAuthHeaders(token)
    )
        .then(response => ({
            teamId: response.data
        }))
        .catch(error => {
            throw new Error(`Failed to create team: ${error.message}`);
        }),

    findTeamFromUserEmail: (email, token) => axios.get(`http://localhost:8080/team/${email}`, getAuthHeaders(token)),

    findAllTeams: (token) => axios.get("http://localhost:8080/teams", getAuthHeaders(token)),

    assignCoachToTeam: (teamName, coachId, token) => axios.put(
        "http://localhost:8080/team",
        { teamName, coachId },
        getAuthHeaders(token)
    )
}

export default TeamAPI;
