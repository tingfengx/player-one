import React from 'react';

// import {makeStyles} from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';

import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';

import User from "./User/User.js"
import {uid} from "react-uid";

import "./UserList.css"

//
// const useStyles = makeStyles({
//     root: {
//         width: '80%',
//         textAlign: 'center',
//         marginLeft: '5%',
//         marginTop: '20px',
//
//     },
//     container: {
//         maxHeight: 440,
//     },
// });


export default function UserList(props) {
    // const classes = useStyles();
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = event => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };


    const {users, queueComponent, password} = props;
    console.log("user " + users);

    return (
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
                    {users.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(user => (
                        // {users.map(user => (
                        <User
                            key={uid(
                                user
                            )}
                            user={user}
                            password={password}
                            queueComponent={queueComponent}
                        />
                    ))}

                </TableBody>
            </Table>
            <TablePagination
                rowsPerPageOptions={[10, 15, 100]}
                component="div"
                count={users.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onChangePage={handleChangePage}
                onChangeRowsPerPage={handleChangeRowsPerPage}
            />
        </Paper>
    );

}
