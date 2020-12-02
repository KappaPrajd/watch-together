import React from "react";
import "./css/ProfileInfo.css";

const ProfileInfo = (props) => {
  return (
    <div className="profile_info_box" style={{ zIndex: props.active ? 1 : -1 }}>
      <form>
        <i className="fas fa-user-circle"></i>
        <div className="profile_name">J00zef11</div>
        <div className="profile_mail">jozek1312@gmail.pl</div>
        <hr></hr>
        <button className="signout_button">Log out</button>
      </form>
    </div>
  );
};

export default ProfileInfo;
