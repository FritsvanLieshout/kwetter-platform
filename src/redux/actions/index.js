export const SET_USER = "SET_USER";
export const SET_TIMELINE = "SET_TIMELINE";
export const SET_FOLLOWING = "SET_FOLLOWING";
export const SET_FOLLOWERS = "SET_FOLLOWERS";
export const SET_OWN_TWEETS = "SET_OWN_TWEETS";
export const SET_LIKES = "SET_LIKES";

export const setTimeline = (timeline) => {
  return {
    type: SET_TIMELINE,
    timeline,
  };
};

export const setUser = (user) => {
  return {
    type: SET_USER,
    user,
  };
};

export const setFollowing = (following) => {
  return {
    type: SET_FOLLOWING,
    following,
  };
};

export const setFollowers = (followers) => {
  return {
    type: SET_FOLLOWERS,
    followers,
  };
};

export const setOwnTweets = (ownTweets) => {
  return {
    type: SET_OWN_TWEETS,
    ownTweets,
  };
};

export const setLikes = (likes) => {
  return {
    type: SET_LIKES,
    likes,
  };
};
