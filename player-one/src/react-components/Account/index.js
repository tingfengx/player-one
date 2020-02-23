import React, { Component } from "react";
import TopNavBar from "../TopNavBar";
import UserProfile from "./UserProfile"; 
import "./styles.css";

import backgroundImageSrc from "../../imgs/user_account/ff7_wallpaper.jpg";

/* Component for the user home page */
class Account extends Component {
  render() {
    const sections = [
      { title: "Featured", url: "#" },
      { title: "Trending", url: "#" },
      { title: "RPG Game", url: "#" },
      { title: "Leisure", url: "#" },
      { title: "Scenery", url: "#" },
      { title: "bruh", url: "#" },
      { title: "what else", url: "#" }
    ];
    return (
      <div>
        <div>
          <TopNavBar sections={sections} title="PLAYER ONE" />
        </div>
        <div className="backgroundImageContainer">
          <img src={backgroundImageSrc} />
        </div>
        <UserProfile/>
      </div>
    );
  }
}

export default Account;
