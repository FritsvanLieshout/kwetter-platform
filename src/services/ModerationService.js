import axios from "axios";

const API_URL = "http://20.86.242.50:8050";
const MOD_API_URL = `${API_URL}/api/moderation`;

class ModerationService {
  async retrieveUsers() {
    return await axios.get(`${MOD_API_URL}/users/all`, {
      withCredentials: true,
    });
  }
}

export default new ModerationService();
