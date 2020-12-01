import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchUserMovies } from "../actions";
import MovieItem from "./MovieItem";
import "./css/Library.css";

class Library extends Component {
  componentDidMount() {
    this.props.fetchUserMovies(this.props.auth.user.id);
  }

  renderMovies() {
    return this.props.movies.map((movie) => {
      return <MovieItem movie={movie} key={movie._id} />;
    });
  }

  render() {
    return <div className="library">{this.renderMovies()}</div>;
  }
}

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
    movies: state.movies,
  };
};

export default connect(mapStateToProps, { fetchUserMovies })(Library);
