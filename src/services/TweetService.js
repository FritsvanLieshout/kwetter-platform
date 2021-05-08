import axios from "axios";

const API_URL = process.env.REACT_APP_API_GATEWAY;
const TWEET_API_URL = `${API_URL}/api/tweets`;

class TweetService {
  async retrieveAllTweets() {
    return await axios.get(`${TWEET_API_URL}/all`);
  }

  //TODO
  async postTweet(message, user) {
    return await axios.post(
      `${TWEET_API_URL}/tweet`,
      {
        // tweetUser: {
        //   userId: "123e4567-e89b-12d3-a456-426614174000",
        //   username: "PSV",
        //   nickName: "PSV Eindhoven",
        //   profileImage:
        //     "https://abs.twimg.com/sticky/default_profile_images/default_profile_400x400.png",
        //   verified: true,
        // },
        tweetUser: user,
        message: message,
      },
      { withCredentials: true }
    );
  }
}

export default new TweetService();
