import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { addMovie } from "../actions/";
import "./css/CreateRoom.css";

class CreateRoom extends Component {
  constructor() {
    super();

    this.state = {
      title: "",
      file: null,
    };
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();

    formData.append("file", this.state.file);
    formData.append("title", this.state.title);
    formData.append("userId", this.props.auth.user.id);

    this.props.addMovie(formData, this.props.auth.user.id);
  };

  handleInputChange = (e) => {
    if (e.target.files) {
      this.setState({ file: e.target.files[0] });
    } else {
      this.setState({ [e.target.name]: e.target.value });
    }
  };

  render() {
    const errors = this.props.errors;

    return (
      <div className="create_room_box">
        <form onSubmit={this.handleSubmit} encType="multiplart/form-data">
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
              type="file"
              name="file"
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

export default connect(mapStateToProps, { addMovie })(withRouter(CreateRoom));
