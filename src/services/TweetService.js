import axios from "axios";

const API_URL = process.env.REACT_APP_API_GATEWAY;
const TWEET_API_URL = `${API_URL}/api/tweets`;

class TweetService {
  async retrieveAllTweets() {
    return await axios.get(`${TWEET_API_URL}/all`);
  }

  //TODO
  async postTweet(message, user, mentions, hashtags) {
    return await axios.post(
      `${TWEET_API_URL}/tweet`,
      {
        tweetUser: user,
        message: message,
        mentions: mentions,
        hashtags: hashtags,
      },
      { withCredentials: true }
    );
  }
}

export default new TweetService();
