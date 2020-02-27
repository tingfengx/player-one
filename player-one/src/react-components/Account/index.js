import React, { Component } from "react";
import UserProfile from "./UserProfile";
import UserActivities from "./UserActivities";
import "./styles.css";

import {withCookies} from "react-cookie"

import backgroundImageSrc from "../../imgs/user_account/ff7_wallpaper.jpg";

/* Component for the user home page */
class Account extends Component {
  constructor(props) {
    super(props);
    console.log(props);
  }


  render() {
    // const {state} = props
    const {cookies} = this.props;
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
        <div className="backgroundImageContainer">
          <img src={backgroundImageSrc} />
        </div>
        <UserProfile />
        <UserActivities />
      </div>
    );
  }
}

export default withCookies(Account);
