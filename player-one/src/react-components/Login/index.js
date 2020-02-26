import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import Button from "@material-ui/core/Button";

import TextField from "@material-ui/core/TextField";

import "./style.css";
import InputAdornment from "@material-ui/core/InputAdornment";
import TopNavBar from "../TopNavBar";

import Typography from "@material-ui/core/Typography";

// hardcoded users
const users = [];

class User {
  constructor(username, password, type) {
    this.username = username;
    this.password = password;
    this.type = type;
  }
}

users.push(new User("user", "user", "user"));
users.push(new User("admin", "admin", "admin"));

class SignInForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "",
      password: "",
      isLoggedIn: false,
      type: ""
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    if (this.state.isLoggedIn) {
      this.props.history.push({
        pathname: "/",
        state: { username: this.state.username, type: this.state.type }
      });
    }
  }

  componentDidUpdate() {
    if (this.state.isLoggedIn) {
      this.props.history.push({
        pathname: "/",
        state: { username: this.state.username, type: this.state.type }
      });
    }
  }

  handleChange = e => {
    let target = e.target;
    let value = target.type === "checkbox" ? target.checked : target.value;
    let name = target.name;

    this.setState({
      [name]: value
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    let status = false;
    let userType = "";
    for (let i = 0; i < users.length; i++) {
      let user = users[i];
      if (
        this.state.username == user.username &&
        this.state.password == user.password
      ) {
        status = true;
        userType = user.type;
        break;
      }
    }

    this.setState({ isLoggedIn: status, type: userType }, () => {
      let msg = status
        ? "successfully signed in"
        : "wrong username or password";
      // alert(msg);
      console.log(msg);
      console.log("The form was submitted with the following data:");
      console.log(this.state);
      // let userInfo = {username: this.state.username, type: this.state.type};
      // this.props.history.push({pathname: "/", state: { detail: userInfo}});
    });
  };

  // const classes = useStyles();

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
      <div className="homeImage">
        <TopNavBar sections={sections} title="PLAYER ONE" />
        <div className="FormCenter">
          <Typography variant="button" display="block" gutterBottom>
            <h3>Sign-In </h3>
          </Typography>

          <form
            onSubmit={this.handleSubmit}
            className="FormFields"
            onSubmit={this.handleSubmit}
          >
            <div className="FormField">
              <TextField
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">User Name</InputAdornment>
                  )
                }}
                className="textField"
                variant="outlined"
                margin="normal"
                required
                fullWidth
                color="secondary"
                id="UserName"
                label="User Name"
                name="username"
                autoFocus
                onChange={this.handleChange}
              />
            </div>

            <div className="FormField">
              <TextField
                className="textField"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">Password</InputAdornment>
                  )
                }}
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                onChange={this.handleChange}
              />
            </div>

            <div className="FormField">
              &nbsp; &nbsp;
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              &nbsp;
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              &nbsp;&nbsp;&nbsp;
              <Button variant="outlined" onClick={this.handleSubmit}>
                Yeah!
              </Button>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              &nbsp;
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default withRouter(SignInForm);
