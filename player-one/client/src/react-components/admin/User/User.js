import React from "react";
import Button from "@material-ui/core/Button";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import DeleteIcon from '@material-ui/icons/Delete';
import TextField from '@material-ui/core/TextField';
import {removeUser} from "./../actions/queue";
// import {withStyles} from '@material-ui/core';
import "./User.css";


// class PasswordInput extends React.Component {
//     render() {
//         return <TextField type="password" {...this.props} />;
//     }
// }

// const styles = theme => ({});

// PasswordInput = withStyles(styles)(PasswordInput);

class User extends React.Component {

    constructor(props) {
        // When the componenet is created
        super(props);
        // this.state = {
        //     seconds: 0
        // };
        this.state = {};
        this.handleChange = this.handleChange.bind(this);
        this.handleUpdate = this.handleUpdate.bind(this);
    }


    handleChange(event) {
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
        alert("Requires server call! Changing user "
            + nameToChangePassword + "'s password to "
            + this.state[nameToChangePassword])
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
                        onChange={this.handleChange}
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
