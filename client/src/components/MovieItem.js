import React from "react";
import { v4 as uuidv4 } from "uuid";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import "./css/Movieitem.css";

const MovieItem = (props) => {
  const handleClick = () => {
    props.changeMovie(props.movie.url, props.movie.title);

    if (!props.movies.isInRoom) {
      props.history.push(`/room/${uuidv4()}`);
    }
  };

  return (
    <div className="movie-item">
      <div className="movie-title" onClick={handleClick}>
        {props.movie.title}
      </div>
      <div className="movie-url">{props.movie.url}</div>
      <i className="fas fa-backspace"></i>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
    movies: state.movies,
  };
};

export default connect(mapStateToProps)(withRouter(MovieItem));
