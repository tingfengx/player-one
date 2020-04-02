import React from "react";

import UserList from "../UserList";
import UserForm from "../UserForm";
import { withCookies } from "react-cookie";


import { addUser} from "../actions/queue";
import './style.css'



class Queue extends React.Component{

    handleChange = (event, newValue) => {
        this.setValue(newValue);
    };


    cookies = this.props;

    state = {
        username: "",
        password: "",
        id:"",
        userType:"",
        users: [
            { id: "1", username: "aaa", password: "1111", userType:"user" },
            { id: "2", username: "bbb", password: "22222" , userType:"user" },
            { id: "3", username: "ccc", password: "1111" , userType:"user" },
            { id: "4", username: "ddd", password: "22222" , userType:"user" },
            { id: "5", username: "kkk", password: "1111" , userType:"user" },
            { id: "6", username: "eee", password: "22222", userType:"user"  }

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

    render() {

        return (
            <div className="App">


                <UserForm
                    username={this.state.username}
                    password={this.state.password}
                    position={this.state.position}
                    handleChange={this.handleInputChange}
                    addUser={() => addUser(this)}
                />


                <UserList users={this.state.users}
                          password = {this.state.password}
                          queueComponent={this}/>


            </div>
        );
    }
}

export default withCookies(Queue);