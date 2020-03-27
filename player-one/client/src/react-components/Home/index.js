import React from "react";
import CarouselSlides from '../CarouselSlides';
import MainPageShowCategory from "../MainPageShowCategory";
import BottomInfo from "../BottomInfo";
import { withRouter } from "react-router-dom";

/* Component for the Home page */
class Home extends React.Component {
    state = {
        hottestGamesForGenre: undefined,
        hottestGames: undefined,
        allGames: undefined
    }

    componentDidMount = () => {
        const baseURL = "http://localhost:5000"
        const url = baseURL + '/games'

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
                console.log(res)
            }
        }).then(data => {
            this.setState({allGames: data.allGames});
            this.setState({hottestGames: data.hottestGames});
            this.setState({hottestGamesForGenre: data.hottestGamesForGenre});
            console.log("Front Page Fetch States Set Complete")
            console.log(this.state.allGames);
            console.log(this.state.hottestGames);
            console.log(this.state.hottestGamesForGenre);
        }).catch(e => console.log(e))
    }
    
    render() {
        return (
            <div>
                <CarouselSlides/>
                <MainPageShowCategory GameCategory={"Action Games"}
                                    CategoryDescription={"Video game genre that emphasizes physical challenges, including hand–eye coordination and reaction-time. The genre includes a large variety of sub-genres, such as fighting games, beat 'em ups, shooter games and platform games."}/>
                <MainPageShowCategory GameCategory={"Shooting Games"}
                                    CategoryDescription={"Shooter games encompass many subgenres that have the commonality of focusing on the actions of the avatar engaging in combat with a weapon against both code-driven NPC enemies or other avatars controlled by other players."}/>
                <MainPageShowCategory GameCategory={"Role Playing"}
                                    CategoryDescription={"A role-playing game (RPG) is a game in which each participant assumes the role of a character, generally in a fantasy or science fiction setting, that can interact within the game's imaginary world."}/>
                <MainPageShowCategory GameCategory={"Adventure"}
                                    CategoryDescription={"The genre's focus on story allows it to draw heavily from other narrative-based media, literature and film, encompassing a wide variety of literary genres. "}/>
                <MainPageShowCategory GameCategory={"Causal Games"}
                                    CategoryDescription={"Ready for some easy to play games? Grab some snack and play with your friends!"}/>
                <BottomInfo/>
            </div>
        )
    }
}

export default withRouter(Home);
