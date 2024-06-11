import axios from "axios";

const GameAPI = {
  createGame: (newGame) => {
    const token = sessionStorage.getItem("token");
    return axios.post("http://localhost:8080/game", newGame, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
  }
};

export default GameAPI;