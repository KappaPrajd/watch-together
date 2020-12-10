import React from "react";
import { v4 as uuidv4 } from "uuid";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { changeActiveMovie, setActiveRoom } from "../actions";
import "./css/Movieitem.css";

const MovieItem = ({ movie, changeActiveMovie, history, movies }) => {
  const handleClick = async () => {
    if (!movies.activeRoom) {
      const roomId = uuidv4();
      history.push(`/room/${roomId}`);
      await setActiveRoom(roomId);
      changeActiveMovie(movie, roomId);
    } else {
      const url = window.location.href.split("/");
      const Id = url[url.length - 1];
      await setActiveRoom(Id);
      changeActiveMovie(movie, Id);
    }
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

export default connect(mapStateToProps, { changeActiveMovie })(
  withRouter(MovieItem)
);
