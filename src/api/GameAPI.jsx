import axios from "axios";
import baseURL from "./baseURL";
import AuthHeaders from "./AuthHeaders";

const GameAPI = {
    createGame: (newGame, token) => axios.post(
        `${baseURL}/game`,
        newGame,
        AuthHeaders(token)
    ),

    getAllGames: () => axios.get(
        `${baseURL}/game/games`
    ),

    getAllGamesFromUserEmail: (email, token) => axios.get(
        `${baseURL}/game/${email}/all`,
        AuthHeaders(token)
    ),

    getGameByGameId: (gameId, token) => axios.get(
        `${baseURL}/game/${gameId}`,
        AuthHeaders(token)
    ),

    getAllPlayersFromGameId: (gameId, token) => axios.get(
        `${baseURL}/game/players/${gameId}`,
        AuthHeaders(token)
    ),

    addNewGameScore: (scoreRequest, token) => axios.post(
        `${baseURL}/game/score`,
        scoreRequest,
        AuthHeaders(token)
    )
};

export default GameAPI;