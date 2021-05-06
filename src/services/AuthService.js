import axios from "axios";

//const API_URL = process.env.REACT_APP_API_GATEWAY;
const API_URL = "http://localhost:8050";
const USER_API_URL = `${API_URL}/api/user`;
const AUTH_API_URL = `${API_URL}/api/auth`;

class AuthService {
  async signUp(username, password, nickName) {
    return await axios.post(`${USER_API_URL}/register`, {
      username: username,
      password: password,
      nickName: nickName,
      profileImage:
        "https://abs.twimg.com/sticky/default_profile_images/default_profile_400x400.png",
    });
  }

  async signIn(username, password) {
    return await axios.post(
      `${AUTH_API_URL}/login`,
      {
        username: username,
        password: password,
      },
      { withCredentials: true }
    );
  }

  async getUser() {
    return await axios.get(`${USER_API_URL}/me`, { withCredentials: true });
  }
}

export default new AuthService();
