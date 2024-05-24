import axios from "axios";

const CoachAPI = {
    createCoach: (newCoach) => axios.post("http://localhost:8080/coach", newCoach)
}

export default CoachAPI;