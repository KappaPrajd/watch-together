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
        <div className="profile_name">J00zef11</div>
<<<<<<< HEAD
        <div className="profile_mail">jozek1312@gmail.pl</div>
        <hr></hr>
        <button className="signout_button">Log out</button>
=======
        <button onClick={handleClick}>Log out</button>
>>>>>>> ce7d5ada5cdb5fb0b93155e0e53216bb3735848c
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
