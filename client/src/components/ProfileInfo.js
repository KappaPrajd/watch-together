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
        <div className="profile_img"></div>
        <div className="profile_name">J00zef11</div>
        <button onClick={handleClick}>Log out</button>
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
