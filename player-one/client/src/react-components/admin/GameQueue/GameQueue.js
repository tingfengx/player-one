import React from "react";


// import GameList from "./GameList/GameList";
// import GameForm from "./GameForm/GameForm";
import "./GameQueue.css"

import {addGame, getAllgames, getAllusers, removeUser, removeGame, uploadGamePics, getGameById} from "../actions/queue";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
// import GameAd from "../GameAd";
import {uid} from "react-uid";
// import TablePagination from "@material-ui/core/TablePagination";
import Paper from "@material-ui/core/Paper";
import DeleteIcon from "@material-ui/core/SvgIcon/SvgIcon";

let log = console.log
const baseURL = "http://localhost:5000";
class GameQueue extends React.Component {


    handleChange = (event, newValue) => {
        this.setValue(newValue);
    };

    constructor(props) {
        super(props);
        this.state = {

            gameName: "",
            introductionText: "",
            publisher:"",
            developer: "",
            releaseDate: "",
            genre: "",
            thumbUp: 0,
            thumbDown: 0,
            gamePictures:[],
            // games: [
            //     {gameName: "aaa", introductionText: "1111"},
            //     {gameName: "bbb", introductionText: "22222"},
            //     {gameName: "ccc", introductionText: "22222"}
            //
            // ]
            games:[]
        };
        this.GameP = [];
    }




    componentDidMount = () => {
        const url = baseURL + "/games"

        const request = new Request(url, {
            method: 'get',

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
                // this.state.users = data.users;
            let gameList = [];
            // console.log("hhhhhhhh" + data.hottestGamesForGenre[0][0].gameName);
            for (let i = 0; i < data.hottestGamesForGenre.length; i++){
                for (let j = 0; j < data.hottestGamesForGenre[i].length; j++){
                    let gameObj = {gameName:"", introductionText:""};
                    gameObj.gameName = data.hottestGamesForGenre[i][j].gameName;
                    gameObj.introductionText = data.hottestGamesForGenre[i][j].introductionText;
                    gameList.push(gameObj);
                }

                // this.state.users.push(userObj)
            }
            console.log("this state users" + gameList.length);

            // this.state.users.username = data.allGames.gameName;
            // this.state.games.introductionText = data.allGames.introductionText;
            // this.game.longComments = data.longComments;
            // this.game.shortComments = data.shortComments;
            // this.setState({imgs: data.game.gamePictures.slice(-4)});
            this.setState({
                games: gameList
            });

            // console.log("full game loaded!");
            // console.log(data.game);
        }).catch(e => console.log(e))
    }


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
    cookies = this.props;

    async handleDelete(event){
        const tableRow = event.target.parentElement.parentElement.parentElement;
        const getallGames = await getAllgames();
        let tochangeId;
        const nameToChangePassword = tableRow.children[0].innerHTML;
        for (let i = 0; i < getallGames.allGames.length; i ++){

            if (getallGames.allGames[i].gameName === nameToChangePassword){

                tochangeId = getallGames.allGames[i]._id;

            }
        }

        // log("allUsers" + getallGames.allGames)
        log("before remove length" + getallGames.allGames.length)
        // let userList =[];
        const deleted_game = await removeGame(this, tochangeId);
    }

    //
    handleUpload =e =>{
        const cloudinaryURL = "https://api.cloudinary.com/v1_1/dzld6bb6y/image/upload";

        const formData = new FormData();
        formData.append('file', e.target.files[0])
        formData.append('upload_preset', 'wzgg2ljz')
        // formData.append('folder', 'user_account')
        formData.append('folder', 'game_pics')


        const uploadRequest = new Request(cloudinaryURL, {
            method: "post",
            body: formData
        })

        let imageURL;
        fetch(uploadRequest)
            .then(async function (res) {
                if (res.status === 200) {
                    log('Successfully uploaded game pictures!')
                    const data = await res.json();

                    // if(this.state.gamePictures.length === 5){
                    //     this.setState({gamePictures: []});
                    // }
                    const joined = this.state.gamePictures.concat(data.url);
                    this.setState({gamePictures: joined});
                    if(this.state.gamePictures.length === 6){
                        this.setState({gamePictures: []});
                    }
                    // this.state.gamePictures.push(data.url);
                    return data
                } else {
                    log('Failed uploading game pictures.')
                }
            }).then((data) => {
                log(data)
        }).catch((error)=>{
            log(error)
        });
    }


