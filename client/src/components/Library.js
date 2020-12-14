import React, { useEffect } from "react";
import { connect } from "react-redux";
import { fetchUserMovies } from "../actions";
import MovieItem from "./MovieItem";
import "./css/Library.css";

const Library = ({ auth, movies, changeMovie, fetchUserMovies }) => {
  useEffect(() => {
    if (auth.isAuthenticated) {
      fetchUserMovies(auth.user.id);
    }
  }, [auth.isAuthenticated, auth.user.id, fetchUserMovies]);

  const renderMovies = () => {
    if (!auth.isAuthenticated) {
      return <div>Log in to add movies</div>;
    } else if (auth.isAuthenticated && movies.length === 0) {
      return <div>Add new movies</div>;
    }

    return movies.userMovies.map((movie, index) => {
      return <MovieItem movie={movie} key={index} changeMovie={changeMovie} />;
    });
  };

  return <div className="library">{renderMovies()}</div>;
};

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
    movies: state.movies,
  };
};

export default connect(mapStateToProps, { fetchUserMovies })(Library);
