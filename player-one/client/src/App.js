import React from "react";
// Importing react-router-dom to use the React Router
import { Route, Switch, withRouter } from "react-router-dom";
import "./App.css";
import Home from "./react-components/Home";
import Account from "./react-components/Account";
import Login from "./react-components/Login";
import Signup from "./react-components/Signup";
import TopNavBar from "./react-components/TopNavBar";
import Admin from './react-components/admin/tabs/tabs';
import GamePageOverview from './react-components/GamePageOverview/GamePageOverview';
// import DummyGamePage from './react-components/DummyGamePage';

class App extends React.Component {
    // can use this to store the current user
    state = {
        username: "",
        type: "",
        isLoggedIn: false,
        sections: []
    };

    componentDidMount() {
        document.title = "Player One - The Player's Game Rating Platform";
    }
    componentDidUpdate(prevProps) {
        // read user info here with this.props.location.state.xxx
        if (
            this.props.location.state &&
            prevProps.location.state !== this.props.location.state
        ) {
            console.log("username: ");
            let username = this.props.location.state.username
                ? this.props.location.state.username
                : null;
            console.log(username);
            console.log("user type (user / admin): ");
            let userType = this.props.location.state.type
                ? this.props.location.state.type
                : null;
            console.log(userType);
            console.log("user is logged in: ");
            let userStatus = this.props.location.state.isLoggedIn
                ? this.props.location.state.isLoggedIn
                : false;
            console.log(userStatus);
            this.setState({
                username: username,
                type: userType,
                isLoggedIn: userStatus
            });
        }
    }

    render() {
        return (
            <div>
                <TopNavBar
                    title="PLAYER ONE"
                />

                <Switch>
                    {" "}
                    {/* Similar to a switch statement - shows the component depending on the URL path */}
                    {/* Each Route below shows a different component depending on the exact path in the URL  */}
                    <Route exact path="/" render={() => <Home state={this.state} />} />
                    <Route 
                        path={`/viewgames/:gameId`}
                        component={GamePageOverview}
                    />
                    {/* !! DEPRECATED !! */}
                    {/* <Route
                        exact
                        path="/w3"
                        render={() => <Game state={this.state} />}
                    /> */}
                    <Route
                        exact
                        path="/user_account"
                        render={(props) => <Account {...props} state={this.state} />}
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
                    <Route
                        exact
                        path="/admin"
                        render={() => <Admin state={this.state} />}
                    />
                    <Route
                        path="/"
                        render={() => <Signup state={this.state} />}
                    />
                </Switch>
            </div>
        );
    }
}

export default withRouter(App);
