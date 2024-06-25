import axios from "axios";
import baseURL from "./baseURL";
import AuthHeaders from "./AuthHeaders";

const TeamAPI = {
    createTeam: (newTeam, token) => axios.post(
        `${baseURL}/team`,
        newTeam ,
        AuthHeaders(token)
    ),

    findTeamFromUserEmail: (email, token) => axios.get(`${baseURL}/team/${email}`, AuthHeaders(token)),

    findAllTeams: (token) => axios.get(`${baseURL}/team`, AuthHeaders(token)),

    assignCoachToTeam: (teamName, coachId, token) => axios.put(
        `${baseURL}/team/assign/coach`,
        { teamName, coachId },
        AuthHeaders(token)
    ),

    assignPlayerToTeam: (teamName, playerId, token) => axios.put(
        `${baseURL}/team/assign/player`,
        { teamName, playerId },
        AuthHeaders(token)
    ),

    deleteTeamByTeamName: (teamName, token) => axios.delete(`${baseURL}/team/${teamName}`, AuthHeaders(token)),

    searchForTeamUsingName: (teamName) => axios.get(`${baseURL}/team/search/${teamName}`)
}

export default TeamAPI;
