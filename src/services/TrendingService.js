import axios from "axios";

const API_URL = "http://20.86.242.50:8050";
const TRENDING_API_URL = `${API_URL}/api/trending`;

class TrendingService {
  async retrieveTrendingItems() {
    return await axios.get(`${TRENDING_API_URL}/items`, {
      withCredentials: true,
    });
  }
}

export default new TrendingService();
