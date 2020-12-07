import React from "react";
import Navbar from "./Navbar";
import Library from "./Library";
import CreateRoom from "./CreateRoom";
import "./css/Landing.css";

const Landing = () => {
  return (
    <React.Fragment>
      <Navbar />
      <Library />
      <div className="add-movie">
        <img src="img/wave_bg.png" alt="wave_bg"></img>
        <CreateRoom />
      </div>
    </React.Fragment>
  );
};

export default Landing;
