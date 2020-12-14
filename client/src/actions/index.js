import axios from "axios";
import setAuthToken from "../utils/setAuthToken";
import jwt_decode from "jwt-decode";

import {
  GET_ERRORS,
  SET_CURRENT_USER,
  GET_USER_MOVIES,
  SET_USER_STATE,
} from "./types";

export const registerUser = (userData, setActiveTab) => (dispatch) => {
  axios
    .post("/users/register", userData)
    .then((res) => setActiveTab("Login"))
    .catch((err) =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      })
    );
};

export const loginUser = (userData, history) => (dispatch) => {
  axios
    .post("/users/login", userData)
    .then((res) => {
      const { token } = res.data;
      localStorage.setItem("jwtToken", token);

      setAuthToken(token);

      const decoded = jwt_decode(token);

      dispatch(setCurrentUser(decoded));
      history.push("/");
    })
    .catch((err) =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      })
    );
};

export const setCurrentUser = (decoded) => {
  return {
    type: SET_CURRENT_USER,
    payload: decoded,
  };
};

export const logoutUser = () => (dispatch) => {
  localStorage.removeItem("jwtToken");
  setAuthToken(false);
  dispatch(setCurrentUser({}));
};

export const addMovie = (movieData) => (dispatch) => {
  axios
    .post("/movies/add", movieData)
    .then(() => {
      dispatch(fetchUserMovies(movieData.userId));
    })
    .catch((err) =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      })
    );
};

export const fetchUserMovies = (userId) => (dispatch) => {
  axios
    .get("/movies/user", {
      params: {
        userId,
      },
    })
    .then((res) => {
      const movies = res.data;

      dispatch({
        type: GET_USER_MOVIES,
        payload: movies,
      });
    })
    .catch((err) => console.log(err));
};

export const setUserState = (bool) => {
  return {
    type: SET_USER_STATE,
    payload: bool,
  };
};
