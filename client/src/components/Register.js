import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { registerUser } from "../actions";

class Register extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
      email: "",
      password: "",
      password2: "",
    };
  }

  onInputChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onFormSubmit = (e) => {
    e.preventDefault();

    const newUser = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
      password2: this.state.password2,
    };

    this.props.registerUser(newUser, this.props.history);
  };

  render() {
    const errors = this.props.errors;

    return (
      <React.Fragment>
        <form onSubmit={this.onFormSubmit}>
          <div className="form-header">
            <h3>Create account</h3>
          </div>
          <div className="form-body">
            <label>Email</label>
            <input
              type="text"
              onChange={this.onInputChange}
              name="email"
              value={this.state.email}
            ></input>
            {errors.email ? <p className="error">{errors.email}</p> : null}
            <label>Username</label>
            <input
              type="text"
              onChange={this.onInputChange}
              name="name"
              value={this.state.name}
            ></input>
            {errors.name ? <p className="error">{errors.name}</p> : null}
            <label>Password</label>
            <input
              type="password"
              onChange={this.onInputChange}
              name="password"
              value={this.state.password}
            ></input>
            {errors.password ? (
              <p className="error">{errors.password}</p>
            ) : null}
            <label>Confirm password</label>
            <input
              type="password"
              onChange={this.onInputChange}
              name="password2"
              value={this.state.password2}
            ></input>
            {errors.password2 ? (
              <p className="error">{errors.password2}</p>
            ) : null}
          </div>
          <div className="form-footer">
            <div className="sign-in">
              <p onClick={() => this.props.handleClick("Login")}>Sign In</p>
            </div>
            <button type="submit">Register</button>
          </div>
        </form>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
    errors: state.errors,
  };
};

export default connect(mapStateToProps, { registerUser })(withRouter(Register));
