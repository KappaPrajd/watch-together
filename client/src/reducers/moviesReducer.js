import {
  GET_USER_MOVIES,
  SET_CURRENT_ROOM,
  SET_CURRENT_MOVIE,
} from "../actions/types";

const INITIAL_STATE = {
  userMovies: [],
  activeRoom: null,
  activeMovie: null,
};

const moviesReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_USER_MOVIES:
      return { ...state, userMovies: action.payload };
    case SET_CURRENT_ROOM:
      return { ...state, activeRoom: action.payload };
    case SET_CURRENT_MOVIE:
      return { ...state, activeMovie: action.payload };
    default:
      return state;
  }
};

export default moviesReducer;
