import React, { useState } from "react";
import Login from "./Login";
import Register from "./Register";
import "./css/Auth.css";

const Auth = () => {
  const [activeTab, setActiveTab] = useState("Login");

  const renderForm = () => {
    const handleClick = (tab) => {
      setActiveTab(tab);
    };

    switch (activeTab) {
      case "Register":
        return <Register handleClick={handleClick} />;
      case "Login":
        return <Login handleClick={handleClick} />;
      default:
        return;
    }
  };

  return (
    <div>
      <div className=" grid-container">
        <img src="/img/wave.png" alt="wave" className="wave"></img>
        <div className="left-panel">
          <img
            src="img/undraw_horror_movie_3988.png"
            alt="undraw.co movie icon"
          ></img>
        </div>
        <div className="right-panel">
          <div className="form-container">{renderForm()}</div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
