import React from "react";
import { connect } from "react-redux";
import { logoutUser } from "../actions";
import "./css/ProfileInfo.css";

const ProfileInfo = (props) => {
  const handleClick = () => {
    props.logoutUser();
  };

  return (
    <React.Fragment>
      <form>
        <i className="fas fa-user-circle"></i>
        <div className="profile-name">J00zef11</div>
        <div className="profile-mail">j0zek1312@gmail.pl</div>
        <hr></hr>
        <button className="signout-button" onClick={handleClick}>
          Log out
        </button>
      </form>
    </React.Fragment>
  );
};

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
    movies: state.movies,
  };
};

export default connect(mapStateToProps, { logoutUser })(ProfileInfo);
