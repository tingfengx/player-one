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


class SignInForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: ""
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

  handleSubmit = (e) => {
    e.preventDefault();

    // POST /users/login
    const url = baseURL + '/users/login'
    const data = {
      username: this.state.username,
      password: this.state.password
    }

    const request = new Request(url, {
      method: 'post',
      credentials: 'include',
      body: JSON.stringify(data),
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
      },
    })

    // const response = await fetch(request);
    // if (response.ok) {
    //   try{
    //     const data = await response.json();
    //     this.props.cookies.set("userId", data._id)
    //     this.props.cookies.set("username", data.username)
    //     this.props.cookies.set("type", data.userType)
    //     this.props.cookies.set("isLoggedIn", true)  
    //   } catch (e) {
    //     log(e);
    //   }
    // } else if (response.status === 400) {
    //   alert('Wrong username or password')
    // } else {
    //   alert('Error occurred. Try again!')
    // }

    fetch(request)
    .then((res) => {
      if (res.status === 200) {
        log('Successfully signed in!')
        return res.json()
      } else if (res.status === 400) {
        alert('Wrong username or password')
      } else {
        alert('Error occurred. Try again!')
      }
    }).then((data) => {
      log(data)
      this.props.cookies.set("userId", data._id)
      this.props.cookies.set("username", data.username)
      this.props.cookies.set("type", data.userType)
      this.props.cookies.set("isLoggedIn", true)      
    })
    .catch((error) => {
      log(error)
    })


  //   let status = false;
  //   let userType = "";
  //   for (let i = 0; i < users.length; i++) {
  //     let user = users[i];
  //     if (
  //       this.state.username === user.username &&
  //       this.state.password === user.password
  //     ) {
  //       status = true;
  //       userType = user.type;
  //       break;
  //     }
  //   }

  //   this.setState({ isLoggedIn: status, type: userType }, () => {
  //     let msg = status
  //       ? "successfully signed in"
  //       : "wrong username or password";
  //     console.log(msg);
  //     if (!status) {
  //       alert("wrong username or password");
  //     }
  //   });
  };

  // const classes = useStyles();

  render() {
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

export default withRouter(withCookies(SignInForm));
