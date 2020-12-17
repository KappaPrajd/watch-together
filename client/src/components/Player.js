import React from "react";
import { connect } from "react-redux";
import "./css/Player.css";
import ReactLoading from "react-loading";

const Player = () => {
  return (
    <div className="player">
      <div className="movie-holder">
        <ReactLoading
          type={"spin"}
          color={"white"}
          height={"5vh"}
          width={"3vw"}
        />
      </div>
      <div className="movie-controls">
        <button>
          <i className="fas fa-angle-double-left"></i>
        </button>
        <button>
          <i className="fas fa-play"></i>
        </button>
        <button>
          <i className="fas fa-angle-double-right"></i>
        </button>
        <button className="volume-icon">
          <i className="fas fa-volume-down"></i>
        </button>
        <button className="settings-icon">
          <i className="fas fa-sliders-h"></i>
        </button>
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
