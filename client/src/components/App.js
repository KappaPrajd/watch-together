import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import jwt_decode from "jwt-decode";
import setAuthToken from "../utils/setAuthToken";
import { setCurrentUser, logoutUser } from "../actions";
import { store } from "../index";
import Landing from "./Landing";
import Auth from "./Auth";
import About from "./About";
import Room from "./Room";
import "./css/App.css";

const App = () => {
  if (localStorage.jwtToken) {
    const token = localStorage.jwtToken;
    setAuthToken(token);
    const decoded = jwt_decode(token);
    store.dispatch(setCurrentUser(decoded));

    const currentTime = Date.now() / 1000;
    if (decoded.exp < currentTime) {
      store.dispatch(logoutUser());
      window.location.href = "/auth";
    }
  }

  return (
    <Router>
      <Route path="/" exact component={Landing} />
      <Route path="/auth" exact component={Auth} />
      <Route path="/about" exact component={About} />
      <Route path="/room" exact component={Room} />
    </Router>
  );
};
export default App;
