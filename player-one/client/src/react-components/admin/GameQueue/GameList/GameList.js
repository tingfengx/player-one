import React from 'react';

import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';

import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';

import GameAd from "../../GameAd"
import {uid} from "react-uid";

import "./GameList.css"


export default function GameList(props) {
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




    const {users, queueComponent} = props;
    console.log("user " + users);
    console.log("queue " + queueComponent);
    // console.log(users);

    /* Our student list.  We use the state to iterate through the
       student list and make an <li> for each one. */
    return (
        <Paper className='root'>
            <Table className="user-list" stickyHeader aria-label="sticky table">
                <TableHead>
                    <TableRow>
                        <TableCell>
                            Game Name
                        </TableCell>
                        <TableCell>
                            descriptions
                        </TableCell>
                        <TableCell>
                            action
                        </TableCell>

                    </TableRow>
                </TableHead>
                <TableBody>
                    {users.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(user => (

                        <GameAd
                            key={uid(
                                user
                            )}
                            user={user}
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
