import React, { useState, useEffect, useRef } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import "./css/Navbar.css";
import ProfileInfo from "./ProfileInfo";

const Navbar = ({ isAuthenticated }) => {
  const [showProfileInfo, setShowProfileInfo] = useState(false);
  const profileIconRef = useRef();

  const useOutsideAlerter = (ref) => {
    useEffect(() => {
      const handleClickOutside = (event) => {
        if (ref.current && !ref.current.contains(event.target)) {
          setShowProfileInfo(false);
        }
      };

      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [ref]);
  };

  const renderItems = () => {
    if (isAuthenticated) {
      return (
        <ul>
          <Link to="/about">
            <li>About</li>
          </Link>
          <li>
            <i
              className="far fa-user-circle"
              onClick={() => setShowProfileInfo(!showProfileInfo)}
              ref={profileIconRef}
            ></i>
          </li>
          <li>
            <i className="fab fa-github"></i>
          </li>
        </ul>
      );
    } else {
      return (
        <ul>
          <Link to="/about">
            <li>About</li>
          </Link>
          <li>Sign In</li>
          <li>Github</li>
        </ul>
      );
    }
  };

  useOutsideAlerter(profileIconRef);
  return (
    <React.Fragment>
      <div className="nav">
        <div className="icon">
          <i className="fas fa-play-circle"></i>
        </div>
        <div className="search-movie">
          <input type="text" placeholder="Search your movies..."></input>
        </div>
        <div className="nav-items">{renderItems()}</div>
      </div>
      <ProfileInfo active={showProfileInfo} />
    </React.Fragment>
  );
};

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.auth.isAuthenticated,
  };
};

export default connect(mapStateToProps)(Navbar);
