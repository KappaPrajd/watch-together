import React, { Component } from "react";
import SocketIOClient from "socket.io-client";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { setActiveRoom, setActiveMovie, changeActiveRoom } from "../actions";
import Navbar from "./Navbar";
import Library from "./Library";
import Player from "./Player";
import Chat from "./Chat";

class Room extends Component {
  constructor() {
    super();

    this.state = {
      roomUsers: [],
    };

    this.ENDPOINT = "http://localhost:5000/";
    this.socket = SocketIOClient(this.ENDPOINT);

    this.socket.on("message", (message) => {
      console.log(message);
    });

    this.socket.on("roomUsers", ({ users }) => {
      this.setState({ roomUsers: users });
    });
  }

  componentDidMount() {
    const url = window.location.href.split("/");
    const roomId = url[url.length - 1];

    const newRoom = {
      id: roomId,
    };

    this.props.setActiveRoom(newRoom, this.props.history);

    this.socket.emit("joinRoom", {
      username: this.props.auth.isAuthenticated
        ? this.props.auth.user.name
        : "Guest",
      room: roomId,
    });
  }

  componentWillUnmount() {
    this.props.changeActiveRoom(null);
    this.props.setActiveMovie(null);
    this.socket.disconnect();
  }

  handleClick = () => {
    this.socket.emit("click", "another user has clicked on the page");
  };

  render() {
    return (
      <React.Fragment>
        <Navbar />
        <Library />
        <div className="add-movie">
          <Player />
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

export default connect(mapStateToProps, {
  setActiveRoom,
  setActiveMovie,
  changeActiveRoom,
})(withRouter(Room));
