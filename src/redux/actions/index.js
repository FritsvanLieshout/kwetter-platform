export const SET_USER = "SET_USER";
export const SET_TIMELINE = "SET_TIMELINE";

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
