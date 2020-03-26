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

const log = console.log
const baseURL = 'http://localhost:5000'


class UserProfile extends Component {
  constructor() {
    super();
    this.state = {
      bio: "Love games! Big fan of RPG games!",
      name: "",
      editName: false,
      nameInput: "Love games! Big fan of RPG games!",
      membership: ""
    };
  }

  componentDidMount() {
    // GET /users/:userId
    const userId = this.props.cookies.cookies.userId
    const url = baseURL + '/users/' + userId

    const request = new Request(url, {
      method: 'get',
      credentials: 'include',
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
      }
    })

    fetch(request)
      .then((res) => {
        if (res.status === 200) {
          return res.json()
        } else {
          log('Failed fetching user')
        }
      })
      .then((data) => {
        // const registerYear = data.registerTime.getYear()
        this.setState({
          bio: data.bio,
          nameInput: data.bio,
          membership: "player one member since 2020"
        })
      })
      .catch((error) => {
        log(error)
      })
    this.setState({
      name: this.props.cookies.cookies.username
    });
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
    const userId = this.props.cookies.cookies.userId
    const url = baseURL + '/users/' + userId + '/bio'

    this.setState({ 
      bio: this.state.nameInput, 
      editName: false }, () => {
        const data = {
          bio: this.state.bio
        }

        const request = new Request(url, {
          method: 'patch',
          credentials: 'include',
          body: JSON.stringify(data),
          headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
          }
        })

        fetch(request)
        .then((res) => {
          if (res.status === 200) {
            log('Successfully edited bio!')
          } else {
            log('Failed editing bio.')
          }
        }).catch((error) => {
          log(error)
        })
      });
  };

  render() {

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
              </div>
              <p className="gamerText">{this.state.membership}</p>
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
                {this.state.bio}
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
                <p>
                  <strong className="usernameText">{this.state.name}</strong>
                </p>
              </div>
              <p className="gamerText">{this.state.membership}</p>
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
              <TextField
                id="nameInput"
                multiline
                size="small"
                color="secondary"
                variant="outlined"
                onChange={this.handleChange}
                name="nameInput"
                defaultValue={this.state.bio}
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
          </div>
        </div>
      );
    }
  }
}

export default withCookies(UserProfile);
