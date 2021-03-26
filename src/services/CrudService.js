import axios from "axios";

const API_URL = process.env.REACT_APP_API_GATEWAY;

class CrudService {
  async post(endpoint, object) {
    return await axios.post(`${API_URL}/` + endpoint, object);
  }
}

export default new CrudService();
