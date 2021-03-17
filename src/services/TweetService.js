import axios from "axios";

//const API_URL = "https://fun4-rest-api-frits.herokuapp.com";
const API_URL = "http://localhost:8070";
const TWEET_API_URL = `${API_URL}/api/tweets`;

class TweetService {
  async retrieveAllTweets() {
    return await axios.get(`${TWEET_API_URL}`);
  }

  async postTweet(userId, message) {
    return await axios.post(`${TWEET_API_URL}`, {
      userId: userId,
      message: message,
    });
  }
}

export default new TweetService();
