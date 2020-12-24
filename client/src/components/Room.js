import React, { Component } from "react";
import SocketIOClient from "socket.io-client";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { setUserState } from "../actions";
import Navbar from "./Navbar";
import Library from "./Library";
import Player from "./Player";
import Chat from "./Chat";

class Room extends Component {
  constructor() {
    super();

    this.state = {
      globalURL: "",
      globalTitle: "",
      isPlaying: false,
    };

    this.url = window.location.href.split("/");
    this.roomId = this.url[this.url.length - 1];

    this.ENDPOINT = "http://localhost:5000/";
    this.socket = SocketIOClient(this.ENDPOINT);

    this.socket.on("roomUsers", ({ users }) => {
      this.setState({ roomUsers: users });
    });

    this.socket.on("fetchedURL", (movie) => {
      if (!movie.url) {
        this.handleMovieChange(this.props.url, this.props.title);
      } else {
        this.setState({ globalURL: movie.url, globalTitle: movie.title });
      }
    });

    this.socket.on("changeURL", (movie) => {
      this.setState({ globalURL: movie.url, globalTitle: movie.title });
    });

    this.socket.on("changePlayPause", (bool) => {
      this.setState({ isPlaying: bool });
    });
  }

  componentDidMount() {
    this.socket.emit("joinRoom", {
      username: this.props.auth.isAuthenticated
        ? this.props.auth.user.name
        : "Guest",
      room: this.roomId,
    });

    this.socket.emit("fetchURL");

    this.props.setUserState(true);
  }

  componentWillUnmount() {
    this.props.setUserState(false);
  }

  handleMovieChange = (url, title) => {
    this.socket.emit("movieChange", {
      url: url,
      title: title,
    });
  };

  handlePlayPause = (bool) => {
    this.setState({ isPlaying: bool });

    this.socket.emit("playPause", bool);
  };

  render() {
    return (
      <React.Fragment>
        <Navbar />
        <Library
          changeMovie={this.props.changeMovie}
          handleMovieChange={this.handleMovieChange}
        />
        <div className="add-movie">
          <Player
            url={this.state.globalURL}
            handlePlayPause={this.handlePlayPause}
            isPlaying={this.state.isPlaying}
          />
          <Chat />
        </div>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
    movies: state.movies,
  };
};

export default connect(mapStateToProps, { setUserState })(withRouter(Room));
