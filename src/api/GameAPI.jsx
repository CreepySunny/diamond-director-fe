import axios from "axios";

const getAuthHeaders = (token) => ({
    headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
    }
});

const GameAPI = {
    createGame: (newGame, token) => axios.post(
        "http://localhost:8080/game",
        newGame,
        getAuthHeaders(token)
    ),

    getAllGames: () => axios.get(
        "http://localhost:8080/game/games"
    ),

    getAllGamesFromUserEmail: (email, token) => axios.get(
        `http://localhost:8080/game/${email}/all`,
        getAuthHeaders(token)
    ),

    getGameByGameId: (gameId, token) => axios.get(
        `http://localhost:8080/game/${gameId}`,
        getAuthHeaders(token)
    ),

    getAllPlayersFromGameId: (gameId, token) => axios.get(
        `http://localhost:8080/game/players/${gameId}`,
        getAuthHeaders(token)
    ),

    addNewGameScore: (scoreRequest, token) => axios.post(
        "http://localhost:8080/game/score",
        scoreRequest,
        getAuthHeaders(token)
    )
};

export default GameAPI;