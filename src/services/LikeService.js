import axios from "axios";

const API_URL = process.env.REACT_APP_API_GATEWAY;
const LIKE_API_URL = `${API_URL}/api/like`;

class LikeService {
  async getUserLikes(userId) {
    return await axios.get(`${LIKE_API_URL}/user/likes?userId=${userId}`, {
      withCredentials: true,
    });
  }

  async alreadyLiked(tweetId, userId) {
    return await axios.get(
      `${LIKE_API_URL}/user?tweetId=${tweetId}&userId=${userId}`,
      {
        withCredentials: true,
      }
    );
  }

  async getLikesByTweet(tweetId) {
    return await axios.get(`${LIKE_API_URL}/tweet?tweetId=${tweetId}`, {
      withCredentials: true,
    });
  }

  async likeTweet(userId, tweetId) {
    return await axios.post(
      `${LIKE_API_URL}/add`,
      {
        userId: userId,
        tweetId: tweetId,
      },
      { withCredentials: true }
    );
  }

  async unLikeTweet(userId, tweetId) {
    return await axios.delete(`${LIKE_API_URL}/remove`, {
      data: {
        userId: userId,
        tweetId: tweetId,
      },
      withCredentials: true,
    });
  }
}

export default new LikeService();
