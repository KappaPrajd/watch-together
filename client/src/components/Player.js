import React from "react";
import { connect } from "react-redux";
import "./css/Player.css";

const Player = (props) => {
  const renderVideo = () => {
    return props.url ? (
      <React.Fragment>
        <video className="player">
          <source src={props.url} type="video/mp4" />
        </video>
      </React.Fragment>
    ) : null;
  };

  return (
    <React.Fragment>
      {renderVideo()}
      <div className="movie-holder"></div>
      <div className="movie-controls">
        <button>-5s</button>
        <button>start/stop</button>
        <button>+5s</button>
      </div>
    </React.Fragment>
  );
};

const mapStateToProps = (state) => {
  return {
    movies: state.movies,
  };
};

export default connect(mapStateToProps)(Player);
