import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import "./css/Navbar.css";

const Navbar = ({ isAuthenticated }) => {
  const renderItems = () => {
    if (isAuthenticated) {
      return (
        <ul>
          <Link to="/about">
            <li>About</li>
          </Link>
          <li>
            <i className="far fa-user-circle"></i>
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

  return (
    <div className="nav">
      <div className="icon">
        <i className="fas fa-play-circle"></i>
      </div>
      <div className="search-movie">
        <input type="text" placeholder="Search your movies..."></input>
      </div>
      <div className="nav-items">{renderItems()}</div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.auth.isAuthenticated,
  };
};

export default connect(mapStateToProps)(Navbar);
