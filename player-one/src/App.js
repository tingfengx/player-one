import React from "react";
// Importing react-router-dom to use the React Router
import { Route, Switch, withRouter } from "react-router-dom";
import "./App.css";
import Home from "./react-components/Home";
import Game from "./react-components/Game";
import Account from "./react-components/Account";
import Login from "./react-components/Login";
import Signup from "./react-components/Signup";

class App extends React.Component {
  // can use this to store the current user
  constructor(props) {
    super(props);
    this.state = {
      abc: "123"
    };
  }

  componentDidMount() {
    document.title = "Player One - The Player's Game Rating Platform";
  }
  componentDidUpdate(prevProps) {
    //   console.log('prev props');
    //   console.log(prevProps);
    //   console.log('new props');
    //   console.log(this.props);
      // read user info here with this.props.location.state.xxx
      console.log('username: ');
      let username = this.props.location.state.username ? this.props.location.state.username: null;
      console.log(username);
      console.log('user type (user / admin): ')
      let usertype = this.props.location.state.type ? this.props.location.state.type : null;
      console.log(usertype);
  }

  render() {
    return (
      <div>
          <Switch>
            {" "}
            {/* Similar to a switch statement - shows the component depending on the URL path */}
            {/* Each Route below shows a different component depending on the exact path in the URL  */}
            <Route exact path="/" render={() => <Home state={this.state} />} />
            <Route
              exact
              path="/the_witcher_3_wild_hunt"
              render={() => <Game state={this.state} />}
            />
            <Route
              exact
              path="/user_account"
              render={() => <Account state={this.state} />}
            />
            <Route
              exact
              path="/Login"
              render={() => <Login state={this.state} />}
            />
            <Route
              exact
              path="/Signup"
              render={() => <Signup state={this.state} />}
            />
          </Switch>
      </div>
    );
  }
}

export default withRouter(App);
