import axios from "axios";

const API_URL = process.env.REACT_APP_API_GATEWAY;
const TIMELINE_API_URL = `${API_URL}/api/timeline`;

class TimelineService {
  async retrieveTimeline(username) {
    return await axios.get(`${TIMELINE_API_URL}/unique?username=` + username, {
      withCredentials: true,
      headers: { "Access-Control-Allow-Origin": "http://localhost:3000" },
    });
  }
}

export default new TimelineService();
