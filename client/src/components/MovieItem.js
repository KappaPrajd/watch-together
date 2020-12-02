import React from "react";
import "./css/Movieitem.css";

const MovieItem = ({ movie }) => {
  return (
    <div className="movie-item">
      <div className="movie-title">{movie.title}</div>
      <div className="movie-url">{movie.url}</div>
    </div>
  );
};

export default MovieItem;
