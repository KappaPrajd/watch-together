import React, { useState, useEffect, useRef } from "react";
import { connect } from "react-redux";
import "./css/Player.css";

const Player = ({
  handlePlayPause,
  handleTimeUpdate,
  isPlaying,
  url,
  newTimeStamp,
}) => {
  const [timeStamp, setTimeStamp] = useState(0);

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

  const playPause = (action) => {
    handlePlayPause(action === "play");
  };

  const timeUpdate = (time) => {
    // distinct the normal flow of the video from user manually changing the time stamp, emit socket event if necessary
    if (time - timeStamp > 3 || timeStamp - time > 3) {
      handleTimeUpdate(time);
    }

    setTimeStamp(time);
  };

  useEffect(() => {
    if (playerRef.current && newTimeStamp !== 0) {
      playerRef.current.currentTime = newTimeStamp;
    }
  }, [newTimeStamp]);

  const renderVideo = () => {
    return url ? (
      <React.Fragment>
        <video
          className="player"
          muted
          controls
          ref={playerRef}
          onPause={() => playPause("pause")}
          onPlay={() => playPause("play")}
          onTimeUpdate={() => timeUpdate(playerRef.current.currentTime)}
        >
          <source src={url} type="video/mp4" />
        </video>
      </React.Fragment>
    ) : null;
  };

  return <React.Fragment>{renderVideo()}</React.Fragment>;
};

const mapStateToProps = (state) => {
  return {
    movies: state.movies,
  };
};

export default connect(mapStateToProps)(Player);
