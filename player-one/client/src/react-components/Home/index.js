import React from "react";
import CarouselSlides from '../CarouselSlides';
import MainPageShowCategory from "../MainPageShowCategory";
import BottomInfo from "../BottomInfo";

/* Component for the Home page */
export default function Home() {
    return (
        <div>
            <CarouselSlides/>
            <MainPageShowCategory GameCategory={"Action Games"}
                                  CategoryDescription={"Video game genre that emphasizes physical challenges, including hand–eye coordination and reaction-time. The genre includes a large variety of sub-genres, such as fighting games, beat 'em ups, shooter games and platform games."}
                                  Images={["../../imgs/w3.jpg", "../../imgs/w3.jpg"]}/>
            <MainPageShowCategory GameCategory={"Shooting Games"}
                                  CategoryDescription={"Shooter games encompass many subgenres that have the commonality of focusing on the actions of the avatar engaging in combat with a weapon against both code-driven NPC enemies or other avatars controlled by other players."}
                                  Images={["../../imgs/w3.jpg", "../../imgs/w3.jpg"]}/>
            <MainPageShowCategory GameCategory={"Role Playing"}
                                  CategoryDescription={"A role-playing game (RPG) is a game in which each participant assumes the role of a character, generally in a fantasy or science fiction setting, that can interact within the game's imaginary world."}
                                  Images={["../../imgs/w3.jpg", "../../imgs/w3.jpg"]}/>
            <MainPageShowCategory GameCategory={"Adventure"}
                                  CategoryDescription={"The genre's focus on story allows it to draw heavily from other narrative-based media, literature and film, encompassing a wide variety of literary genres. "}
                                  Images={["../../imgs/w3.jpg", "../../imgs/w3.jpg"]}/>
            <MainPageShowCategory GameCategory={"Causal Games"}
                                  CategoryDescription={"Ready for some easy to play games? Grab some snack and play with your friends!"}
                                  Images={["../../imgs/w3.jpg", "../../imgs/w3.jpg"]}/>
            <BottomInfo/>
        </div>
    )
}
