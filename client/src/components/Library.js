import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchUserMovies } from "../actions";
import "./css/Library.css";

class Library extends Component {
  componentDidMount() {
    this.props.fetchUserMovies(this.props.auth.user.id);
  }

  renderMovies() {
    return this.props.movies.map((movie) => {
      return <p key={movie._id}>{movie.title}</p>;
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
