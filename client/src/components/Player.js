import React from "react";
import { connect } from "react-redux";
import "./css/Player.css";

const Player = () => {
  return (
    <div className="player">
      <div className="movie-holder"></div>
      <div className="movie-controls">
        <button>-5s</button>
        <button>start/stop</button>
        <button>+5s</button>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    movies: state.movies,
  };
};

export default connect(mapStateToProps)(Player);
