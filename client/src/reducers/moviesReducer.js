import { GET_USER_MOVIES, SET_USER_STATE } from "../actions/types";

const INITIAL_STATE = {
  userMovies: [],
  isInRoom: false,
};

const moviesReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_USER_MOVIES:
      return { ...state, userMovies: action.payload };
    case SET_USER_STATE:
      return { ...state, isInRoom: action.payload };
    default:
      return state;
  }
};

export default moviesReducer;
