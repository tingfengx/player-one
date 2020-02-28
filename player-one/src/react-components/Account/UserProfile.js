import React, { Component } from "react";
import { withCookies } from "react-cookie";
import GroupOrientation from "./ButtonGroup";
import CreateRoundedIcon from "@material-ui/icons/CreateRounded";
import ThumbUpAltOutlinedIcon from "@material-ui/icons/ThumbUpAltOutlined";
import LibraryBooksIcon from '@material-ui/icons/LibraryBooks';
import "./styles.css";

import avatarImageSrc from "../../imgs/user_account/chocobo_avatar.jpg";

class UserProfile extends Component {
  render() {
    const { cookies } = this.props;

    return (
      <div className="profileContainer">
        <div className="leftSideBar">
          <div className="avatarImageContainer">
            <img className="avatarImage" src={avatarImageSrc} alt="user avatar" />
          </div>
          {/* <div className="buttonContainer">
            <GroupOrientation />
          </div> */}
        </div>
        <div className="rightSideBar">
          <div className="userInfoBar">
            <div className="username">
              <p><strong className="usernameText">{cookies.cookies.username}</strong></p>
              <span className="iconContainer">
                <CreateRoundedIcon fontSize="medium" color="primary" />
              </span>
            </div>
            <p className="gamerText">gamer since 2000</p>
            <div className="countsContainer">
            <div className="likes">
              <h2>123</h2>
              <div className="iconContainer">
                <LibraryBooksIcon fontSize="medium" />
              </div>
            </div>
            <div className="likes">
              <h2>12345</h2>
              <div className="iconContainer">
                <ThumbUpAltOutlinedIcon fontSize="medium" />
              </div>
            </div>
            </div>
          </div>
          <div className="userBioContainer">
            <p>
              Love games! Big fan of RPG games! Play games for 12 hours every
              day! Saved hundreds of interesting games to my collection! Check
              it out! Don't forget to like me if you enjoy my collections or
              reviews!
            </p>
          </div>
        </div>
      </div>
    );
  }
}

export default withCookies(UserProfile);
