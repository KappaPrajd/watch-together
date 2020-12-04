import React, { Component } from "react";
import { v4 as uuidv4 } from "uuid";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { addMovie, setActiveMovie } from "../actions/";
import "./css/CreateRoom.css";

class CreateRoom extends Component {
  constructor() {
    super();

    this.state = {
      title: "",
      url: "",
    };
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const newMovie = {
      title: this.state.title,
      url: this.state.url,
      userId: this.props.auth.user.id,
    };

    if (this.props.auth.isAuthenticated) {
      this.props.addMovie(newMovie);
    }

    this.props.setActiveMovie(newMovie);
    this.props.history.push(`/room/${uuidv4()}`);
  };

  handleInputChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    const errors = this.props.errors;

    return (
      <div className="create_room_box">
        <form onSubmit={this.handleSubmit}>
          <div className="form-header">
            <h3>Create room</h3>
          </div>
          <div className="form-body">
            <label>Title</label>
            <input
              type="text"
              name="title"
              value={this.state.title}
              onChange={this.handleInputChange}
            ></input>
            {errors.title ? <p className="error">{errors.title}</p> : null}
            <label>Url</label>
            <input
              type="text"
              name="url"
              value={this.state.url}
              onChange={this.handleInputChange}
            ></input>
            {errors.url ? <p className="error">{errors.url}</p> : null}
            <button>Submit movie</button>
          </div>
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
    errors: state.errors,
  };
};

export default connect(mapStateToProps, { addMovie, setActiveMovie })(
  withRouter(CreateRoom)
);
