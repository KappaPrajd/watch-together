import React, { useEffect, useRef } from "react";
import { connect } from "react-redux";
import "./css/Player.css";

const Player = (props) => {
  const playerRef = useRef();

  useEffect(() => {
    document.addEventListener("keyup", handleKeyUp);

    return () => {
      document.removeEventListener("keyup", handleKeyUp);
    };
  });

  const handlePlayPause = () => {
    props.handlePlayPause(!props.isPlaying);

    if (playerRef.current) {
      props.isPlaying ? playerRef.current.play() : playerRef.current.pause();
    }
  };

  const handleFullScreen = () => {
    if (playerRef.current) {
      playerRef.current.requestFullscreen();
    }
  };

  const handleKeyUp = (e) => {
    switch (e.code) {
      case "Space":
        handlePlayPause();
        break;
      case "KeyF":
        handleFullScreen();
        break;
      default:
        return;
    }
  };

  const renderVideo = () => {
    return props.url ? (
      <React.Fragment>
        <video className="player" ref={playerRef}>
          <source src={props.url} type="video/mp4" />
        </video>
      </React.Fragment>
    ) : null;
  };

  return (
    <React.Fragment>
      {renderVideo()}
      <div className="movie-controls">
        <button>-5s</button>
        <button onClick={handlePlayPause}>start/stop</button>
        <button onClick={handleFullScreen}>Full screen</button>
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
