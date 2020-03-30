import React from "react";
// import {
//   useParams
// } from "react-router-dom";

class DummyGamePage extends React.Component {

    render() {
        const gameId = this.props.match.params.gameId;
        return <>
            <h1>Rendering game with game id {gameId}... (Under Construction)</h1>
            <h1>Home Page: <a href={"/"}>here</a></h1>
            <h1><a href={"/the_witcher_3_wild_hunt"}>Witcher 3</a></h1>
        </>
    }
}

export default DummyGamePage;
