import React from "react";
import TopNavBar from '../TopNavBar';
import CarouselSlides from '../CarouselSlides';
import MainPageShowCategory from "../MainPageShowCategory";
import BottomInfo from "../BottomInfo";

/* Component for the Home page */
class Home extends React.Component {
    render() {
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
                <TopNavBar sections={sections} title="PLAYER ONE"/>
                <CarouselSlides/>
                {/*const { GameCategory, CategoryDescription, images } = props;*/}
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
        );
    }
}

export default Home;