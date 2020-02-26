import React from "react";
import TopNavBar from '../TopNavBar';
import CarouselSlides from '../CarouselSlides';
import MainPageShowCategory from "../MainPageShowCategory";
import BottomInfo from "../BottomInfo";

/* Component for the Home page */
export default function Home(props) {
    const {state} = props;
    const sections = [
        {title: 'Featured', url: '#'},
        {title: 'Trending', url: '#'},
        {title: 'RPG Game', url: '#'},
        {title: 'Leisure', url: '#'},
        {title: 'Scenery', url: '#'},
        {title: 'bruh', url: '#'},
        {title: 'what else', url: '#'},
    ];
    return (
        <div>
            <TopNavBar sections={sections} title="PLAYER ONE" username={state.username}
                       isLoggedIn={state.isLoggedIn}/>
            <CarouselSlides/>
            
            <MainPageShowCategory GameCategory={"GameCategory 1"}
                                  CategoryDescription={"Some text that describes this category Some text that describes this category Some text that describes this category Some text that describes this category Some text that describes this category Some text that describes this category Some text that describes this category Some text that describes this category"}
                                  Images={["../../imgs/w3.jpg", "../../imgs/w3.jpg"]}/>
            <MainPageShowCategory GameCategory={"GameCategory 2"}
                                  CategoryDescription={"Some text that describes this category Some text that describes this category Some text that describes this category Some text that describes this category Some text that describes this category Some text that describes this category Some text that describes this category Some text that describes this category"}
                                  Images={["../../imgs/w3.jpg", "../../imgs/w3.jpg"]}/>
            <MainPageShowCategory GameCategory={"GameCategory 3"}
                                  CategoryDescription={"Some text that describes this category Some text that describes this category Some text that describes this category Some text that describes this category Some text that describes this category Some text that describes this category Some text that describes this category Some text that describes this category"}
                                  Images={["../../imgs/w3.jpg", "../../imgs/w3.jpg"]}/>
            <MainPageShowCategory GameCategory={"GameCategory 4"}
                                  CategoryDescription={"Some text that describes this category Some text that describes this category Some text that describes this category Some text that describes this category Some text that describes this category Some text that describes this category Some text that describes this category Some text that describes this category"}
                                  Images={["../../imgs/w3.jpg", "../../imgs/w3.jpg"]}/>
            <MainPageShowCategory GameCategory={"GameCategory 5"}
                                  CategoryDescription={"Some text that describes this category Some text that describes this category Some text that describes this category Some text that describes this category Some text that describes this category Some text that describes this category Some text that describes this category Some text that describes this category"}
                                  Images={["../../imgs/w3.jpg", "../../imgs/w3.jpg"]}/>
            <BottomInfo/>
        </div>
    )
}
