import React from "react";
import { v4 as uuidv4 } from "uuid";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { setActiveMovie } from "../actions";
import "./css/Movieitem.css";

const MovieItem = ({ movie, setActiveMovie, history }) => {
  const handleClick = () => {
    setActiveMovie(movie);
    history.push(`/room/${uuidv4()}`);
  };

  return (
    <div className="movie-item">
      <div className="movie-title" onClick={handleClick}>
        {movie.title}
      </div>
      <div className="movie-url">{movie.url}</div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
    movies: state.movies,
  };
};

export default connect(mapStateToProps, { setActiveMovie })(
  withRouter(MovieItem)
);