    async HandleaddGame(){
        // the URL for the request
        const url = baseURL + "/games/addGame";
        log("zaiiiiiiiiiiiiiiiiii")

        // const url = "/users";
        const gameList = this.state.games;

        // The data we are going to send in our request
        // const imageData = new FormData(form);
        // if(urlList.length < 5){
        //     alert("please add 5 pictures!");
        //     return;
        // }
        const game = {
            ////////////////////////to fixxxx
            gamePictures: ["https://res.cloudinary.com/dzld6bb6y/image/upload/v1585191973/Games/cities_skylines5_ihohqj.jpg",
                "https://res.cloudinary.com/dzld6bb6y/image/upload/v1585191973/Games/cities_skylines4_eyxbyu.jpg",
                "https://res.cloudinary.com/dzld6bb6y/image/upload/v1585191973/Games/cities_skylines3_w4pyi8.jpg",
                "https://res.cloudinary.com/dzld6bb6y/image/upload/v1585191973/Games/cities_skylines2_mpg0bu.jpg",
                "https://res.cloudinary.com/dzld6bb6y/image/upload/v1585191973/Games/cities_skylines1_vjkvvh.jpg"],
            gameName: this.state.gameName,
            introductionText: this.state.introductionText,
            publisher:this.state.publisher,
            developer: this.state.developer,
            genre: this.state.genre,
            thumbUp: 0,
            thumbDown: 0,
            releaseDate: Date.now()

        };
        log("game"+ game.gameName + game.introductionText+ game.publisher + game.developer + game.genre)

        let indicator = 0;
        for(let i = 0; i < gameList.length; i++){
            if (gameList[i].gameName === game.gameName){
                log(gameList[i].gameName);
                indicator = 1;
            }

        }
        if (indicator === 1){
            alert("the game has been uploaded!");
            return;
        }else {
            // log("new user is " + game.gameName + game.password)

            // Create our request constructor with all the parameters we need
            const request = new Request(url, {
                method: "post",
                headers: {
                    'Accept': 'application/json, text/plain, */*',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(game)
            });
            // userList.unshift(user);


            // this.setState({
            //     games: gameList,
            //     message: {
            //         body: "Success: Added an image.",
            //         type: "success"
            //     }
            // });
            // Send the request with fetch()
            fetch(request)
                .then(function (res) {
                    log("res" + res);

                    // Handle response we get from the API.
                    // Usually check the error codes to see what happened.
                    log(`status is ${res.status}`)
                    if (res.status === 200) {
                        // If image was added successfully, tell the user.
                        gameList.unshift(game);
                        this.setState({
                            games: gameList,
                            message: {
                                body: "Success: Added an image.",
                                type: "success"
                            }
                        });
                        return res.json();
                    } else {
                        // If server couldn't add the image, tell the user.
                        // Here we are adding a generic message, but you could be more specific in your app.
                        this.setState({
                            message: {
                                body: "Error: Could not add image.",
                                type: "error"
                            }
                        });
                    }
                })
                .catch(error => {
                    console.log(error);
                });
            // }
        }

    };

    //     let tochangeId;
    //     const getallGames = await getAllgames();
    //     let gameName;
    //     if(this.state.games.length !== 0){
    //         gameName = this.state.games[0].gameName
    //     }
    //     log("game name is " + gameName)
    //     if(gameName){
    //
    //         for (let i = 0; i < getallGames.allGames.length; i ++){
    //
    //             if (getallGames.allGames[i].gameName === gameName){
    //
    //                 tochangeId = getallGames.allGames[i]._id;
    //
    //             }
    //         }
    //         //add url to the list of tochangeId user
    //
    //     }else{
    //         alert("please first add a game!");
    //         return;
    //     }
    //     let data = await uploadGamePics(event);
    //     let imgUrl = data.url;
    //     let dataGame = await getGameById();
    //     dataGame.gamePictures.push(imgUrl);



        // const userId = this.props.cookies.cookies.userId




        // fetch(uploadRequest)
        //     .then(function (res) {
        //         if (res.status === 200) {
        //             log('Successfully uploaded game pictures!')
        //             const data = res.json();
        //             return res.json()
        //         } else {
        //             log('Failed uploading game pictures.')
        //         }
        //     }).then((data) => {
        //     imageURL = data.url
        //     const toAddURL = baseURL + '/games/' + tochangeId;
        //     const toaddRequest = new Request(toAddURL, {
        //         method: 'put',
        //         credentials: 'include',
        //         headers: {
        //             'Accept': 'application/json, text/plain, */*',
        //             'Content-Type': 'application/json'
        //         },
        //         body: JSON.stringify({ 'avatarId': imageURL })
        //     })
        // })
        //     .catch((error) => {
        //         log(error)
        //     })
    // }




    // Each section of the Queue now has its own componenet, cleaning up the
    // JSX a lot.
    render() {
        const games = this.state.games;

        return (
            <div className="App">
                <Grid className="game-form" container spacing={2}>
                    {/* Inputs to add student */}
                    <Grid item xl={3} lg={2} md={4} s={12} xs={2}>
                        <TextField
                            name="gameName"
                            label="Game"
                            id="margin-normal"
                            defaultValue={this.state.gameName|| ""}
                            className="input"
                            margin="normal"
                            size="small"
                            onChange={this.handleInputChange}
                        />
                    </Grid>
                    <Grid item xl={3} lg={2} md={4} s={12} xs={2}>
                        <TextField
                            name="introductionText"
                            label="introductionText"
                            id="margin-normal"
                            defaultValue={this.state.introductionText|| ""}
                            className="input"
                            margin="normal"
                            size="small"
                            onChange={this.handleInputChange}
                        />
                    </Grid>
                    <Grid item xl={3} lg={2} md={4} s={12} xs={2}>
                        <TextField
                            name="publisher"
                            label="publisher"
                            id="margin-normal"
                            defaultValue={this.state.publisher|| ""}
                            className="input"
                            margin="normal"
                            size="small"
                            onChange={this.handleInputChange}
                        />
                    </Grid>
                    <Grid item xl={3} lg={2} md={4} s={12} xs={2}>
                        <TextField
                            name="developer"
                            label="developer"
                            id="margin-normal"
                            defaultValue={this.state.developer|| ""}
                            className="input"
                            margin="normal"
                            size="small"
                            onChange={this.handleInputChange}
                        />
                    </Grid>
                    <Grid item xl={3} lg={2} md={4} s={12} xs={2}>
                        <TextField
                            name="genre"
                            label="genre"
                            id="margin-normal"
                            defaultValue={this.state.genre|| ""}
                            className="input"
                            margin="normal"
                            size="small"
                            onChange={this.handleInputChange}
                        />
                    </Grid>

                    <Grid
                        className="user-form__button-grid"
                        item
                        xl={1}
                        lg={1}
                        md={6}
                        s={6}
                        xs={2}
                    >
                        <Button
                            variant="contained"
                            color="primary"
                            // onClick={this.HandleaddGame().bind(this)}
                            onClick={() =>addGame(this, this.state.gamePictures)}
                            // size="small"
                            className="user-form__submit-button"
                        >
                            Add Game
                        </Button>
                    </Grid>
                    <Grid
                        className="user-form__button-grid"
                        item
                        xl={1}
                        lg={1}
                        md={6}
                        s={6}
                        xs={6}
                    >
                        <Button
                            variant="contained"
                            component="label"
                            color="primary"
                            size="small"

                            onChange={this.handleUpload}
                        >
                            Upload Avatar
                            <input
                                type="file"
                                multiple
                                accept="image/*"
                                style={{ display: "none" }}
                            />
                        </Button>
                    </Grid>
                </Grid>

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
                            {/*{users.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(user => (*/}
                            {games.map(game => (
                                <TableRow className="user" key={game.gameName}>

                                    <TableCell component="th" scope="row">
                                        {game.gameName}

                                    </TableCell>
                                    <TableCell component="th" scope="row">
                                        {game.introductionText}

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
                                    </TableCell>

                                </TableRow>

                            ))}

                        </TableBody>
                    </Table>
                    {/*<TablePagination*/}
                    {/*    rowsPerPageOptions={[10, 15, 100]}*/}
                    {/*    component="div"*/}
                    {/*    count={users.length}*/}
                    {/*    rowsPerPage={rowsPerPage}*/}
                    {/*    page={page}*/}
                    {/*    onChangePage={handleChangePage}*/}
                    {/*    onChangeRowsPerPage={handleChangeRowsPerPage}*/}
                    {/*/>*/}
                </Paper>


                {/*<GameList users={this.state.users} queueComponent={this}/>*/}


            </div>
        );
    }
}

export default GameQueue;
