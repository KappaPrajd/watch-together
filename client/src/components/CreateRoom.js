import React from "react";
import "./css/CreateRoom.css";

const CreateRoom = () => {
  return (
    <div className="create_room_box">
      <form>
        <div className="form-header">
          <h3>Create room</h3>
        </div>
        <div className="form-body">
          <label>Title</label>
          <input type="text" name="movie_title"></input>
          <label>Url</label>
          <input type="text" name="movie_url"></input>
          <button name="form_button">Submit movie</button>
        </div>
      </form>
    </div>
  );
};

export default CreateRoom;
