import { GET_USER_MOVIES } from "../actions/types";

const moviesReducer = (state = [], action) => {
  switch (action.type) {
    case GET_USER_MOVIES:
      return action.payload;
    default:
      return state;
  }
};

export default moviesReducer;
