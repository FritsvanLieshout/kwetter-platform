import {
  SET_USER,
  SET_TIMELINE,
  SET_FOLLOWING,
  SET_FOLLOWERS,
  SET_OWN_TWEETS,
} from "redux/actions";

const initialState = {
  timeline: null,
  user: null,
  following: null,
  followers: null,
  ownTweets: null,
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_TIMELINE:
      return {
        ...state,
        timeline: action.timeline,
      };
    case SET_USER:
      return {
        ...state,
        user: action.user,
      };
    case SET_FOLLOWING:
      return {
        ...state,
        following: action.following,
      };
    case SET_FOLLOWERS:
      return {
        ...state,
        followers: action.followers,
      };
    case SET_OWN_TWEETS:
      return {
        ...state,
        ownTweets: action.ownTweets,
      };
    default:
      return state;
  }
};

export default rootReducer;
