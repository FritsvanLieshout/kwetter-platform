import axios from "axios";

const API_URL = "http://20.86.242.50:8050";
const FOLLOW_API_URL = `${API_URL}/api/follow`;

class FollowService {
  async getFollowing(username) {
    return await axios.get(`${FOLLOW_API_URL}/following?username=` + username, {
      withCredentials: true,
    });
  }

  async getFollowers(username) {
    return await axios.get(`${FOLLOW_API_URL}/followers?username=` + username, {
      withCredentials: true,
    });
  }

  async followUser(username, followingUsername) {
    return await axios.post(
      `${FOLLOW_API_URL}/user/follow`,
      {
        username: username,
        followingUsername: followingUsername,
      },
      { withCredentials: true }
    );
  }

  async unFollowUser(username, followingUsername) {
    return await axios.post(
      `${FOLLOW_API_URL}/user/unfollow`,
      {
        username: username,
        followingUsername: followingUsername,
      },
      { withCredentials: true }
    );
  }
}

export default new FollowService();
