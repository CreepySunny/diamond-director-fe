import axios from "axios";
import baseURL from "./baseURL";
import AuthHeaders from "./AuthHeaders";

const CoachAPI = {
    createCoach: (newCoach) => axios.post(`${baseURL}/coach`, newCoach),

    findCoachesFromTeamName: (teamName, token) => axios.get(`${baseURL}/coach/team/${teamName}`, AuthHeaders(token)),

    findCoachNoTeam: (token) => axios.get(`${baseURL}/coach/no-team`, AuthHeaders(token))
}
export default CoachAPI;