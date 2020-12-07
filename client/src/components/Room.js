import React, { Component } from "react";
import SocketIOClient from "socket.io-client";
import { connect } from "react-redux";
import { setActiveRoom, setActiveMovie } from "../actions";
import Navbar from "./Navbar";
import Library from "./Library";
import Player from "./Player";

class Room extends Component {
  constructor() {
    super();

    this.ENDPOINT = "http://localhost:5000/";
    this.socket = SocketIOClient(this.ENDPOINT);

    this.socket.on("message", (message) => {
      console.log(message);
    });
  }

  componentDidMount() {
    const url = window.location.href.split("/");
    const roomId = url[url.length - 1];

    const newRoom = {
      id: roomId,
    };

    this.props.setActiveRoom(newRoom);

    this.socket.emit("joinRoom", {
      username: this.props.auth.isAuthenticated
        ? this.props.auth.user.name
        : "Guest",
      room: roomId,
    });
  }

  componentWillUnmount() {
    this.props.setActiveRoom(null);
    this.props.setActiveMovie(null);
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
          <img src="../img/wave_bg.png" alt="wave_bg"></img>
          <Player />
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

export default connect(mapStateToProps, { setActiveRoom, setActiveMovie })(
  Room
);
