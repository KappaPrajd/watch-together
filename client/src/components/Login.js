import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { loginUser } from "../actions";

class Login extends Component {
  constructor() {
    super();

    this.state = {
      email: "",
      password: "",
    };
  }

  onInputChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onFormSubmit = (e) => {
    e.preventDefault();

    const userData = {
      email: this.state.email,
      password: this.state.password,
    };

    this.props.loginUser(userData, this.props.history);
  };

  render() {
    const errors = this.props.errors;

    return (
      <React.Fragment>
        <form onSubmit={this.onFormSubmit}>
          <div className="form-header">
            <h3>Sign In</h3>
          </div>
          <div className="form-body">
            <label>Email</label>
            <input
              type="text"
              name="email"
              onChange={this.onInputChange}
              value={this.state.email}
            ></input>
            {errors.email ? <p className="error">{errors.email}</p> : null}
            <label>Password</label>
            <input
              type="password"
              name="password"
              onChange={this.onInputChange}
              value={this.state.password}
            ></input>
            {errors.password ? (
              <p className="error">{errors.password}</p>
            ) : null}
          </div>
          <div className="form-footer">
            <div className="sign-in">
              <p onClick={() => this.props.handleClick("Register")}>
                Create an account
              </p>
            </div>
            <button type="submit">Login</button>
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

export default connect(mapStateToProps, { loginUser })(withRouter(Login));
