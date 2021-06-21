import axios from "axios";

const API_URL = "http://20.86.242.50:8050";

class CrudService {
  async post(endpoint, object) {
    return await axios.post(`${API_URL}/` + endpoint, object);
  }
}

export default new CrudService();
