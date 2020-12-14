import React from "react";
import Navbar from "./Navbar";
import Library from "./Library";
import CreateRoom from "./CreateRoom";
import "./css/Landing.css";

const Landing = (props) => {
  return (
    <React.Fragment>
      <Navbar />
      <Library changeMovie={props.changeMovie} />
      <div className="add-movie">
        <CreateRoom />
      </div>
    </React.Fragment>
  );
};

export default Landing;
