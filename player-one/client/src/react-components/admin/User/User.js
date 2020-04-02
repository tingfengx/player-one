import React from "react";
import Button from "@material-ui/core/Button";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import DeleteIcon from '@material-ui/icons/Delete';
import TextField from '@material-ui/core/TextField';

// import {withStyles} from '@material-ui/core';
import "./User.css";
import {removeUser,
        changePassword,
        getAllusers} from "./../actions/queue";
// import {queue} from "../Queue/queue"


// class PasswordInput extends React.Component {
//     render() {
//         return <TextField type="password" {...this.props} />;
//     }
// }

// const styles = theme => ({});

// PasswordInput = withStyles(styles)(PasswordInput);
const baseURL = "http://localhost:5000"

class User extends React.Component {

    constructor(props) {
        // When the componenet is created
        super(props);
        // this.state = {
        //     seconds: 0
        // };
        this.state = {};
        this.userList = getAllusers();
        this.handleChangePassword = this.handleChangePassword.bind(this);
        this.handleUpdate = this.handleUpdate.bind(this);

    }


    handleChangePassword(event) {
        const tableRow = event.target.parentElement.parentElement.parentElement.parentElement;
        const nameToChangePassword = tableRow.firstElementChild.innerHTML;
        console.log(nameToChangePassword);
        this.setState({[nameToChangePassword]: event.target.value});
        console.log(this.state)
    }

    handleUpdate(event) {

        const tableRow = event.target.parentElement.parentElement.parentElement;
        const nameToChangePassword = tableRow.firstElementChild.innerHTML;
        console.log(nameToChangePassword);
        let tochangeId;
        this.userList = getAllusers();
        // log("userList" + this.userList);
        let users = this.userList;
        console.log("users are " + users);
        for (let i = 0; i < users.length; i ++){
            if (this.userList[i].username === nameToChangePassword){
                tochangeId = this.userList[i]._id;

            }
        }
        changePassword(tochangeId, event.target.value);
        // const index = userList.indexOf(shortComment);

    }


    render() {

        const {user, queueComponent, password} = this.props;

        return (
            <TableRow className="user" key={user.username}>

                <TableCell component="th" scope="row" onClick={this.handleEvent}>
                    {user.username}

                </TableCell>
                <TableCell component="th" scope="row">

                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="New Password"
                        label="NewPassword"
                        type="password"
                        id="password"
                        onChange={this.handleChangePassword}
                    />
                </TableCell>


                <TableCell component="th" scope="row">
                    <Button
                        variant="outlined"
                        startIcon={<DeleteIcon/>}
                        onClick={
                            removeUser.bind(this, queueComponent, user, password)
                        }
                    >
                        remove
                    </Button>
                    <Button
                        variant="outlined"

                        onClick={this.handleUpdate}
                    >
                        update
                    </Button>
                </TableCell>
            </TableRow>
        );
    }
}

export default User;
