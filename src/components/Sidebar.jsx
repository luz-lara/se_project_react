import React from "react";
import avatar from "../images/avatar.svg";
import "../blocks/sidebar.css";

function SideBar() {
  const username = "Terrence Hughes"; // Hardcoded username

  return (
    <div className="sidebar">
      <img src={avatar} alt="user avatar" className="sidebar__avatar" />
      <p className="profile_username">{username}</p>
    </div>
  );
}

export default SideBar;
