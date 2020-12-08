import React from "react";
import "./css/Player.css";

const Player = () => {
  return (
    <div className="player">
      <div class="movie-holder"></div>
      <div className="movie-controls">
        <button>-5s</button>
        <button>start/stop</button>
        <button>+5s</button>
      </div>
    </div>
  );
};

export default Player;
