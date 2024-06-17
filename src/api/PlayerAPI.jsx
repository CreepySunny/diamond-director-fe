import axios from "axios";

const getAuthHeaders = (token) => ({
    headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
    }
});

const PlayerAPI = {
    createPlayer: (newPlayer) => axios.post("http://localhost:8080/player", newPlayer),

    findPlayersFromTeamName: (teamName, token) => axios.get(`http://localhost:8080/player/team/${teamName}`, getAuthHeaders(token)),

    findPlayersNoTeam: (token) => axios.get("http://localhost:8080/player/no-team", getAuthHeaders(token))
}

export default PlayerAPI;