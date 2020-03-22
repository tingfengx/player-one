import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { withCookies } from "react-cookie";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import "./style.css";

const users = ["user", "admin"];

class SignUpForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      repassword: "",
      isLoggedIn: false,
      type: ""
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    if (this.props.cookies.cookies.isLoggedIn) {
        this.props.history.push("/");
      }      
  }

  componentDidUpdate() {
      if (this.state.isLoggedIn) {
        this.props.history.push("/");
        this.props.cookies.set("username", this.state.username);
        this.props.cookies.set("type", this.state.type);
        this.props.cookies.set("isLoggedIn", this.state.isLoggedIn);
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
    let valid = true;
    // check if username already exists
    if (users.indexOf(this.state.username) >= 0) {
        valid = false;
        alert("username already exists")
    }

    // check if password is valid
    if (this.state.password.length < 4) {
        valid = false;
        alert("password is too short")
    }

    if (this.state.password !== this.state.repassword) {
        valid = false;
        alert("two passwords do not match")
    }

    if (valid) {
        this.setState({isLoggedIn: true, type: 'user'});
    }
    console.log("The form was submitted with the following data:");
    console.log(this.state);
  }

  render() {
    return (
      // <div>component="main" maxWidth="xs"
      <div className={"MasterContainer"}>
        <div>
          <div className={"SignUpForm"}>
            <Typography component="h1" variant="h5">
              Sign up
            </Typography>
            <form noValidate size={"xs"}>
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
                onChange={this.handleChange}
                // autoComplete="current-password"
              />
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="repassword"
                label="Retype Password"
                type="password"
                id="re-enter-password"
                onChange={this.handleChange}
                // autoComplete="current-password"
              />
              <Grid container className={"SignUpText"}>
                <Grid item>
                  <Button
                    type="submit"
                    variant="contained"
                    color="secondary"
                    onClick={this.handleSubmit}
                  >
                    Sign Up
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

export default withRouter(withCookies(SignUpForm));
