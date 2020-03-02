import React , {useState} from "react";

import UserList from "../UserList";
import UserForm from "../UserForm";
import { withCookies } from "react-cookie";


import { addUser} from "../actions/queue";




class Queue extends React.Component{

    handleChange = (event, newValue) => {
        this.setValue(newValue);
    };

    handleChangeIndex = index => {
        this.setValue(index);
    };
    cookies = this.props;

    state = {
        Username: "",
        password: "",
        users: [
            { Username: "aaa", password: "1111" },
            { Username: "bbb", password: "22222" },
            { Username: "ccc", password: "1111" },
            { Username: "ddd", password: "22222" },
            { Username: "kkk", password: "1111" },
            { Username: "eee", password: "22222" },
            { Username: "ooo", password: "1111" },
            { Username: "ttt", password: "22222" },
            { Username: "mmm", password: "1111" },
            { Username: "qqq", password: "22222" },
            { Username: "eee", password: "1111" },
            { Username: "ttt", password: "22222" },
            { Username: "111", password: "1111" },
            { Username: "mmmm", password: "22222" },
            { Username: "hhhhhhhh", password: "1111" },
            { Username: "ppp", password: "22222" },
            { Username: "lll", password: "1111" },
            { Username: "iii", password: "22222" }
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


                <UserForm
                    Username={this.state.Username}
                    password={this.state.password}
                    position={this.state.position}
                    handleChange={this.handleInputChange}
                    addUser={() => addUser(this)}
                />


                <UserList users={this.state.users}
                          password = {this.state.password}/>


            </div>
        );
    }
}

export default withCookies(Queue);