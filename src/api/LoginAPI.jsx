import axios from "axios";

const LoginAPI = {
    loginUser: (loginCreds) => axios.post("http://localhost:8080/player", loginCreds)
}

export default LoginAPI;