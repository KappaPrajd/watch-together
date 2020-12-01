import { combineReducers } from "redux";
import authReducer from "./authReducer";
import errorReducer from "./errorReducer";
import moviesReducer from "./moviesReducer";

export default combineReducers({
  auth: authReducer,
  errors: errorReducer,
  movies: moviesReducer,
});
