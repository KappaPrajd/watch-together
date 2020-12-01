import React from "react";
import "./css/ProfileInfo.css";

const ProfileInfo = (props) => {
  return (
    <div className="profile_info_box" style={{ zIndex: props.active ? 1 : -1 }}>
      <form>
        <div className="profile_img"></div>
        <div className="profile_name">J00zef11</div>
        <button>Log out</button>
      </form>
    </div>
  );
};

export default ProfileInfo;
