import React from "react";
// import {
//   useParams
// } from "react-router-dom";

class DummyGamePage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            images: []
        }
        this.game = undefined;
    }

    componentDidMount = () => {
        // const baseURL = "http://localhost:5000"
        const baseURL = "";
        const url = baseURL + '/games/' + this.props.match.params.gameId

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
            this.game = data;
            this.setState({images: data.game.gamePictures});
        }).catch(e => console.log(e))
    }

    render() {
        return <>
            <h1>Rendering game with game {JSON.stringify(this.game)}... (Under Construction)</h1>
            <h1>Rendering game with images {JSON.stringify(this.state.images)}... (Under Construction)</h1> 
            <h1>Home Page: <a href={"/"}>here</a></h1>
            <h1><a href={"/the_witcher_3_wild_hunt"}>Witcher 3</a></h1>
        </>
    }
}

export default DummyGamePage;
