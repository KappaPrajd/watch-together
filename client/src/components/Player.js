import React, { useEffect, useRef } from "react";
import { connect } from "react-redux";
import "./css/Player.css";
import ReactLoading from "react-loading";

const Player = ({ handlePlayPause, isPlaying, url }) => {
  const playerRef = useRef();

  useEffect(() => {
    document.addEventListener("keyup", handleKeyUp);

    return () => {
      document.removeEventListener("keyup", handleKeyUp);
    };
  });

  useEffect(() => {
    if (playerRef.current) {
      isPlaying ? playerRef.current.play() : playerRef.current.pause();
    }
  }, [isPlaying]);

  const playPause = (action) => {
    handlePlayPause(action === "play");
  };

  const handleFullScreen = () => {
    if (playerRef.current) {
      playerRef.current.requestFullscreen();
    }
  };

  const handleKeyUp = (e) => {
    switch (e.code) {
      case "Space":
        break;
      case "KeyF":
        handleFullScreen();
        break;
      default:
        return;
    }
  };

  const renderVideo = () => {
    return url ? (
      <React.Fragment>
        <video
          className="player"
          muted
          ref={playerRef}
          onPause={() => playPause("pause")}
          onPlay={() => playPause("play")}
        >
          <source src={url} type="video/mp4" />
        </video>
      </React.Fragment>
    ) : null;
  };

  return (
    <React.Fragment>
      {renderVideo()}
      <div className="movie-controls">
        <button>-5s</button>
        <button>start/stop</button>
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
