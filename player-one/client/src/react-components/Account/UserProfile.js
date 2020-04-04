import React, { Component } from "react";
import { withCookies } from "react-cookie";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import CreateRoundedIcon from "@material-ui/icons/CreateRounded";
import ThumbUpAltOutlinedIcon from "@material-ui/icons/ThumbUpAltOutlined";
import LibraryBooksIcon from "@material-ui/icons/LibraryBooks";
import DoneIcon from "@material-ui/icons/Done";
import TextField from "@material-ui/core/TextField";
import "./styles.css";


const log = console.log
const baseURL = ''


class UserProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bio: "Love games! Big fan of RPG games!",
      name: "",
      editName: false,
      nameInput: "Love games! Big fan of RPG games!",
      membership: "",
      avatar: null,
      numOfComments: 0,
      numOfLikes: 0
    };
  }

  componentDidMount() {
    console.log(this.props)
    const userId = this.props.cookies.cookies.user_id;
    const commentsURL = baseURL + '/games/comments/byUser/' + userId

    const commentsRequest = new Request(commentsURL, {
      method: 'get',
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
      }
    })

    fetch(commentsRequest)
    .then((res) => {
      if (res.status === 200) {
        return res.json()
      } else {
        log('Failed fetching comments')
      }
    })
    .then((data) => {
      let likes = 0
      let num = 0
      for (let i = 0; i < data.longComments.length; i++) {
        likes = likes + data.longComments[i].thumbUp
        num = num + 1
      }
      for (let i = 0; i < data.shortComments.length; i++) {
        likes = likes + data.shortComments[i].thumbUp
        num = num + 1
      }
      this.setState({
        numOfComments: num,
        numOfLikes: likes
      })
    })
    .catch((error) => {
      log(error)
    })

    // GET /users/:userId
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
          avatar: data.avatarId,
          membership: "PLAYER ONE member since 2020"
        })
      })
      .catch((error) => {
        log(error)
      })
    this.setState({
      name: this.props.cookies.cookies.user_name
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

  handleUpload = e => {
    const userId = this.props.cookies.cookies.user_id
    const cloudinaryURL = "https://api.cloudinary.com/v1_1/dzld6bb6y/image/upload"

    const formData = new FormData();
    formData.append('file', e.target.files[0])
    formData.append('upload_preset', 'wzgg2ljz')
    formData.append('folder', 'user_account')
    // formData.append('use_filename', true)
    // formData.append('unique_filename', false)

    const uploadRequest = new Request(cloudinaryURL, {
      method: "post",
      body: formData
    })

    let imageURL;

    fetch(uploadRequest)
      .then((res) => {
        if (res.status === 200) {
          log('Successfully uploaded avatar!')
          return res.json()
        } else {
          log('Failed uploading avatar.')
        }
      }).then((data) => {
        imageURL = data.url
        this.setState({ avatar: data.url })

        const updateURL = baseURL + '/users/' + userId + '/avatar'
        const updateRequest = new Request(updateURL, {
          method: 'put',
          credentials: 'include',
          headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ 'avatarId': imageURL })
        })

        fetch(updateRequest)
          .then((res) => {
            if (res.status === 200) {
              log('Successfully updated avatar!')
            } else {
              log('Failed updating avatar')
            }
          }).catch((error) => {
            log(error)
          })
      })
      .catch((error) => {
        log(error)
      })
  }

  handleStartEditingName = e => {
    this.setState({ editName: true });
  };

  handleFinishEditingName = e => {
    const userId = this.props.cookies.cookies.user_id;
    const url = baseURL + '/users/' + userId + '/bio'

    this.setState({
      bio: this.state.nameInput,
      editName: false
    }, () => {
      const data = {
        bio: this.state.bio
      }

      const request = new Request(url, {
        method: 'put',
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
                src={this.state.avatar}
                alt="user avatar"
              />
            </div>
            <Button
              variant="contained"
              component="label"
              color="secondary"
              size="small"
              onChange={this.handleUpload}
            >
              Upload Avatar
  <input
                type="file"
                accept="image/*"
                style={{ display: "none" }}
              />
            </Button>
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
                  <h2>{this.state.numOfComments}</h2>
                  <div className="iconContainer">
                    <LibraryBooksIcon fontSize="medium" />
                  </div>
                </div>
                <div className="likes">
                  <h2>{this.state.numOfLikes}</h2>
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
                src={this.state.avatar}
                alt="user avatar"
              />
            </div>
            <Button
              variant="contained"
              component="label"
              color="secondary"
              size="small"
              onChange={this.handleUpload}
            >
              Upload Avatar
  <input
                type="file"
                accept="image/*"
                style={{ display: "none" }}
              />
            </Button>
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
