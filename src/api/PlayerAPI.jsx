import axios from "axios";
import baseURL from "./baseURL";
import AuthHeaders from "./AuthHeaders";

const PlayerAPI = {
    createPlayer: (newPlayer) => axios.post(`${baseURL}/player`, newPlayer),

    getPlayerById: (id, token) => axios.get(`${baseURL}/player/${id}`, AuthHeaders(token)),

    getAllPlayersWithNoTeam: (token) => axios.get(`${baseURL}/player/no-team`, AuthHeaders(token)),

    getPlayersFromTeamName: (teamName, token) => axios.get(`${baseURL}/player/team/${teamName}`, AuthHeaders(token)),

    getBattingStatsByPlayerId: (id, token) => axios.get(`${baseURL}/player/${id}/batting`, AuthHeaders(token)),

    getPitchingStatsByPlayerId: (id, token) => axios.get(`${baseURL}/player/${id}/pitching`, AuthHeaders(token)),

    getFieldPositionSpecificBattingStats: (playerUserId, position, token) => 
        axios.get(`${baseURL}/player/${playerUserId}/${position}/batting`, AuthHeaders(token)),

    getFieldPositionSpecificPitchingStats: (playerUserId, position, token) => 
        axios.get(`${baseURL}/player/${playerUserId}/${position}/pitching`, AuthHeaders(token))
};

export default PlayerAPI;