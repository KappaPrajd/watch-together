import React, { useState, useEffect, useRef } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import "./css/Navbar.css";
import ProfileInfo from "./ProfileInfo";

const Navbar = ({ isAuthenticated, userMovies }) => {
  const [showProfileInfo, setShowProfileInfo] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredMovies, setfilteredMovies] = useState([]);
  const profileIconRef = useRef();
  const profileInfoRef = useRef();

  useEffect(() => {
    if (userMovies) {
      const movies = userMovies.filter((movie) =>
        movie.title.toLowerCase().includes(searchTerm.toLowerCase())
      );

      setfilteredMovies(movies);
    }
  }, [userMovies, searchTerm]);

  const useOutsideAlerter = (ref) => {
    useEffect(() => {
      const handleClickOutside = (event) => {
        if (
          profileInfoRef.current &&
          profileInfoRef.current.contains(event.target)
        ) {
          return;
        }

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

  const renderProfileInfo = () => {
    if (showProfileInfo) {
      return (
        <div className="profile-info-box" ref={profileInfoRef}>
          <ProfileInfo />
        </div>
      );
    }

    return null;
  };

  const renderItems = () => {
    if (isAuthenticated) {
      return (
        <ul>
          <Link to="/about">
            <li className="about-link">About</li>
          </Link>
          <li>
            <i
              className="far fa-user-circle"
              onClick={() => setShowProfileInfo(!showProfileInfo)}
              ref={profileIconRef}
            ></i>
          </li>
          <li>
            <a
              href="https://github.com/KappaPrajd/watch-together"
              target="_blank"
              rel="noreferrer"
            >
              <i className="fab fa-github"></i>
            </a>
          </li>
        </ul>
      );
    } else {
      return (
        <ul>
          <Link to="/about">
            <li>About</li>
          </Link>
          <Link to="/auth">
            <li>Sign In</li>
          </Link>
          <a
            href="https://github.com/KappaPrajd/watch-together"
            target="_blank"
            rel="noreferrer"
          >
            <li>
              <i className="fab fa-github"></i>
            </li>
          </a>
        </ul>
      );
    }
  };

  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const renderFilteredMovies = () => {
    if (filteredMovies.length === 0 || !searchTerm) {
      return;
    }

    const searchItems = filteredMovies.map((movie, index) => {
      return (
        <div className="search-item" key={index}>
          <p>{movie.title}</p>
        </div>
      );
    });

    return <div className="search-results">{searchItems}</div>;
  };

  useOutsideAlerter(profileIconRef);

  return (
    <React.Fragment>
      <div className="nav">
        <div className="icon">
          <Link to="/">
            <i className="fas fa-play-circle"></i>
          </Link>
        </div>
        <div className="search-movie">
          <input
            type="text"
            placeholder="Search your movies..."
            value={searchTerm}
            onChange={(e) => handleInputChange(e)}
          ></input>
        </div>
        <div className="nav-items">{renderItems()}</div>
      </div>
      {renderFilteredMovies()}
      {renderProfileInfo()}
    </React.Fragment>
  );
};

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.auth.isAuthenticated,
    userMovies: state.movies.userMovies,
  };
};

export default connect(mapStateToProps)(Navbar);
