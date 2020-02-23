import React, { Component } from "react";
import GroupOrientation from "./ButtonGroup";
import CreateRoundedIcon from "@material-ui/icons/CreateRounded";
import ThumbUpAltOutlinedIcon from '@material-ui/icons/ThumbUpAltOutlined';
import "./styles.css";

import avatarImageSrc from "../../imgs/user_account/chocobo_avatar.jpg";

class UserProfile extends Component {
  render() {
    return (
      <div className="profileContainer">
        <div className="leftSideBar">
          <div className="avatarImageContainer">
            <img className="avatarImage" src={avatarImageSrc} />
          </div>
          <div className="buttonContainer">
            <GroupOrientation />
          </div>
        </div>
        <div className="rightSideBar">
          <div className="userInfoBar">
            <div className="username">
              <h1>Chocobosdfsdfsdf</h1>
              <div className="iconContainer">
                <CreateRoundedIcon fontSize="medium" />
              </div>
            </div>
            <div className="likes">
              <h2>12345</h2>
              <div className="iconContainer">
                <ThumbUpAltOutlinedIcon fontSize="medium" />
              </div>
            </div>
          </div>
          <div className="userBioContainer">
              <p>Love games! Big fan of RPG games! Play games for 12 hours every day! 
                  Saved hundreds of interesting games to my collection! Check it out!
                  Don't forget to like me if you enjoy my collections or reviews!</p>
          </div>
        </div>
      </div>
    );
  }
}

export default UserProfile;
