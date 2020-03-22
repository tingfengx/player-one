import React, { Component } from "react";
import UserProfile from "./UserProfile";
import UserActivities from "./UserActivities";
import UserSideBar from "./UserSideBar"
import "./styles.css";

import backgroundImageSrc from "../../imgs/user_account/ff7_wallpaper.jpg";


/* Component for the user home page */
class Account extends Component {
  render() {
    return (
      <div className="accountContainer">
        <div className="backgroundImageContainer">
          <img src={backgroundImageSrc} alt="background" />
        </div>
        <UserProfile />
        <UserSideBar />
        <UserActivities />
      </div>
    );
  }
}

export default Account;
