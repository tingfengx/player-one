import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import InputAdornment from "@material-ui/core/InputAdornment";
import "./style.css";
import TopNavBar from "../TopNavBar";

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
        state: { username: this.state.username, type: this.state.type, isLoggedIn: this.state.isLoggedIn }
      });
    }
  }

  componentDidUpdate() {
    if (this.state.isLoggedIn) {
      this.props.history.push({
        pathname: "/",
        state: { username: this.state.username, type: this.state.type, isLoggedIn: this.state.isLoggedIn }
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
      <div className={"MasterContainer"}>
        <div>
          <div className={"SignInForm"}>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <form noValidate>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="username"
                label="Username"
                name="username"
                autoComplete="username"
                autoFocus
                onChange={this.handleChange}
              />
              <TextField
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
              <Grid container className={"SignInText"}>
                <Grid item>
                  <Button
                    type="submit"
                    variant="contained"
                    color="secondary"
                    onClick={this.handleSubmit}
                  >
                    Sign In
                  </Button>
                </Grid>
              </Grid>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(SignInForm);
