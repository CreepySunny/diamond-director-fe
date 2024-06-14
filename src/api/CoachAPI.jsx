import axios from "axios";

const getAuthHeaders = (token) => ({
    headers: {
        Authorization: `Bearer ${token}`
    }
});

const CoachAPI = {
    createCoach: (newCoach) => axios.post("http://localhost:8080/coach", newCoach),

    findCoachesFromTeamName: (teamName, token) => {
        return axios.get(`http://localhost:8080/coach/team/${teamName}`, getAuthHeaders(token))
            .then(response => ({
                exception: null,
                coaches: response.data
            }))
            .catch(error => ({
                exception: error,
                coaches: []
            }));
    },

    findCoachNoTeam: (token) => {
        return axios.get("http://localhost:8080/coaches/no-team", getAuthHeaders(token))
            .then(response => ({
                exception: null,
                coaches: response.data
            }))
            .catch(error => ({
                exception: error,
                coaches: []
            }));
    }
}

export default CoachAPI;
