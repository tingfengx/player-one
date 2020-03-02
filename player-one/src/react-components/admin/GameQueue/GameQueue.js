import React , {useState} from "react";


import GameList from "./GameList/GameList";
import GameForm from "./GameForm/GameForm";

import { addUser} from "../actions/queue";




class Queue extends React.Component{


    handleChange = (event, newValue) => {
        this.setValue(newValue);
    };

    handleChangeIndex = index => {
        this.setValue(index);
    };


    state = {
        Username: "",
        password: "",
        users: [
            { Username: "aaa", password: "1111" },
            { Username: "bbb", password: "22222" },
            { Username: "aaa", password: "1111" },
            { Username: "bbb", password: "22222" },
            { Username: "aaa", password: "1111" },
            { Username: "bbb", password: "22222" },
            { Username: "aaa", password: "1111" },
            { Username: "bbb", password: "22222" },
            { Username: "aaa", password: "1111" },
            { Username: "bbb", password: "22222" },
            { Username: "ccc", password: "1111" },
            { Username: "ddd", password: "22222" },
            { Username: "111", password: "1111" },
            { Username: "mmm", password: "22222" },
            { Username: "hhhhhhhh", password: "1111" },
            { Username: "bbb", password: "22222" },
            { Username: "aaa", password: "1111" },
            { Username: "bbb", password: "22222" }
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
                    Username={this.state.Username}
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
