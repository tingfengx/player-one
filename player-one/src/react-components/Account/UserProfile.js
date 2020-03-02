import React, { Component } from "react";
import { withCookies } from "react-cookie";
import IconButton from "@material-ui/core/IconButton";
import CreateRoundedIcon from "@material-ui/icons/CreateRounded";
import ThumbUpAltOutlinedIcon from "@material-ui/icons/ThumbUpAltOutlined";
import LibraryBooksIcon from "@material-ui/icons/LibraryBooks";
import DoneIcon from "@material-ui/icons/Done";
import TextField from "@material-ui/core/TextField";
import "./styles.css";

import avatarImageSrc from "../../imgs/user_account/chocobo_avatar.jpg";

class UserProfile extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
      editName: false,
      nameInput: ""
    };
  }

  componentWillMount() {
    console.log(this.props.cookies);
    this.setState({ name: this.props.cookies.cookies.username });
  }

  handleChange = e => {
    let target = e.target;
    let value = target.type === "checkbox" ? target.checked : target.value;
    let name = target.name;

    this.setState({
      [name]: value
    });
  };

  handleStartEditingName = e => {
    this.setState({ editName: true });
  };

  handleFinishEditingName = e => {
    if (this.state.nameInput.length > 0) {
      this.setState({ name: this.state.nameInput, editName: false });
    } else {
      alert("handle name is too short");
    }
  };

  render() {
    const { cookies } = this.props;

    if (!this.state.editName) {
      return (
        <div className="profileContainer">
          <div className="leftSideBar">
            <div className="avatarImageContainer">
              <img
                className="avatarImage"
                src={avatarImageSrc}
                alt="user avatar"
              />
            </div>
          </div>
          <div className="rightSideBar">
            <div className="userInfoBar">
              <div className="username">
                <p>
                  <strong className="usernameText">{this.state.name}</strong>
                </p>
                <span className="iconContainer">
                  <IconButton
                    color="secondary"
                    onClick={this.handleStartEditingName}
                  >
                    <CreateRoundedIcon fontSize="medium" />
                  </IconButton>
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
    } else {
      return (
        <div className="profileContainer">
          <div className="leftSideBar">
            <div className="avatarImageContainer">
              <img
                className="avatarImage"
                src={avatarImageSrc}
                alt="user avatar"
              />
            </div>
          </div>
          <div className="rightSideBar">
            <div className="userInfoBar">
              <div className="username">
                <TextField
                  id="nameInput"
                  size="small"
                  color="secondary"
                  onChange={this.handleChange}
                  name="nameInput"
                  defaultValue={this.state.name}
                ></TextField>
                <span className="iconContainer">
                  <IconButton
                    color="secondary"
                    onClick={this.handleFinishEditingName}
                  >
                    <DoneIcon fontSize="medium" />
                  </IconButton>
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
}

export default withCookies(UserProfile);
