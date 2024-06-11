import axios from "axios";

const LoginAPI = {
    loginUser: (loginCreds) => axios.post("http://localhost:8080/tokens", loginCreds)
}

export default LoginAPI;