import React from "react";
import CarouselSlides from '../CarouselSlides';
import MainPageShowCategory from "../MainPageShowCategory";
import BottomInfo from "../BottomInfo";

/* Component for the Home page */
export default function Home() {
    return (
        <div>
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
