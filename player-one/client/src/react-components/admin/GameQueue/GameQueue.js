import React from "react";

import "./GameQueue.css"

import {addGame, getAllgames,  removeGame} from "../actions/queue";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";

import Paper from "@material-ui/core/Paper";
import DeleteIcon from "@material-ui/core/SvgIcon/SvgIcon";

let log = console.log
const baseURL = "";
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

            games:[]
        };
        this.GameP = [];
    }




    componentDidMount = () => {
        const url = baseURL + "/games/allGames"

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

            let gameList = [];

            for (let i = 0; i < data.length; i++){
                // for (let j = 0; j < data.hottestGamesForGenre[i].length; j++){
                    let gameObj = {gameName:"", introductionText:""};
                    gameObj.gameName = data[i].gameName;
                    gameObj.introductionText = data[i].introductionText;
                    gameList.push(gameObj);

            }
            console.log("this state users" + gameList.length);

            this.setState({
                games: gameList
            });


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


        for(let i = 0; i < getallGames.length; i++){


                if (getallGames[i].gameName === nameToChangePassword) {
                    tochangeId = getallGames[i]._id;
                }


        }






        await removeGame(this, tochangeId, getallGames);
    }

    async handleUpload(){
        const cloudinaryURL = "https://api.cloudinary.com/v1_1/dzld6bb6y/image/upload";


        await this.handleSelectChange;
        let urlList = []
        log("length is " + this.state.gamePictures.length)
        for(let i = 0; i < this.state.gamePictures.length; i++){
            log("file is " + this.state.gamePictures[i]);
            const formData = new FormData();
            formData.append('file',this.state.gamePictures[i])
            formData.append('upload_preset', 'wzgg2ljz')

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
                        imageURL = data.url;
                        urlList.push(imageURL);

                        return data
                    } else {
                        log('Failed uploading game pictures.')
                    }
                }).then((data) => {
                this.setState({gamePictures: urlList});
                log("the state is " + this.state.gamePictures.length);
                log(data)
            }).catch((error)=>{
                log(error)
            });

        }



    }

    async handleAdd(){
        await this.handleUpload;
        await addGame(this,this.state.gamePictures);

    }

    async handleSelectChange(event){
        const fileArray = await Array.from(event.target.files);
        if(fileArray.length !== 5){
            alert("Please select 5 image");
        }else{
            this.setState({gamePictures: fileArray})
            return fileArray;
        }


    }







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
                        xs={6}
                    >
                        <Button
                            variant="contained"
                            color="primary"
                            // onClick={this.HandleaddGame().bind(this)}
                            onClick={this.handleAdd.bind(this)}
                            // size="small"
                            className="user-form__submit-button"
                        >
                            Add Game
                        </Button>
                    </Grid>
                    <Grid
                        className="user-form__button-grid"
                        item
                        xl={2}
                        lg={2}
                        md={6}
                        s={6}
                        xs={6}
                    >
                        <Button
                            variant="contained"
                            component="label"


                            onChange={this.handleUpload.bind(this)}
                        >
                            <input
                                type="file" multiple
                                onChange={this.handleSelectChange.bind(this)}
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
                </Paper>


            </div>
        );
    }
}

export default GameQueue;
