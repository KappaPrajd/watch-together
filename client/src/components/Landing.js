import React from "react";
import Navbar from "./Navbar";
import ProfileInfo from "./ProfileInfo";
import Library from "./Library";
import CreateRoom from "./CreateRoom";
import "./css/Landing.css";

const Landing = () => {
  return (
    <React.Fragment>
      <Navbar />
      <Library />
      <ProfileInfo />
      <div className="add-movie">
        <CreateRoom />
      </div>
    </React.Fragment>
  );
};

export default Landing;
