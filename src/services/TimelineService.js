import axios from "axios";

const API_URL = process.env.REACT_APP_API_GATEWAY;
const TIMELINE_API_URL = `${API_URL}/api/timeline`;

class TimelineService {
  async retrieveTimeline() {
    return await axios.get(`${TIMELINE_API_URL}/all`, {
      withCredentials: false,
      headers: { "Access-Control-Allow-Origin": "http://localhost:3000" },
    });
  }
}

export default new TimelineService();
