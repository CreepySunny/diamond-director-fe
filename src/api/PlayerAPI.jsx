import axios from "axios";

const PlayerAPI = {
    createPlayer: (newPlayer) => axios.post("http://localhost:8080/player", newPlayer)
}

export default PlayerAPI;