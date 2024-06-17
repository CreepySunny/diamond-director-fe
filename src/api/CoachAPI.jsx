import axios from "axios";
import React from "react";

const getAuthHeaders = (token) => ({
    headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
    }
});

const CoachAPI = {
    createCoach: (newCoach) => axios.post("http://localhost:8080/coach", newCoach),

    findCoachesFromTeamName: (teamName, token) => axios.get(`http://localhost:8080/coach/team/${teamName}`, getAuthHeaders(token)),

    findCoachNoTeam: (token) => axios.get("http://localhost:8080/coach/no-team", getAuthHeaders(token))
}
export default CoachAPI;
