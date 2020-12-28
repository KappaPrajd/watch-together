import React from "react";
import "./css/Chat.css";

const Chat = ({ users }) => {
  const renderUsers = () => {
    return users.map((user, index) => {
      return (
        <div className="user" key={index}>
          <i className="fas fa-user-circle" aria-hidden="true"></i>
          <div className="user-name">{user.username}</div>
          <hr />
        </div>
      );
    });
  };

  return <div className="chat">{renderUsers()}</div>;
};

export default Chat;
