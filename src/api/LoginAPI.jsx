import axios from "axios";
import baseURL from "./baseURL";


const LoginAPI = {
    loginUser: (loginCreds) => axios.post(`${baseURL}/tokens`, loginCreds)
}

export default LoginAPI;