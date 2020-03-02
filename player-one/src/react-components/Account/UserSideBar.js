import React, { Component } from "react";
import OutlinedChipsProfile from "./UserProfileTags";
import OutlinedChipsGame from "./UserGameTags";
import IconButton from "@material-ui/core/IconButton";
import AddIcon from "@material-ui/icons/Add";
import TextField from "@material-ui/core/TextField";
import "./styles.css";

class UserSideBar extends Component {
  constructor() {
    super();
    this.state = {
      profileTags: ["professional", "everyday", "ps4", "ns", "psv", "ios"],
      gameTags: [
        "rpg",
        "action",
        "witcher3",
        "ff7",
        "p5",
        "open world",
        "nier automata",
        "just dance",
        "dmc5"
      ],
      profileTagInput: "",
      gameTagInput: ""
    };
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
    if (input.length > 0) {
      this.setState({
        profileTags: [...this.state.profileTags, input]
      });
    }
  };

  handleAddGameTag = e => {
    let input = this.state.gameTagInput;
    if (input.length > 0) {
      this.setState({
        gameTags: [...this.state.gameTags, input]
      });
    }
  };

  render() {
    return (
      <div class="sideBarContainer">
        <div className="profileTagContainer">
          <p>As a gamer..</p>
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
          <p>Favorite games</p>
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

export default UserSideBar;
