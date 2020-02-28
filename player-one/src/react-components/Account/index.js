import React, { Component } from "react";
import UserProfile from "./UserProfile";
import UserActivities from "./UserActivities";
import "./styles.css";

import backgroundImageSrc from "../../imgs/user_account/ff7_wallpaper.jpg";


/* Component for the user home page */
class Account extends Component {
  render() {
    return (
      <div>
        <div className="backgroundImageContainer">
          <img src={backgroundImageSrc} alt="background" />
        </div>
        <UserProfile />
        <UserActivities />
      </div>
    );
  }
}

export default Account;
