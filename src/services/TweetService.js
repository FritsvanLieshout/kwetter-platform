import axios from "axios";

const API_URL = "http://20.86.242.50:8050";
const TWEET_API_URL = `${API_URL}/api/tweets`;

class TweetService {
  async retrieveAllTweets() {
    return await axios.get(`${TWEET_API_URL}/all`);
  }

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

  async retrieveMentions(username) {
    return await axios.get(`${TWEET_API_URL}/mentions?username=${username}`, {
      withCredentials: true,
    });
  }
}

export default new TweetService();
