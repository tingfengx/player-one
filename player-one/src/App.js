import React from 'react';
// Importing react-router-dom to use the React Router
import {Route, Switch, BrowserRouter} from 'react-router-dom';
import './App.css';
import Home from './react-components/Home';
import Game from './react-components/Game';

class App extends React.Component {
    // can use this to store the current user
    state = {
        abc: "123"
    };

    componentDidMount(){
        document.title = "Player One - The Player's Game Rating Platform"
    }

    render() {
        return (
            <div>
                <BrowserRouter>
                    <Switch> { /* Similar to a switch statement - shows the component depending on the URL path */}
                        { /* Each Route below shows a different component depending on the exact path in the URL  */}
                        <Route exact path='/' render={() =>
                            (<Home state={this.state} />)} />
                        <Route exact path='/the_witcher_3_wild_hunt' render={() =>
                            (<Game state={this.state} />)} />
                    </Switch>
                </BrowserRouter>
            </div>
        )
    }
}

export default App;
