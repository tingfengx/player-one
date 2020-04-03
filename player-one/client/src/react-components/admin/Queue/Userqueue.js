import React from "react";

// import UserList from "../UserList";
import UserForm from "../UserForm";
import { withCookies } from "react-cookie";


import {addUser, changePassword, getAllusers, removeUser} from "../actions/queue";
import './style.css'
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';

import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';

import User from "../User/User"
import {uid} from "react-uid";

import "../UserList.css"
import Input from "../Input";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import {addLongCommentRequest} from "../../GamePageOverview/actions";
import DeleteIcon from "@material-ui/core/SvgIcon/SvgIcon";
let log = console.log;
const baseURL = "http://localhost:5000";


class Userqueue extends React.Component{


    constructor(props) {
        super(props);
        this.state = {
            username: "",
            password: "",
            id:"",
            userType:"",
            page: 0,
            setPage: 0,
            users: [
                { id: "1", username: "aaa", password: "1111", userType:"user" },
                { id: "2", username: "bbb", password: "22222" , userType:"user" },
                { id: "3", username: "ccc", password: "1111" , userType:"user" },
                { id: "4", username: "ddd", password: "22222" , userType:"user" },
                { id: "5", username: "kkk", password: "1111" , userType:"user" },
                { id: "6", username: "eee", password: "22222", userType:"user"  }

            ]
        };


    }


    handleChange = (event, newValue) => {
        this.setValue(newValue);
    };




    cookies = this.props;

    handleChangePage = (event, newPage) => {
        const [page, setPage] = React.useState(0);
        setPage(newPage);
    };

    handleChangeRowsPerPage = event => {
        const [page, setPage] = React.useState(0);
        const [rowsPerPage, setRowsPerPage] = React.useState(10);
        setRowsPerPage(+event.target.value);
        setPage(0);
    };



    // handle input of adding users
    handleInputChange = event => {
        const target = event.target;
        const value = target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    };



    // handle change password
    handleChangePassword(event){
        // const allUsers = await getAllusers();
        const tableRow = event.target.parentElement.parentElement.parentElement.parentElement;
        const nameToChangePassword = tableRow.firstElementChild.innerHTML;
        // console.log("name is " + nameToChangePassword);
        this.setState({[nameToChangePassword]: event.target.value});
        console.log("target value is " + event.target.value)
        // console.log("state is " + this.state.users.length)

    }

    async handleUpdate(event){

        const tableRow = event.target.parentElement.parentElement.parentElement;

        const allUsers = await getAllusers();
        const nameToChangePassword = tableRow.children[0].innerHTML;
        const newPassword = this.state[nameToChangePassword];
        let tochangeId;
        log("allusers" + allUsers.users);
        log("alluserslength" + allUsers.users.length);

        for (let i = 0; i < allUsers.users.length; i ++){

            if (allUsers.users[i].username === nameToChangePassword){

                tochangeId = allUsers.users[i]._id;

            }
        }
        log("tochangeId" + tochangeId);
        changePassword(tochangeId, newPassword);
        // const index = userList.indexOf(shortComment);

    }

    async handleDelete(event){
        const tableRow = event.target.parentElement.parentElement.parentElement;
        const allUsers = await getAllusers();
        let tochangeId;
        const nameToChangePassword = tableRow.children[0].innerHTML;
        for (let i = 0; i < allUsers.users.length; i ++){

            if (allUsers.users[i].username === nameToChangePassword){

                tochangeId = allUsers.users[i]._id;

            }
        }

        log("allUsers" + allUsers.users)
        log("before remove length" + allUsers.users.length)
        let userList =[];
        const deleted_user = await removeUser(this, tochangeId);
        // log("aaaaaaaaaa delete user"+deleted_user);
        // for (let i = 0; i < allUsers.users.length; i++){
        //     if(allUsers.users[i]._id !== deleted_user._id){
        //         userList.push(allUsers[i])
        //     }
        //
        // }
        // log("after remove length" + userList.length)

        // const deleted_user = await removeUser(this, tochangeId);
        // this.setState({
        //     users: userList,
        //     //     message: {
        //     //         body: "Success: Added an image.",
        //     //         type: "success"
        //     //     }
        // })


    }





//     const {users, queueComponent, password} = props;
// console.log("user " + users);

    render() {

        const users = this.state.users;


        const { queueComponent, password, username,
            handleChange} = this.props;

        return (
            <div className="App">

                <Grid className="user-form" container spacing={4}>

                    <Grid item xl={3} lg={3} md={4} s={12} xs={12}>
                        <TextField
                            name="username"
                            label="User"
                            id="margin-normal"
                            defaultValue={this.state.username|| ""}
                            className="input"
                            margin="normal"
                            onChange={this.handleInputChange}
                        />
                    </Grid>

                    <Grid item xl={3} lg={3} md={4} s={12} xs={12}>
                        <TextField
                            name="password"
                            label="password"
                            id="margin-normal"
                            defaultValue={this.state.password|| ""}
                            className="input"
                            margin="normal"
                            onChange={this.handleInputChange}
                        />
                    </Grid>

                    <Grid
                        className="user-form__button-grid"
                        item
                        xl={2}
                        lg={2}
                        md={12}
                        s={12}
                        xs={12}
                    >
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={() =>addUser(this)}
                            className="user-form__submit-button"
                        >
                            Add User
                        </Button>
                    </Grid>
                </Grid>


                <Paper className='root'>
                    <Table className="user-list" stickyHeader aria-label="sticky table">
                        <TableHead>
                            <TableRow>
                                <TableCell>
                                    User Name
                                </TableCell>
                                <TableCell>

                                    password
                                </TableCell>
                                <TableCell>
                                    action
                                </TableCell>

                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {/*{users.slice(this.state.page * this.state.rowsPerPage, this.state.page * this.state.rowsPerPage + this.state.rowsPerPage).map(user => (*/}
                            {users.map(user => (
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
                                            onChange={this.handleChangePassword.bind(this)}
                                        />
                                    </TableCell>


                                    <TableCell component="th" scope="row">
                                        <Button
                                            variant="outlined"
                                            startIcon={<DeleteIcon/>}
                                            onClick={
                                                this.handleDelete.bind(this)
                                            }
                                        >
                                            remove
                                        </Button>
                                        <Button
                                            variant="outlined"

                                            onClick={this.handleUpdate.bind(this)}
                                        >
                                            update
                                        </Button>
                                    </TableCell>
                                </TableRow>
                                // <User
                                //     key={uid(
                                //         user
                                //     )}
                                //     user={user}
                                //     password={password}
                                //     queueComponent={queueComponent}
                                // />
                            ))}

                        </TableBody>
                    </Table>
                    <TablePagination
                        rowsPerPageOptions={[10]}
                        component="div"
                        count={users.length}
                        rowsPerPage={10}
                        page={0}
                        onChangePage={this.handleChangePage}
                        onChangeRowsPerPage={this.handleChangeRowsPerPage}
                    />
                </Paper>


            </div>
        );
    }
}

export default withCookies(Userqueue);