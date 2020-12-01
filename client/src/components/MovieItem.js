import React from "react";

const MovieItem = ({ movie }) => {
  return (
    <div className="movie-item">
      <p>{movie.title}</p>
      <p>{movie.url}</p>
      <hr></hr>
    </div>
  );
};

export default MovieItem;
