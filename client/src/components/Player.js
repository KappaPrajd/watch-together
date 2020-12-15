import React, { useState, useEffect, useRef } from "react";
import { connect } from "react-redux";
import "./css/Player.css";

const Player = (props) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const playerRef = useRef();

  useEffect(() => {
    if(playerRef.current){
      isPlaying ? playerRef.current.play() : playerRef.current.pause()
    } 
  }, [isPlaying])

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  }

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
