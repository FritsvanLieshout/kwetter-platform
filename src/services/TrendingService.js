import axios from "axios";

const API_URL = process.env.REACT_APP_API_GATEWAY;
const TRENDING_API_URL = `${API_URL}/api/trending`;

class TrendingService {
  async retrieveTrendingItems() {
    return await axios.get(`${TRENDING_API_URL}/items`, {
      withCredentials: true,
    });
  }
}

export default new TrendingService();
