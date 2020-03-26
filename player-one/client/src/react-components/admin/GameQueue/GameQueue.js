import React from "react";


import GameList from "./GameList/GameList";
import GameForm from "./GameForm/GameForm";

import {addUser} from "../actions/queue";


class Queue extends React.Component {


    handleChange = (event, newValue) => {
        this.setValue(newValue);
    };

    handleChangeIndex = index => {
        this.setValue(index);
    };


    state = {
        username: "",
        password: "",
        users: [
            {username: "aaa", password: "1111"},
            {username: "bbb", password: "22222"},
            {username: "aaa", password: "1111"},
            {username: "bbb", password: "22222"},
            {username: "aaa", password: "1111"}
        ]
    };

    // Generic handler for whenever we type in an input box.
    // We change the state for the particular property bound to the textbox from the event.
    handleInputChange = event => {


        const target = event.target;
        const value = target.value;
        const name = target.name;


        this.setState({
            [name]: value
        });


    };


    // Each section of the Queue now has its own componenet, cleaning up the
    // JSX a lot.
    render() {

        return (
            <div className="App">


                <GameForm
                    username={this.state.username}
                    password={this.state.password}
                    position={this.state.position}
                    handleChange={this.handleInputChange}
                    addUser={() => addUser(this)}
                />


                <GameList users={this.state.users} queueComponent={this}/>


            </div>
        );
    }
}

export default Queue;
