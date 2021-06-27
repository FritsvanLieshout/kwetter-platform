import axios from "axios";

const API_URL = "http://20.86.242.50:8050";
const TIMELINE_API_URL = `${API_URL}/api/timeline`;

class TimelineService {
  async retrieveTimeline(username) {
    return await axios.get(`${TIMELINE_API_URL}/unique?username=` + username, {
      withCredentials: true,
      headers: { "Access-Control-Allow-Origin": "http://20.86.242.101:3000" },
    });
  }

  async retrieveOwnTweets(username) {
    return await axios.get(
      `${TIMELINE_API_URL}/own/tweets?username=` + username,
      {
        withCredentials: true,
      }
    );
  }
}

export default new TimelineService();
