import React from "react";

import { withCookies } from "react-cookie";


import {addUser, changePassword, getAllusers, removeUser} from "../actions/queue";
import './style.css'
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';

import TableHead from '@material-ui/core/TableHead';

import TableRow from '@material-ui/core/TableRow';

import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";

import DeleteIcon from "@material-ui/core/SvgIcon/SvgIcon";
let log = console.log;
const baseURL = "";


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
            users: []

        };


    }

    componentDidMount = () => {
        const url = baseURL + "/users"

        const request = new Request(url, {
            method: 'get',
            credentials: "include",
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            },
        })
        // fetch the request
        fetch(request).then(res => {
            if (res.status === 200) {
                return res.json()
            } else {
                console.log("something wrong happened");
                console.log(res);
            }
        }).then(data => {
            /*** full game ***/

            let userList = [];

            for (let i = 0; i < data.users.length; i++){
                let userObj = {username:"", password:""};
                userObj.username = data.users[i].username;
                userObj.password = data.users[i].password;
                userList.push(userObj);

            }
            console.log("this state users" + userList.length);

            this.setState({
                users: userList
            });

        }).catch(e => console.log(e))
    }



    handleChange = (event, newValue) => {
        this.setValue(newValue);
    };




    cookies = this.props;




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

        const tableRow = event.target.parentElement.parentElement.parentElement.parentElement;
        const nameToChangePassword = tableRow.firstElementChild.innerHTML;

        this.setState({[nameToChangePassword]: event.target.value});
        console.log("target value is " + event.target.value)


    }

    async handleUpdate(event){

        const tableRow = event.target.parentElement.parentElement.parentElement;

        const allUsers = await getAllusers();
        const nameToChangePassword = tableRow.children[0].innerHTML;
        const newPassword = this.state[nameToChangePassword];
        let tochangeId;


        for (let i = 0; i < allUsers.users.length; i ++){

            if (allUsers.users[i].username === nameToChangePassword){

                tochangeId = allUsers.users[i]._id;

            }
        }

        changePassword(tochangeId, newPassword);


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

        await removeUser(this, tochangeId);



    }

    render() {

        const users = this.state.users;




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

                    <Grid item xl={3} lg={3} md={4} s={12} xs={12}>
                        <TextField
                            name="userType"
                            label="userType"
                            id="margin-normal"
                            defaultValue={this.state.userType|| ""}
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

                            ))}

                        </TableBody>
                    </Table>

                </Paper>


            </div>
        );
    }
}

export default withCookies(Userqueue);