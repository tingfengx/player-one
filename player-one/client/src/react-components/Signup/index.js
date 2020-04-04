import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { withCookies } from "react-cookie";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import "./style.css";

const log = console.log
// const baseURL = 'http://localhost:5000'
const baseURL = "";


class SignUpForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      repassword: ""
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
    if (this.props.cookies.cookies.isLoggedIn) {
      this.props.history.push("/");
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

    // check if password is valid
    if (this.state.password.length < 4) {
      alert("password is too short")
      return
    }

    if (this.state.password !== this.state.repassword) {
      alert("two passwords do not match")
      return
    }

    // POST /users
    const url = baseURL + '/users'
    const data = {
      username: this.state.username,
      password: this.state.password,
      userType: 'user'
    }

    const request = new Request(url, {
      method: 'post',
      body: JSON.stringify(data),
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
      }
    })

    fetch(request)
    .then((res) => {
      if (res.status === 200) {
        log('Successfully signed up!')
        return res.json()
      } else {
        log('Error occurred. Try again!')
      }
      // log(res)
    })
    .then((data) => {
      log(data)
      this.props.cookies.set("userId", data._id)
      this.props.cookies.set("username", data.username)
      this.props.cookies.set("type", data.userType)
      this.props.cookies.set("isLoggedIn", true)
    })
    .catch((error) => {
      log(error)
    })
  }

  render() {
    return (
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
