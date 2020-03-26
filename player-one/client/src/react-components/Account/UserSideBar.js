import React, { Component } from "react";
import { withCookies } from "react-cookie";
import OutlinedChipsProfile from "./UserProfileTags";
import OutlinedChipsGame from "./UserGameTags";
import IconButton from "@material-ui/core/IconButton";
import AddIcon from "@material-ui/icons/Add";
import TextField from "@material-ui/core/TextField";
import "./styles.css";

const log = console.log
const baseURL = 'http://localhost:5000'


class UserSideBar extends Component {
  constructor() {
    super();
    this.state = {
      profileTags: ["professional", "everyday", "ps4", "ns", "psv", "ios"],
      gameTags: [],
      profileTagInput: "",
      gameTagInput: ""
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
        this.setState({ gameTags: data.gameTags, profileTags: data.profileTags })
      })
      .catch((error) => {
        log(error)
      })
  }

  handleChange = e => {
    let target = e.target;
    let value = target.type === "checkbox" ? target.checked : target.value;
    let name = target.name;

    this.setState({
      [name]: value
    });
  };

  handleAddProfileTag = e => {
    let input = this.state.profileTagInput;
    if (input.length === 0) {
      return
    }

    const userId = this.props.cookies.cookies.userId
    const url = baseURL + '/users/' + userId + '/tags/profile'

    this.setState({
      profileTags: [...this.state.profileTags, input]
    }, () => {
      const data = {
        tags: this.state.profileTags
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
            log('Successfully added tag!')
          } else {
            log('Failed adding tag.')
          }
        }).catch((error) => {
          log(error)
        })
    })
  };

  handleAddGameTag = e => {
    let input = this.state.gameTagInput;
    if (input.length === 0) {
      return
    }

    const userId = this.props.cookies.cookies.userId
    const url = baseURL + '/users/' + userId + '/tags/game'

    this.setState({
      gameTags: [...this.state.gameTags, input]
    }, () => {
      const data = {
        tags: this.state.gameTags
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
            log('Successfully added tag!')
          } else {
            log('Failed adding tag.')
          }
        }).catch((error) => {
          log(error)
        })
    })
  };

  render() {
    return (
      <div className="sideBarContainer">
        <div className="profileTagContainer">
          <p>More about myself as a gamer</p>
          <OutlinedChipsProfile tags={this.state.profileTags} />
          <br />
          <TextField
            id="addProfileTagText"
            size="small"
            label="add a tag"
            variant="outlined"
            color="secondary"
            onChange={this.handleChange}
            name="profileTagInput"
          ></TextField>
          <IconButton color="secondary" onClick={this.handleAddProfileTag}>
            <AddIcon />
          </IconButton>
        </div>
        <div className="gameTagContainer">
          <p>My favorite games</p>
          <OutlinedChipsGame tags={this.state.gameTags} />
          <br />
          <TextField
            id="addGameTagText"
            size="small"
            label="add a tag"
            variant="outlined"
            color="primary"
            onChange={this.handleChange}
            name="gameTagInput"
          ></TextField>
          <IconButton color="primary" onClick={this.handleAddGameTag}>
            <AddIcon />
          </IconButton>
        </div>
      </div>
    );
  }
}

export default withCookies(UserSideBar);
