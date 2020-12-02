import React from "react";
import SocketIOClient from "socket.io-client";
const ENDPOINT = "http://localhost:5000";

const Room = () => {
  const socket = SocketIOClient(ENDPOINT);

  socket.on("message", (message) => {
    console.log(message);
  });

  const handleClick = () => {
    socket.emit("click", "another user has clicked on the page");
  };

  return <button onClick={handleClick}>click</button>;
};

export default Room;
