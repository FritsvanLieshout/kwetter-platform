import { SET_USER, SET_TIMELINE } from "redux/actions";

const initialState = {
  timeline: [],
  user: {},
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
    default:
      return state;
  }
};

export default rootReducer;
