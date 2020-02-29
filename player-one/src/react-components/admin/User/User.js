import React from "react";
import Button from "@material-ui/core/Button";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import Icon from '@material-ui/core/Icon';
import DeleteIcon from '@material-ui/icons/Delete';
// import { M } from 'mdbreact';
import TextField from '@material-ui/core/TextField';
import { removeUser } from "./../actions/queue";
import { withStyles } from '@material-ui/core';
// import TextField from '@material-ui/core/TextField';
import PropTypes from 'prop-types';
import "./User.css";



class PasswordInput extends React.Component {
    render() {
        return <TextField type="password" {...this.props} />;
    }
}

const styles = theme => ({});

PasswordInput.propTypes = {
    classes: PropTypes.object.isRequired,
    onChange: PropTypes.func.isRequired,
    value: PropTypes.func.isRequired,
};

PasswordInput = withStyles(styles)(PasswordInput);

class User extends React.Component {


    constructor(props) {
        // When the componenet is created
        super(props);
        // this.state = {
        //     seconds: 0
        // };
    }

    editStatus(event, index){
        console.log("edit status clicket");
        console.log(event.target.id);
        this.setState ({
            isStatusClicked: index
        })
    }




    render() {
        // const { user, queueComponent } = this.props;
        const { user, queueComponent, password } = this.props;

        return (
            <TableRow className="user" key={user.Username}>

                <TableCell component="th" scope="row">
                {user.Username}

                </TableCell>
                <TableCell component="th" scope="row" >
                    <PasswordInput
                        label="Password"
                        name="password"
                        value={user.password}
                        onChange={this.onChange}
                      />



                </TableCell>



                <TableCell component="th" scope="row">
                    <Button
                        variant="outlined"
                        startIcon={<DeleteIcon />}
                        onClick={

                            removeUser.bind(this, queueComponent, user, password)

                        }
                    >
                        remove
                    </Button>
                </TableCell>
            </TableRow>
        );
    }
}

export default User;
