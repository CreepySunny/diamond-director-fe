import axios from "axios";

const baseURL = "http://localhost:8080";

const getAuthHeaders = (token) => ({
    headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
    }
});

const PlayerAPI = {
    createPlayer: (newPlayer) => axios.post(`${baseURL}/player`, newPlayer),

    getPlayerById: (id, token) => axios.get(`${baseURL}/player/${id}`, getAuthHeaders(token)),

    getAllPlayersWithNoTeam: (token) => axios.get(`${baseURL}/player/no-team`, getAuthHeaders(token)),

    getPlayersFromTeamName: (teamName, token) => axios.get(`${baseURL}/player/team/${teamName}`, getAuthHeaders(token)),

    getBattingStatsByPlayerId: (id, token) => axios.get(`${baseURL}/player/${id}/batting`, getAuthHeaders(token)),

    getPitchingStatsByPlayerId: (id, token) => axios.get(`${baseURL}/player/${id}/pitching`, getAuthHeaders(token))
};

export default PlayerAPI;